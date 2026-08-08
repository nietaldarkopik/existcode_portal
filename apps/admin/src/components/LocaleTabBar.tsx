import { cn } from "@existcode/ui";

export const ADMIN_LOCALES = ["id", "en"] as const;
export type AdminLocale = (typeof ADMIN_LOCALES)[number];

const localeLabel: Record<AdminLocale, string> = { id: "Indonesia", en: "English" };

export function LocaleTabBar({ locale, onChange }: { locale: AdminLocale; onChange: (locale: AdminLocale) => void }) {
  return (
    <div className="flex gap-1 border-b border-neutral-800">
      {ADMIN_LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onChange(l)}
          className={cn(
            "px-3 py-2 text-xs font-semibold uppercase tracking-wide transition-colors",
            locale === l
              ? "border-b-2 border-accent-500 text-neutral-50"
              : "text-neutral-500 hover:text-neutral-300"
          )}
        >
          {l.toUpperCase()} · {localeLabel[l]}
        </button>
      ))}
    </div>
  );
}
