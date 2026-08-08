import React from 'react';
import { 
  Building2, 
  Cpu, 
  Database, 
  Newspaper, 
  Orbit, 
  Zap, 
  ArrowUpRight, 
  ShieldCheck, 
  BarChart3, 
  Globe2, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';
import { ThemeBaseMode, AccentColor, CompanyBranding, ProductItem } from '../types';
import { BASE_THEME_CLASSES, ACCENT_CONFIGS } from '../utils/theme';
import { SERVICES_DATA, PRODUCTS_DATA, NEWS_ARTICLES } from '../data/mockData';
import { soundFx } from '../utils/audio';

interface Props {
  themeMode: ThemeBaseMode;
  accentColor: AccentColor;
  branding: CompanyBranding;
  onAddToCart: (product: ProductItem) => void;
  onNavigateTab: (tab: string) => void;
}

export const BentoLayoutView: React.FC<Props> = ({
  themeMode,
  accentColor,
  branding,
  onAddToCart,
  onNavigateTab,
}) => {
  const baseTheme = BASE_THEME_CLASSES[themeMode] || BASE_THEME_CLASSES['dark-slate'];
  const accent = ACCENT_CONFIGS[accentColor] || ACCENT_CONFIGS['blue'];

  return (
    <div className="py-8 px-4 sm:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Bento Header Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${baseTheme.card} ${baseTheme.border} flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden`}>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${accent.badge} flex items-center gap-1.5`}>
              <Layers className="w-3.5 h-3.5" />
              <span>BENTO EXECUTIVE DASHBOARD</span>
            </span>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Global Systems Nominal
            </span>
          </div>

          <h1 className={`text-3xl sm:text-5xl font-black ${baseTheme.textPrimary} tracking-tight font-sans`}>
            {branding.name} <br />
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${accent.gradient}`}>
              EXECUTIVE MATRIX
            </span>
          </h1>
          <p className={`mt-2 text-sm max-w-xl ${baseTheme.textMuted}`}>
            Modular high-density view unifying enterprise cloud architecture, infrastructure metrics, flagship solution catalogs, and live corporate press streams.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={() => {
              soundFx.playSuccess();
              onNavigateTab('services');
            }}
            className={`px-5 py-3 rounded-2xl ${accent.primary} text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform cursor-pointer`}
          >
            <Cpu className="w-4 h-4" />
            <span>EXPLORE SOLUTIONS</span>
          </button>
        </div>
      </div>

      {/* Bento Grid Array */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Bento Card 1: Key Performance Indicators (Span 8) */}
        <div className={`md:col-span-8 p-6 sm:p-8 rounded-3xl border ${baseTheme.card} ${baseTheme.border} flex flex-col justify-between relative overflow-hidden group`}>
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BarChart3 className={`w-5 h-5 ${accent.text}`} />
                <h3 className={`text-sm font-mono font-bold uppercase tracking-wider ${baseTheme.textMuted}`}>
                  Infrastructure KPI Benchmarks
                </h3>
              </div>
              <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg ${accent.badge}`}>
                REAL-TIME
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Global Latency', val: '0.04 ms', sub: '-94% vs industry' },
                { label: 'Compute Power', val: '18.4 PFLOPS', sub: '256 Qubit Array' },
                { label: 'System Uptime', val: '99.999%', sub: 'Fault-tolerant SLA' },
                { label: 'Threat Blocked', val: '4.2M / day', sub: 'Zero false-positive' },
              ].map((kpi, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-black/20 dark:bg-white/5 border border-white/10">
                  <p className={`text-[10px] font-mono ${baseTheme.textMuted} uppercase`}>{kpi.label}</p>
                  <p className={`text-xl font-bold font-mono mt-1 ${baseTheme.textPrimary}`}>{kpi.val}</p>
                  <p className="text-[10px] text-emerald-400 mt-0.5">{kpi.sub}</p>
                </div>
              ))}
            </div>
          </div>

          <p className={`text-xs ${baseTheme.textMuted} flex items-center gap-2 pt-4 border-t border-white/10`}>
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Audited & verified across 100,000+ distributed liquid-cooled nodes globally.</span>
          </p>
        </div>

        {/* Bento Card 2: Global Operations Footprint (Span 4) */}
        <div className={`md:col-span-4 p-6 rounded-3xl border ${baseTheme.card} ${baseTheme.border} flex flex-col justify-between`}>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Globe2 className={`w-5 h-5 ${accent.text}`} />
              <h3 className={`text-sm font-mono font-bold uppercase tracking-wider ${baseTheme.textMuted}`}>
                Global Footprint
              </h3>
            </div>

            <p className={`text-2xl font-black ${baseTheme.textPrimary} mb-2`}>
              48 Regions
            </p>
            <p className={`text-xs ${baseTheme.textMuted} mb-6`}>
              Ultra-low latency fiber hubs active in Jakarta, Singapore, Tokyo, Frankfurt, London, and New York.
            </p>

            <ul className="space-y-2 text-xs">
              {['APAC Enclave Hub - Active', 'EMEA Primary Cluster - Active', 'AMER Quantum Array - Active'].map((loc, i) => (
                <li key={i} className={`flex items-center gap-2 ${baseTheme.textSecondary}`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{loc}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => onNavigateTab('reactor')}
            className={`mt-6 py-2.5 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-2 ${baseTheme.border} hover:bg-white/10 ${baseTheme.textPrimary} cursor-pointer`}
          >
            <span>INSPECT TOPOLOGY</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bento Card 3: Featured Flagship Services (Span 8) */}
        <div className={`md:col-span-8 p-6 sm:p-8 rounded-3xl border ${baseTheme.card} ${baseTheme.border}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Cpu className={`w-5 h-5 ${accent.text}`} />
              <h3 className={`text-sm font-mono font-bold uppercase tracking-wider ${baseTheme.textMuted}`}>
                Core Enterprise Solutions
              </h3>
            </div>
            <button 
              onClick={() => onNavigateTab('services')}
              className={`text-xs font-mono font-bold ${accent.text} hover:underline flex items-center gap-1 cursor-pointer`}
            >
              <span>VIEW ALL MATRIX</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICES_DATA.slice(0, 2).map((srv) => (
              <div 
                key={srv.id}
                className="p-5 rounded-2xl bg-black/20 dark:bg-white/5 border border-white/10 hover:border-blue-400/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${accent.badge}`}>
                    {srv.category}
                  </span>
                  <h4 className={`text-lg font-bold ${baseTheme.textPrimary} mt-2 mb-1`}>
                    {srv.title}
                  </h4>
                  <p className={`text-xs ${baseTheme.textMuted} line-clamp-2`}>
                    {srv.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className={baseTheme.textMuted}>Latency: {srv.latency}</span>
                  <span className={`font-bold ${accent.text}`}>Throughput: {srv.throughput}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bento Card 4: Hardware & Hardware Solution (Span 4) */}
        <div className={`md:col-span-4 p-6 rounded-3xl border ${baseTheme.card} ${baseTheme.border} flex flex-col justify-between`}>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Database className={`w-5 h-5 ${accent.text}`} />
              <h3 className={`text-sm font-mono font-bold uppercase tracking-wider ${baseTheme.textMuted}`}>
                Flagship Hardware
              </h3>
            </div>

            {PRODUCTS_DATA[0] && (
              <div>
                <div className="relative rounded-2xl overflow-hidden h-36 mb-4">
                  <img 
                    src={PRODUCTS_DATA[0].image} 
                    alt={PRODUCTS_DATA[0].name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-black/80 text-white font-mono text-[10px] font-bold">
                    ${PRODUCTS_DATA[0].price.toLocaleString()}
                  </div>
                </div>

                <h4 className={`text-base font-bold ${baseTheme.textPrimary}`}>
                  {PRODUCTS_DATA[0].name}
                </h4>
                <p className={`text-xs ${baseTheme.textMuted} mt-1 line-clamp-2`}>
                  {PRODUCTS_DATA[0].description}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              soundFx.playSuccess();
              if (PRODUCTS_DATA[0]) onAddToCart(PRODUCTS_DATA[0]);
            }}
            className={`mt-6 w-full py-2.5 rounded-xl ${accent.primary} text-white text-xs font-mono font-bold shadow-md cursor-pointer`}
          >
            ADD TO PROPOSAL QUOTE
          </button>
        </div>

        {/* Bento Card 5: Latest Corporate Press & News (Span 12) */}
        <div className={`md:col-span-12 p-6 sm:p-8 rounded-3xl border ${baseTheme.card} ${baseTheme.border}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Newspaper className={`w-5 h-5 ${accent.text}`} />
              <h3 className={`text-sm font-mono font-bold uppercase tracking-wider ${baseTheme.textMuted}`}>
                Latest Press Releases & Industry Announcements
              </h3>
            </div>
            <button 
              onClick={() => onNavigateTab('news')}
              className={`text-xs font-mono font-bold ${accent.text} hover:underline flex items-center gap-1 cursor-pointer`}
            >
              <span>ALL PRESS RELEASES</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NEWS_ARTICLES.map((article) => (
              <div 
                key={article.id}
                className="p-5 rounded-2xl bg-black/20 dark:bg-white/5 border border-white/10 hover:border-blue-400/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${accent.badge}`}>
                    {article.category}
                  </span>
                  <p className={`text-[10px] font-mono mt-2 ${baseTheme.textMuted}`}>
                    {article.date} • {article.readTime}
                  </p>
                  <h4 className={`text-sm font-bold ${baseTheme.textPrimary} mt-1 mb-2 line-clamp-2`}>
                    {article.title}
                  </h4>
                  <p className={`text-xs ${baseTheme.textMuted} line-clamp-2`}>
                    {article.summary}
                  </p>
                </div>

                <div className={`mt-4 pt-3 border-t border-white/10 text-[11px] ${baseTheme.textMuted}`}>
                  By {article.author}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
