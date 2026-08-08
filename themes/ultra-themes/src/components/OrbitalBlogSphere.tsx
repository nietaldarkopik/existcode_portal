import React, { useEffect, useState } from 'react';
import { 
  Orbit, 
  Sparkles, 
  Clock, 
  User, 
  RotateCcw, 
  Play, 
  Pause, 
  ArrowRight, 
  X,
  Compass
} from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';
import { soundFx } from '../utils/audio';

export const OrbitalBlogSphere: React.FC = () => {
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(0.008);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [filterTag, setFilterTag] = useState<string>('all');

  const allTags = ['all', 'Distributed Systems', 'WebGPU', 'Quantum Safe', 'Spatial UI'];

  const filteredPosts = filterTag === 'all'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.tags.includes(filterTag));

  useEffect(() => {
    if (!isRotating) return;
    const interval = setInterval(() => {
      setRotationAngle(prev => (prev + rotationSpeed) % (Math.PI * 2));
    }, 16);
    return () => clearInterval(interval);
  }, [isRotating, rotationSpeed]);

  const radius = 280; // Orbital radius in pixels

  return (
    <section id="blog" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Title Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-mono tracking-widest uppercase mb-3">
            <Orbit className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
            <span>04 // VOLUMETRIC KNOWLEDGE BASE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
            INTERACTIVE <br />
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              BLOG SPHERE
            </span>
          </h2>
        </div>

        {/* Orbit Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              soundFx.playClick();
              setIsRotating(!isRotating);
            }}
            className="px-3.5 py-1.5 rounded-xl glass-panel text-xs font-mono flex items-center gap-2 text-slate-200 hover:text-white border border-white/15 cursor-pointer"
          >
            {isRotating ? <Pause className="w-3.5 h-3.5 text-pink-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isRotating ? 'PAUSE ORBIT' : 'RESUME ORBIT'}</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setRotationAngle(0);
            }}
            className="p-1.5 rounded-xl glass-panel text-slate-300 hover:text-white border border-white/15 cursor-pointer"
            title="Reset Orbit Alignment"
          >
            <RotateCcw className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* Filter Tag Chips */}
      <div className="flex flex-wrap gap-2 mb-12">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => {
              soundFx.playHover();
              setFilterTag(tag);
            }}
            className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
              filterTag === tag
                ? 'bg-pink-600 text-white font-bold border border-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.5)]'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* 3D Orbital Perspective Canvas Area */}
      <div className="relative min-h-[520px] sm:min-h-[600px] flex items-center justify-center overflow-hidden rounded-3xl glass-panel border border-white/15 p-6 shadow-2xl">
        
        {/* Orbital Background Ellipse Rings */}
        <div className="absolute w-[560px] h-[220px] rounded-full border border-pink-500/20 rotate-[-12deg] animate-pulse pointer-events-none" />
        <div className="absolute w-[480px] h-[180px] rounded-full border border-cyan-500/20 rotate-[15deg] pointer-events-none" />

        {/* Central Quantum Core Sphere */}
        <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-500 p-[2px] shadow-[0_0_50px_rgba(236,72,153,0.8)] animate-pulse-glow flex items-center justify-center">
          <div className="w-full h-full bg-[#05091b] rounded-full flex flex-col items-center justify-center p-2 text-center">
            <Sparkles className="w-6 h-6 text-pink-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span className="text-[9px] font-mono text-cyan-300 font-extrabold uppercase mt-1">CORE NODE</span>
          </div>
        </div>

        {/* Orbiting Post Cards in 3D Perspective Space */}
        {filteredPosts.map((post, index) => {
          const step = (Math.PI * 2) / filteredPosts.length;
          const currentAngle = rotationAngle + index * step;

          const x = Math.cos(currentAngle) * radius;
          const z = Math.sin(currentAngle) * radius; // Depth in 3D space
          const y = Math.sin(currentAngle * 2) * 40; // Slight vertical oscillation

          // Scale and opacity calculation based on Z depth
          const scale = 0.75 + ((z + radius) / (radius * 2)) * 0.45; // 0.75 to 1.2
          const opacity = 0.4 + ((z + radius) / (radius * 2)) * 0.6; // 0.4 to 1.0
          const zIndex = Math.round(z + radius);

          return (
            <div
              key={post.id}
              onClick={() => {
                soundFx.playClick();
                setActivePost(post);
              }}
              style={{
                transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`,
                opacity: opacity,
                zIndex: zIndex
              }}
              className="absolute w-72 sm:w-80 glass-panel-interactive rounded-2xl p-5 border border-purple-500/40 shadow-2xl cursor-pointer group transition-transform duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/40 font-bold uppercase">
                  {post.readTime}
                </span>
                <span className="text-[10px] font-mono text-slate-400">{post.date}</span>
              </div>

              <h3 className="text-base font-bold text-white mb-2 line-clamp-2 group-hover:text-pink-300 transition-colors">
                {post.title}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  referrerPolicy="no-referrer"
                  className="w-6 h-6 rounded-full object-cover border border-pink-500/40" 
                />
                <div>
                  <p className="text-[11px] font-bold text-slate-200 leading-none">{post.author.name}</p>
                  <p className="text-[9px] font-mono text-slate-400">{post.author.role}</p>
                </div>
              </div>
            </div>
          );
        })}

      </div>

      {/* Reading Overlay Modal when a post is clicked */}
      {activePost && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-pink-500/40 shadow-2xl relative">
            <button
              onClick={() => {
                soundFx.playClick();
                setActivePost(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40 text-xs font-mono font-bold uppercase">
                {activePost.readTime}
              </span>
              <span className="text-xs font-mono text-slate-400">• Published {activePost.date}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
              {activePost.title}
            </h2>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/40 border border-white/10 mb-6">
              <img 
                src={activePost.author.avatar} 
                alt={activePost.author.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border border-pink-500/50" 
              />
              <div>
                <p className="text-sm font-bold text-white">{activePost.author.name}</p>
                <p className="text-xs font-mono text-cyan-300">{activePost.author.role}</p>
              </div>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed mb-6">
              {activePost.excerpt} This deep-dive article explores the mathematics behind quantum coherence, optical state synchronization, and spatial glassmorphism UI/UX design languages.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {activePost.tags.map((tag, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-mono">
                  #{tag}
                </span>
              ))}
            </div>

            <button
              onClick={() => {
                soundFx.playSuccess();
                setActivePost(null);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-mono text-xs font-bold tracking-wider cursor-pointer shadow-[0_0_20px_rgba(236,72,153,0.5)]"
            >
              CLOSE VOLUMETRIC VIEW
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
