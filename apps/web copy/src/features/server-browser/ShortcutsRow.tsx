import { motion } from "framer-motion";
import { IdCard, LayoutGrid, Play, Settings, Star } from "lucide-react";

const icons = [LayoutGrid, Star, Play, IdCard, Settings];

export function ShortcutsRow() {
  return (
    <div className="flex items-center gap-2">
      {icons.map((Icon, i) => (
        <motion.button
          key={i}
          type="button"
          whileHover={{ scale: 1.1, rotate: -3 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex size-9 items-center justify-center bg-neutral-800/60 text-neutral-300 hover:bg-neutral-700 hover:text-neutral-50"
        >
          <Icon className="size-4" />
        </motion.button>
      ))}
    </div>
  );
}
