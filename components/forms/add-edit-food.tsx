import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { DateTimePicker } from "../custom/datetime-picker";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { FeedingItem } from "../types/food-item";
import { useAuth } from "@clerk/nextjs";
import {
  deleteFoodItem,
  insertFoodItem,
  updateFoodItem,
} from "@/actions/feeding-items";
import { toast } from "sonner";
import { useDaisyFeederContext } from "@/providers/context";
import { startTransition } from "react";

const FeedingItemSchema = z.object({
  amount: z.coerce.number().int().positive(),
  foodType: z.enum(["dry", "wet"]),
  datetime: z.date(),
});

type AddFoodFormProps = {
  onSave: () => void;
  item?: FeedingItem;
};

const AddEditFoodForm = ({ onSave, item }: AddFoodFormProps) => {
  const { userId } = useAuth();
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
    if (!userId || userId === null) {
      throw new Error("Unauthorized");
    }
    onSave();
    if (item) {
      startTransition(async () => {
        setOptimisticFeedingItems({ action: "update", addedItem: item });
        await updateFoodItem(
          item.id,
          userId,
          values.foodType,
          values.amount,
          values.datetime
        );
      });
    } else {
      startTransition(async () => {
        setOptimisticFeedingItems({
          action: "add",
          addedItem: {
            id: Math.random(),
            amount: values.amount,
            foodType: values.foodType,
            datetime: values.datetime,
            feeder: "Daisy",
            feederAvatarUrl: "/images/default_avatar.png", //TODO: TEMP
          },
        });
        toast("Food item added");
        await insertFoodItem(
          userId,
          values.foodType,
          values.amount,
          values.datetime
        );
      });
    }
  }

  async function onDelete(id: number) {
    if (!userId || userId === null) {
      throw new Error("Unauthorized");
    }
    if (!item) {
      return;
    }
    onSave();
    startTransition(async () => {
      setOptimisticFeedingItems({ action: "remove", addedItem: item });
      toast("Food item deleted");
      await deleteFoodItem(id);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
            <FormItem className="pt-4">
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
          render={({}) => (
            <FormItem className="pt-4">
              <FormLabel>Feeding time</FormLabel>
              <FormControl>
                <DateTimePicker
                  value={new Date()}
                  className="col-span-4 text-xl"
                ></DateTimePicker>
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <div className="flex flex-col">
          <Separator
            orientation="horizontal"
            className="w-full my-3 bg-orange-800 "
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

          {/** TODO: Actually handle submit */}
        </div>
      </form>
    </Form>
  );
};

export default AddEditFoodForm;
