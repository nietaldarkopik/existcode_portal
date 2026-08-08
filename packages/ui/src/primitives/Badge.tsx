import { type HTMLAttributes } from "react";
import { cn } from "../lib/cn";

const variants = {
  neutral: "bg-neutral-800 text-neutral-300 border-neutral-700",
  accent: "bg-accent-500/15 text-accent-300 border-accent-500/30",
  success: "bg-success-500/15 text-success-400 border-success-500/30",
  warning: "bg-warning-500/15 text-warning-400 border-warning-500/30",
  danger: "bg-danger-500/15 text-danger-400 border-danger-500/30",
  info: "bg-info-500/15 text-info-400 border-info-500/30"
} as const;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variants;
}

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-xs font-medium uppercase tracking-wider",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
