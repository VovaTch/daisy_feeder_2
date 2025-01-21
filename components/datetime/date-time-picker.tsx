"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { TimePicker } from "./time-picker";

type DateTimePickerProps = {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
};

const DateTimePicker = ({ value, onChange }: DateTimePickerProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open}>
      <PopoverTrigger asChild>
        <Button
          variant={"primary"}
          onClick={() => setOpen(!open)}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP HH:mm:ss") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={(date) => date > new Date()}
          initialFocus
        />
        <div className="flex justify-center m-2 text-orange-800">
          <TimePicker date={value} setDate={onChange} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateTimePicker;
