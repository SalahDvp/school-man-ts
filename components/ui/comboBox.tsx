"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
interface Option {
    value: string;
    label: string;
  }
  
  interface ComboboxDemoProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    options: Option[];
    placeHolder:string;
    onSelected: (value: string) => void; 
    value:string// Function to handle selection
  }
  const Combobox: React.FC<ComboboxDemoProps> = ({open,setOpen,placeHolder,options,onSelected,value}) => {
  return (

    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? options.find((framework) => framework.value === value)?.label
            : `Select ${placeHolder}...`}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={`Select ${placeHolder}...`} className="h-9" />
          <CommandEmpty>{`No ${placeHolder} found.`}</CommandEmpty>
          <CommandGroup>
            <CommandList>
            {options.map((framework,index) => (
              <CommandItem
                key={index}
                value={framework.value}
                onSelect={(currentValue) => {
                  onSelected(currentValue === value ? "" : currentValue)
                  setOpen(false)
                 
                }}
              >
                {framework.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
export default Combobox