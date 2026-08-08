import { cn } from "@existcode/ui";

function pingTone(ping: number) {
  if (ping <= 60) return { bars: 3, textClass: "text-success-400", barClass: "bg-success-400" };
  if (ping <= 150) return { bars: 2, textClass: "text-warning-400", barClass: "bg-warning-400" };
  return { bars: 1, textClass: "text-danger-400", barClass: "bg-danger-400" };
}

export function PingIndicator({ ping }: { ping: number }) {
  const { bars, textClass, barClass } = pingTone(ping);

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-end gap-[2px]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn("w-[3px] rounded-[1px]", i < bars ? barClass : "bg-neutral-700")}
            style={{ height: `${5 + i * 3}px` }}
          />
        ))}
      </div>
      <span className={cn("text-xs font-medium tabular-nums", textClass)}>{ping}</span>
    </div>
  );
}
