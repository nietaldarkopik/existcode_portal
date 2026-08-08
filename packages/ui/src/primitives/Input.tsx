import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-10 w-full rounded-lg border border-neutral-700 bg-neutral-900/60 px-3 text-sm text-neutral-50",
      "placeholder:text-neutral-500",
      "transition-colors duration-(--duration-fast) ease-standard",
      "focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30",
      "disabled:pointer-events-none disabled:opacity-40",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";
