import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Alert, Input, Select, Textarea } from "@existcode/ui";
import { createAdminPricingPlan, getAdminPricingPlan, getAdminServices, updateAdminPricingPlan } from "@existcode/api-client";
import type { AdminPricingPlanPayload, BillingPeriod } from "@existcode/types";
import { apiClient } from "../../app/apiClient";
import { Field } from "../../components/Field";
import { LocaleTabBar, type AdminLocale } from "../../components/LocaleTabBar";
import { SeoFieldsSection } from "../../components/SeoFieldsSection";

const billingOptions: { value: BillingPeriod; label: string }[] = [
  { value: "one_time", label: "Sekali Bayar" },
  { value: "monthly", label: "Bulanan" },
  { value: "yearly", label: "Tahunan" }
];

const emptyForm: AdminPricingPlanPayload = {
  service_id: null,
  name: { id: "", en: "" },
  slug: { id: "", en: "" },
  tagline: { id: "", en: "" },
  price_amount: null,
  price_currency: "IDR",
  billing_period: "one_time",
  features: { id: [], en: [] },
  is_popular: false,
  is_custom: false,
  sort_order: 0,
  status: "draft",
  seo: {}
};

export function PricingFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = id !== undefined && id !== "baru";
  const planId = isEdit ? Number(id) : undefined;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: servicesRes } = useQuery({ queryKey: ["admin", "services", "all"], queryFn: () => getAdminServices(apiClient) });
  const { data } = useQuery({
    queryKey: ["admin", "pricing-plan", planId],
    queryFn: () => getAdminPricingPlan(apiClient, planId as number),
    enabled: isEdit
  });

  const [locale, setLocale] = useState<AdminLocale>("id");
  const [form, setForm] = useState<AdminPricingPlanPayload>(emptyForm);
  const [featuresText, setFeaturesText] = useState({ id: "", en: "" });
  const [isCustomPrice, setIsCustomPrice] = useState(false);

  useEffect(() => {
    if (data?.data) {
      const plan = data.data;
      setForm({
        service_id: plan.service?.id ?? null,
        name: plan.name,
        slug: plan.slug,
        tagline: plan.tagline,
        price_amount: plan.price_amount ? Number(plan.price_amount) : null,
        price_currency: plan.price_currency,
        billing_period: plan.billing_period,
        features: plan.features,
        is_popular: plan.is_popular,
        is_custom: plan.is_custom,
        sort_order: plan.sort_order ?? 0,
        status: plan.status ?? "draft",
        seo: {
          title: plan.seo?.title ?? { id: "", en: "" },
          description: plan.seo?.description ?? { id: "", en: "" },
          keywords: plan.seo?.keywords ?? "",
          og_image: plan.seo?.og_image ?? ""
        }
      });
      setFeaturesText({ id: plan.features.id.join("\n"), en: plan.features.en.join("\n") });
      setIsCustomPrice(plan.is_custom);
    }
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: (payload: AdminPricingPlanPayload) =>
      isEdit ? updateAdminPricingPlan(apiClient, planId as number, payload) : createAdminPricingPlan(apiClient, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "pricing-plans"] });
      navigate("/harga");
    }
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    saveMutation.mutate({
      ...form,
      price_amount: isCustomPrice ? null : form.price_amount,
      is_custom: isCustomPrice,
      features: {
        id: featuresText.id.split("\n").map((f) => f.trim()).filter(Boolean),
        en: featuresText.en.split("\n").map((f) => f.trim()).filter(Boolean)
      }
    });
  }

  const serviceOptions = [
    { value: "", label: "Tidak terkait jasa tertentu" },
    ...(servicesRes?.data.map((service) => ({ value: String(service.id), label: service.name.id })) ?? [])
  ];

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl font-semibold text-neutral-50">{isEdit ? "Edit Paket" : "Tambah Paket"}</h1>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        {saveMutation.isError ? <Alert variant="danger">Gagal menyimpan. Periksa kembali data Anda.</Alert> : null}

        <LocaleTabBar locale={locale} onChange={setLocale} />

        <Field label={`Nama Paket (${locale.toUpperCase()})`}>
          <Input
            required
            value={form.name[locale]}
            onChange={(e) => setForm({ ...form, name: { ...form.name, [locale]: e.target.value } })}
          />
        </Field>
        <Field label={`Slug (${locale.toUpperCase()})`}>
          <Input
            required
            value={form.slug[locale]}
            onChange={(e) => setForm({ ...form, slug: { ...form.slug, [locale]: e.target.value } })}
          />
        </Field>
        <Field label={`Tagline (${locale.toUpperCase()})`}>
          <Input
            value={form.tagline?.[locale] ?? ""}
            onChange={(e) =>
              setForm({ ...form, tagline: { id: form.tagline?.id ?? "", en: form.tagline?.en ?? "", [locale]: e.target.value } })
            }
          />
        </Field>
        <Field label={`Fitur (${locale.toUpperCase()}, satu per baris)`}>
          <Textarea
            rows={4}
            value={featuresText[locale]}
            onChange={(e) => setFeaturesText({ ...featuresText, [locale]: e.target.value })}
          />
        </Field>

        <Field label="Jasa Terkait (opsional)">
          <Select
            value={form.service_id ? String(form.service_id) : ""}
            onValueChange={(value) => setForm({ ...form, service_id: value ? Number(value) : null })}
            options={serviceOptions}
          />
        </Field>

        <label className="flex items-center gap-2 text-sm text-neutral-300">
          <input type="checkbox" checked={isCustomPrice} onChange={(e) => setIsCustomPrice(e.target.checked)} />
          Harga custom (tampilkan "Hubungi Kami", CTA ke Kontak)
        </label>

        {!isCustomPrice ? (
          <Field label="Harga (Rp)">
            <Input
              type="number"
              min={0}
              value={form.price_amount ?? ""}
              onChange={(e) => setForm({ ...form, price_amount: e.target.value ? Number(e.target.value) : null })}
            />
          </Field>
        ) : null}

        <Field label="Periode Tagihan">
          <Select
            value={form.billing_period}
            onValueChange={(value) => setForm({ ...form, billing_period: value as BillingPeriod })}
            options={billingOptions}
          />
        </Field>
        <Field label="Urutan Tampil">
          <Input
            type="number"
            value={form.sort_order}
            onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
          />
        </Field>
        <Field label="Status">
          <Select
            value={form.status ?? "draft"}
            onValueChange={(value) => setForm({ ...form, status: value as "draft" | "published" })}
            options={[
              { value: "draft", label: "Draft" },
              { value: "published", label: "Published" }
            ]}
          />
        </Field>
        <label className="flex items-center gap-2 text-sm text-neutral-300">
          <input
            type="checkbox"
            checked={form.is_popular}
            onChange={(e) => setForm({ ...form, is_popular: e.target.checked })}
          />
          Tandai sebagai "Paling Populer"
        </label>

        <SeoFieldsSection value={form.seo ?? {}} onChange={(seo) => setForm({ ...form, seo })} locale={locale} />

        <div className="mt-2 flex gap-3">
          <motion.button
            type="submit"
            disabled={saveMutation.isPending}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="h-11 rounded-lg bg-accent-500 px-6 text-sm font-semibold text-neutral-950 hover:bg-accent-300 disabled:opacity-50"
          >
            {saveMutation.isPending ? "Menyimpan..." : "Simpan"}
          </motion.button>
          <button
            type="button"
            onClick={() => navigate("/harga")}
            className="h-11 rounded-lg border border-neutral-700 px-6 text-sm text-neutral-300 hover:border-neutral-500"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
