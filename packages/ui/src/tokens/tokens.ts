export const colors = {
  neutral: {
    50: "#f4f6f9",
    100: "#e2e7ee",
    200: "#b9c2d0",
    300: "#8b96a8",
    400: "#5e6a7e",
    500: "#3f4a5c",
    600: "#2a3342",
    700: "#1c2330",
    800: "#131924",
    900: "#0d121a",
    950: "#080b11"
  },
  accent: {
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488"
  },
  violet: {
    400: "#a78bfa",
    500: "#8b5cf6"
  },
  success: { 400: "#34d399", 500: "#10b981" },
  warning: { 400: "#fbbf24", 500: "#f59e0b" },
  danger: { 400: "#fb7185", 500: "#f43f5e" },
  info: { 400: "#38bdf8", 500: "#0ea5e9" }
} as const;

export const fonts = {
  sans: '"Inter", ui-sans-serif, system-ui, sans-serif',
  heading: '"Space Grotesk", "Inter", ui-sans-serif, system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, "Cascadia Code", monospace'
} as const;

export const fontSize = {
  xs: { size: "0.75rem", lineHeight: "1rem" },
  sm: { size: "0.875rem", lineHeight: "1.25rem" },
  base: { size: "1rem", lineHeight: "1.5rem" },
  lg: { size: "1.125rem", lineHeight: "1.75rem" },
  xl: { size: "1.25rem", lineHeight: "1.75rem" },
  "2xl": { size: "1.5rem", lineHeight: "2rem" },
  "3xl": { size: "1.875rem", lineHeight: "2.25rem" },
  "4xl": { size: "2.25rem", lineHeight: "2.5rem" },
  "5xl": { size: "3rem", lineHeight: "1.1" },
  "6xl": { size: "3.75rem", lineHeight: "1.05" },
  display: { size: "4.5rem", lineHeight: "1" }
} as const;

export const radius = {
  sm: "2px",
  md: "3px",
  lg: "4px",
  xl: "6px",
  full: "9999px"
} as const;

export const motion = {
  duration: {
    instant: 100,
    fast: 150,
    base: 200,
    slow: 500,
    cinematic: 800
  },
  easing: {
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    hud: "cubic-bezier(0.16, 1, 0.3, 1)"
  }
} as const;

export const zIndex = {
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  popover: 1400,
  toast: 1500,
  tooltip: 1600
} as const;

export const tokens = { colors, fonts, fontSize, radius, motion, zIndex } as const;
