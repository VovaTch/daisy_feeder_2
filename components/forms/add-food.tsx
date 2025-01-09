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

const FeedingItemSchema = z.object({
  amount: z.coerce.number().int().positive(),
  foodType: z.enum(["dry", "wet"]),
  datetime: z.date(),
});

type AddFoodFormProps = {
  onSave: () => void;
};

const AddFoodForm = ({ onSave }: AddFoodFormProps) => {
  const form = useForm<z.infer<typeof FeedingItemSchema>>({
    resolver: zodResolver(FeedingItemSchema),
    defaultValues: {
      amount: 0,
      foodType: "dry",
      datetime: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof FeedingItemSchema>) {
    console.log(values);
    onSave();
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
          render={({}) => (
            <FormItem>
              <FormLabel>Food type</FormLabel>
              <FormControl>
                <div className="col-span-3">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="dry" defaultValue={"dry"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Food type</SelectLabel>
                        <SelectItem value="dry">Dry</SelectItem>
                        <SelectItem value="wet">Wet</SelectItem>
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
            <FormItem>
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
          {/** TODO: Actually handle submit */}
        </div>
      </form>
    </Form>
  );
};

export default AddFoodForm;
