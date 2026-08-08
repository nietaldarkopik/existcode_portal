import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../lib/cn";

const variants = {
  glass: "bg-white/[0.04] backdrop-blur-md border border-neutral-700/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
  solid: "bg-neutral-900 border border-neutral-800"
} as const;

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variants;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, variant = "glass", ...props }, ref) => (
  <div ref={ref} className={cn("rounded-xl p-6", variants[variant], className)} {...props} />
));
Card.displayName = "Card";
