"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


interface CalendarDatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date: Date | undefined;
  setDate: (selectedValue: Date | undefined) => void;
}

const CalendarDatePicker: React.FC<CalendarDatePickerProps> = ({
  className,
  date,
  setDate,
}) => {

  return (
    <div className={cn("grid gap-2", className)}>
         <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(" justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className=" w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={date}
          onSelect={setDate}
          fromYear={1960}
          toYear={2030}
        />
      </PopoverContent>
    </Popover>
    </div>
  )
}
export default CalendarDatePicker;