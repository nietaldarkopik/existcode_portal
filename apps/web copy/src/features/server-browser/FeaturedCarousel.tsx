import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { FeaturedItem } from "./home-data";
import { fadeInUp, staggerContainer } from "./motionPresets";

function FeaturedCard({ item }: { item: FeaturedItem }) {
  if (item.kind === "video") {
    return (
      <motion.div
        variants={fadeInUp}
        whileHover={{ scale: 1.02, y: -3 }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="flex h-full cursor-pointer flex-col overflow-hidden shadow-lg shadow-black/0 hover:shadow-black/40"
        style={{ flexGrow: item.grow, flexBasis: 0, flexShrink: 0, minWidth: 170 }}
      >
        <div className={`relative flex flex-1 items-center justify-center overflow-hidden ${item.toneClass}`}>
          <motion.span
            whileHover={{ scale: 1.12 }}
            transition={{ duration: 0.2 }}
            className="flex size-11 items-center justify-center rounded-full bg-neutral-950/60 text-neutral-50"
          >
            <Play className="size-4" fill="currentColor" />
          </motion.span>
        </div>
        <div className="flex items-center gap-2 bg-neutral-100 px-3 py-2.5">
          <span className="flex size-5 shrink-0 items-center justify-center rounded-sm bg-danger-500 text-[9px] font-bold text-neutral-50">
            <Play className="size-2.5" fill="currentColor" />
          </span>
          <p className="truncate text-xs font-medium text-neutral-900">{item.title}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.02, y: -3 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className={`flex h-full cursor-pointer flex-col justify-end overflow-hidden p-4 shadow-lg shadow-black/0 hover:shadow-black/40 ${item.toneClass}`}
      style={{ flexGrow: item.grow, flexBasis: 0, flexShrink: 0, minWidth: 200 }}
    >
      <p className="text-sm font-semibold uppercase leading-tight tracking-tight text-neutral-50">{item.title}</p>
      <p className="mt-1 text-[11px] uppercase tracking-wide text-neutral-300">{item.subtitle}</p>
    </motion.div>
  );
}

export function FeaturedCarousel({ items }: { items: FeaturedItem[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="flex h-[168px] gap-3 overflow-x-auto"
    >
      {items.map((item, i) => (
        <FeaturedCard key={i} item={item} />
      ))}
    </motion.div>
  );
}
