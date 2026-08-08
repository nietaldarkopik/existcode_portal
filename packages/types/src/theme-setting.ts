export type ThemeMode = "dark-slate" | "light-alpine" | "sapphire-navy" | "steel-gray";

export type AccentColor = "teal" | "blue" | "emerald" | "amber" | "violet" | "crimson" | "cyan";

export type LayoutMode = "showcase" | "sidebar" | "bento" | "compact";

export interface ThemeSetting {
  mode: ThemeMode;
  accent: AccentColor;
  layout: LayoutMode;
  locked: boolean;
}

export type ThemeSettingPayload = Partial<ThemeSetting>;
