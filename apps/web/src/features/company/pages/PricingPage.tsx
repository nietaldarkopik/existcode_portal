import { motion } from "framer-motion";
import { Skeleton } from "@existcode/ui";
import { CompanyPageShell } from "../components/CompanyPageShell";
import { PricingCard } from "../components/PricingCard";
import { usePricingPlans } from "../hooks/usePricingPlans";
import { staggerContainer } from "../../server-browser/motionPresets";
import { Seo } from "../../seo/Seo";
import { useStaticPageSeo } from "../../seo/useSiteSeo";
import { useLocale } from "../../../i18n";

export function PricingPage() {
  const { t } = useLocale();
  const { data, isLoading, isError } = usePricingPlans();
  const seo = useStaticPageSeo("pricing", t.pricing.title, t.pricing.subtitle);

  return (
    <CompanyPageShell>
      <Seo title={seo.title} description={seo.description} />
      <h1 className="font-heading text-4xl font-semibold uppercase tracking-tight text-neutral-50 lg:text-5xl">
        {t.pricing.title}
      </h1>
      <p className="mt-3 max-w-xl text-sm text-neutral-400">{t.pricing.subtitle}</p>

      <div className="mt-8">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-96 rounded-none" />
            ))}
          </div>
        ) : isError ? (
          <p className="text-sm text-danger-400">{t.pricing.loadError}</p>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {data?.data.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </motion.div>
        )}
      </div>
    </CompanyPageShell>
  );
}
