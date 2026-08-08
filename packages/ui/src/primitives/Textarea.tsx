import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-24 w-full rounded-lg border border-neutral-700 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-50",
      "placeholder:text-neutral-500",
      "transition-colors duration-(--duration-fast) ease-standard",
      "focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30",
      "disabled:pointer-events-none disabled:opacity-40",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
