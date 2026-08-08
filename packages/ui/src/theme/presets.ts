import type { LucideIcon } from "lucide-react";
import { Grid3x3, LayoutGrid, PanelLeft, Zap } from "lucide-react";
import type { AccentColor, LayoutMode, ThemeMode } from "@existcode/types";

export interface ThemeModePreset {
  id: ThemeMode;
  label: string;
  description: string;
  preview: { bg: string; card: string; text: string };
}

export interface AccentPreset {
  id: AccentColor;
  label: string;
  hex: string;
}

export interface LayoutModePreset {
  id: LayoutMode;
  label: string;
  description: string;
  icon: LucideIcon;
}

// Preview hexes mirror the CSS variable overrides authored by hand in
// packages/config/theme-presets.css — keep both in sync when adding a preset.
export const THEME_MODE_PRESETS: ThemeModePreset[] = [
  {
    id: "dark-slate",
    label: "Executive Dark Slate",
    description: "Tema gelap kontras tinggi — default Existcode.",
    preview: { bg: "#0d121a", card: "#131924", text: "#f4f6f9" }
  },
  {
    id: "light-alpine",
    label: "Alpine White Formal",
    description: "Tema terang bersih untuk tampilan formal.",
    preview: { bg: "#ffffff", card: "#f7f8fa", text: "#10141c" }
  },
  {
    id: "sapphire-navy",
    label: "Deep Sapphire Navy",
    description: "Navy biru pekat bergaya korporat klasik.",
    preview: { bg: "#081026", card: "#0d1830", text: "#eef4ff" }
  },
  {
    id: "steel-gray",
    label: "Industrial Steel Gray",
    description: "Abu-abu metalik netral yang tegas.",
    preview: { bg: "#12161f", card: "#1a202c", text: "#f2f4f7" }
  }
];

export const ACCENT_PRESETS: AccentPreset[] = [
  { id: "teal", label: "Existcode Teal", hex: "#14b8a6" },
  { id: "blue", label: "Sapphire Blue", hex: "#3b82f6" },
  { id: "emerald", label: "Emerald Mint", hex: "#10b981" },
  { id: "amber", label: "Corporate Amber", hex: "#f59e0b" },
  { id: "violet", label: "Imperial Violet", hex: "#8b5cf6" },
  { id: "crimson", label: "Executive Crimson", hex: "#f43f5e" },
  { id: "cyan", label: "Tech Cyan", hex: "#06b6d4" }
];

export const LAYOUT_MODE_PRESETS: LayoutModePreset[] = [
  {
    id: "showcase",
    label: "Executive Showcase",
    description: "Landing lengkap dengan hero beraksen partikel.",
    icon: Zap
  },
  {
    id: "sidebar",
    label: "Sidebar Workspace",
    description: "Navigasi sidebar tetap dengan area kerja bersih.",
    icon: PanelLeft
  },
  {
    id: "bento",
    label: "Bento Dashboard",
    description: "Grid modular padat gaya dashboard eksekutif.",
    icon: Grid3x3
  },
  {
    id: "compact",
    label: "Compact Portal",
    description: "Portal ringkas fokus ke ringkasan cepat.",
    icon: LayoutGrid
  }
];
