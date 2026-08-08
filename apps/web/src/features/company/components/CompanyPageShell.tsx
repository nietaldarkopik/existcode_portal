import type { ReactNode } from "react";
import type { Locale } from "@existcode/i18n";
import { useTheme } from "@existcode/ui";
import { GamePanelShell } from "../../server-browser/GamePanelShell";
import type { TopNavTab } from "../../server-browser/TopNavBar";
import { useLocale } from "../../../i18n";
import { CompanyContactRail } from "./CompanyContactRail";
import { CompanyIconRail } from "./CompanyIconRail";
import { CompanySidebarNav } from "./CompanySidebarNav";
import { CompanyFooter } from "./CompanyFooter";
import { CompanyLogo } from "./CompanyLogo";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeSwitcher } from "../../theme/ThemeSwitcher";

export function CompanyPageShell({
  children,
  localeLinks
}: {
  children: ReactNode;
  // Exact per-locale destinations for the current entity, so a detail page
  // can make the language switcher land on the same item (see LocaleSwitcher).
  localeLinks?: Partial<Record<Locale, string>> | undefined;
}) {
  const { t, path } = useLocale();
  const { layout } = useTheme();
  const isSidebar = layout === "sidebar";

  const companyTabs: TopNavTab[] = [
    { label: t.nav.home, to: path("home") },
    { label: t.nav.services, to: path("services") },
    { label: t.nav.pricing, to: path("pricing") },
    { label: t.nav.blog, to: path("blog") },
    { label: t.nav.news, to: path("news") },
    { label: t.nav.contact, to: path("contact") }
  ];

  return (
    <GamePanelShell
      iconRail={isSidebar ? <CompanySidebarNav /> : <CompanyIconRail />}
      rightRail={<CompanyContactRail />}
      showTopNav={!isSidebar}
      mainClassName={isSidebar ? "ml-[240px] mr-[64px]" : undefined}
      topNavProps={{
        tabs: companyTabs,
        startSlot: <CompanyLogo />,
        hideBrand: true,
        endSlot: <LocaleSwitcher overrides={localeLinks} />
      }}
    >
      {children}
      <CompanyFooter />
      <ThemeSwitcher />
    </GamePanelShell>
  );
}
