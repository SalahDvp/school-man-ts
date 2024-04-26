import * as React from 'react'
import { cn } from "@/lib/utils"

import { Check, X, ChevronsUpDown } from "lucide-react"
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
import { Badge } from "@/components/ui/badge";


export type OptionType = {
    name: string;
    id: string;
}

interface MultiSelectProps {
    options: OptionType[];
    selected: OptionType[];
    onChange: React.Dispatch<React.SetStateAction<object[]>>;
    className?: string;
}

function MultiSelect({ options, selected, onChange, className, ...props }: MultiSelectProps) {

    const [open, setOpen] = React.useState(false)

    const handleUnselect = (item: OptionType) => {
        onChange(selected.filter((i) => i.id !== item.id))
    }

    return (
        <Popover open={open} onOpenChange={setOpen} {...props}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`w-full justify-between ${selected.length > 1 ? "h-full" : "h-10"}`}
                    onClick={() => setOpen(!open)}
                >
                    <div className="flex gap-1 flex-wrap">
                        {selected.map((item,index) => (
                            <Badge
                                variant="secondary"
                                key={index}
                                className="mr-1 mb-1"
                                onClick={() => handleUnselect(item)}
                            >
                                {item.name}
                                <div
                                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleUnselect(item);
                                        }
                                    }}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onClick={() => handleUnselect(item)}
                                >
                                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                </div>
                            </Badge>
                        ))}
                    </div>
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command className={className}>
                    <CommandInput placeholder="Search ..." />
                    <CommandEmpty>No item found.</CommandEmpty>
                    <CommandGroup className='max-h-64 overflow-auto'>
                    <CommandList>
                        {options.map((option,index) => (
                            <CommandItem
                                key={index}
                                onSelect={() => {
                                    onChange(
                                        selected.some(item => item.id === option.id)
                                            ? selected.filter((item) => item.id !== option.id)
                                            : [...selected, option]
                                    )
                                    setOpen(true)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        selected.some(item => item.id === option.id) ?
                                            "opacity-100" : "opacity-0"
                                    )}
                                />
                                {option.name}
                            </CommandItem>
                        ))}
                        </CommandList>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export { MultiSelect }