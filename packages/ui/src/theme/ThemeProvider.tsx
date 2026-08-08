import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AccentColor, LayoutMode, ThemeMode, ThemeSetting } from "@existcode/types";

const STORAGE_KEY = "existcode-theme-pref";

const DEFAULTS: ThemeSetting = {
  mode: "dark-slate",
  accent: "teal",
  layout: "showcase",
  locked: false
};

interface StoredPref {
  mode: ThemeMode;
  accent: AccentColor;
  layout: LayoutMode;
}

function readStoredPref(): StoredPref | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredPref) : null;
  } catch {
    return null;
  }
}

function writeStoredPref(pref: StoredPref) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(pref));
}

interface ThemeContextValue {
  mode: ThemeMode;
  accent: AccentColor;
  layout: LayoutMode;
  locked: boolean;
  isCustomized: boolean;
  setMode: (mode: ThemeMode) => void;
  setAccent: (accent: AccentColor) => void;
  setLayout: (layout: LayoutMode) => void;
  reset: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ serverSetting, children }: { serverSetting?: ThemeSetting | undefined; children: ReactNode }) {
  const base = serverSetting ?? DEFAULTS;
  const locked = base.locked;

  const [pref, setPref] = useState<StoredPref | null>(() => (locked ? null : readStoredPref()));

  // Re-sync once the server setting resolves after first mount (react-query
  // starts undefined) and whenever admin flips the lock on/off.
  useEffect(() => {
    if (locked) setPref(null);
  }, [locked]);

  const mode = pref?.mode ?? base.mode;
  const accent = pref?.accent ?? base.accent;
  const layout = pref?.layout ?? base.layout;

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", mode);
    root.setAttribute("data-accent", accent);
    root.setAttribute("data-layout", layout);
  }, [mode, accent, layout]);

  const applyPref = useCallback(
    (next: Partial<StoredPref>) => {
      if (locked) return;
      setPref((current) => {
        const merged: StoredPref = {
          mode: current?.mode ?? base.mode,
          accent: current?.accent ?? base.accent,
          layout: current?.layout ?? base.layout,
          ...next
        };
        writeStoredPref(merged);
        return merged;
      });
    },
    [locked, base.mode, base.accent, base.layout]
  );

  const reset = useCallback(() => {
    if (locked) return;
    setPref(null);
    if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
  }, [locked]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      accent,
      layout,
      locked,
      isCustomized: pref !== null,
      setMode: (next) => applyPref({ mode: next }),
      setAccent: (next) => applyPref({ accent: next }),
      setLayout: (next) => applyPref({ layout: next }),
      reset
    }),
    [mode, accent, layout, locked, pref, applyPref, reset]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
