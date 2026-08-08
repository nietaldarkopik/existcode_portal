import React, { useState } from 'react';
import { 
  Building2, 
  Cpu, 
  Database, 
  Newspaper, 
  Orbit, 
  Zap, 
  SlidersHorizontal, 
  ShoppingBag, 
  ShieldCheck, 
  BarChart3, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';
import { ThemeBaseMode, AccentColor, CompanyBranding, ProductItem } from '../types';
import { BASE_THEME_CLASSES, ACCENT_CONFIGS } from '../utils/theme';
import { ParticleHero } from './ParticleHero';
import { ServiceMatrix } from './ServiceMatrix';
import { ProductUniverse } from './ProductUniverse';
import { KineticNewsStream } from './KineticNewsStream';
import { OrbitalBlogSphere } from './OrbitalBlogSphere';
import { FeatureReactor } from './FeatureReactor';
import { soundFx } from '../utils/audio';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  themeMode: ThemeBaseMode;
  accentColor: AccentColor;
  branding: CompanyBranding;
  cartCount: number;
  setIsCartOpen: (open: boolean) => void;
  onAddToCart: (product: ProductItem) => void;
  onOpenCustomizer: () => void;
}

export const SidebarLayoutView: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  themeMode,
  accentColor,
  branding,
  cartCount,
  setIsCartOpen,
  onAddToCart,
  onOpenCustomizer,
}) => {
  const baseTheme = BASE_THEME_CLASSES[themeMode] || BASE_THEME_CLASSES['dark-slate'];
  const accent = ACCENT_CONFIGS[accentColor] || ACCENT_CONFIGS['blue'];

  const navItems = [
    { id: 'hero', label: 'Executive Overview', icon: Building2 },
    { id: 'services', label: 'Solutions Matrix', icon: Cpu },
    { id: 'products', label: 'Hardware Catalog', icon: Database },
    { id: 'news', label: 'Press & Media', icon: Newspaper },
    { id: 'blog', label: 'Whitepapers', icon: Orbit },
    { id: 'reactor', label: 'Infrastructure Topology', icon: Zap }
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row animate-in fade-in duration-300">
      
      {/* Fixed Corporate Left Sidebar */}
      <aside className={`w-full md:w-72 shrink-0 p-6 border-b md:border-b-0 md:border-r ${baseTheme.navBg} ${baseTheme.border} flex flex-col justify-between sticky top-0 md:h-screen z-30`}>
        <div>
          {/* Logo Brand Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className={`w-10 h-10 rounded-xl ${accent.gradient} p-[1px] shadow-lg bg-gradient-to-br shrink-0`}>
              <div className={`w-full h-full rounded-[11px] flex items-center justify-center ${baseTheme.isDark ? 'bg-slate-900' : 'bg-white'}`}>
                <Building2 className={`w-5 h-5 ${accent.text}`} />
              </div>
            </div>
            <div>
              <h2 className={`font-black text-base leading-tight ${baseTheme.textPrimary}`}>
                {branding.name}
              </h2>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold tracking-wider ${accent.badge}`}>
                SIDEBAR VIEW
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 mb-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    soundFx.playHover();
                    setActiveTab(item.id);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-mono font-medium flex items-center gap-3 transition-all cursor-pointer ${
                    isActive
                      ? `${accent.primary} text-white font-bold shadow-md`
                      : `${baseTheme.textMuted} hover:${baseTheme.textPrimary} hover:bg-white/10`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          {/* Customizer Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenCustomizer();
            }}
            className={`w-full py-2.5 px-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-2 ${baseTheme.card} ${baseTheme.border} ${baseTheme.textPrimary} hover:border-blue-400 cursor-pointer`}
          >
            <SlidersHorizontal className={`w-4 h-4 ${accent.text}`} />
            <span>THEME & ACCENT</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => {
              soundFx.playClick();
              setIsCartOpen(true);
            }}
            className={`w-full py-2.5 px-3 rounded-xl ${accent.primary} text-white font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>PROPOSAL QUOTE ({cartCount})</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Workspace */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto min-h-screen">
        {activeTab === 'hero' && (
          <div className="space-y-12">
            <ParticleHero />
            <ServiceMatrix />
          </div>
        )}

        {activeTab === 'services' && <ServiceMatrix />}

        {activeTab === 'products' && (
          <ProductUniverse onAddToCart={onAddToCart} />
        )}

        {activeTab === 'news' && <KineticNewsStream />}

        {activeTab === 'blog' && <OrbitalBlogSphere />}

        {activeTab === 'reactor' && <FeatureReactor />}
      </main>

    </div>
  );
};
