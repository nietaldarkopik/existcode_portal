export function formatCurrency(amount: string | number | null, currency = "IDR"): string {
  if (amount === null) return "-";
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("id-ID", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return "-";
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" }).format(
    new Date(dateString)
  );
}
