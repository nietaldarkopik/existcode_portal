import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Alert, Badge, Breadcrumb, Skeleton, Textarea } from "@existcode/ui";
import { CompanyPageShell } from "../components/CompanyPageShell";
import { PaymentInstructionsPanel } from "../components/PaymentInstructionsPanel";
import { useOrder } from "../hooks/useOrder";
import { useConfirmPayment } from "../hooks/useInvoice";
import { formatCurrency, formatDate } from "../format";
import { useLocale } from "../../../i18n";

export function PaymentPage() {
  const { t, path, locale } = useLocale();
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const { data, isLoading, isError } = useOrder(orderNumber);
  const order = data?.data;
  const invoice = order?.invoice;

  const [note, setNote] = useState("");
  const confirmPayment = useConfirmPayment(invoice?.invoice_number);

  if (isLoading) {
    return (
      <CompanyPageShell>
        <Skeleton className="h-8 w-72 rounded-none" />
        <Skeleton className="mt-4 h-64 w-full rounded-none" />
      </CompanyPageShell>
    );
  }

  if (isError || !order || !invoice) {
    return (
      <CompanyPageShell>
        <Alert variant="danger" title={t.payment.notFoundTitle}>
          {t.order.errorFallback}
        </Alert>
        <Link to={path("orderLookup")} className="mt-4 inline-block text-sm text-neutral-300 underline">
          {t.payment.trackOther}
        </Link>
      </CompanyPageShell>
    );
  }

  const isPaid = invoice.status === "paid";

  return (
    <CompanyPageShell>
      <Breadcrumb trail={[t.order.title.toUpperCase()]} className="mb-3" />
      <h1 className="font-heading text-4xl font-semibold uppercase tracking-tight text-neutral-50 lg:text-5xl">
        {t.payment.title}
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-6">
          <div className="bg-neutral-900 p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                {t.payment.orderNumber}
              </p>
              <Badge variant={isPaid ? "success" : "warning"} className="rounded-none">
                {isPaid ? t.payment.statusPaid : t.payment.statusUnpaid}
              </Badge>
            </div>
            <p className="mt-1 font-heading text-lg font-semibold text-neutral-50">{order.order_number}</p>

            <div className="mt-4 flex flex-col gap-2 border-t border-neutral-800 pt-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <span className="text-neutral-300">{item.item_name}</span>
                  <span className="text-neutral-400">
                    {formatCurrency(item.unit_price, order.currency, locale, t.pricing.contactPrice)}
                  </span>
                </div>
              ))}
              <div className="mt-2 flex items-center justify-between border-t border-neutral-800 pt-3">
                <span className="text-xs uppercase tracking-wide text-neutral-500">{t.payment.totalDue}</span>
                <span className="font-heading text-xl font-semibold text-neutral-50">
                  {formatCurrency(invoice.amount_due, invoice.currency, locale, t.pricing.contactPrice)}
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                {t.payment.dueDate}: {formatDate(invoice.due_at, locale)}
              </p>
            </div>
          </div>

          {invoice.payment_instructions ? (
            <PaymentInstructionsPanel instructions={invoice.payment_instructions} />
          ) : null}
        </div>

        <div className="h-fit bg-neutral-900/50 p-5">
          {isPaid ? (
            <>
              <Alert variant="success" title={t.payment.confirmedTitle}>
                {t.payment.confirmedMessage}
              </Alert>
              <Link
                to={path("home")}
                className="mt-4 flex h-10 w-full items-center justify-center bg-neutral-100 text-xs font-semibold uppercase tracking-wide text-neutral-900 hover:bg-white"
              >
                {t.payment.backHome}
              </Link>
            </>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-200">
                {t.payment.confirmTitle}
              </p>
              <p className="mt-2 text-xs text-neutral-500">{t.payment.confirmHint}</p>

              {confirmPayment.isError ? (
                <Alert variant="danger" className="mt-3">
                  {t.payment.confirmError}
                </Alert>
              ) : null}

              <Textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={t.payment.confirmNotePlaceholder}
                className="mt-3 rounded-none"
              />

              <motion.button
                type="button"
                onClick={() => confirmPayment.mutate(note ? { confirmation_note: note } : {})}
                disabled={confirmPayment.isPending}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="mt-3 h-10 w-full bg-neutral-100 text-xs font-semibold uppercase tracking-wide text-neutral-900 hover:bg-white disabled:opacity-50"
              >
                {confirmPayment.isPending ? t.payment.confirming : t.payment.confirmButton}
              </motion.button>
            </>
          )}
        </div>
      </div>
    </CompanyPageShell>
  );
}
