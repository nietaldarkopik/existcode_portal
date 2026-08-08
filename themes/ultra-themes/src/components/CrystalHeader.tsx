import React, { useState } from 'react';
import { 
  Atom, 
  Cpu, 
  Database, 
  Radio, 
  Newspaper, 
  Orbit, 
  Zap, 
  ShoppingBag,
  SlidersHorizontal,
  Flame,
  ChevronRight
} from 'lucide-react';
import { soundFx } from '../utils/audio';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  setIsCartOpen: (open: boolean) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
}

export const CrystalHeader: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  cartCount,
  setIsCartOpen,
  accentColor: _accentColor,
  setAccentColor
}) => {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Quantum Hub', icon: Atom },
    { id: 'services', label: 'Service Matrix', icon: Cpu },
    { id: 'products', label: 'Product Universe', icon: Database },
    { id: 'news', label: 'Kinetic News', icon: Newspaper },
    { id: 'blog', label: 'Orbital Blog', icon: Orbit },
    { id: 'reactor', label: 'Feature Reactor', icon: Zap }
  ];

  const handleNavClick = (id: string) => {
    soundFx.playHover();
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-8 mb-6">
      <div className="max-w-7xl mx-auto">
        {/* Floating Crystal Bar */}
        <div className="glass-panel rounded-2xl px-4 py-3 sm:px-6 sm:py-3.5 border border-white/15 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] flex items-center justify-between gap-4 transition-all hover:border-purple-500/40">
          
          {/* Logo & Brand Identity */}
          <button 
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-[1px] shadow-[0_0_20px_rgba(168,85,247,0.5)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#080d22] rounded-[11px] flex items-center justify-center">
                <Atom className="w-6 h-6 text-cyan-400 animate-spin" style={{ animationDuration: '12s' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-500 bg-clip-text text-transparent font-sans">
                  NEXUSCORE
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/40 font-bold">
                  ULTRA
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">
                Quantum Spatial OS
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-white/5 p-1.5 rounded-xl border border-white/10">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-mono tracking-wider flex items-center gap-2 transition-all cursor-pointer relative ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white font-semibold shadow-[0_0_15px_rgba(168,85,247,0.5)] border border-purple-400/50' 
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-300 animate-pulse' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Live Status, Preset Picker & Cart */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Theme Glow Preset Picker Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setIsThemeMenuOpen(!isThemeMenuOpen);
                }}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-400 transition-colors border border-white/10 flex items-center gap-1.5 text-xs font-mono"
                title="Change Color Theme"
              >
                <SlidersHorizontal className="w-4 h-4 text-purple-400" />
                <span className="hidden sm:inline">THEME</span>
              </button>

              {isThemeMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl glass-panel p-2 border border-purple-500/30 shadow-2xl z-50 animate-in fade-in zoom-in-95">
                  <p className="text-[10px] font-mono text-slate-400 px-3 py-1.5 uppercase font-bold tracking-wider">
                    Select Neon Preset
                  </p>
                  {[
                    { id: 'cyberpunk', label: 'Cyberpunk Pink', color: 'from-pink-500 to-purple-600' },
                    { id: 'quantum-blue', label: 'Quantum Blue', color: 'from-blue-500 to-cyan-400' },
                    { id: 'emerald-teal', label: 'Hyper Teal', color: 'from-teal-400 to-emerald-500' }
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        soundFx.playClick();
                        setAccentColor(preset.id);
                        setIsThemeMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between hover:bg-white/10 text-slate-200 hover:text-white transition-colors"
                    >
                      <span>{preset.label}</span>
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${preset.color}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart / Provisioning Drawer Trigger */}
            <button
              onClick={() => {
                soundFx.playClick();
                setIsCartOpen(true);
              }}
              className="relative px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-mono text-xs font-bold tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-400/40 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-cyan-300" />
              <span className="hidden sm:inline">PROVISION</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-pink-500 text-white text-[10px] font-extrabold flex items-center justify-center animate-bounce shadow-[0_0_10px_#ec4899]">
                  {cartCount}
                </span>
              )}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer Bar */}
        <div className="xl:hidden mt-3 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap flex items-center gap-1.5 border transition-all ${
                  isActive
                    ? 'bg-purple-600/80 text-white border-purple-400 font-bold shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                    : 'bg-black/40 text-slate-300 border-white/10 hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-cyan-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
