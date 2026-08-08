import React, { useState } from 'react';
import { 
  Newspaper, 
  Sparkles, 
  Clock, 
  User, 
  Tag, 
  ArrowRight, 
  X, 
  Radio, 
  Share2,
  Flame
} from 'lucide-react';
import { NEWS_ARTICLES, TICKER_MESSAGES } from '../data/mockData';
import { NewsArticle } from '../types';
import { soundFx } from '../utils/audio';

export const KineticNewsStream: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [tiltPos, setTiltPos] = useState<{ [key: string]: { x: number; y: number } }>({});

  const handleMouseMove = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
    const rotateY = ((x - centerX) / centerX) * 10;

    setTiltPos(prev => ({ ...prev, [id]: { x: rotateX, y: rotateY } }));
  };

  const handleMouseLeave = (id: string) => {
    setHoveredCardId(null);
    setTiltPos(prev => ({ ...prev, [id]: { x: 0, y: 0 } }));
  };

  return (
    <section id="news" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* High-Speed Continuous Ticker Marquee Bar */}
      <div className="mb-12 glass-panel rounded-2xl py-3 px-4 border border-cyan-500/30 overflow-hidden relative shadow-[0_0_20px_rgba(6,182,212,0.2)]">
        <div className="flex items-center gap-3">
          <div className="shrink-0 flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>LIVE FEED</span>
          </div>

          <div className="overflow-hidden whitespace-nowrap w-full">
            <div className="animate-marquee font-mono text-xs text-slate-200 tracking-wider">
              {TICKER_MESSAGES.map((msg, idx) => (
                <span key={idx} className="inline-block mr-12 text-cyan-200">
                  {msg}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-3">
            <Newspaper className="w-3.5 h-3.5 animate-pulse" />
            <span>03 // TELEMETRY DISPATCHES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
            KINETIC <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              NEWS STREAM
            </span>
          </h2>
        </div>
        <p className="max-w-md text-slate-400 text-sm font-sans leading-relaxed">
          Dynamic 3D parallax cards reacting to cursor position with real-time hardware telemetry and research breakthroughs.
        </p>
      </div>

      {/* Dynamic 3D Parallax Tilt Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {NEWS_ARTICLES.map((article) => {
          const tilt = tiltPos[article.id] || { x: 0, y: 0 };
          const isHovered = hoveredCardId === article.id;

          return (
            <div
              key={article.id}
              onMouseEnter={() => {
                soundFx.playHover();
                setHoveredCardId(article.id);
              }}
              onMouseMove={(e) => handleMouseMove(article.id, e)}
              onMouseLeave={() => handleMouseLeave(article.id)}
              onClick={() => {
                soundFx.playClick();
                setSelectedArticle(article);
              }}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
              }}
              className="glass-panel rounded-3xl p-6 border border-white/15 relative overflow-hidden group cursor-pointer flex flex-col justify-between shadow-xl hover:border-cyan-400/60 hover:shadow-[0_20px_50px_rgba(6,182,212,0.3)] transition-all"
            >
              {/* Glint Sweep Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

              <div>
                {/* Article Header Image */}
                <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-5 border border-white/10">
                  <img
                    src={article.image}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080d22] via-transparent to-transparent" />
                  
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-bold uppercase">
                    {article.category}
                  </span>
                </div>

                {/* Article Date & Read Time */}
                <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {article.readTime}
                  </span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-6">
                  {article.summary}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 truncate max-w-[180px]">By {article.author}</span>
                <span className="text-cyan-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  READ DISPATCH
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>

            </div>
          );
        })}
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-3xl rounded-3xl p-6 sm:p-8 border border-cyan-500/40 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                soundFx.playClick();
                setSelectedArticle(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold uppercase">
                {selectedArticle.category}
              </span>
              <span className="text-xs font-mono text-slate-400">• {selectedArticle.date}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              {selectedArticle.title}
            </h2>

            <p className="text-sm font-semibold text-cyan-300 mb-6">
              {selectedArticle.subtitle}
            </p>

            <div className="relative h-64 rounded-2xl overflow-hidden mb-6 border border-white/10">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover" 
              />
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
              {selectedArticle.fullText}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedArticle.tags.map((tag, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Author: {selectedArticle.author}</span>
              <button 
                onClick={() => soundFx.playSuccess()}
                className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>SHARE TELEMETRY</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
