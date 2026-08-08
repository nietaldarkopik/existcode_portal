import { ThemeBaseMode, AccentColor } from '../types';

export interface AccentThemeConfig {
  name: string;
  primary: string;
  hover: string;
  gradient: string;
  bgGlow: string;
  border: string;
  borderHover: string;
  text: string;
  badge: string;
  ring: string;
  hex: string;
}

export const ACCENT_CONFIGS: Record<AccentColor, AccentThemeConfig> = {
  blue: {
    name: 'Sapphire Blue',
    primary: 'bg-blue-600',
    hover: 'hover:bg-blue-500',
    gradient: 'from-blue-600 via-indigo-600 to-blue-500',
    bgGlow: 'rgba(37, 99, 235, 0.2)',
    border: 'border-blue-500/30',
    borderHover: 'hover:border-blue-400/80',
    text: 'text-blue-500 dark:text-blue-400',
    badge: 'bg-blue-500/15 text-blue-600 dark:text-blue-300 border-blue-500/30',
    ring: 'ring-blue-500/50',
    hex: '#2563eb',
  },
  emerald: {
    name: 'Emerald Mint',
    primary: 'bg-emerald-600',
    hover: 'hover:bg-emerald-500',
    gradient: 'from-emerald-600 via-teal-600 to-emerald-500',
    bgGlow: 'rgba(16, 185, 129, 0.2)',
    border: 'border-emerald-500/30',
    borderHover: 'hover:border-emerald-400/80',
    text: 'text-emerald-600 dark:text-emerald-400',
    badge: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
    ring: 'ring-emerald-500/50',
    hex: '#10b981',
  },
  amber: {
    name: 'Corporate Amber',
    primary: 'bg-amber-600',
    hover: 'hover:bg-amber-500',
    gradient: 'from-amber-500 via-orange-600 to-amber-600',
    bgGlow: 'rgba(245, 158, 11, 0.2)',
    border: 'border-amber-500/30',
    borderHover: 'hover:border-amber-400/80',
    text: 'text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
    ring: 'ring-amber-500/50',
    hex: '#f59e0b',
  },
  indigo: {
    name: 'Imperial Indigo',
    primary: 'bg-indigo-600',
    hover: 'hover:bg-indigo-500',
    gradient: 'from-indigo-600 via-purple-600 to-indigo-500',
    bgGlow: 'rgba(99, 102, 241, 0.2)',
    border: 'border-indigo-500/30',
    borderHover: 'hover:border-indigo-400/80',
    text: 'text-indigo-600 dark:text-indigo-400',
    badge: 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30',
    ring: 'ring-indigo-500/50',
    hex: '#6366f1',
  },
  crimson: {
    name: 'Executive Crimson',
    primary: 'bg-rose-600',
    hover: 'hover:bg-rose-500',
    gradient: 'from-rose-600 via-red-600 to-rose-500',
    bgGlow: 'rgba(225, 29, 72, 0.2)',
    border: 'border-rose-500/30',
    borderHover: 'hover:border-rose-400/80',
    text: 'text-rose-600 dark:text-rose-400',
    badge: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30',
    ring: 'ring-rose-500/50',
    hex: '#e11d48',
  },
  cyan: {
    name: 'Tech Cyan',
    primary: 'bg-cyan-600',
    hover: 'hover:bg-cyan-500',
    gradient: 'from-cyan-500 via-blue-600 to-cyan-400',
    bgGlow: 'rgba(6, 182, 212, 0.2)',
    border: 'border-cyan-500/30',
    borderHover: 'hover:border-cyan-400/80',
    text: 'text-cyan-600 dark:text-cyan-400',
    badge: 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30',
    ring: 'ring-cyan-500/50',
    hex: '#06b6d4',
  },
};

export const BASE_THEME_CLASSES: Record<ThemeBaseMode, {
  bg: string;
  card: string;
  cardHover: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  navBg: string;
  isDark: boolean;
}> = {
  'dark-slate': {
    bg: 'bg-[#0b0f19] text-slate-100',
    card: 'bg-[#111827]/80 backdrop-blur-md border border-slate-800/80 shadow-lg',
    cardHover: 'hover:bg-[#1f293d]/90 hover:border-slate-700',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-300',
    textMuted: 'text-slate-400',
    border: 'border-slate-800',
    navBg: 'bg-[#0b0f19]/90 backdrop-blur-xl border-slate-800/80',
    isDark: true,
  },
  'light-alpine': {
    bg: 'bg-slate-50 text-slate-900',
    card: 'bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-md',
    cardHover: 'hover:bg-white hover:border-slate-300 hover:shadow-xl',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-700',
    textMuted: 'text-slate-500',
    border: 'border-slate-200',
    navBg: 'bg-white/90 backdrop-blur-xl border-slate-200/80',
    isDark: false,
  },
  'sapphire-navy': {
    bg: 'bg-[#081026] text-blue-50',
    card: 'bg-[#0e1a3a]/80 backdrop-blur-md border border-blue-900/50 shadow-lg',
    cardHover: 'hover:bg-[#14244d] hover:border-blue-700/60',
    textPrimary: 'text-blue-50',
    textSecondary: 'text-blue-200',
    textMuted: 'text-blue-300/70',
    border: 'border-blue-900/60',
    navBg: 'bg-[#081026]/90 backdrop-blur-xl border-blue-900/60',
    isDark: true,
  },
  'steel-gray': {
    bg: 'bg-[#12161f] text-slate-100',
    card: 'bg-[#1a202c]/85 backdrop-blur-md border border-slate-700/60 shadow-lg',
    cardHover: 'hover:bg-[#232a38] hover:border-slate-600',
    textPrimary: 'text-slate-100',
    textSecondary: 'text-slate-300',
    textMuted: 'text-slate-400',
    border: 'border-slate-700/60',
    navBg: 'bg-[#12161f]/90 backdrop-blur-xl border-slate-700/60',
    isDark: true,
  },
};
