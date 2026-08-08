import { type ReactNode } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "../lib/cn";
import { definedProps } from "../lib/definedProps";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  options: SelectOption[];
  disabled?: boolean;
  className?: string;
}

export function Select({ value, defaultValue, onValueChange, placeholder, options, disabled, className }: SelectProps) {
  return (
    <RadixSelect.Root {...definedProps({ value, defaultValue, onValueChange, disabled })}>
      <RadixSelect.Trigger
        className={cn(
          "flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-neutral-700 bg-neutral-900/60 px-3 text-sm text-neutral-50",
          "transition-colors duration-(--duration-fast) ease-standard",
          "focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30",
          "disabled:pointer-events-none disabled:opacity-40",
          "data-[placeholder]:text-neutral-500",
          className
        )}
      >
        <RadixSelect.Value {...definedProps({ placeholder })} />
        <RadixSelect.Icon>
          <ChevronDown className="size-4 text-neutral-400" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          sideOffset={4}
          className="z-(--z-popover) overflow-hidden rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-50 shadow-lg"
        >
          <RadixSelect.Viewport className="p-1">
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}

function SelectItem({ value, children }: { value: string; children: ReactNode }) {
  return (
    <RadixSelect.Item
      value={value}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 pr-8 text-sm outline-none",
        "data-[highlighted]:bg-accent-500/15 data-[highlighted]:text-accent-300"
      )}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className="absolute right-2 inline-flex items-center">
        <Check className="size-4" />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  );
}
