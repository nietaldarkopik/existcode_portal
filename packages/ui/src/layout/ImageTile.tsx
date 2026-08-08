import { type ReactNode } from "react";
import { cn } from "../lib/cn";

const tones = {
  accent: "from-accent-600/40 via-neutral-900 to-neutral-950",
  violet: "from-violet-500/30 via-neutral-900 to-neutral-950",
  neutral: "from-neutral-600/30 via-neutral-900 to-neutral-950"
} as const;

export interface ImageTileProps {
  title: string;
  subtitle?: string;
  tone?: keyof typeof tones;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}

// Structural stand-in for the reference's photo tiles — real imagery comes
// from the Media Manager (Phase 8); until then this uses token-driven
// gradients rather than stock photography.
export function ImageTile({ title, subtitle, tone = "neutral", icon, className, onClick, active = false }: ImageTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex h-40 flex-col justify-end overflow-hidden p-4 text-left transition-colors duration-(--duration-fast)",
        active ? "bg-neutral-50 text-neutral-950" : "bg-neutral-800/70 text-neutral-50 hover:bg-neutral-800",
        className
      )}
    >
      {!active ? (
        <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-t opacity-80", tones[tone])} />
      ) : null}
      <div className="relative z-10 flex items-center gap-2">
        {icon}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider">{title}</p>
          {subtitle ? (
            <p className={cn("mt-0.5 text-xs", active ? "text-neutral-700" : "text-neutral-400")}>{subtitle}</p>
          ) : null}
        </div>
      </div>
    </button>
  );
}
