import { cn } from "../lib/cn";

export interface ProgressBarProps {
  label: string;
  value: number;
  max: number;
  className?: string;
}

export function ProgressBar({ label, value, max, className }: ProgressBarProps) {
  const percent = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium uppercase tracking-widest text-neutral-400">{label}</span>
        <span className="font-mono text-neutral-300">
          {value}/{max}
        </span>
      </div>
      <div className="h-1 w-full bg-neutral-800">
        <div className="h-full bg-accent-500" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
