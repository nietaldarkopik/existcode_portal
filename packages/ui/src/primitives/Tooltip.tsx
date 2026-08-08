import { type ReactNode } from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { cn } from "../lib/cn";

export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}

export function TooltipProvider({ children }: { children: ReactNode }) {
  return <RadixTooltip.Provider delayDuration={200}>{children}</RadixTooltip.Provider>;
}

export function Tooltip({ children, content, side = "top" }: TooltipProps) {
  return (
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          side={side}
          sideOffset={6}
          className={cn(
            "z-(--z-tooltip) rounded-md border border-neutral-700 bg-neutral-900 px-2.5 py-1.5 text-xs text-neutral-100 shadow-lg"
          )}
        >
          {content}
          <RadixTooltip.Arrow className="fill-neutral-900" />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
}
