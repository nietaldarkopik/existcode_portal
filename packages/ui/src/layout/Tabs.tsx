import { type ReactNode } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { cn } from "../lib/cn";
import { definedProps } from "../lib/definedProps";

export interface TabItem {
  value: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function Tabs({ items, defaultValue, value, onValueChange, className }: TabsProps) {
  return (
    <RadixTabs.Root
      {...definedProps({
        defaultValue: defaultValue ?? items[0]?.value,
        value,
        onValueChange,
        className
      })}
    >
      <RadixTabs.List className="flex gap-1 border-b border-neutral-800">
        {items.map((item) => (
          <RadixTabs.Trigger
            key={item.value}
            value={item.value}
            className={cn(
              "relative px-4 py-2 text-sm text-neutral-400 transition-colors duration-(--duration-fast) ease-standard",
              "hover:text-neutral-200",
              "data-[state=active]:text-neutral-50",
              "data-[state=active]:after:absolute data-[state=active]:after:inset-x-0 data-[state=active]:after:-bottom-px",
              "data-[state=active]:after:h-0.5 data-[state=active]:after:bg-accent-500"
            )}
          >
            {item.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {items.map((item) => (
        <RadixTabs.Content key={item.value} value={item.value} className="pt-4">
          {item.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
}
