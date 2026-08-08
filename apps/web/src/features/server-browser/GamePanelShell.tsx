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
  // Overrides the main content area's default left/right margin classes —
  // used by the company site's "sidebar" layout mode, which swaps iconRail
  // for a wider labeled nav panel. Defaults preserve today's fixed-rail
  // spacing for every other caller (the Battlefield-menu clone included).
  mainClassName?: string | undefined;
}

// Persistent chrome across every menu screen — the party rail never changes;
// the icon rail and top nav are swapped in per top-level section.
export function GamePanelShell({
  children,
  iconRail,
  rightRail,
  backdropVariant,
  showTopNav = false,
  topNavProps,
  mainClassName
}: GamePanelShellProps) {
  return (
    <div className="relative min-h-screen text-neutral-50">
      <AmbientBackdrop {...(backdropVariant ? { variant: backdropVariant } : {})} />
      {showTopNav ? <TopNavBar {...topNavProps} /> : null}
      {iconRail}
      {rightRail ?? <PartyRail />}

      <main className={cn("relative z-10 px-10 lg:px-14", mainClassName ?? "ml-[86px] mr-[64px]", showTopNav ? "py-6" : "py-8")}>
        {children}
      </main>
    </div>
  );
}
