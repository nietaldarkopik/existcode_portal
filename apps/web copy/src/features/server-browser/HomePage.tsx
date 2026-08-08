import { GamePanelShell } from "./GamePanelShell";
import { HomeIconRail } from "./HomeIconRail";
import { FeaturedCarousel } from "./FeaturedCarousel";
import { ShortcutsRow } from "./ShortcutsRow";
import { RecentlyPlayedRow } from "./RecentlyPlayedRow";
import { featuredItems, recentServers } from "./home-data";

export function HomePage() {
  return (
    <GamePanelShell iconRail={<HomeIconRail />} showTopNav>
      <p className="text-sm text-neutral-300">Good afternoon, cookie.</p>

      <div className="mt-4">
        <FeaturedCarousel items={featuredItems} />
      </div>

      <div className="mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">Shortcuts</p>
        <ShortcutsRow />
      </div>

      <div className="mt-7">
        <RecentlyPlayedRow servers={recentServers} />
      </div>
    </GamePanelShell>
  );
}
