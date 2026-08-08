import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const filterRows = ["Game Modes", "Maps", "Free Slots", "Game Size"];

export function QuickFilterPanel() {
  return (
    <div className="bg-neutral-900/50 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-200">Quickfilter</p>

      <div className="mt-3">
        {filterRows.map((label) => (
          <motion.button
            key={label}
            type="button"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="group flex w-full items-center justify-between border-b border-neutral-800/70 py-3 text-xs font-medium uppercase tracking-wide text-neutral-400 last:border-b-0 hover:text-neutral-200"
          >
            {label}
            <motion.span whileHover={{ y: 2 }} transition={{ duration: 0.15 }}>
              <ChevronDown className="size-3.5" />
            </motion.span>
          </motion.button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Filter by name..."
        className="mt-4 h-10 w-full border border-neutral-700 bg-neutral-900/70 px-3 text-sm text-neutral-50 placeholder:text-neutral-500 transition-colors duration-150 focus:border-neutral-400 focus:outline-none"
      />

      <div className="mt-4 flex flex-col gap-2">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="h-10 bg-neutral-100 text-xs font-semibold uppercase tracking-wide text-neutral-900 hover:bg-white"
        >
          Full Filter
        </motion.button>
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="h-10 border border-neutral-700 text-xs font-semibold uppercase tracking-wide text-neutral-300 hover:border-neutral-500 hover:text-neutral-50"
        >
          Reset Filter
        </motion.button>
      </div>
    </div>
  );
}
