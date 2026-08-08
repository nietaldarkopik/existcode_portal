import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getAdminSeoSetting, updateAdminSeoSetting } from "@existcode/api-client";
import { Alert, Input, Spinner, Textarea } from "@existcode/ui";
import type { SeoPageKey, SeoPageSetting, SeoSetting } from "@existcode/types";
import { apiClient } from "../../app/apiClient";
import { Field } from "../../components/Field";
import { LocaleTabBar, type AdminLocale } from "../../components/LocaleTabBar";

const PAGE_KEYS: SeoPageKey[] = ["home", "about", "contact", "services", "pricing", "blog", "news"];

const PAGE_LABELS: Record<SeoPageKey, string> = {
  home: "Beranda",
  about: "Tentang Kami",
  contact: "Kontak",
  services: "Jasa",
  pricing: "Harga",
  blog: "Blog",
  news: "News"
};

export function SeoSettingsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "settings", "seo"],
    queryFn: () => getAdminSeoSetting(apiClient)
  });

  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-2xl font-semibold text-neutral-50">SEO & Share Preview</h1>
      <p className="mt-1 text-sm text-neutral-400">
        Atur judul, deskripsi, keywords, dan gambar yang muncul saat halaman di-share ke Google, Facebook,
        Instagram, X, atau WhatsApp.
      </p>

      {isLoading || !data ? (
        <div className="mt-8">
          <Spinner />
        </div>
      ) : (
        <SeoSettingsForm key={JSON.stringify(data.data)} initial={data.data} />
      )}
    </div>
  );
}

// Mounted only once `initial` is available (see loading branch above), so
// local state can be initialized straight from props — no effect needed to
// re-sync it after the query resolves.
function SeoSettingsForm({ initial }: { initial: SeoSetting }) {
  const queryClient = useQueryClient();

  const [siteName, setSiteName] = useState(initial.siteName);
  const [titleTemplate, setTitleTemplate] = useState(initial.titleTemplate);
  const [defaultDescription, setDefaultDescription] = useState(initial.defaultDescription);
  const [defaultKeywords, setDefaultKeywords] = useState(initial.defaultKeywords ?? "");
  const [defaultOgImage, setDefaultOgImage] = useState(initial.defaultOgImage ?? "");
  const [twitterHandle, setTwitterHandle] = useState(initial.twitterHandle ?? "");
  const [pages, setPages] = useState<Record<SeoPageKey, SeoPageSetting>>(initial.pages);

  const [locale, setLocale] = useState<AdminLocale>("id");
  const [activePage, setActivePage] = useState<SeoPageKey>("home");

  const saveMutation = useMutation({
    mutationFn: () =>
      updateAdminSeoSetting(apiClient, {
        siteName,
        titleTemplate,
        defaultDescription,
        defaultKeywords: defaultKeywords || undefined,
        defaultOgImage: defaultOgImage || undefined,
        twitterHandle: twitterHandle || undefined,
        pages
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "settings", "seo"] });
      queryClient.invalidateQueries({ queryKey: ["seo-setting"] });
    }
  });

  function updatePageField(field: "title" | "description", value: string) {
    setPages((prev) => ({
      ...prev,
      [activePage]: { ...prev[activePage], [field]: { ...prev[activePage][field], [locale]: value } }
    }));
  }

  return (
    <div className="mt-6 flex flex-col gap-6">
      {saveMutation.isSuccess ? <Alert variant="success">Pengaturan SEO berhasil disimpan.</Alert> : null}
      {saveMutation.isError ? <Alert variant="danger">Gagal menyimpan pengaturan SEO.</Alert> : null}

      <div className="flex flex-col gap-4 rounded-lg border border-neutral-800 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Default Situs</p>

        <Field label="Nama Situs">
          <Input value={siteName} onChange={(e) => setSiteName(e.target.value)} />
        </Field>
        <Field label="Format Judul" hint={'Gunakan %s sebagai placeholder judul halaman, contoh: "%s — Existcode".'}>
          <Input value={titleTemplate} onChange={(e) => setTitleTemplate(e.target.value)} />
        </Field>
        <Field label="Deskripsi Default">
          <Textarea rows={2} maxLength={500} value={defaultDescription} onChange={(e) => setDefaultDescription(e.target.value)} />
        </Field>
        <Field label="Keywords Default (pisahkan dengan koma)">
          <Input value={defaultKeywords} onChange={(e) => setDefaultKeywords(e.target.value)} />
        </Field>
        <Field label="URL Gambar Preview Default (og:image)" hint="Dipakai untuk halaman yang belum punya gambar sendiri.">
          <Input value={defaultOgImage} onChange={(e) => setDefaultOgImage(e.target.value)} placeholder="https://..." />
        </Field>
        <Field label="Twitter/X Handle (opsional)">
          <Input value={twitterHandle} onChange={(e) => setTwitterHandle(e.target.value)} placeholder="@existcode" />
        </Field>
      </div>

      <div className="flex flex-col gap-4 rounded-lg border border-neutral-800 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Judul & Deskripsi per Halaman</p>

        <div className="flex flex-wrap gap-2">
          {PAGE_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActivePage(key)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                activePage === key
                  ? "bg-accent-500/15 text-accent-300"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
              }`}
            >
              {PAGE_LABELS[key]}
            </button>
          ))}
        </div>

        <LocaleTabBar locale={locale} onChange={setLocale} />

        <Field label={`Judul (${locale.toUpperCase()})`} hint="Kosongkan untuk pakai judul default halaman.">
          <Input
            value={pages[activePage].title[locale]}
            onChange={(e) => updatePageField("title", e.target.value)}
          />
        </Field>
        <Field label={`Deskripsi (${locale.toUpperCase()})`} hint="Kosongkan untuk pakai deskripsi default situs.">
          <Textarea
            rows={2}
            maxLength={500}
            value={pages[activePage].description[locale]}
            onChange={(e) => updatePageField("description", e.target.value)}
          />
        </Field>
      </div>

      <div>
        <motion.button
          type="button"
          disabled={saveMutation.isPending}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => saveMutation.mutate()}
          className="h-11 rounded-lg bg-accent-500 px-6 text-sm font-semibold text-neutral-950 hover:bg-accent-300 disabled:opacity-50"
        >
          {saveMutation.isPending ? "Menyimpan..." : "Simpan Pengaturan SEO"}
        </motion.button>
      </div>
    </div>
  );
}
