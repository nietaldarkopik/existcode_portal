import { HUDPanel, StatTile } from "@existcode/ui";
import { CompanyPageShell } from "../components/CompanyPageShell";
import { Seo } from "../../seo/Seo";
import { useStaticPageSeo } from "../../seo/useSiteSeo";
import { useLocale } from "../../../i18n";

export function AboutPage() {
  const { t } = useLocale();
  const seo = useStaticPageSeo("about", t.about.title, t.about.intro1);

  return (
    <CompanyPageShell>
      <Seo title={seo.title} description={seo.description} />
      <h1 className="font-heading text-4xl font-semibold uppercase tracking-tight text-neutral-50 lg:text-5xl">
        {t.about.title}
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-300">{t.about.intro1}</p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-300">{t.about.intro2}</p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatTile label={t.about.statProjects} value="50+" />
        <StatTile label={t.about.statClients} value="40+" />
        <StatTile label={t.about.statYears} value="5+" />
        <StatTile label={t.about.statTeam} value="15+" />
      </div>

      <div className="mt-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">{t.about.valuesTitle}</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <HUDPanel>
            <p className="font-heading text-base font-semibold text-neutral-50">{t.about.valueTransparentTitle}</p>
            <p className="mt-2 text-sm text-neutral-400">{t.about.valueTransparentBody}</p>
          </HUDPanel>
          <HUDPanel>
            <p className="font-heading text-base font-semibold text-neutral-50">{t.about.valueQualityTitle}</p>
            <p className="mt-2 text-sm text-neutral-400">{t.about.valueQualityBody}</p>
          </HUDPanel>
          <HUDPanel>
            <p className="font-heading text-base font-semibold text-neutral-50">{t.about.valueSustainableTitle}</p>
            <p className="mt-2 text-sm text-neutral-400">{t.about.valueSustainableBody}</p>
          </HUDPanel>
        </div>
      </div>
    </CompanyPageShell>
  );
}
