import { Input, Textarea } from "@existcode/ui";
import type { AdminSeoPayload } from "@existcode/types";
import { Field } from "./Field";
import type { AdminLocale } from "./LocaleTabBar";

export function SeoFieldsSection({
  value,
  onChange,
  locale
}: {
  value: AdminSeoPayload;
  onChange: (next: AdminSeoPayload) => void;
  locale: AdminLocale;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-neutral-800 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
        SEO & Share Preview (opsional — kosongkan untuk pakai judul/ringkasan di atas)
      </p>

      <Field label={`Judul SEO (${locale.toUpperCase()})`}>
        <Input
          maxLength={255}
          value={value.title?.[locale] ?? ""}
          onChange={(e) => onChange({ ...value, title: { ...value.title, [locale]: e.target.value } })}
        />
      </Field>
      <Field label={`Deskripsi SEO (${locale.toUpperCase()}, maks 500 karakter)`}>
        <Textarea
          rows={2}
          maxLength={500}
          value={value.description?.[locale] ?? ""}
          onChange={(e) => onChange({ ...value, description: { ...value.description, [locale]: e.target.value } })}
        />
      </Field>
      <Field label="Keywords (pisahkan dengan koma)" hint="Tidak wajib — dampaknya kecil untuk Google, tapi tetap disertakan.">
        <Input
          value={value.keywords ?? ""}
          onChange={(e) => onChange({ ...value, keywords: e.target.value })}
          placeholder="jasa pembuatan website, laravel, react"
        />
      </Field>
      <Field label="URL Gambar Preview (og:image)" hint="Muncul saat link dibagikan di WhatsApp/Facebook/X/Instagram.">
        <Input
          value={value.og_image ?? ""}
          onChange={(e) => onChange({ ...value, og_image: e.target.value })}
          placeholder="https://..."
        />
      </Field>
    </div>
  );
}
