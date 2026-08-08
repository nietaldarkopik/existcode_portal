import { Briefcase, HelpCircle, LayoutDashboard, BookOpen, Newspaper, SearchCheck, Tag } from "lucide-react";
import { useLocation } from "react-router-dom";
import { IconRailShell } from "../../server-browser/IconRailShell";
import { RailIconButton } from "../../server-browser/RailIconButton";
import { useLocale } from "../../../i18n";

// Reused across every company page (unlike the game-menu rails, which are
// hardcoded per single page) — active state is derived from the URL.
export function CompanyIconRail() {
  const { pathname } = useLocation();
  const { t, path } = useLocale();

  const servicesPath = path("services");
  const pricingPath = path("pricing");
  const blogPath = path("blog");
  const newsPath = path("news");
  const orderPath = path("order");
  const contactPath = path("contact");

  return (
    <IconRailShell
      topGroup={
        <>
          <RailIconButton
            icon={<LayoutDashboard className="size-5" />}
            label={t.rail.overview}
            ariaLabel={t.rail.overview}
            to={path("home")}
            active={pathname === path("home")}
            size={40}
            className="text-neutral-300"
          />
          <RailIconButton
            icon={<Briefcase className="size-5" />}
            label={t.rail.services}
            ariaLabel={t.rail.services}
            to={servicesPath}
            active={pathname.startsWith(servicesPath)}
            size={40}
            className="text-neutral-300"
          />
          <RailIconButton
            icon={<Tag className="size-5" />}
            label={t.rail.pricing}
            ariaLabel={t.rail.pricing}
            to={pricingPath}
            active={pathname.startsWith(pricingPath)}
            size={40}
            className="text-neutral-300"
          />
        </>
      }
      midGroup={
        <>
          <RailIconButton
            icon={<BookOpen className="size-5" />}
            label={t.rail.blog}
            ariaLabel={t.rail.blog}
            to={blogPath}
            active={pathname.startsWith(blogPath)}
            size={24}
            className="text-neutral-300"
          />
          <RailIconButton
            icon={<Newspaper className="size-5" />}
            label={t.rail.news}
            ariaLabel={t.rail.news}
            to={newsPath}
            active={pathname.startsWith(newsPath)}
            size={24}
            className="text-neutral-300"
          />
        </>
      }
      bottomGroup={
        <>
          <RailIconButton
            icon={<SearchCheck className="size-5" />}
            label={t.rail.trackOrder}
            ariaLabel={t.rail.trackOrder}
            to={path("orderLookup")}
            active={pathname.startsWith(orderPath)}
            size={24}
            className="text-neutral-400"
          />
          <RailIconButton
            icon={<HelpCircle className="size-5" />}
            label={t.rail.contact}
            ariaLabel={t.rail.contact}
            to={contactPath}
            active={pathname.startsWith(contactPath)}
            size={24}
            className="text-neutral-400"
          />
        </>
      }
    />
  );
}
