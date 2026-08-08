import { type HTMLAttributes, type ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { cn } from "../lib/cn";

const variants = {
  info: { className: "border-info-500/30 bg-info-500/10 text-info-400", Icon: Info },
  success: { className: "border-success-500/30 bg-success-500/10 text-success-400", Icon: CheckCircle2 },
  warning: { className: "border-warning-500/30 bg-warning-500/10 text-warning-400", Icon: AlertTriangle },
  danger: { className: "border-danger-500/30 bg-danger-500/10 text-danger-400", Icon: XCircle }
} as const;

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: keyof typeof variants;
  title?: ReactNode;
}

export function Alert({ className, variant = "info", title, children, ...props }: AlertProps) {
  const { className: variantClassName, Icon } = variants[variant];
  return (
    <div
      role="alert"
      className={cn("flex gap-3 rounded-lg border p-4 text-sm", variantClassName, className)}
      {...props}
    >
      <Icon className="size-5 shrink-0" />
      <div className="text-neutral-200">
        {title ? <p className="font-medium text-neutral-50">{title}</p> : null}
        {children}
      </div>
    </div>
  );
}
