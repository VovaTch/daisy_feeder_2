import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { startTransition } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { FeedingItem } from "../types/food-item";
import {
  deleteFoodItem,
  insertFoodItem,
  updateFoodItem,
} from "@/actions/feeding-items";
import { useDaisyFeederContext } from "@/providers/context";
import DateTimePicker from "../datetime/date-time-picker";

const FeedingItemSchema = z.object({
  amount: z.coerce.number().int().positive(),
  foodType: z.enum(["dry", "wet"]),
  datetime: z.date(),
});

type AddFoodFormProps = {
  onSave: () => void;
  item?: FeedingItem;
};

/**
 * Component for adding or editing a food item in the Daisy Feeder application.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onSave - Callback function to be called after saving the food item.
 * @param {Object} [props.item] - The food item to be edited. If not provided, a new food item will be added.
 *
 * @returns {JSX.Element} The rendered AddEditFoodForm component.
 *
 * @throws {Error} If the user is not authenticated.
 *
 * @example
 * <AddEditFoodForm onSave={handleSave} item={foodItem} />
 */
const AddEditFoodForm = ({ onSave, item }: AddFoodFormProps) => {
  const { user } = useUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  const { setOptimisticFeedingItems } = useDaisyFeederContext();
  const form = useForm<z.infer<typeof FeedingItemSchema>>({
    resolver: zodResolver(FeedingItemSchema),
    defaultValues: {
      amount: item?.amount || 0,
      foodType: item?.foodType || "dry",
      datetime: item?.datetime || new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof FeedingItemSchema>) {
    console.log(values);
    if (!user?.id || user.id === null) {
      throw new Error("Unauthorized");
    }
    onSave();
    if (item) {
      try {
        startTransition(async () => {
          setOptimisticFeedingItems({ action: "update", addedItem: item });
          await updateFoodItem(
            item.id,
            user.id,
            values.foodType,
            values.amount,
            values.datetime
          );
        });
      } catch (error) {
        console.error(error);
        toast(`Something went wrong, failed to update food item`);
      }
    } else {
      startTransition(async () => {
        try {
          setOptimisticFeedingItems({
            action: "add",
            addedItem: {
              id: Math.random(),
              amount: values.amount,
              foodType: values.foodType,
              datetime: values.datetime,
              feeder: user.username ?? `User_${user.id.slice(-6)}`,
              feederAvatarUrl: user.imageUrl,
            },
          });
          toast("Food item added");
          await insertFoodItem(
            user.id,
            values.foodType,
            values.amount,
            values.datetime
          );
        } catch (error) {
          console.error(error);
          toast(`Something went wrong, failed to add food item`);
        }
      });
    }
  }

  async function onDelete(id: number) {
    if (!user?.id || user.id === null) {
      throw new Error("Unauthorized");
    }
    if (!item) {
      return;
    }
    onSave();
    startTransition(async () => {
      try {
        setOptimisticFeedingItems({ action: "remove", addedItem: item });
        toast("Food item deleted");
        await deleteFoodItem(id);
      } catch (error) {
        console.error(error);
        toast(`Something went wrong, failed to delete food item`);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="text-sm lg:text-base"
      >
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="grid cols-4">
              <FormLabel className="col-span-1">Food amount</FormLabel>
              <FormControl>
                <Input
                  id="amount"
                  className="col-span-3"
                  type="number"
                  placeholder="How much Daisy was hungry?"
                  {...field}
                ></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="foodType"
          render={({ field }) => (
            <FormItem className="lg:pt-4 pt-2">
              <FormLabel>Food type</FormLabel>
              <FormControl>
                <div className="col-span-3">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    {...field}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="dry" defaultValue={"dry"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Food type</SelectLabel>
                        <SelectItem value={"dry"}>Dry</SelectItem>
                        <SelectItem value={"wet"}>Wet</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="datetime"
          render={({ field }) => (
            <FormItem className="lg:pt-4 pt-2">
              <FormLabel>Feeding time</FormLabel>
              <FormControl>
                <DateTimePicker value={field.value} onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <div className="flex flex-col">
          <Separator
            orientation="horizontal"
            className="w-full lg:my-3 my-1 bg-orange-800 "
          />
          <Button variant="primary" className="mb-2 py-2" type="submit">
            Submit
          </Button>
          {item ? (
            <Button
              variant="danger"
              className="mb-2 py-2"
              onClick={() => onDelete(item.id)}
            >
              Delete
            </Button>
          ) : (
            <></>
          )}
        </div>
      </form>
    </Form>
  );
};

export default AddEditFoodForm;
