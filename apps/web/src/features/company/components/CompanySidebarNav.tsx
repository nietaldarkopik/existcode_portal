import { NavLink, useLocation } from "react-router-dom";
import { Briefcase, BookOpen, HelpCircle, LayoutDashboard, Newspaper, SearchCheck, Tag } from "lucide-react";
import { cn } from "@existcode/ui";
import { useLocale } from "../../../i18n";
import { CompanyLogo } from "./CompanyLogo";
import { LocaleSwitcher } from "./LocaleSwitcher";

// "sidebar" layout mode's nav panel — a wider, labeled alternative to
// CompanyIconRail, used in place of the top nav bar (see CompanyPageShell).
export function CompanySidebarNav() {
  const { t, path } = useLocale();
  const { pathname } = useLocation();

  const items = [
    { icon: LayoutDashboard, label: t.rail.overview, to: path("home") },
    { icon: Briefcase, label: t.rail.services, to: path("services") },
    { icon: Tag, label: t.rail.pricing, to: path("pricing") },
    { icon: BookOpen, label: t.rail.blog, to: path("blog") },
    { icon: Newspaper, label: t.rail.news, to: path("news") },
    { icon: SearchCheck, label: t.rail.trackOrder, to: path("orderLookup") },
    { icon: HelpCircle, label: t.rail.contact, to: path("contact") }
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-[240px] flex-col gap-8 border-r border-neutral-800/70 bg-neutral-950/95 px-5 py-8 backdrop-blur-xl">
      <CompanyLogo />

      <nav className="flex flex-1 flex-col gap-1">
        {items.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={label}
            to={to}
            end={to === path("home")}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wide transition-colors",
                isActive || pathname.startsWith(to)
                  ? "bg-accent-500/15 text-accent-300"
                  : "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-100"
              )
            }
          >
            <Icon className="size-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <LocaleSwitcher />
    </aside>
  );
}
