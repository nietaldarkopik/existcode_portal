import { useRef, useState, type ChangeEvent } from "react";
import { Input } from "@existcode/ui";
import { uploadAdminImage } from "@existcode/api-client";
import { apiClient } from "../app/apiClient";
import { Field } from "./Field";

export function ImageUploadField({
  label,
  hint,
  value,
  onChange
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const res = await uploadAdminImage(apiClient, file);
      onChange(res.url);
    } catch {
      setError("Gagal upload gambar. Coba lagi.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <Field label={label} {...(hint !== undefined ? { hint } : {})}>
      <div className="flex flex-col gap-2">
        {value ? (
          <img
            src={value}
            alt=""
            className="h-32 w-auto max-w-full rounded-lg border border-neutral-800 object-cover"
          />
        ) : null}
        <div className="flex gap-2">
          <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="https://..." />
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="h-10 shrink-0 rounded-lg border border-neutral-700 px-4 text-sm text-neutral-300 hover:border-neutral-500 disabled:opacity-50"
          >
            {uploading ? "Mengupload..." : "Upload"}
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={handleFileChange}
        />
        {error ? <p className="text-xs text-danger-400">{error}</p> : null}
      </div>
    </Field>
  );
}
