import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Alert, Input, Select, Textarea } from "@existcode/ui";
import { CompanyPageShell } from "../components/CompanyPageShell";
import { OrderSummaryPanel } from "../components/OrderSummaryPanel";
import { usePricingPlans } from "../hooks/usePricingPlans";
import { useCreateOrder } from "../hooks/useOrder";
import { useLocale } from "../../../i18n";

export function OrderPage() {
  const { t, path } = useLocale();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedSlug = searchParams.get("plan") ?? undefined;

  const { data: plansRes } = usePricingPlans();
  const orderablePlans = plansRes?.data.filter((plan) => !plan.is_custom) ?? [];
  const selectedPlan = orderablePlans.find((plan) => plan.slug === selectedSlug);

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_company: "",
    notes: ""
  });
  const createOrder = useCreateOrder();

  function handleChange(field: keyof typeof form) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!selectedPlan) return;

    createOrder.mutate(
      {
        pricing_plan_id: selectedPlan.id,
        customer_name: form.customer_name,
        customer_email: form.customer_email,
        customer_phone: form.customer_phone,
        ...(form.customer_company ? { customer_company: form.customer_company } : {}),
        ...(form.notes ? { notes: form.notes } : {})
      },
      {
        onSuccess: (result) => {
          navigate(path("payment", { orderNumber: result.data.order_number }));
        }
      }
    );
  }

  return (
    <CompanyPageShell>
      <h1 className="font-heading text-4xl font-semibold uppercase tracking-tight text-neutral-50 lg:text-5xl">
        {t.order.title}
      </h1>
      <p className="mt-3 max-w-xl text-sm text-neutral-400">{t.order.subtitle}</p>

      <div className="mt-8 grid grid-cols-1 gap-10 xl:grid-cols-[1fr_320px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {createOrder.isError ? (
            <Alert variant="danger" title={t.order.errorTitle}>
              {createOrder.error instanceof Error ? createOrder.error.message : t.order.errorFallback}
            </Alert>
          ) : null}

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-400">
              {t.order.plan}
            </label>
            <Select
              placeholder={t.order.selectPlan}
              {...(selectedSlug ? { value: selectedSlug } : {})}
              onValueChange={(value) => setSearchParams({ plan: value })}
              options={orderablePlans.map((plan) => ({ value: plan.slug, label: plan.name }))}
              className="rounded-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-400">
              {t.order.fullName}
            </label>
            <Input
              required
              value={form.customer_name}
              onChange={handleChange("customer_name")}
              className="rounded-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-400">
              {t.order.email}
            </label>
            <Input
              required
              type="email"
              value={form.customer_email}
              onChange={handleChange("customer_email")}
              className="rounded-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-400">
              {t.order.whatsapp}
            </label>
            <Input
              required
              value={form.customer_phone}
              onChange={handleChange("customer_phone")}
              className="rounded-none"
              placeholder="08xxxxxxxxxx"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-400">
              {t.order.companyOptional}
            </label>
            <Input value={form.customer_company} onChange={handleChange("customer_company")} className="rounded-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-400">
              {t.order.notesOptional}
            </label>
            <Textarea
              rows={4}
              value={form.notes}
              onChange={handleChange("notes")}
              className="rounded-none"
              placeholder={t.order.notesPlaceholder}
            />
          </div>

          <motion.button
            type="submit"
            disabled={!selectedPlan || createOrder.isPending}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="mt-2 h-11 bg-neutral-100 text-xs font-semibold uppercase tracking-wide text-neutral-900 hover:bg-white disabled:opacity-50"
          >
            {createOrder.isPending ? t.order.processing : t.order.submit}
          </motion.button>
        </form>

        <OrderSummaryPanel plan={selectedPlan} />
      </div>
    </CompanyPageShell>
  );
}
