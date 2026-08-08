import { motion } from "framer-motion";
import type { MapRotationEntry } from "./data";
import { fadeInUp, hoverLift, staggerContainer } from "./motionPresets";

function MapCard({ mode, name, toneClass }: MapRotationEntry) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={hoverLift.whileHover}
      whileTap={hoverLift.whileTap}
      transition={hoverLift.transition}
      className="flex aspect-[16/8.8] cursor-pointer flex-col overflow-hidden bg-neutral-900 shadow-lg shadow-black/0 transition-shadow duration-200 hover:shadow-black/40"
    >
      <motion.div whileHover={{ scale: 1.06 }} transition={{ duration: 0.3 }} className={toneClass + " flex-[3]"} />
      <div className="flex flex-[2] flex-col justify-center gap-1 px-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-400">{mode}</span>
        <span className="font-heading text-lg font-semibold uppercase leading-tight tracking-tight text-neutral-50">
          {name}
        </span>
      </div>
    </motion.div>
  );
}

export function MapRotationGrid({ maps }: { maps: MapRotationEntry[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-4"
    >
      {maps.map((entry, i) => (
        <MapCard key={i} {...entry} />
      ))}
    </motion.div>
  );
}
