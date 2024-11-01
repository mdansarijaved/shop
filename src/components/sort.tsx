"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
    {
        value: "New Arrivals",
        label: "New Arrivals",
    },
    {
        value: "Discount",
        label: "Discount",
    },
    {
        value: "Price - Low to High",
        label: "Price - Low to High",
    },
    {
        value: "Price - High to Low",
        label: "Price - High to Low",
    },
    {
        value: "Relevance",
        label: "Relevance",
    },
];

export function Combobox() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("Relevance");

    return (
        <div className="flex gap-4 items-center">
            <h1 className="text-[0.75rem] uppercase font-semibold">Sort By</h1>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[180px] justify-between text-[0.75rem]"
                    >
                        {value
                            ? frameworks.find((framework) => framework.value === value)?.label
                            : "Relevance"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[180px] p-0 text-[0.75rem]">
                    <Command>
                        {/* <CommandInput placeholder="Sort by..." className="text-[0.75rem]" /> */}
                        <CommandList>
                            <CommandEmpty>Not found.</CommandEmpty>
                            <CommandGroup className="text-[0.75rem]">
                                {frameworks.map((framework) => (
                                    <CommandItem
                                        className="text-[0.75rem]"
                                        key={framework.value}
                                        value={framework.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue);
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === framework.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {framework.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
