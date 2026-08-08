import { Link, useParams } from "react-router-dom";
import { Breadcrumb, Skeleton } from "@existcode/ui";
import { CompanyPageShell } from "../components/CompanyPageShell";
import { PricingCard } from "../components/PricingCard";
import { useService } from "../hooks/useServices";
import { usePricingPlans } from "../hooks/usePricingPlans";
import { accentTone } from "../accentTones";
import { resolveIcon } from "../iconMap";
import { Seo } from "../../seo/Seo";
import { useLocale } from "../../../i18n";
import { localeLinksFromSlugs } from "../../../i18n/routes";

export function ServiceDetailPage() {
  const { t, path } = useLocale();
  const { slug } = useParams<{ slug: string }>();
  const { data: serviceRes, isLoading, isError } = useService(slug);
  const { data: plansRes } = usePricingPlans();

  const service = serviceRes?.data;
  const localeLinks = localeLinksFromSlugs("serviceDetail", service?.slugs);
  const Icon = resolveIcon(service?.icon_key);
  const relatedPlans = plansRes?.data.filter((plan) => plan.service?.slug === slug) ?? [];

  if (isLoading) {
    return (
      <CompanyPageShell>
        <Skeleton className="h-10 w-64 rounded-none" />
        <Skeleton className="mt-4 h-40 w-full rounded-none" />
      </CompanyPageShell>
    );
  }

  if (isError || !service) {
    return (
      <CompanyPageShell>
        <p className="text-sm text-danger-400">{t.services.notFound}</p>
        <Link to={path("services")} className="mt-2 inline-block text-sm text-neutral-300 underline">
          {t.services.backToList}
        </Link>
      </CompanyPageShell>
    );
  }

  return (
    <CompanyPageShell localeLinks={localeLinks}>
      <Seo
        title={service.seo?.title ?? service.name}
        description={service.seo?.description ?? service.summary}
        keywords={service.seo?.keywords}
        image={service.seo?.og_image}
      />
      <Breadcrumb trail={[t.nav.services.toUpperCase()]} className="mb-3" />
      <div className={`flex h-40 items-center justify-center ${accentTone(service.accent)}`}>
        <Icon className="size-14 text-neutral-50" />
      </div>

      <h1 className="mt-6 font-heading text-3xl font-semibold text-neutral-50 lg:text-4xl">{service.name}</h1>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">{service.category}</p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-300">{service.description}</p>

      <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {service.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 bg-neutral-900 p-3 text-sm text-neutral-300">
            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-warning-400" />
            {feature}
          </li>
        ))}
      </ul>

      {relatedPlans.length > 0 ? (
        <div className="mt-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
            {t.services.relatedPlans}
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPlans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      ) : (
        <Link
          to={path("contact")}
          className="mt-10 inline-flex h-10 items-center justify-center bg-neutral-100 px-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 hover:bg-white"
        >
          {t.services.noPlansCta}
        </Link>
      )}
    </CompanyPageShell>
  );
}
