import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Alert, Input, Select, Textarea } from "@existcode/ui";
import { createAdminService, getAdminService, updateAdminService } from "@existcode/api-client";
import type { AdminServicePayload, ServiceAccent } from "@existcode/types";
import { apiClient } from "../../app/apiClient";
import { Field } from "../../components/Field";
import { LocaleTabBar, type AdminLocale } from "../../components/LocaleTabBar";

const accentOptions: { value: ServiceAccent; label: string }[] = [
  { value: "sky", label: "Sky" },
  { value: "violet", label: "Violet" },
  { value: "amber", label: "Amber" },
  { value: "emerald", label: "Emerald" },
  { value: "rose", label: "Rose" },
  { value: "neutral", label: "Neutral" }
];

const emptyForm: AdminServicePayload = {
  name: { id: "", en: "" },
  slug: { id: "", en: "" },
  summary: { id: "", en: "" },
  description: { id: "", en: "" },
  category: { id: "", en: "" },
  icon_key: "",
  accent: "neutral",
  features: { id: [], en: [] },
  is_featured: false,
  sort_order: 0,
  status: "draft"
};

export function ServiceFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = id !== undefined && id !== "baru";
  const serviceId = isEdit ? Number(id) : undefined;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["admin", "service", serviceId],
    queryFn: () => getAdminService(apiClient, serviceId as number),
    enabled: isEdit
  });

  const [locale, setLocale] = useState<AdminLocale>("id");
  const [form, setForm] = useState<AdminServicePayload>(emptyForm);
  const [featuresText, setFeaturesText] = useState({ id: "", en: "" });

  useEffect(() => {
    if (data?.data) {
      const service = data.data;
      setForm({
        name: service.name,
        slug: service.slug,
        summary: service.summary,
        description: service.description,
        category: service.category,
        icon_key: service.icon_key ?? "",
        accent: service.accent,
        features: service.features,
        is_featured: service.is_featured,
        sort_order: service.sort_order ?? 0,
        status: service.status ?? "draft"
      });
      setFeaturesText({ id: service.features.id.join("\n"), en: service.features.en.join("\n") });
    }
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: (payload: AdminServicePayload) =>
      isEdit ? updateAdminService(apiClient, serviceId as number, payload) : createAdminService(apiClient, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "services"] });
      navigate("/jasa");
    }
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    saveMutation.mutate({
      ...form,
      features: {
        id: featuresText.id.split("\n").map((f) => f.trim()).filter(Boolean),
        en: featuresText.en.split("\n").map((f) => f.trim()).filter(Boolean)
      }
    });
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl font-semibold text-neutral-50">{isEdit ? "Edit Jasa" : "Tambah Jasa"}</h1>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        {saveMutation.isError ? <Alert variant="danger">Gagal menyimpan. Periksa kembali data Anda.</Alert> : null}

        <LocaleTabBar locale={locale} onChange={setLocale} />

        <Field label={`Nama (${locale.toUpperCase()})`}>
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
        <Field label={`Ringkasan (${locale.toUpperCase()}, maks 160 karakter)`}>
          <Input
            required
            maxLength={160}
            value={form.summary[locale]}
            onChange={(e) => setForm({ ...form, summary: { ...form.summary, [locale]: e.target.value } })}
          />
        </Field>
        <Field label={`Deskripsi (${locale.toUpperCase()})`}>
          <Textarea
            required
            rows={4}
            value={form.description[locale]}
            onChange={(e) => setForm({ ...form, description: { ...form.description, [locale]: e.target.value } })}
          />
        </Field>
        <Field label={`Kategori (${locale.toUpperCase()})`}>
          <Input
            required
            value={form.category[locale]}
            onChange={(e) => setForm({ ...form, category: { ...form.category, [locale]: e.target.value } })}
          />
        </Field>
        <Field label={`Fitur (${locale.toUpperCase()}, satu per baris)`}>
          <Textarea
            rows={4}
            value={featuresText[locale]}
            onChange={(e) => setFeaturesText({ ...featuresText, [locale]: e.target.value })}
          />
        </Field>

        <Field label="Icon Key (lucide, opsional)">
          <Input
            value={form.icon_key}
            onChange={(e) => setForm({ ...form, icon_key: e.target.value })}
            placeholder="code-2"
          />
        </Field>
        <Field label="Warna Aksen">
          <Select
            value={form.accent}
            onValueChange={(value) => setForm({ ...form, accent: value as ServiceAccent })}
            options={accentOptions}
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
            checked={form.is_featured}
            onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
          />
          Tampilkan sebagai layanan unggulan
        </label>

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
            onClick={() => navigate("/jasa")}
            className="h-11 rounded-lg border border-neutral-700 px-6 text-sm text-neutral-300 hover:border-neutral-500"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
