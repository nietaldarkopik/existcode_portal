import React, { useState } from 'react';
import { 
  Building2, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Activity, 
  CheckCircle2, 
  ShoppingBag, 
  ArrowUpRight, 
  Zap 
} from 'lucide-react';
import { ThemeBaseMode, AccentColor, CompanyBranding, ProductItem } from '../types';
import { BASE_THEME_CLASSES, ACCENT_CONFIGS } from '../utils/theme';
import { SERVICES_DATA, PRODUCTS_DATA } from '../data/mockData';
import { soundFx } from '../utils/audio';

interface Props {
  themeMode: ThemeBaseMode;
  accentColor: AccentColor;
  branding: CompanyBranding;
  onAddToCart: (product: ProductItem) => void;
  onNavigateTab: (tab: string) => void;
}

export const CompactPortalView: React.FC<Props> = ({
  themeMode,
  accentColor,
  branding,
  onAddToCart,
  onNavigateTab,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES_DATA[0].id);

  const baseTheme = BASE_THEME_CLASSES[themeMode] || BASE_THEME_CLASSES['dark-slate'];
  const accent = ACCENT_CONFIGS[accentColor] || ACCENT_CONFIGS['blue'];

  const activeService = SERVICES_DATA.find(s => s.id === selectedServiceId) || SERVICES_DATA[0];

  return (
    <div className="py-8 px-4 sm:px-8 max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Compact Portal Header */}
      <div className={`p-6 rounded-2xl border ${baseTheme.card} ${baseTheme.border} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${accent.gradient} p-[1px] bg-gradient-to-br shrink-0`}>
            <div className={`w-full h-full rounded-[11px] flex items-center justify-center ${baseTheme.isDark ? 'bg-slate-900' : 'bg-white'}`}>
              <Building2 className={`w-5 h-5 ${accent.text}`} />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className={`text-xl font-bold ${baseTheme.textPrimary}`}>
                {branding.name} Portal
              </h1>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${accent.badge}`}>
                COMPACT PORTAL
              </span>
            </div>
            <p className={`text-xs ${baseTheme.textMuted}`}>
              {branding.tagline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>PORTAL ONLINE</span>
        </div>
      </div>

      {/* Grid Layout: Quick Solutions & Hardware Procurement */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column: Solution Selector (Span 7) */}
        <div className={`md:col-span-7 p-6 rounded-2xl border ${baseTheme.card} ${baseTheme.border}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-xs font-mono font-bold uppercase tracking-wider ${baseTheme.textMuted} flex items-center gap-2`}>
              <Cpu className={`w-4 h-4 ${accent.text}`} />
              Enterprise Solutions Fast Selector
            </h3>
          </div>

          {/* Quick Tabs */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {SERVICES_DATA.map((srv) => (
              <button
                key={srv.id}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedServiceId(srv.id);
                }}
                className={`p-3 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer ${
                  selectedServiceId === srv.id
                    ? `${accent.primary} text-white font-bold border-white/20 shadow-md`
                    : `${baseTheme.border} ${baseTheme.textMuted} hover:bg-white/5`
                }`}
              >
                <p className="truncate font-bold">{srv.title}</p>
                <p className="text-[10px] opacity-80 mt-0.5">{srv.category}</p>
              </button>
            ))}
          </div>

          {/* Selected Solution Specs */}
          <div className="p-4 rounded-xl bg-black/20 dark:bg-white/5 border border-white/10 space-y-3">
            <h4 className={`text-sm font-bold ${baseTheme.textPrimary}`}>
              {activeService.title}
            </h4>
            <p className={`text-xs ${baseTheme.textMuted}`}>
              {activeService.description}
            </p>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
              {activeService.stats.map((st, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-black/30 text-center">
                  <p className="text-[9px] font-mono text-slate-400">{st.label}</p>
                  <p className={`text-xs font-bold font-mono ${baseTheme.textPrimary}`}>{st.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Hardware Procurement Quote (Span 5) */}
        <div className={`md:col-span-5 p-6 rounded-2xl border ${baseTheme.card} ${baseTheme.border} flex flex-col justify-between`}>
          <div>
            <h3 className={`text-xs font-mono font-bold uppercase tracking-wider ${baseTheme.textMuted} flex items-center gap-2 mb-4`}>
              <Database className={`w-4 h-4 ${accent.text}`} />
              Hardware Procurement
            </h3>

            <div className="space-y-3">
              {PRODUCTS_DATA.slice(0, 3).map((prod) => (
                <div 
                  key={prod.id}
                  className="p-3 rounded-xl bg-black/20 dark:bg-white/5 border border-white/10 flex items-center justify-between gap-3"
                >
                  <div>
                    <p className={`text-xs font-bold ${baseTheme.textPrimary} line-clamp-1`}>
                      {prod.name}
                    </p>
                    <p className={`text-[10px] font-mono ${accent.text}`}>
                      ${prod.price.toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      soundFx.playSuccess();
                      onAddToCart(prod);
                    }}
                    className={`px-3 py-1.5 rounded-lg ${accent.primary} text-white font-mono text-[10px] font-bold shrink-0 cursor-pointer`}
                  >
                    + QUOTE
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('products')}
            className={`mt-4 py-2 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-2 ${baseTheme.border} hover:bg-white/10 ${baseTheme.textPrimary} cursor-pointer`}
          >
            <span>FULL CATALOG</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
