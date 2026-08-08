import { type ReactNode } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../lib/cn";
import { definedProps } from "../lib/definedProps";

export interface ModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function Modal({ open, onOpenChange, trigger, title, description, children, className }: ModalProps) {
  return (
    <RadixDialog.Root {...definedProps({ open, onOpenChange })}>
      {trigger ? <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger> : null}
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 z-(--z-overlay) bg-neutral-950/70 backdrop-blur-sm" />
        <RadixDialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-(--z-modal) w-full max-w-lg -translate-x-1/2 -translate-y-1/2",
            "rounded-xl border border-neutral-700 bg-neutral-900 p-6 shadow-2xl",
            "focus:outline-none",
            className
          )}
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <RadixDialog.Title className="font-heading text-lg text-neutral-50">{title}</RadixDialog.Title>
              {description ? (
                <RadixDialog.Description className="mt-1 text-sm text-neutral-400">{description}</RadixDialog.Description>
              ) : null}
            </div>
            <RadixDialog.Close className="rounded-md p-1 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-50">
              <X className="size-4" />
            </RadixDialog.Close>
          </div>
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
