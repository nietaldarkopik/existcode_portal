import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { BlogPost, PricingPlan, Service } from "@existcode/types";
import { ServiceCard } from "../../components/ServiceCard";
import { PricingCard } from "../../components/PricingCard";
import { BlogCard } from "../../components/BlogCard";
import { useLocale } from "../../../../i18n";

export function HomeBentoView({
  featuredServices,
  popularPlan,
  latestPosts
}: {
  featuredServices: Service[];
  popularPlan: PricingPlan | undefined;
  latestPosts: BlogPost[];
}) {
  const { t, path } = useLocale();

  return (
    <div className="grid grid-cols-1 gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
      <div className="flex flex-col justify-center gap-4 bg-neutral-900 p-8 sm:col-span-2 lg:col-span-2 lg:row-span-2">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-warning-400">{t.home.badge}</span>
        <h1 className="font-heading text-3xl font-semibold uppercase tracking-tight text-neutral-50 lg:text-4xl">
          {t.home.heroTitle}
        </h1>
        <p className="text-sm text-neutral-400">{t.home.heroSubtitle}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            to={path("pricing")}
            className="flex h-10 items-center gap-2 bg-neutral-100 px-5 text-xs font-semibold uppercase tracking-wide text-neutral-900 hover:bg-white"
          >
            {t.home.ctaPricing} <ArrowRight className="size-4" />
          </Link>
          <Link
            to={path("services")}
            className="flex h-10 items-center border border-neutral-700 px-5 text-xs font-semibold uppercase tracking-wide text-neutral-300 hover:border-neutral-500 hover:text-neutral-50"
          >
            {t.home.ctaServices}
          </Link>
        </div>
      </div>

      {featuredServices.slice(0, 2).map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}

      {popularPlan ? (
        <div className="sm:col-span-2 lg:col-span-2">
          <PricingCard plan={popularPlan} />
        </div>
      ) : null}

      {latestPosts.slice(0, 3).map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}

      {featuredServices.length > 0 ? (
        <Link
          to={path("services")}
          className="flex flex-col items-start justify-center gap-2 border border-neutral-800 p-6 text-xs font-semibold uppercase tracking-wide text-neutral-300 hover:border-neutral-600 hover:text-neutral-50"
        >
          {t.home.seeAll}
          <ArrowRight className="size-4" />
        </Link>
      ) : null}
    </div>
  );
}
