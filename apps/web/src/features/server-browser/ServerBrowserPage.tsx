import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCw } from "lucide-react";
import { Breadcrumb, cn } from "@existcode/ui";
import { GamePanelShell } from "./GamePanelShell";
import { LoadoutIconRail } from "./LoadoutIconRail";
import { ServerTable } from "./ServerTable";
import { QuickFilterPanel } from "./QuickFilterPanel";
import { servers } from "./servers";

const tabs = ["Servers", "Favorites", "Recent"] as const;

export function ServerBrowserPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Servers");

  return (
    <GamePanelShell iconRail={<LoadoutIconRail />} backdropVariant="foggy">
      <Breadcrumb trail={["MULTIPLAYER"]} className="mb-3" />
      <h1 className="font-heading text-4xl font-semibold uppercase tracking-tight text-neutral-50 lg:text-5xl">
        Server Browser
      </h1>

      <div className="mt-8 flex items-center gap-6 border-b border-neutral-800 pb-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "relative pb-1 text-xs font-semibold uppercase tracking-[0.14em] transition-colors",
              tab === activeTab ? "text-neutral-50" : "text-neutral-500 hover:text-neutral-300"
            )}
          >
            {tab}
            {tab === activeTab ? (
              <motion.span
                layoutId="server-browser-tab-underline"
                className="absolute -bottom-[13px] left-0 right-0 h-0.5 bg-neutral-50"
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              />
            ) : null}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-10 xl:grid-cols-[1fr_280px]">
        <div>
          <div className="mb-2 flex items-center justify-end gap-2 text-[11px] font-medium uppercase tracking-wide text-neutral-500">
            Filter: Slots, Type
            <motion.span whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
              <RotateCw className="size-3.5" />
            </motion.span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeTab === "Servers" ? (
                <ServerTable servers={servers} />
              ) : (
                <p className="py-12 text-center text-sm text-neutral-500">No {activeTab.toLowerCase()} servers yet.</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <QuickFilterPanel />
      </div>
    </GamePanelShell>
  );
}
