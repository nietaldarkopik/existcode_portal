import { Link, useLocation } from "react-router-dom";
import { LOCALES, type Locale } from "@existcode/i18n";
import { cn } from "@existcode/ui";
import { useLocale } from "../../../i18n";
import { switchLocalePath } from "../../../i18n/routes";

// Detail pages (article/service/news) know their entity's translated slug and
// can pass exact per-locale destinations here so switching language lands on
// the same item instead of falling back to its list page.
export function LocaleSwitcher({ overrides }: { overrides?: Partial<Record<Locale, string>> | undefined }) {
  const { locale } = useLocale();
  const location = useLocation();

  return (
    <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide">
      {LOCALES.map((target, i) => (
        <span key={target} className="flex items-center">
          {i > 0 ? <span className="mx-1 text-neutral-600">/</span> : null}
          <Link
            to={
              target === locale
                ? `${location.pathname}${location.search}`
                : overrides?.[target] ?? switchLocalePath(location.pathname, locale, target)
            }
            className={cn(
              "transition-colors",
              target === locale ? "text-neutral-50" : "text-neutral-500 hover:text-neutral-300"
            )}
          >
            {target.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
