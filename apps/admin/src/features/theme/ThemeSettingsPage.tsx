import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { getAdminThemeSetting, updateAdminThemeSetting } from "@existcode/api-client";
import { ACCENT_PRESETS, Alert, LAYOUT_MODE_PRESETS, Spinner, THEME_MODE_PRESETS } from "@existcode/ui";
import type { AccentColor, LayoutMode, ThemeMode, ThemeSetting } from "@existcode/types";
import { apiClient } from "../../app/apiClient";
import { Field } from "../../components/Field";

export function ThemeSettingsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "settings", "theme"],
    queryFn: () => getAdminThemeSetting(apiClient)
  });

  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-2xl font-semibold text-neutral-50">Tema Website</h1>
      <p className="mt-1 text-sm text-neutral-400">
        Atur tema dasar, warna aksen, dan layout default untuk situs existcode.id.
      </p>

      {isLoading || !data ? (
        <div className="mt-8">
          <Spinner />
        </div>
      ) : (
        <ThemeSettingsForm key={data.data.mode + data.data.accent + data.data.layout} initial={data.data} />
      )}
    </div>
  );
}

// Mounted only once `initial` is available (see loading branch above), so
// local state can be initialized straight from props — no effect needed to
// re-sync it after the query resolves.
function ThemeSettingsForm({ initial }: { initial: ThemeSetting }) {
  const queryClient = useQueryClient();

  const [mode, setMode] = useState<ThemeMode>(initial.mode);
  const [accent, setAccent] = useState<AccentColor>(initial.accent);
  const [layout, setLayout] = useState<LayoutMode>(initial.layout);
  const [locked, setLocked] = useState(initial.locked);

  const saveMutation = useMutation({
    mutationFn: () => updateAdminThemeSetting(apiClient, { mode, accent, layout, locked }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "settings", "theme"] });
      queryClient.invalidateQueries({ queryKey: ["theme-setting"] });
    }
  });

  return (
    <>
      {saveMutation.isSuccess ? <Alert variant="success" className="mt-4">Tema berhasil disimpan.</Alert> : null}
      {saveMutation.isError ? <Alert variant="danger" className="mt-4">Gagal menyimpan tema.</Alert> : null}

      <div className="mt-6 flex flex-col gap-6">
        <Field label="Tema Dasar">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {THEME_MODE_PRESETS.map((preset) => {
              const isSelected = preset.id === mode;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setMode(preset.id)}
                  className={`flex items-center justify-between gap-3 rounded-lg border p-3 text-left transition-colors ${
                    isSelected ? "border-accent-500 bg-accent-500/10" : "border-neutral-800 hover:border-neutral-600"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="size-6 shrink-0 rounded-full border border-neutral-700" style={{ background: preset.preview.bg }} />
                    <div>
                      <p className="text-xs font-semibold text-neutral-50">{preset.label}</p>
                      <p className="text-[11px] text-neutral-400">{preset.description}</p>
                    </div>
                  </div>
                  {isSelected ? <Check className="size-4 shrink-0 text-accent-400" /> : null}
                </button>
              );
            })}
          </div>
        </Field>

        <Field label="Warna Aksen">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {ACCENT_PRESETS.map((preset) => {
              const isSelected = preset.id === accent;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setAccent(preset.id)}
                  className={`flex items-center justify-between gap-2 rounded-lg border p-2.5 text-left transition-colors ${
                    isSelected ? "border-accent-500 bg-accent-500/10" : "border-neutral-800 hover:border-neutral-600"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="size-5 shrink-0 rounded-full" style={{ background: preset.hex }} />
                    <span className="text-xs text-neutral-100">{preset.label}</span>
                  </span>
                  {isSelected ? <Check className="size-4 shrink-0 text-accent-400" /> : null}
                </button>
              );
            })}
          </div>
        </Field>

        <Field label="Layout Halaman">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {LAYOUT_MODE_PRESETS.map((preset) => {
              const isSelected = preset.id === layout;
              const Icon = preset.icon;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setLayout(preset.id)}
                  className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
                    isSelected ? "border-accent-500 bg-accent-500/10" : "border-neutral-800 hover:border-neutral-600"
                  }`}
                >
                  <Icon className="mt-0.5 size-4 shrink-0 text-accent-400" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-neutral-50">{preset.label}</p>
                    <p className="text-[11px] text-neutral-400">{preset.description}</p>
                  </div>
                  {isSelected ? <Check className="size-4 shrink-0 text-accent-400" /> : null}
                </button>
              );
            })}
          </div>
        </Field>

        <label className="flex items-start gap-2 text-sm text-neutral-300">
          <input type="checkbox" checked={locked} onChange={(e) => setLocked(e.target.checked)} className="mt-0.5" />
          <span>
            <span className="flex items-center gap-1.5 font-semibold text-neutral-100">
              <Lock className="size-3.5" /> Kunci tema untuk visitor
            </span>
            <span className="text-xs text-neutral-500">
              Jika aktif, tombol ganti tema disembunyikan di situs dan semua pengunjung memakai tema di atas.
            </span>
          </span>
        </label>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">Pratinjau</p>
          <div
            data-theme={mode}
            data-accent={accent}
            className="flex items-center gap-4 rounded-xl border border-neutral-800 p-5"
            style={{ background: "var(--color-neutral-900)", color: "var(--color-neutral-50)" }}
          >
            <div className="flex-1">
              <p className="font-heading text-sm font-semibold">Existcode</p>
              <p className="text-xs" style={{ color: "var(--color-neutral-400)" }}>
                Mitra Pengembangan Software Anda
              </p>
            </div>
            <button
              type="button"
              className="rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-wide"
              style={{ background: "var(--color-accent-500)", color: "var(--color-neutral-950)" }}
            >
              Lihat Harga
            </button>
          </div>
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
            {saveMutation.isPending ? "Menyimpan..." : "Simpan Tema"}
          </motion.button>
        </div>
      </div>
    </>
  );
}
