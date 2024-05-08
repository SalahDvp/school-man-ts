"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
import { fr,ar,enUS} from 'date-fns/locale';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useData } from "@/context/admin/fetchDataContext"
import { useLocale } from "next-intl"

export function CalendarDateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
const {date,setDate}=useData()
const locale = useLocale();
const getLocale = (locale: string) => {
  switch (locale.toLowerCase()) {
    case 'fr':
      return fr;
    case 'ar':
      return ar;
    default:
      return enUS;
  }
};
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y",{ locale: getLocale(locale) })} -{" "}
                  {format(date.to, "LLL dd, y",{ locale: getLocale(locale) })}
                </>
              ) : (
                format(date.from, "LLL dd, y",{ locale:getLocale(locale) })
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={getLocale(locale)}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}