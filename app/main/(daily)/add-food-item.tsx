"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { DateTimePicker } from "@/components/custom/datetime-picker";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PawPrint } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// TODO: Move the schema to a more appropriate place once the schema is finalized
const FeedingItemSchema = z.object({
  amount: z.number().int().positive(),
  foodType: z.enum(["dry", "wet"]),
  datetime: z.date(),
});

const ModalAddFood = () => {
  const form = useForm<z.infer<typeof FeedingItemSchema>>({
    resolver: zodResolver(FeedingItemSchema),
    defaultValues: {
      datetime: new Date(),
    },
  });

  function onSubmit(data: z.infer<typeof FeedingItemSchema>) {
    toast({
      title: "Food added!",
      description: `You have added ${data.amount} of ${data.foodType} food.`,
    });
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex flex-1 text-orange-700">
          <PawPrint className="text-sm" />
          Add Food!
        </DialogTitle>
        <DialogDescription>
          Add feeding information of Daisy, praise the Dais!
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid items-center gap-4">
          <Label htmlFor="amount" className="text-right align-middle">
            Food amount
          </Label>
        </div>
        <Input id="amount" className="col-span-3" type="integer"></Input>
        <div className="grid items-center gap-4">
          <Label htmlFor="foodType" className="text-right align-middle">
            Food Type
          </Label>
        </div>
        <div className="col-span-3">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select the food type" />
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
        <DateTimePicker
          value={new Date()}
          className="col-span-4 text-xl"
        ></DateTimePicker>
      </div>
    </DialogContent>
  );
};

export default ModalAddFood;
