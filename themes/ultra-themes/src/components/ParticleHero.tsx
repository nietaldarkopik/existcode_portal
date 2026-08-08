import React, { useEffect, useRef, useState } from 'react';
import { 
  Sparkles, 
  Play, 
  Zap, 
  ArrowRight, 
  Sliders, 
  Building2, 
  ShieldCheck, 
  Globe2 
} from 'lucide-react';
import { ThemeBaseMode, AccentColor, CompanyBranding } from '../types';
import { BASE_THEME_CLASSES, ACCENT_CONFIGS } from '../utils/theme';
import { soundFx } from '../utils/audio';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  color: string;
  baseX: number;
  baseY: number;
}

type SimulationMode = 'hyper-mesh' | 'cyber-matrix' | 'plasma-vortex' | 'warp-speed';

interface Props {
  themeMode?: ThemeBaseMode;
  accentColor?: AccentColor;
  branding?: CompanyBranding;
}

export const ParticleHero: React.FC<Props> = ({
  themeMode = 'dark-slate',
  accentColor = 'blue',
  branding = {
    name: 'NexusCorp Global',
    tagline: 'Next-Gen Enterprise Infrastructure & AI Systems',
    industry: 'Cloud & Technology Infrastructure',
  },
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [simMode, setSimMode] = useState<SimulationMode>('hyper-mesh');
  const [particleCount, setParticleCount] = useState<number>(140);
  const [activeMetric, setActiveMetric] = useState<'latency' | 'throughput' | 'coherence'>('latency');

  const mouseRef = useRef<{ x: number; y: number; isDown: boolean }>({ x: -1000, y: -1000, isDown: false });

  const baseTheme = BASE_THEME_CLASSES[themeMode] || BASE_THEME_CLASSES['dark-slate'];
  const accent = ACCENT_CONFIGS[accentColor] || ACCENT_CONFIGS['blue'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize 3D Particles adapted to Accent Color
    const mainHex = accent.hex;
    const colors = [mainHex, '#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#06b6d4'];
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * width * 1.5;
      const y = (Math.random() - 0.5) * height * 1.5;
      const z = Math.random() * 800 + 100;
      particles.push({
        x,
        y,
        z,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        vz: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 2.5 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseX: x,
        baseY: y
      });
    }

    const shockwaves: { x: number; y: number; radius: number; maxRadius: number; color: string }[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      soundFx.playPulse();
      shockwaves.push({
        x,
        y,
        radius: 0,
        maxRadius: 280,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);

    let angle = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep dark/light background gradient
      const bgGlow = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width * 0.7);
      if (baseTheme.isDark) {
        bgGlow.addColorStop(0, 'rgba(15, 23, 42, 0.5)');
        bgGlow.addColorStop(1, 'rgba(3, 7, 18, 0.95)');
      } else {
        bgGlow.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        bgGlow.addColorStop(1, 'rgba(241, 245, 249, 0.95)');
      }
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      angle += 0.005;
      const focalLength = 400;
      const centerX = width / 2;
      const centerY = height / 2;

      // Render shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 8;
        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = sw.color;
        ctx.lineWidth = Math.max(0.5, (1 - sw.radius / sw.maxRadius) * 4);
        ctx.shadowBlur = 15;
        ctx.shadowColor = sw.color;
        ctx.stroke();
        ctx.restore();

        if (sw.radius >= sw.maxRadius) {
          shockwaves.splice(i, 1);
        }
      }

      // Draw particles
      const projectedPoints: { x: number; y: number; z: number; color: string; radius: number }[] = [];

      particles.forEach((p) => {
        if (simMode === 'hyper-mesh') {
          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;
          if (p.z > 1000) p.z = 100;
          if (p.z < 100) p.z = 1000;
          if (p.x > width) p.x = -width / 2;
          if (p.x < -width / 2) p.x = width;
          if (p.y > height) p.y = -height / 2;
          if (p.y < -height / 2) p.y = height;
        } else if (simMode === 'cyber-matrix') {
          p.y += Math.abs(p.vy) * 3 + 2;
          p.z += p.vz * 0.2;
          if (p.y > height) {
            p.y = -50;
            p.x = (Math.random() - 0.5) * width;
          }
        } else if (simMode === 'plasma-vortex') {
          const dist = Math.sqrt(p.x * p.x + p.y * p.y);
          const currentAngle = Math.atan2(p.y, p.x) + 0.015;
          p.x = Math.cos(currentAngle) * dist;
          p.y = Math.sin(currentAngle) * dist;
          p.z += Math.sin(angle * 2) * 2;
        } else if (simMode === 'warp-speed') {
          p.z -= 18;
          if (p.z < 10) {
            p.z = 1000;
            p.x = (Math.random() - 0.5) * width * 1.5;
            p.y = (Math.random() - 0.5) * height * 1.5;
          }
        }

        const scale = focalLength / (focalLength + p.z);
        const projX = p.x * scale + centerX;
        const projY = p.y * scale + centerY;

        const dx = mouseRef.current.x - projX;
        const dy = mouseRef.current.y - projY;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        let finalX = projX;
        let finalY = projY;

        if (distToMouse < 160) {
          const force = (160 - distToMouse) / 160;
          finalX -= (dx / distToMouse) * force * 35;
          finalY -= (dy / distToMouse) * force * 35;
        }

        projectedPoints.push({
          x: finalX,
          y: finalY,
          z: p.z,
          color: p.color,
          radius: p.radius * scale * 2.2
        });
      });

      if (simMode === 'hyper-mesh') {
        const len = projectedPoints.length;
        for (let i = 0; i < len; i++) {
          for (let j = i + 1; j < len; j++) {
            const p1 = projectedPoints[i];
            const p2 = projectedPoints[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 110) {
              const alpha = (1 - dist / 110) * 0.35;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = p1.color;
              ctx.globalAlpha = alpha;
              ctx.lineWidth = 0.8;
              ctx.stroke();
              ctx.globalAlpha = 1.0;
            }
          }
        }
      }

      projectedPoints.forEach((pt) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, Math.max(0.8, pt.radius), 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.shadowBlur = pt.radius * 6;
        ctx.shadowColor = pt.color;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mousedown', handleMouseDown);
      }
    };
  }, [simMode, particleCount, accentColor, themeMode]);

  return (
    <section id="hero" className="relative min-h-[680px] lg:min-h-[720px] flex items-center justify-center pt-8 pb-12 px-4 overflow-hidden rounded-3xl">
      {/* 3D Canvas Particle Engine */}
      <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />
      </div>

      {/* Hero Foreground Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center">
        
        {/* Top Corporate Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${baseTheme.card} ${baseTheme.border} shadow-lg mb-8 animate-float`}>
          <Building2 className={`w-4 h-4 ${accent.text}`} />
          <span className={`text-xs font-mono font-bold uppercase tracking-wider ${baseTheme.textPrimary}`}>
            {branding.industry}
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-1" />
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 font-sans leading-[1.05]">
          <span className={`block ${baseTheme.textPrimary}`}>
            ENTERPRISE INTELLIGENCE.
          </span>
          <span className={`bg-clip-text text-transparent bg-gradient-to-r ${accent.gradient}`}>
            UNMATCHED SCALE.
          </span>
        </h1>

        {/* Subtitle Description */}
        <p className={`max-w-2xl text-base sm:text-lg font-normal leading-relaxed mb-8 ${baseTheme.textMuted}`}>
          {branding.tagline}. Engineered for sub-millisecond cloud orchestration, zero-trust security, and high-performance quantum computing workloads.
        </p>

        {/* Call to Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <button 
            onClick={() => {
              soundFx.playSuccess();
              const el = document.getElementById('products');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-8 py-4 rounded-2xl ${accent.primary} hover:opacity-90 text-white font-mono text-sm font-extrabold tracking-wider flex items-center gap-3 shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer group`}
          >
            <Zap className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
            <span>EXPLORE PRODUCTS</span>
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
          </button>

          <button 
            onClick={() => {
              soundFx.playClick();
              const el = document.getElementById('reactor');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-8 py-4 rounded-2xl border ${baseTheme.card} ${baseTheme.border} ${baseTheme.textPrimary} font-mono text-sm font-bold tracking-wider flex items-center gap-3 shadow-md hover:bg-white/10 transition-all cursor-pointer`}
          >
            <Play className={`w-4 h-4 ${accent.text}`} />
            <span>INFRASTRUCTURE TOPOLOGY</span>
          </button>
        </div>

        {/* Interactive Simulation Controls */}
        <div className={`w-full max-w-3xl rounded-2xl p-4 border ${baseTheme.card} ${baseTheme.border} shadow-xl flex flex-col md:flex-row items-center justify-between gap-4`}>
          <div className={`flex items-center gap-2 text-xs font-mono font-bold uppercase ${baseTheme.textMuted}`}>
            <Sliders className={`w-4 h-4 ${accent.text}`} />
            <span>3D Engine Simulation Mode:</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'hyper-mesh', label: 'Hyper Mesh' },
              { id: 'cyber-matrix', label: 'Matrix Stream' },
              { id: 'plasma-vortex', label: 'Plasma Vortex' },
              { id: 'warp-speed', label: 'Warp Speed' }
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  soundFx.playHover();
                  setSimMode(mode.id as SimulationMode);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  simMode === mode.id
                    ? `${accent.primary} text-white font-bold shadow-md`
                    : `${baseTheme.border} ${baseTheme.textMuted} hover:bg-white/10`
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-mono ${baseTheme.textMuted}`}>Nodes: {particleCount}</span>
            <input 
              type="range" 
              min={60} 
              max={220} 
              step={20}
              value={particleCount}
              onChange={(e) => setParticleCount(Number(e.target.value))}
              className="w-20 accent-blue-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Benchmark Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 w-full max-w-3xl">
          {[
            { id: 'latency', value: '0.04 ms', label: 'GLOBAL LATENCY', sub: 'Sub-picosecond fiber link' },
            { id: 'throughput', value: '18.4 PFLOPS', label: 'SUSTAINED COMPUTE', sub: '256 Qubit Entanglement' },
            { id: 'coherence', value: '99.999%', label: 'SYSTEM SLA', sub: 'Zero-fault error correction' }
          ].map((stat) => (
            <div 
              key={stat.id}
              onClick={() => {
                soundFx.playClick();
                setActiveMetric(stat.id as 'latency' | 'throughput' | 'coherence');
              }}
              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all hover:scale-105 ${baseTheme.card} ${
                activeMetric === stat.id ? `ring-2 ${accent.ring} border-blue-400` : baseTheme.border
              }`}
            >
              <p className={`text-2xl font-black font-mono tracking-tight ${baseTheme.textPrimary} mb-1`}>
                {stat.value}
              </p>
              <p className={`text-[11px] font-mono font-bold tracking-wider ${accent.text} uppercase`}>
                {stat.label}
              </p>
              <p className={`text-[10px] ${baseTheme.textMuted} mt-1`}>
                {stat.sub}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
