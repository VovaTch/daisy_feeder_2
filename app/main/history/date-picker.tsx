"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { useState } from "react";

// TODO: Do it as a server component?

export function DatePicker() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [open, setOpen] = useState<boolean>(false);

  const handleDateChange = (date?: Date) => {
    if (!date) return;
    const correctedDate = new Date(date.setHours(12, 0, 0, 0)); // Must be set to align the page date with the selected date
    setSelectedDate(correctedDate);
    setOpen(false);
    router.push(`/main/history/${correctedDate.toISOString().slice(0, 10)}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"default"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {selectedDate ? (
            format(selectedDate, "PPP")
          ) : (
            <span className="text-white">Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
