import type { ReactNode } from "react";

export interface IconRailShellProps {
  topGroup: ReactNode;
  midGroup?: ReactNode;
  bottomGroup?: ReactNode;
}

// Shared positioning for the left-hand icon rail — contents differ per
// top-level section (Home vs. Multiplayer), but the placement doesn't.
export function IconRailShell({ topGroup, midGroup, bottomGroup }: IconRailShellProps) {
  return (
    <nav className="fixed inset-y-0 left-0 z-20 flex w-[86px] flex-col items-center pb-10 pt-[18vh] border-r border-white/10">
      <div className="flex flex-col items-center gap-4">{topGroup}</div>

      {midGroup ? <div className="mt-8 flex flex-col items-center gap-6 text-neutral-300">{midGroup}</div> : null}

      {bottomGroup ? (
        <div className="mt-auto flex flex-col items-center gap-5 text-neutral-400">{bottomGroup}</div>
      ) : null}
    </nav>
  );
}
