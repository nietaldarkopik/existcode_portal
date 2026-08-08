import React, { useState } from 'react';
import { 
  Cpu, 
  Shield, 
  Database, 
  Radio, 
  Activity, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  X,
  Layers,
  Terminal,
  BarChart3
} from 'lucide-react';
import { SERVICES_DATA } from '../data/mockData';
import { ServiceItem } from '../types';
import { soundFx } from '../utils/audio';

export const ServiceMatrix: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return Cpu;
      case 'ShieldZap': return Shield;
      case 'Database': return Database;
      case 'Radio': return Radio;
      default: return Activity;
    }
  };

  const getAccentGlow = (color: ServiceItem['accentColor']) => {
    switch (color) {
      case 'blue':
        return {
          border: 'border-blue-500/30 hover:border-blue-400/80',
          glow: 'glow-blue',
          text: 'text-blue-400',
          badge: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
          gradient: 'from-blue-600 to-cyan-500'
        };
      case 'purple':
        return {
          border: 'border-purple-500/30 hover:border-purple-400/80',
          glow: 'glow-purple',
          text: 'text-purple-400',
          badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
          gradient: 'from-purple-600 to-pink-500'
        };
      case 'teal':
        return {
          border: 'border-teal-500/30 hover:border-teal-400/80',
          glow: 'glow-teal',
          text: 'text-teal-400',
          badge: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
          gradient: 'from-teal-500 to-emerald-400'
        };
      case 'pink':
        return {
          border: 'border-pink-500/30 hover:border-pink-400/80',
          glow: 'glow-pink',
          text: 'text-pink-400',
          badge: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
          gradient: 'from-pink-500 to-rose-600'
        };
    }
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono tracking-widest uppercase mb-3">
            <Layers className="w-3.5 h-3.5 animate-pulse" />
            <span>01 // ARCHITECTURAL TIERS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
            MULTI-DIMENSIONAL <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              SERVICE MATRIX
            </span>
          </h2>
        </div>
        <p className="max-w-md text-slate-400 text-sm font-sans leading-relaxed">
          Asymmetrical quantum compute layers engineered with heavy inner glows, instant optical bus routing, and real-time state synchronization.
        </p>
      </div>

      {/* Asymmetrical Layered Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {SERVICES_DATA.map((srv) => {
          const IconComponent = getIcon(srv.iconName);
          const style = getAccentGlow(srv.accentColor);

          return (
            <div
              key={srv.id}
              onClick={() => {
                soundFx.playClick();
                setSelectedService(srv);
              }}
              className={`${srv.gridSpan} glass-panel-interactive rounded-3xl p-6 lg:p-8 border ${style.border} relative overflow-hidden group cursor-pointer flex flex-col justify-between`}
            >
              {/* Top Accent Light Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${style.gradient} opacity-80 group-hover:opacity-100 transition-opacity`} />

              <div>
                {/* Floating 3D Icon & Category Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${style.gradient} p-[1px] shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    <div className="w-full h-full bg-[#080d22] rounded-[15px] flex items-center justify-center">
                      <IconComponent className={`w-7 h-7 ${style.text} group-hover:animate-bounce`} />
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border font-bold uppercase tracking-wider ${style.badge}`}>
                    {srv.category}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {srv.title}
                </h3>
                <p className="text-sm font-semibold text-slate-300 mb-3">
                  {srv.tagline}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {srv.description}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-2">
                {srv.stats.map((st, idx) => (
                  <div key={idx} className="bg-black/40 p-2.5 rounded-xl border border-white/5">
                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{st.label}</p>
                    <p className="text-xs sm:text-sm font-bold font-mono text-white mt-0.5">{st.value}</p>
                  </div>
                ))}
              </div>

              {/* Hover Trigger Action Arrow */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs font-mono text-cyan-400">
                <span>INSPECT MATRIX</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>

            </div>
          );
        })}
      </div>

      {/* Detail Modal for Selected Service */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-purple-500/40 shadow-2xl relative">
            <button
              onClick={() => {
                soundFx.playClick();
                setSelectedService(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40 text-xs font-mono font-bold uppercase">
                {selectedService.category}
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Cluster Operational
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
              {selectedService.title}
            </h3>
            <p className="text-sm font-semibold text-cyan-300 mb-6">
              {selectedService.tagline}
            </p>

            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 mb-6 space-y-3">
              <h4 className="text-xs font-mono text-slate-400 uppercase font-bold tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4 text-purple-400" />
                Quantum Capabilities & Specifications
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {selectedService.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-500/30">
                <p className="text-[10px] font-mono text-blue-300 uppercase">Latency Benchmark</p>
                <p className="text-xl font-bold font-mono text-white mt-1">{selectedService.latency}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/30">
                <p className="text-[10px] font-mono text-purple-300 uppercase">Throughput Bandwidth</p>
                <p className="text-xl font-bold font-mono text-white mt-1">{selectedService.throughput}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  soundFx.playSuccess();
                  setSelectedService(null);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-mono text-xs font-extrabold tracking-wider shadow-[0_0_20px_rgba(168,85,247,0.5)] cursor-pointer"
              >
                PROVISION CLUSTER INSTANCE
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
