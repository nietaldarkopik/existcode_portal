import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Alert, Input, Select, Textarea } from "@existcode/ui";
import { createAdminNewsPost, getAdminNewsPost, updateAdminNewsPost } from "@existcode/api-client";
import type { AdminNewsPostPayload, NewsType, ServiceAccent } from "@existcode/types";
import { apiClient } from "../../app/apiClient";
import { Field } from "../../components/Field";
import { ImageUploadField } from "../../components/ImageUploadField";
import { LocaleTabBar, type AdminLocale } from "../../components/LocaleTabBar";
import { SeoFieldsSection } from "../../components/SeoFieldsSection";

const accentOptions: { value: string; label: string }[] = [
  { value: "", label: "Tanpa aksen (default)" },
  { value: "sky", label: "Sky" },
  { value: "violet", label: "Violet" },
  { value: "amber", label: "Amber" },
  { value: "emerald", label: "Emerald" },
  { value: "rose", label: "Rose" },
  { value: "neutral", label: "Neutral" }
];

const newsTypeOptions: { value: NewsType; label: string }[] = [
  { value: "announcement", label: "Pengumuman" },
  { value: "milestone", label: "Milestone" },
  { value: "press", label: "Press" },
  { value: "product_update", label: "Update Produk" }
];

const emptyForm: AdminNewsPostPayload = {
  title: { id: "", en: "" },
  slug: { id: "", en: "" },
  excerpt: { id: "", en: "" },
  body: { id: "", en: "" },
  cover_image_url: "",
  accent: undefined,
  news_type: "announcement",
  status: "draft",
  published_at: "",
  seo: {}
};

export function NewsFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = id !== undefined && id !== "baru";
  const postId = isEdit ? Number(id) : undefined;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["admin", "news-post", postId],
    queryFn: () => getAdminNewsPost(apiClient, postId as number),
    enabled: isEdit
  });

  const [locale, setLocale] = useState<AdminLocale>("id");
  const [form, setForm] = useState<AdminNewsPostPayload>(emptyForm);

  useEffect(() => {
    if (data?.data) {
      const post = data.data;
      setForm({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        body: post.body,
        cover_image_url: post.cover_image_url ?? "",
        accent: post.accent ?? undefined,
        news_type: post.news_type,
        status: post.status ?? "draft",
        published_at: post.published_at ? post.published_at.slice(0, 10) : "",
        seo: {
          title: post.seo?.title ?? { id: "", en: "" },
          description: post.seo?.description ?? { id: "", en: "" },
          keywords: post.seo?.keywords ?? "",
          og_image: post.seo?.og_image ?? ""
        }
      });
    }
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: (payload: AdminNewsPostPayload) =>
      isEdit ? updateAdminNewsPost(apiClient, postId as number, payload) : createAdminNewsPost(apiClient, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "news-posts"] });
      navigate("/news");
    }
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    saveMutation.mutate(form);
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl font-semibold text-neutral-50">{isEdit ? "Edit Berita" : "Tambah Berita"}</h1>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        {saveMutation.isError ? <Alert variant="danger">Gagal menyimpan. Periksa kembali data Anda.</Alert> : null}

        <LocaleTabBar locale={locale} onChange={setLocale} />

        <Field label={`Judul (${locale.toUpperCase()})`}>
          <Input
            required
            value={form.title[locale]}
            onChange={(e) => setForm({ ...form, title: { ...form.title, [locale]: e.target.value } })}
          />
        </Field>
        <Field label={`Slug (${locale.toUpperCase()})`}>
          <Input
            required
            value={form.slug[locale]}
            onChange={(e) => setForm({ ...form, slug: { ...form.slug, [locale]: e.target.value } })}
          />
        </Field>
        <Field label={`Ringkasan (${locale.toUpperCase()}, maks 500 karakter)`}>
          <Textarea
            required
            rows={2}
            maxLength={500}
            value={form.excerpt[locale]}
            onChange={(e) => setForm({ ...form, excerpt: { ...form.excerpt, [locale]: e.target.value } })}
          />
        </Field>
        <Field label={`Isi Berita (${locale.toUpperCase()})`}>
          <Textarea
            required
            rows={8}
            value={form.body[locale]}
            onChange={(e) => setForm({ ...form, body: { ...form.body, [locale]: e.target.value } })}
          />
        </Field>

        <Field label="Tipe Berita">
          <Select
            value={form.news_type ?? "announcement"}
            onValueChange={(value) => setForm({ ...form, news_type: value as NewsType })}
            options={newsTypeOptions}
          />
        </Field>
        <ImageUploadField
          label="Gambar Sampul (opsional)"
          value={form.cover_image_url ?? ""}
          onChange={(url) => setForm({ ...form, cover_image_url: url })}
        />
        <Field label="Warna Aksen (dipakai jika tanpa gambar sampul)">
          <Select
            value={form.accent ?? ""}
            onValueChange={(value) => setForm({ ...form, accent: (value || undefined) as ServiceAccent | undefined })}
            options={accentOptions}
          />
        </Field>
        <Field label="Tanggal Terbit">
          <Input
            type="date"
            value={form.published_at}
            onChange={(e) => setForm({ ...form, published_at: e.target.value })}
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
            onClick={() => navigate("/news")}
            className="h-11 rounded-lg border border-neutral-700 px-6 text-sm text-neutral-300 hover:border-neutral-500"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
