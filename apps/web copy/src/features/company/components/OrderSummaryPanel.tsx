import type { PricingPlan } from "@existcode/types";
import { formatCurrency } from "../format";
import { useLocale } from "../../../i18n";

export function OrderSummaryPanel({ plan }: { plan: PricingPlan | undefined }) {
  const { t, locale } = useLocale();

  return (
    <div className="h-fit bg-neutral-900/50 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-200">{t.order.summaryTitle}</p>

      {plan ? (
        <div className="mt-4 flex flex-col gap-3">
          <div>
            <p className="text-sm font-medium text-neutral-50">{plan.name}</p>
            {plan.tagline ? <p className="mt-1 text-xs text-neutral-500">{plan.tagline}</p> : null}
          </div>
          <ul className="flex flex-col gap-1.5">
            {plan.features.slice(0, 4).map((feature, i) => (
              <li key={i} className="text-xs text-neutral-400">
                • {feature}
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center justify-between border-t border-neutral-800 pt-3">
            <span className="text-xs uppercase tracking-wide text-neutral-500">{t.order.total}</span>
            <span className="font-heading text-lg font-semibold text-neutral-50">
              {formatCurrency(plan.price_amount, plan.price_currency, locale, t.pricing.contactPrice)}
            </span>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm text-neutral-500">{t.order.summarySelectPrompt}</p>
      )}
    </div>
  );
}
