import React from 'react';
import { X, Palette, Layout, Building2, Check, RefreshCw, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { ThemeBaseMode, AccentColor, LayoutMode, CompanyBranding } from '../types';
import { BASE_THEME_CLASSES, ACCENT_CONFIGS } from '../utils/theme';
import { soundFx } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  themeMode: ThemeBaseMode;
  setThemeMode: (mode: ThemeBaseMode) => void;
  accentColor: AccentColor;
  setAccentColor: (accent: AccentColor) => void;
  layoutMode: LayoutMode;
  setLayoutMode: (layout: LayoutMode) => void;
  branding: CompanyBranding;
  setBranding: React.Dispatch<React.SetStateAction<CompanyBranding>>;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

export const ThemeCustomizerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  themeMode,
  setThemeMode,
  accentColor,
  setAccentColor,
  layoutMode,
  setLayoutMode,
  branding,
  setBranding,
  isMuted,
  setIsMuted,
}) => {
  if (!isOpen) return null;

  const currentTheme = BASE_THEME_CLASSES[themeMode] || BASE_THEME_CLASSES['dark-slate'];
  const currentAccent = ACCENT_CONFIGS[accentColor] || ACCENT_CONFIGS['blue'];

  const themeOptions: { id: ThemeBaseMode; name: string; desc: string; previewBg: string }[] = [
    { id: 'dark-slate', name: 'Executive Dark Slate', desc: 'Modern high-contrast dark theme', previewBg: 'bg-slate-900 border-slate-700' },
    { id: 'light-alpine', name: 'Alpine White Formal', desc: 'Clean, light formal corporate theme', previewBg: 'bg-white border-slate-300 text-slate-900' },
    { id: 'sapphire-navy', name: 'Deep Sapphire Navy', desc: 'Classic corporate navy blue', previewBg: 'bg-[#081026] border-blue-900 text-blue-100' },
    { id: 'steel-gray', name: 'Industrial Steel Gray', desc: 'Metallic neutral dark gray', previewBg: 'bg-[#12161f] border-slate-700 text-slate-100' },
  ];

  const accentOptions: { id: AccentColor; name: string; colorClass: string; hex: string }[] = [
    { id: 'blue', name: 'Sapphire Blue', colorClass: 'bg-blue-600', hex: '#2563eb' },
    { id: 'emerald', name: 'Emerald Mint', colorClass: 'bg-emerald-600', hex: '#10b981' },
    { id: 'amber', name: 'Corporate Amber', colorClass: 'bg-amber-600', hex: '#f59e0b' },
    { id: 'indigo', name: 'Imperial Indigo', colorClass: 'bg-indigo-600', hex: '#6366f1' },
    { id: 'crimson', name: 'Executive Crimson', colorClass: 'bg-rose-600', hex: '#e11d48' },
    { id: 'cyan', name: 'Tech Cyan', colorClass: 'bg-cyan-600', hex: '#06b6d4' },
  ];

  const layoutOptions: { id: LayoutMode; title: string; desc: string; icon: string }[] = [
    { id: 'showcase', title: 'Executive Showcase', desc: 'Full multi-section corporate landing with interactive 3D hero', icon: '🏛️' },
    { id: 'sidebar', title: 'Sidebar Workspace', desc: 'Fixed corporate sidebar with clean section workspace tabs', icon: '📐' },
    { id: 'bento', title: 'Bento Dashboard', desc: 'Modular high-density executive grid panel layout', icon: '🍱' },
    { id: 'compact', title: 'Compact Portal', desc: 'Streamlined executive portal focused on fast metric review', icon: '⚡' },
  ];

  const industries = [
    'Cloud & Technology Infrastructure',
    'Financial Technology & Banking',
    'Energy & Utilities Enterprise',
    'Healthcare & BioTech Solutions',
    'Global Manufacturing & Logistics',
  ];

  const handleReset = () => {
    soundFx.playClick();
    setThemeMode('dark-slate');
    setAccentColor('blue');
    setLayoutMode('showcase');
    setBranding({
      name: 'NexusCorp Global',
      tagline: 'Next-Gen Enterprise Infrastructure & AI Systems',
      industry: 'Cloud & Technology Infrastructure',
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className={`w-full max-w-2xl rounded-3xl p-6 sm:p-8 border shadow-2xl relative max-h-[90vh] overflow-y-auto ${currentTheme.card} ${currentTheme.border}`}>
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl ${currentAccent.primary} text-white flex items-center justify-center shadow-lg`}>
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${currentTheme.textPrimary} font-sans`}>
                Enterprise Customizer
              </h3>
              <p className={`text-xs ${currentTheme.textMuted}`}>
                Customize theme background, accent colors, layout architecture, and company branding
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Base Theme Selection */}
        <div className="mb-6">
          <label className={`block text-xs font-mono font-bold uppercase tracking-wider mb-3 ${currentTheme.textMuted} flex items-center gap-2`}>
            <Palette className="w-4 h-4 text-blue-400" />
            Base Theme Mode (Light / Dark Corporate)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {themeOptions.map((item) => {
              const isSelected = themeMode === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    soundFx.playClick();
                    setThemeMode(item.id);
                  }}
                  className={`p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? `border-blue-500 bg-blue-500/10 ring-2 ${currentAccent.ring}`
                      : `${currentTheme.border} hover:bg-white/5`
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border ${item.previewBg}`} />
                      <span className={`text-xs font-bold ${currentTheme.textPrimary}`}>
                        {item.name}
                      </span>
                    </div>
                    <p className={`text-[11px] mt-1 ${currentTheme.textMuted}`}>
                      {item.desc}
                    </p>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-blue-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Accent Color Selection */}
        <div className="mb-6">
          <label className={`block text-xs font-mono font-bold uppercase tracking-wider mb-3 ${currentTheme.textMuted} flex items-center gap-2`}>
            <Sparkles className="w-4 h-4 text-amber-400" />
            Accent Palette & Highlights
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {accentOptions.map((acc) => {
              const isSelected = accentColor === acc.id;
              return (
                <button
                  key={acc.id}
                  onClick={() => {
                    soundFx.playClick();
                    setAccentColor(acc.id);
                  }}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? `border-white/50 bg-white/10 ring-2 ${currentAccent.ring}`
                      : `${currentTheme.border} hover:bg-white/5`
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-5 h-5 rounded-full ${acc.colorClass} shadow-md`} />
                    <span className={`text-xs font-medium ${currentTheme.textPrimary}`}>
                      {acc.name}
                    </span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Layout Mode Switcher */}
        <div className="mb-6">
          <label className={`block text-xs font-mono font-bold uppercase tracking-wider mb-3 ${currentTheme.textMuted} flex items-center gap-2`}>
            <Layout className="w-4 h-4 text-emerald-400" />
            Page Layout Architecture
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {layoutOptions.map((lay) => {
              const isSelected = layoutMode === lay.id;
              return (
                <button
                  key={lay.id}
                  onClick={() => {
                    soundFx.playClick();
                    setLayoutMode(lay.id);
                  }}
                  className={`p-3.5 rounded-2xl text-left border transition-all flex items-start justify-between cursor-pointer ${
                    isSelected
                      ? `border-emerald-500 bg-emerald-500/10 ring-2 ${currentAccent.ring}`
                      : `${currentTheme.border} hover:bg-white/5`
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-xl">{lay.icon}</span>
                    <div>
                      <span className={`text-xs font-bold block ${currentTheme.textPrimary}`}>
                        {lay.title}
                      </span>
                      <p className={`text-[11px] mt-0.5 ${currentTheme.textMuted}`}>
                        {lay.desc}
                      </p>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Corporate Branding Settings */}
        <div className="mb-6 p-4 rounded-2xl bg-black/20 border border-white/10">
          <label className={`block text-xs font-mono font-bold uppercase tracking-wider mb-3 ${currentTheme.textMuted} flex items-center gap-2`}>
            <Building2 className="w-4 h-4 text-purple-400" />
            Corporate Identity & Branding
          </label>

          <div className="space-y-3">
            <div>
              <label className={`block text-[11px] ${currentTheme.textMuted} mb-1`}>Company Name</label>
              <input
                type="text"
                value={branding.name}
                onChange={(e) => setBranding(prev => ({ ...prev, name: e.target.value }))}
                className={`w-full px-3.5 py-2 rounded-xl text-xs bg-black/40 border ${currentTheme.border} ${currentTheme.textPrimary} outline-none focus:border-blue-500`}
                placeholder="e.g. NexusCorp Global"
              />
            </div>

            <div>
              <label className={`block text-[11px] ${currentTheme.textMuted} mb-1`}>Corporate Tagline</label>
              <input
                type="text"
                value={branding.tagline}
                onChange={(e) => setBranding(prev => ({ ...prev, tagline: e.target.value }))}
                className={`w-full px-3.5 py-2 rounded-xl text-xs bg-black/40 border ${currentTheme.border} ${currentTheme.textPrimary} outline-none focus:border-blue-500`}
                placeholder="e.g. Next-Gen Enterprise Infrastructure"
              />
            </div>

            <div>
              <label className={`block text-[11px] ${currentTheme.textMuted} mb-1`}>Industry Sector</label>
              <select
                value={branding.industry}
                onChange={(e) => setBranding(prev => ({ ...prev, industry: e.target.value }))}
                className={`w-full px-3.5 py-2 rounded-xl text-xs bg-black/40 border ${currentTheme.border} ${currentTheme.textPrimary} outline-none focus:border-blue-500 cursor-pointer`}
              >
                {industries.map((ind) => (
                  <option key={ind} value={ind} className="bg-slate-900 text-white">
                    {ind}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 5: Audio FX Toggle & Action Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <button
            onClick={() => {
              const nextMute = !isMuted;
              setIsMuted(nextMute);
              soundFx.setMuted(nextMute);
            }}
            className={`px-3 py-2 rounded-xl border text-xs font-mono flex items-center gap-2 ${currentTheme.border} hover:bg-white/10`}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            <span>{isMuted ? 'Muted' : 'Sound Active'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className={`px-3 py-2 rounded-xl border text-xs font-mono flex items-center gap-1.5 ${currentTheme.border} hover:bg-white/10 cursor-pointer`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={() => {
                soundFx.playSuccess();
                onClose();
              }}
              className={`px-5 py-2 rounded-xl ${currentAccent.primary} hover:opacity-90 text-white font-mono text-xs font-bold cursor-pointer shadow-lg`}
            >
              Apply Changes
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
