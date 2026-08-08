import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PingIndicator } from "./PingIndicator";
import type { ServerEntry } from "./servers";
import { fadeInUp, staggerContainer } from "./motionPresets";

export function ServerTable({ servers }: { servers: ServerEntry[] }) {
  return (
    <div>
      <div className="grid grid-cols-[1fr_100px_90px] gap-4 border-b border-neutral-800 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
        <span>Name</span>
        <span className="text-right">Players</span>
        <span className="text-right">Ping</span>
      </div>

      <motion.ul variants={staggerContainer} initial="hidden" animate="show">
        {servers.map((server) => (
          <motion.li key={server.id} variants={fadeInUp} className="border-b border-neutral-800/60">
            <Link to={`/server-browser/${server.id}`} className="group block">
              <motion.div
                whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.04)" }}
                transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-[1fr_100px_90px] items-center gap-4 py-2.5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.2 }}
                    className={`h-9 w-[52px] shrink-0 rounded-[2px] ${server.toneClass}`}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-neutral-50">{server.name}</p>
                    <p className="mt-0.5 truncate text-[11px] uppercase tracking-wide text-neutral-500">
                      <span className="mr-1.5">{server.flag}</span>
                      {server.mode} · {server.map} · {server.ruleset} · {server.tickrate}
                    </p>
                  </div>
                </div>

                <span className="text-right text-sm tabular-nums text-neutral-200">
                  {server.players}/{server.slots}
                </span>

                <div className="flex justify-end">
                  <PingIndicator ping={server.ping} />
                </div>
              </motion.div>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
