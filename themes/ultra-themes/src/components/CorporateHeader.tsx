import React, { useState } from 'react';
import { 
  Building2, 
  Cpu, 
  Database, 
  Newspaper, 
  Orbit, 
  Zap, 
  ShoppingBag,
  SlidersHorizontal,
  Layout,
  Volume2,
  VolumeX,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { ThemeBaseMode, AccentColor, LayoutMode, CompanyBranding } from '../types';
import { BASE_THEME_CLASSES, ACCENT_CONFIGS } from '../utils/theme';
import { soundFx } from '../utils/audio';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  setIsCartOpen: (open: boolean) => void;
  themeMode: ThemeBaseMode;
  setThemeMode: (mode: ThemeBaseMode) => void;
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
  layoutMode: LayoutMode;
  setLayoutMode: (layout: LayoutMode) => void;
  branding: CompanyBranding;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  onOpenCustomizer: () => void;
}

export const CorporateHeader: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  cartCount,
  setIsCartOpen,
  themeMode,
  accentColor,
  layoutMode,
  setLayoutMode,
  branding,
  isMuted,
  setIsMuted,
  onOpenCustomizer,
}) => {
  const [isLayoutDropdownOpen, setIsLayoutDropdownOpen] = useState(false);

  const baseTheme = BASE_THEME_CLASSES[themeMode] || BASE_THEME_CLASSES['dark-slate'];
  const accent = ACCENT_CONFIGS[accentColor] || ACCENT_CONFIGS['blue'];

  const navItems = [
    { id: 'hero', label: 'Overview', icon: Building2 },
    { id: 'services', label: 'Solutions Matrix', icon: Cpu },
    { id: 'products', label: 'Enterprise Products', icon: Database },
    { id: 'news', label: 'Corporate News', icon: Newspaper },
    { id: 'blog', label: 'Whitepapers', icon: Orbit },
    { id: 'reactor', label: 'Infrastructure', icon: Zap }
  ];

  const handleNavClick = (id: string) => {
    soundFx.playHover();
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const layoutNames: Record<LayoutMode, string> = {
    showcase: 'Showcase',
    sidebar: 'Sidebar',
    bento: 'Bento Grid',
    compact: 'Compact Portal'
  };

  return (
    <header className="sticky top-0 z-40 px-4 sm:px-8 py-4 transition-all border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Company Logo & Identity */}
        <button 
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 text-left cursor-pointer group shrink-0"
        >
          <div className={`w-10 h-10 rounded-xl ${accent.gradient} p-[1px] shadow-lg group-hover:scale-105 transition-transform bg-gradient-to-br`}>
            <div className={`w-full h-full rounded-[11px] flex items-center justify-center ${baseTheme.isDark ? 'bg-slate-900' : 'bg-white'}`}>
              <Building2 className={`w-5 h-5 ${accent.text}`} />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className={`font-black text-lg tracking-tight font-sans ${baseTheme.textPrimary}`}>
                {branding.name}
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold tracking-wider ${accent.badge}`}>
                ENTERPRISE
              </span>
            </div>
            <p className={`text-[10px] font-mono tracking-wider uppercase ${baseTheme.textMuted}`}>
              {branding.tagline}
            </p>
          </div>
        </button>

        {/* Desktop Main Corporate Navigation Links (Visible in Showcase & Bento layout modes) */}
        {layoutMode === 'showcase' && (
          <nav className="hidden lg:flex items-center gap-1 bg-black/20 dark:bg-white/5 p-1.5 rounded-2xl border border-white/10">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium tracking-wide flex items-center gap-2 transition-all cursor-pointer relative ${
                    isActive 
                      ? `${accent.primary} text-white font-semibold shadow-md` 
                      : `${baseTheme.textMuted} hover:${baseTheme.textPrimary} hover:bg-white/10`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Action Controls: Customize Theme/Accent, Layout Switcher & Quote Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Layout Quick Selector Dropdown */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => {
                soundFx.playClick();
                setIsLayoutDropdownOpen(!isLayoutDropdownOpen);
              }}
              className={`px-3 py-2 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-colors ${baseTheme.card} ${baseTheme.border} ${baseTheme.textPrimary}`}
              title="Change Layout Mode"
            >
              <Layout className={`w-3.5 h-3.5 ${accent.text}`} />
              <span>{layoutNames[layoutMode]}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {isLayoutDropdownOpen && (
              <div className={`absolute right-0 mt-2 w-48 rounded-2xl p-2 border shadow-2xl z-50 animate-in fade-in zoom-in-95 ${baseTheme.card} ${baseTheme.border}`}>
                <p className={`text-[10px] font-mono px-3 py-1.5 uppercase font-bold tracking-wider ${baseTheme.textMuted}`}>
                  Select Architecture Mode
                </p>
                {(['showcase', 'sidebar', 'bento', 'compact'] as LayoutMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      soundFx.playClick();
                      setLayoutMode(mode);
                      setIsLayoutDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between hover:bg-white/10 transition-colors ${
                      layoutMode === mode ? `${accent.text} font-bold` : baseTheme.textPrimary
                    }`}
                  >
                    <span>{layoutNames[mode]}</span>
                    {layoutMode === mode && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme & Color Customizer Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenCustomizer();
            }}
            className={`px-3.5 py-2 rounded-xl border text-xs font-mono font-semibold flex items-center gap-2 transition-all cursor-pointer ${baseTheme.card} ${baseTheme.border} hover:border-blue-400 ${baseTheme.textPrimary}`}
            title="Open Theme & Color Palette Customizer"
          >
            <SlidersHorizontal className={`w-4 h-4 ${accent.text}`} />
            <span className="hidden md:inline">COLOR & LAYOUT</span>
            <div className={`w-2.5 h-2.5 rounded-full ${accent.primary}`} />
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={() => {
              const nextState = !isMuted;
              setIsMuted(nextState);
              soundFx.setMuted(nextState);
            }}
            className={`p-2.5 rounded-xl border text-xs transition-colors cursor-pointer ${baseTheme.card} ${baseTheme.border} ${baseTheme.textMuted} hover:${baseTheme.textPrimary}`}
            title={isMuted ? "Unmute Audio FX" : "Mute Audio FX"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Quote Request / Cart Drawer Trigger */}
          <button
            onClick={() => {
              soundFx.playClick();
              setIsCartOpen(true);
            }}
            className={`relative px-4 py-2 rounded-xl ${accent.primary} hover:opacity-90 text-white font-mono text-xs font-bold tracking-wider flex items-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">REQUEST QUOTE</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 text-[10px] font-extrabold flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </button>

        </div>

      </div>

      {/* Mobile Sub-Navigation Bar */}
      {layoutMode === 'showcase' && (
        <div className="lg:hidden mt-3 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap flex items-center gap-1.5 border transition-all ${
                  isActive
                    ? `${accent.primary} text-white border-white/20 font-bold shadow-md`
                    : `${baseTheme.card} ${baseTheme.border} ${baseTheme.textMuted}`
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
