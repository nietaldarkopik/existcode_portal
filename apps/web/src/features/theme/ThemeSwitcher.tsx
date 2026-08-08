import { useState } from "react";
import {
  ACCENT_PRESETS,
  LAYOUT_MODE_PRESETS,
  Modal,
  soundFx,
  THEME_MODE_PRESETS,
  useTheme
} from "@existcode/ui";
import { Check, Lock, Palette, RefreshCw, Volume2, VolumeX } from "lucide-react";
import { useLocale } from "../../i18n";

export function ThemeSwitcher() {
  const { t } = useLocale();
  const { mode, accent, layout, locked, setMode, setAccent, setLayout, reset } = useTheme();
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(() => soundFx.isMuted());

  if (locked) {
    return (
      <button
        type="button"
        title={t.theme.lockedNotice}
        aria-label={t.theme.lockedNotice}
        className="fixed bottom-6 right-6 z-(--z-popover) flex size-11 cursor-not-allowed items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/80 text-neutral-500 backdrop-blur-md"
      >
        <Lock className="size-4" />
      </button>
    );
  }

  function toggleMute() {
    const next = !muted;
    setMuted(next);
    soundFx.setMuted(next);
  }

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      trigger={
        <button
          type="button"
          aria-label={t.theme.switcherLabel}
          onClick={() => soundFx.playClick()}
          className="fixed bottom-6 right-6 z-(--z-popover) flex size-11 items-center justify-center rounded-full border border-accent-500/40 bg-neutral-900/90 text-accent-400 shadow-lg backdrop-blur-md transition-colors hover:border-accent-400 hover:text-accent-300"
        >
          <Palette className="size-4" />
        </button>
      }
      title={t.theme.modalTitle}
      description={t.theme.modalSubtitle}
      className="max-w-2xl max-h-[85vh] overflow-y-auto"
    >
      <div className="flex flex-col gap-6">
        <section>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">{t.theme.sectionMode}</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {THEME_MODE_PRESETS.map((preset) => {
              const isSelected = preset.id === mode;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setMode(preset.id);
                  }}
                  className={`flex items-center justify-between gap-3 rounded-lg border p-3 text-left transition-colors ${
                    isSelected ? "border-accent-500 bg-accent-500/10" : "border-neutral-800 hover:border-neutral-600"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="size-6 shrink-0 rounded-full border border-neutral-700"
                      style={{ background: preset.preview.bg }}
                    />
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
        </section>

        <section>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">{t.theme.sectionAccent}</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {ACCENT_PRESETS.map((preset) => {
              const isSelected = preset.id === accent;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setAccent(preset.id);
                  }}
                  className={`flex items-center justify-between gap-2 rounded-lg border p-2.5 text-left transition-colors ${
                    isSelected ? "border-accent-500 bg-accent-500/10" : "border-neutral-800 hover:border-neutral-600"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="size-5 shrink-0 rounded-full shadow" style={{ background: preset.hex }} />
                    <span className="text-xs text-neutral-100">{preset.label}</span>
                  </span>
                  {isSelected ? <Check className="size-4 shrink-0 text-accent-400" /> : null}
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">{t.theme.sectionLayout}</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {LAYOUT_MODE_PRESETS.map((preset) => {
              const isSelected = preset.id === layout;
              const Icon = preset.icon;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setLayout(preset.id);
                  }}
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
        </section>

        <div className="flex items-center justify-between border-t border-neutral-800 pt-4">
          <button
            type="button"
            onClick={toggleMute}
            className="flex items-center gap-2 rounded-md border border-neutral-800 px-3 py-2 text-xs text-neutral-300 hover:border-neutral-600"
          >
            {muted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
            {muted ? t.theme.muteOff : t.theme.muteOn}
          </button>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              reset();
            }}
            className="flex items-center gap-1.5 rounded-md border border-neutral-800 px-3 py-2 text-xs text-neutral-300 hover:border-neutral-600"
          >
            <RefreshCw className="size-3.5" />
            {t.theme.reset}
          </button>
        </div>
      </div>
    </Modal>
  );
}
