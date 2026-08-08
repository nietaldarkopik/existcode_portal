import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import type { PricingPlan } from "@existcode/types";
import { cn } from "@existcode/ui";
import { formatCurrency } from "../format";
import { fadeInUp } from "../../server-browser/motionPresets";
import { useLocale } from "../../../i18n";

export function PricingCard({ plan }: { plan: PricingPlan }) {
  const { t, path, locale } = useLocale();

  const billingLabel: Record<PricingPlan["billing_period"], string> = {
    one_time: t.pricing.oneTime,
    monthly: t.pricing.perMonth,
    yearly: t.pricing.perYear
  };

  const ctaTo = plan.is_custom ? path("contact") : `${path("order")}?plan=${plan.slug}`;

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.02, y: -3 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative flex h-full flex-col bg-neutral-900 p-6", plan.is_popular ? "ring-1 ring-warning-400" : "")}
    >
      {plan.is_popular ? (
        <span className="absolute -top-3 left-6 bg-warning-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-neutral-950">
          {t.pricing.mostPopular}
        </span>
      ) : null}

      <h3 className="font-heading text-lg font-semibold text-neutral-50">{plan.name}</h3>
      {plan.tagline ? <p className="mt-1 text-sm text-neutral-400">{plan.tagline}</p> : null}

      <div className="mt-4">
        <span className="font-heading text-3xl font-semibold text-neutral-50">
          {formatCurrency(plan.price_amount, plan.price_currency, locale, t.pricing.contactPrice)}
        </span>
        {plan.price_amount ? (
          <span className="ml-1 text-sm text-neutral-500">{billingLabel[plan.billing_period]}</span>
        ) : null}
      </div>

      <ul className="mt-6 flex flex-1 flex-col gap-2.5">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
            <Check className="mt-0.5 size-4 shrink-0 text-success-400" />
            {feature}
          </li>
        ))}
      </ul>

      <Link
        to={ctaTo}
        className={cn(
          "mt-6 flex h-10 items-center justify-center text-xs font-semibold uppercase tracking-wide transition-colors",
          plan.is_popular
            ? "bg-neutral-100 text-neutral-900 hover:bg-white"
            : "border border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-neutral-50"
        )}
      >
        {plan.is_custom ? t.pricing.contactUs : t.pricing.choosePlan}
      </Link>
    </motion.div>
  );
}
