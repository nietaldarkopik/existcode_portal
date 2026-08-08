import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, FileText, Tag } from "lucide-react";
import type { BlogPost, PricingPlan, Service } from "@existcode/types";
import { formatCurrency, formatDate } from "../../format";
import { useLocale } from "../../../../i18n";

export function HomeCompactView({
  featuredServices,
  popularPlan,
  latestPosts
}: {
  featuredServices: Service[];
  popularPlan: PricingPlan | undefined;
  latestPosts: BlogPost[];
}) {
  const { t, path, locale } = useLocale();

  return (
    <div className="flex flex-col gap-8 py-8">
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-warning-400">{t.home.badge}</span>
        <h1 className="mt-2 max-w-xl font-heading text-2xl font-semibold text-neutral-50">{t.home.heroTitle}</h1>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col gap-1 border border-neutral-800 p-4">
          <Briefcase className="size-4 text-accent-400" />
          <span className="font-heading text-2xl font-semibold text-neutral-50">{featuredServices.length}</span>
          <span className="text-[11px] uppercase tracking-wide text-neutral-500">{t.home.featuredServices}</span>
        </div>
        <div className="flex flex-col gap-1 border border-neutral-800 p-4">
          <Tag className="size-4 text-accent-400" />
          <span className="font-heading text-2xl font-semibold text-neutral-50">
            {popularPlan ? formatCurrency(popularPlan.price_amount, popularPlan.price_currency, locale, "-") : "-"}
          </span>
          <span className="text-[11px] uppercase tracking-wide text-neutral-500">{t.home.popularPlan}</span>
        </div>
        <div className="flex flex-col gap-1 border border-neutral-800 p-4">
          <FileText className="size-4 text-accent-400" />
          <span className="font-heading text-2xl font-semibold text-neutral-50">{latestPosts.length}</span>
          <span className="text-[11px] uppercase tracking-wide text-neutral-500">{t.home.latestArticles}</span>
        </div>
      </div>

      {featuredServices.length > 0 ? (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">{t.home.featuredServices}</p>
            <Link to={path("services")} className="text-xs text-neutral-400 hover:text-neutral-100">
              {t.home.seeAll}
            </Link>
          </div>
          <ul className="divide-y divide-neutral-800 border-y border-neutral-800">
            {featuredServices.map((service) => (
              <li key={service.id}>
                <Link
                  to={path("serviceDetail", { slug: service.slug })}
                  className="flex items-center justify-between gap-3 py-3 text-sm text-neutral-200 hover:text-neutral-50"
                >
                  {service.name}
                  <ArrowRight className="size-3.5 shrink-0 text-neutral-600" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {latestPosts.length > 0 ? (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">{t.home.latestArticles}</p>
            <Link to={path("blog")} className="text-xs text-neutral-400 hover:text-neutral-100">
              {t.home.seeAll}
            </Link>
          </div>
          <ul className="divide-y divide-neutral-800 border-y border-neutral-800">
            {latestPosts.map((post) => (
              <li key={post.id}>
                <Link
                  to={path("blogDetail", { slug: post.slug })}
                  className="flex items-center justify-between gap-3 py-3 text-sm text-neutral-200 hover:text-neutral-50"
                >
                  <span className="line-clamp-1">{post.title}</span>
                  <span className="shrink-0 text-xs text-neutral-500">{formatDate(post.published_at, locale)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
