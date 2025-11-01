"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "../lib/utils"
import { Button } from "../components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover"

export function ComboboxDemo(props: any) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const items = props.items || [] // Ensuring `props.items` is an array (default to empty array if undefined)

  const handleSelect = (selectedValue: string) => {
    setValue(selectedValue)
    setOpen(false)
    props.onChange(selectedValue)  // Call onChange to update parent state
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between text-white"
        >
          {value || props.value} {/* Show selected value or placeholder */}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9 text-white" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {items.map((item: string) => (
                <CommandItem
                  className="text-white"
                  key={item} // Unique key
                  value={item}
                  onSelect={() => handleSelect(item)} // Pass selected item to handleSelect
                >
                  {item} {/* Show the item text */}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item ? "opacity-100" : "opacity-0" // Display checkmark if selected
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
