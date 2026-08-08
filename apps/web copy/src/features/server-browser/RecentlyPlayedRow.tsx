import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import type { RecentServerItem } from "./home-data";
import { fadeInUp, staggerContainer } from "./motionPresets";

function RecentServerCard({ server }: { server: RecentServerItem }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="flex cursor-pointer flex-col shadow-lg shadow-black/0 hover:shadow-black/40"
    >
      <div className={`relative h-24 overflow-hidden ${server.toneClass}`}>
        <span className="absolute left-2 top-2 bg-neutral-950/70 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-neutral-200">
          Recent Server
        </span>
      </div>
      <div className="flex items-start justify-between gap-2 bg-neutral-900 px-3 py-2.5">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-neutral-50">{server.name}</p>
          <p className="mt-0.5 truncate text-xs text-neutral-500">{server.map}</p>
        </div>
        <button type="button" aria-label="More options" className="shrink-0 text-neutral-500 hover:text-neutral-200">
          <MoreHorizontal className="size-4" />
        </button>
      </div>
    </motion.div>
  );
}

export function RecentlyPlayedRow({ servers }: { servers: RecentServerItem[] }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">Recently Played</p>
        <button type="button" className="text-xs font-medium uppercase tracking-wide text-neutral-400 hover:text-neutral-100">
          See All
        </button>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
      >
        {servers.map((server) => (
          <RecentServerCard key={server.id} server={server} />
        ))}
      </motion.div>
    </div>
  );
}
