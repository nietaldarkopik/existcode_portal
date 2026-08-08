import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../lib/cn";

const variants = {
  primary: "bg-accent-500 text-neutral-950 hover:bg-accent-300 focus-visible:ring-accent-300",
  secondary:
    "bg-neutral-800/60 text-neutral-50 border border-neutral-700 hover:border-accent-500/60 hover:bg-neutral-800 focus-visible:ring-accent-500",
  ghost: "text-neutral-200 hover:bg-neutral-800/60 hover:text-neutral-50 focus-visible:ring-accent-500",
  glass:
    "bg-white/5 backdrop-blur-md border border-neutral-700/60 text-neutral-50 hover:border-accent-500/50 hover:bg-white/8 focus-visible:ring-accent-500"
} as const;

const sizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base"
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium uppercase tracking-wide transition-colors duration-(--duration-fast) ease-standard",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
          "disabled:pointer-events-none disabled:opacity-40",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
