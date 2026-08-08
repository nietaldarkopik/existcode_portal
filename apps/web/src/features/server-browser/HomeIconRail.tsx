import { Contact, HelpCircle, LayoutGrid, List, Play, Settings, Star } from "lucide-react";
import { IconRailShell } from "./IconRailShell";
import { RailIconButton } from "./RailIconButton";

// Used on the Home landing screen — quick-access shortcuts rather than the
// Multiplayer loadout thumbnails.
export function HomeIconRail() {
  return (
    <IconRailShell
      topGroup={
        <>
          <RailIconButton
            icon={<LayoutGrid className="size-5" />}
            label="Dashboard"
            ariaLabel="Dashboard"
            active
            size={38}
            className="text-neutral-50"
          />
          <RailIconButton
            icon={<Star className="size-5" />}
            label="Favorites"
            ariaLabel="Favorites"
            size={38}
            className="text-neutral-400"
          />
          <RailIconButton
            icon={null}
            label="Soldier"
            ariaLabel="Soldier"
            size={38}
            className="rounded-[3px] bg-gradient-to-br from-amber-700/70 to-neutral-900"
          />
          <RailIconButton
            icon={<Contact className="size-5" />}
            label="Profile"
            ariaLabel="Profile"
            size={38}
            className="text-neutral-400"
          />
        </>
      }
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
            label="Browse"
            ariaLabel="Browse"
            size={24}
            className="text-neutral-300"
          />
        </>
      }
      bottomGroup={
        <>
          <RailIconButton
            icon={<Settings className="size-5" />}
            label="Settings"
            ariaLabel="Settings"
            size={24}
            className="text-neutral-400"
          />
          <RailIconButton
            icon={<HelpCircle className="size-5" />}
            label="Help"
            ariaLabel="Help"
            size={24}
            className="text-neutral-400"
          />
        </>
      }
    />
  );
}
