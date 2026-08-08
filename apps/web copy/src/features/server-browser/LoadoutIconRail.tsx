import { HelpCircle, List, Play, Power } from "lucide-react";
import { IconRailShell } from "./IconRailShell";
import { RailIconButton } from "./RailIconButton";

const loadoutSlots = [
  { label: "Assault", tone: "bg-gradient-to-br from-sky-500/70 to-neutral-900" },
  { label: "Engineer", tone: "bg-gradient-to-br from-orange-600/70 to-neutral-900" },
  { label: "Support", tone: "bg-gradient-to-br from-amber-700/70 to-neutral-900" },
  { label: "Recon", tone: "bg-gradient-to-br from-neutral-500/70 to-neutral-900" },
  { label: "Customize", tone: "bg-gradient-to-br from-neutral-700/70 to-neutral-950" }
];

const ACTIVE_INDEX = 2;

// Used on the Multiplayer / Server Browser / Server Info screens.
export function LoadoutIconRail() {
  return (
    <IconRailShell
      topGroup={loadoutSlots.map((slot, i) => (
        <RailIconButton
          key={slot.label}
          icon={null}
          label={slot.label}
          ariaLabel={slot.label}
          active={i === ACTIVE_INDEX}
          className={`rounded-[3px] ${slot.tone}`}
        />
      ))}
      midGroup={
        <>
          <RailIconButton
            icon={<Play className="size-5" fill="currentColor" />}
            label="Play"
            ariaLabel="Play"
            size={24}
            className="text-neutral-300"
          />
          <RailIconButton
            icon={<List className="size-5" />}
            label="Server List"
            ariaLabel="Server List"
            size={24}
            className="text-neutral-300"
          />
        </>
      }
      bottomGroup={
        <>
          <RailIconButton
            icon={<HelpCircle className="size-5" />}
            label="Help"
            ariaLabel="Help"
            size={24}
            className="text-neutral-400"
          />
          <RailIconButton
            icon={<Power className="size-5" />}
            label="Exit"
            ariaLabel="Exit"
            size={24}
            className="text-neutral-400"
          />
        </>
      }
    />
  );
}
