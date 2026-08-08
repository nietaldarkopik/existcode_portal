import type { ReactNode } from "react";
import { cn } from "@existcode/ui";
import { AmbientBackdrop, type AmbientBackdropProps } from "./AmbientBackdrop";
import { PartyRail } from "./PartyRail";
import { TopNavBar, type TopNavBarProps } from "./TopNavBar";

export interface GamePanelShellProps {
  children: ReactNode;
  iconRail: ReactNode;
  rightRail?: ReactNode;
  backdropVariant?: AmbientBackdropProps["variant"];
  showTopNav?: boolean;
  topNavProps?: TopNavBarProps;
}

// Persistent chrome across every menu screen — the party rail never changes;
// the icon rail and top nav are swapped in per top-level section.
export function GamePanelShell({
  children,
  iconRail,
  rightRail,
  backdropVariant,
  showTopNav = false,
  topNavProps
}: GamePanelShellProps) {
  return (
    <div className="relative min-h-screen text-neutral-50">
      <AmbientBackdrop {...(backdropVariant ? { variant: backdropVariant } : {})} />
      {showTopNav ? <TopNavBar {...topNavProps} /> : null}
      {iconRail}
      {rightRail ?? <PartyRail />}

      <main className={cn("relative z-10 ml-[86px] mr-[64px] px-10 lg:px-14", showTopNav ? "py-6" : "py-8")}>
        {children}
      </main>
    </div>
  );
}
