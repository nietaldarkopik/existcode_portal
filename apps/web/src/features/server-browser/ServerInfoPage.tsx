import { Breadcrumb } from "@existcode/ui";
import { GamePanelShell } from "./GamePanelShell";
import { LoadoutIconRail } from "./LoadoutIconRail";
import { MapRotationGrid } from "./MapRotationGrid";
import { mapRotation } from "./data";

export function ServerInfoPage() {
  return (
    <GamePanelShell iconRail={<LoadoutIconRail />}>
      <Breadcrumb trail={["MULTIPLAYER", "SERVER BROWSER"]} className="mb-3" />
      <h1 className="font-heading text-4xl font-semibold uppercase tracking-tight text-neutral-50 lg:text-5xl">
        Server Info
      </h1>

      <p className="mt-9 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">Map Rotation</p>

      <div className="mt-4">
        <MapRotationGrid maps={mapRotation} />
      </div>
    </GamePanelShell>
  );
}
