import type { ServiceAccent } from "@existcode/types";

export const accentToneClasses: Record<ServiceAccent, string> = {
  sky: "bg-gradient-to-br from-sky-600/60 via-neutral-800 to-neutral-900",
  violet: "bg-gradient-to-br from-violet-500/50 via-neutral-800 to-neutral-900",
  amber: "bg-gradient-to-br from-amber-700/50 via-neutral-800 to-neutral-900",
  emerald: "bg-gradient-to-br from-emerald-600/50 via-neutral-800 to-neutral-900",
  rose: "bg-gradient-to-br from-rose-500/50 via-neutral-800 to-neutral-900",
  neutral: "bg-gradient-to-br from-neutral-500/50 via-neutral-800 to-neutral-900"
};

export function accentTone(accent: ServiceAccent | null | undefined): string {
  return accentToneClasses[accent ?? "neutral"];
}
