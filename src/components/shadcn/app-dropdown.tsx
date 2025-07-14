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

const experiences = [
  {
    value: "bird_watching",
    label: "Bird Watching",
  },
  {
    value: "event",
    label: "Event",
  },
  {
    value: "gym",
    label: "Gym",
  },
  {
    value: "workspace",
    label: "Workspace",
  },
  {
    value: "food_rating",
    label: "Food Rating",
  },
];

interface Props {
  handleComboboxValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}
export function Combobox({ handleComboboxValue, value }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? experiences.find((experience) => experience.value === value)
                ?.label
            : "Select experience.."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search experience..." className="h-9" />
          <CommandList>
            <CommandEmpty>No experience found.</CommandEmpty>
            <CommandGroup>
              {experiences.map((experience) => (
                <CommandItem
                  key={experience.value}
                  value={experience.value}
                  onSelect={(currentValue) => {
                    handleComboboxValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {experience.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === experience.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
