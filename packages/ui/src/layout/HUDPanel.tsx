import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export type HUDPanelProps = HTMLAttributes<HTMLDivElement>;

// Flat data/stat tile — matches the reference's plain rectangular panels
// (no border, no rounding, background darkening only).
export const HUDPanel = forwardRef<HTMLDivElement, HUDPanelProps>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("bg-neutral-800/60 p-5", className)} {...props}>
    {children}
  </div>
));
HUDPanel.displayName = "HUDPanel";

export interface StatTileProps {
  label: string;
  value: string;
  hint?: string;
}

export function StatTile({ label, value, hint }: StatTileProps) {
  return (
    <HUDPanel className="flex flex-col gap-1.5">
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-neutral-400">{label}</span>
      <span className="font-heading text-2xl font-medium text-neutral-50">{value}</span>
      {hint ? <span className="text-xs text-neutral-500">{hint}</span> : null}
    </HUDPanel>
  );
}
