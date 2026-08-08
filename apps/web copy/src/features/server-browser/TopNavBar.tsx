import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@existcode/ui";

export interface TopNavTab {
  label: string;
  to?: string;
}

export interface TopNavBarProps {
  tabs?: TopNavTab[];
  brand?: { label: string; icon?: ReactNode };
  endSlot?: ReactNode;
  // Rendered before the nav tabs, at the far left of the bar (e.g. a site logo).
  startSlot?: ReactNode;
  // Hides the right-side profile-style brand badge — used when startSlot
  // already carries the branding, to avoid showing it twice.
  hideBrand?: boolean;
}

const defaultTabs: TopNavTab[] = [
  { label: "Home" },
  { label: "Multiplayer" },
  { label: "Campaign" },
  { label: "Soldier" },
  { label: "Store" },
  { label: "More" }
];

export function TopNavBar({
  tabs = defaultTabs,
  brand = { label: "Battlefield 4" },
  endSlot,
  startSlot,
  hideBrand = false
}: TopNavBarProps) {
  return (
    <header className="relative z-20 flex h-14 items-center justify-between border-b border-r border-white/10 border-neutral-800/70 pl-[86px] pr-[64px]">
      <div className="flex items-center gap-6">
        {startSlot ? (
          <>
            {startSlot}
            <span className="h-5 w-px bg-neutral-800" />
          </>
        ) : null}
        <nav className="flex items-center gap-7">
          {tabs.map((tab, i) =>
            tab.to ? (
              <NavLink
                key={tab.label}
                to={tab.to}
                end={tab.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative pb-1 text-xs font-semibold uppercase tracking-[0.14em] transition-colors",
                    isActive ? "text-neutral-50" : "text-neutral-500 hover:text-neutral-300"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {tab.label}
                    {isActive ? (
                      <motion.span
                        layoutId="top-nav-underline"
                        className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-warning-400"
                      />
                    ) : null}
                  </>
                )}
              </NavLink>
            ) : (
              <span
                key={tab.label}
                className={cn(
                  "relative pb-1 text-xs font-semibold uppercase tracking-[0.14em] transition-colors",
                  i === 0 ? "text-neutral-50" : "cursor-default text-neutral-500 hover:text-neutral-300"
                )}
              >
                {tab.label}
                {i === 0 ? (
                  <motion.span
                    layoutId="top-nav-underline"
                    className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-warning-400"
                  />
                ) : null}
              </span>
            )
          )}
        </nav>
      </div>

      <div className="flex items-center gap-5">
        {endSlot}

        {!hideBrand ? (
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2 text-neutral-50"
          >
            <span className="relative flex size-7 items-center justify-center rounded-full bg-neutral-800">
              {brand.icon ?? <User className="size-3.5" />}
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-warning-400"
              />
            </span>
            <span className="font-heading text-sm font-semibold uppercase tracking-wide">{brand.label}</span>
          </motion.div>
        ) : null}
      </div>
    </header>
  );
}
