import { cn } from "@existcode/ui";

export interface AmbientBackdropProps {
  // "bloom" = color blooms from the left-rail thumbnails (Server Info).
  // "foggy" = hazy blurred battlefield photo look (Server Browser).
  variant?: "bloom" | "foggy";
}

export function AmbientBackdrop({ variant = "bloom" }: AmbientBackdropProps) {
  if (variant === "foggy") {
    return (
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#11161c]">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700/50 via-[#171d24] to-neutral-950" />
        <div className="absolute -left-24 top-1/4 size-[520px] rounded-full bg-slate-400/15 blur-[130px]" />
        <div className="absolute -right-24 bottom-0 size-[560px] rounded-full bg-slate-500/20 blur-[140px]" />
        <div className="absolute inset-0 bg-neutral-950/45" />
      </div>
    );
  }

  return (
    <div className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#080b1099]")}>
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-[#0a101699] to-neutral-950" />
      <div className="absolute -left-52 -top-40 size-[620px] rounded-full bg-gradient-to-br from-sky-600/25 via-orange-500/15 to-transparent blur-[140px]" />
      <div className="absolute -bottom-56 -right-40 size-[680px] rounded-full bg-neutral-400/15 blur-[150px]" />
    </div>
  );
}
