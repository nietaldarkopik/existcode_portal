import type { Locale } from "@existcode/i18n";

const intlLocale: Record<Locale, string> = { id: "id-ID", en: "en-US" };

export function formatCurrency(
  amount: string | number | null,
  currency = "IDR",
  locale: Locale = "id",
  contactLabel = "Hubungi Kami"
): string {
  if (amount === null) return contactLabel;
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat(intlLocale[locale], { style: "currency", currency, maximumFractionDigits: 0 }).format(
    value
  );
}

export function formatDate(dateString: string | null, locale: Locale = "id"): string {
  if (!dateString) return "-";
  return new Intl.DateTimeFormat(intlLocale[locale], { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(dateString)
  );
}
