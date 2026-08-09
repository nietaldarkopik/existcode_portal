import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Alert, Input, Select, Textarea } from "@existcode/ui";
import {
  createAdminBlogPost,
  getAdminBlogCategories,
  getAdminBlogPost,
  updateAdminBlogPost
} from "@existcode/api-client";
import type { AdminBlogPostPayload, ServiceAccent } from "@existcode/types";
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

const emptyForm: AdminBlogPostPayload = {
  blog_category_id: null,
  title: { id: "", en: "" },
  slug: { id: "", en: "" },
  excerpt: { id: "", en: "" },
  body: { id: "", en: "" },
  cover_image_url: "",
  accent: undefined,
  author_name: "Existcode Team",
  reading_minutes: undefined,
  status: "draft",
  published_at: "",
  seo: {}
};

export function BlogFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = id !== undefined && id !== "baru";
  const postId = isEdit ? Number(id) : undefined;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: categoriesRes } = useQuery({
    queryKey: ["admin", "blog-categories", "all"],
    queryFn: () => getAdminBlogCategories(apiClient)
  });
  const { data } = useQuery({
    queryKey: ["admin", "blog-post", postId],
    queryFn: () => getAdminBlogPost(apiClient, postId as number),
    enabled: isEdit
  });

  const [locale, setLocale] = useState<AdminLocale>("id");
  const [form, setForm] = useState<AdminBlogPostPayload>(emptyForm);

  useEffect(() => {
    if (data?.data) {
      const post = data.data;
      setForm({
        blog_category_id: post.category?.id ?? null,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        body: post.body,
        cover_image_url: post.cover_image_url ?? "",
        accent: post.accent ?? undefined,
        author_name: post.author_name,
        reading_minutes: post.reading_minutes ?? undefined,
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
    mutationFn: (payload: AdminBlogPostPayload) =>
      isEdit ? updateAdminBlogPost(apiClient, postId as number, payload) : createAdminBlogPost(apiClient, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "blog-posts"] });
      navigate("/blog");
    }
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    saveMutation.mutate(form);
  }

  const categoryOptions = [
    { value: "", label: "Tanpa kategori" },
    ...(categoriesRes?.data.map((category) => ({ value: String(category.id), label: category.name.id })) ?? [])
  ];

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl font-semibold text-neutral-50">{isEdit ? "Edit Artikel" : "Tambah Artikel"}</h1>

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
        <Field label={`Isi Artikel (${locale.toUpperCase()})`} hint="Pisahkan paragraf dengan baris kosong.">
          <Textarea
            required
            rows={10}
            value={form.body[locale]}
            onChange={(e) => setForm({ ...form, body: { ...form.body, [locale]: e.target.value } })}
          />
        </Field>

        <Field label="Kategori">
          <Select
            value={form.blog_category_id ? String(form.blog_category_id) : ""}
            onValueChange={(value) => setForm({ ...form, blog_category_id: value ? Number(value) : null })}
            options={categoryOptions}
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
        <Field label="Penulis">
          <Input value={form.author_name} onChange={(e) => setForm({ ...form, author_name: e.target.value })} />
        </Field>
        <Field label="Estimasi Menit Baca">
          <Input
            type="number"
            min={1}
            value={form.reading_minutes ?? ""}
            onChange={(e) => setForm({ ...form, reading_minutes: e.target.value ? Number(e.target.value) : undefined })}
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
            onClick={() => navigate("/blog")}
            className="h-11 rounded-lg border border-neutral-700 px-6 text-sm text-neutral-300 hover:border-neutral-500"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
