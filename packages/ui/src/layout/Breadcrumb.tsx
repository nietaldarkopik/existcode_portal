import { Fragment } from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "../lib/cn";

export interface BreadcrumbProps {
  trail: string[];
  className?: string;
}

export function Breadcrumb({ trail, className }: BreadcrumbProps) {
  return (
    <div className={cn("flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-neutral-400", className)}>
      <ChevronLeft className="size-3.5" />
      {trail.map((item, i) => (
        <Fragment key={item}>
          {i > 0 ? <span className="text-neutral-600">/</span> : null}
          <span>{item}</span>
        </Fragment>
      ))}
      <span className="text-neutral-600">/</span>
    </div>
  );
}
