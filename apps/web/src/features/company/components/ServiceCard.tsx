import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Service } from "@existcode/types";
import { accentTone } from "../accentTones";
import { resolveIcon } from "../iconMap";
import { fadeInUp } from "../../server-browser/motionPresets";
import { useLocale } from "../../../i18n";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = resolveIcon(service.icon_key);
  const { path } = useLocale();

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.02, y: -3 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Link
        to={path("serviceDetail", { slug: service.slug })}
        className="flex h-full flex-col overflow-hidden bg-neutral-900 shadow-lg shadow-black/0 transition-shadow hover:shadow-black/40"
      >
        <div className={`flex h-28 items-center justify-center ${accentTone(service.accent)}`}>
          <Icon className="size-9 text-neutral-50" />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
            {service.category}
          </span>
          <h3 className="font-heading text-lg font-semibold text-neutral-50">{service.name}</h3>
          <p className="text-sm text-neutral-400">{service.summary}</p>
        </div>
      </Link>
    </motion.div>
  );
}
