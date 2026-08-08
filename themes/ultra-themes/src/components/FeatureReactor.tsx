import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Cpu, 
  Activity, 
  Sparkles, 
  Play, 
  Flame, 
  CheckCircle2, 
  RefreshCw,
  Sliders,
  Terminal
} from 'lucide-react';
import { REACTOR_NODES } from '../data/mockData';
import { ReactorNode } from '../types';
import { soundFx } from '../utils/audio';

export const FeatureReactor: React.FC = () => {
  const [nodes, setNodes] = useState<ReactorNode[]>(REACTOR_NODES);
  const [selectedNode, setSelectedNode] = useState<ReactorNode>(REACTOR_NODES[0]);
  const [packetProgress, setPacketProgress] = useState<number>(0);
  const [isInjecting, setIsInjecting] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([
    '08:42:01.002 [REACTOR] Core initialized at 100 PFLOPS',
    '08:42:01.120 [SYNAPSE] Coherence lock confirmed across 5 channels'
  ]);

  // Animate energy packets flowing along bezier channels
  useEffect(() => {
    const interval = setInterval(() => {
      setPacketProgress(prev => (prev + (isInjecting ? 0.05 : 0.015)) % 1);
    }, 16);
    return () => clearInterval(interval);
  }, [isInjecting]);

  const handleInjectBurst = () => {
    soundFx.playPulse();
    setIsInjecting(true);
    const newLog = `${new Date().toLocaleTimeString()} [BURST] High-density data pulse injected (+400 Gbps stream)`;
    setLogs(prev => [newLog, ...prev.slice(0, 4)]);

    // Temporarily increase load on selected node
    setNodes(prev => prev.map(n => n.id === selectedNode.id ? { ...n, load: Math.min(100, n.load + 15) } : n));

    setTimeout(() => {
      setIsInjecting(false);
    }, 2000);
  };

  const toggleOverclock = () => {
    soundFx.playClick();
    const nextStatus = selectedNode.status === 'overclocked' ? 'active' : 'overclocked';
    const updated = { ...selectedNode, status: nextStatus as ReactorNode['status'] };
    setSelectedNode(updated);
    setNodes(prev => prev.map(n => n.id === selectedNode.id ? updated : n));

    const newLog = `${new Date().toLocaleTimeString()} [OVERCLOCK] ${selectedNode.name} status changed to ${nextStatus.toUpperCase()}`;
    setLogs(prev => [newLog, ...prev.slice(0, 4)]);
  };

  return (
    <section id="reactor" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-mono tracking-widest uppercase mb-3">
            <Zap className="w-3.5 h-3.5 animate-bounce" />
            <span>05 // DYNAMIC PIPELINE REACTOR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
            DATA FLOW <br />
            <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              FEATURE REACTOR
            </span>
          </h2>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleInjectBurst}
            disabled={isInjecting}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white font-mono text-xs font-extrabold tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(20,184,166,0.5)] cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-cyan-200 animate-spin" />
            <span>{isInjecting ? 'INJECTING PULSE...' : 'INJECT DATA BURST'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* SVG Interactive Animated Node Canvas Diagram */}
        <div className="lg:col-span-8 glass-panel rounded-3xl p-6 border border-teal-500/30 relative min-h-[440px] sm:min-h-[500px] flex items-center justify-center overflow-hidden shadow-2xl">
          
          {/* SVG Connector Channels */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Render Connection Bezier Curves between Nodes */}
            {nodes.map(node => {
              return node.connectedTo.map(targetId => {
                const targetNode = nodes.find(n => n.id === targetId);
                if (!targetNode) return null;

                const startX = `${node.x}%`;
                const startY = `${node.y}%`;
                const endX = `${targetNode.x}%`;
                const endY = `${targetNode.y}%`;

                // Calculate midpoint along path for animated packet
                const pX = node.x + (targetNode.x - node.x) * packetProgress;
                const pY = node.y + (targetNode.y - node.y) * packetProgress;

                return (
                  <g key={`${node.id}-${targetId}`}>
                    {/* Glowing Wire Channel */}
                    <line
                      x1={startX}
                      y1={startY}
                      x2={endX}
                      y2={endY}
                      stroke="url(#grad-blue)"
                      strokeWidth={isInjecting ? 3 : 1.5}
                      strokeDasharray="4 4"
                      className="opacity-60"
                    />

                    {/* Moving Data Packet Light Spec */}
                    <circle
                      cx={`${pX}%`}
                      cy={`${pY}%`}
                      r={isInjecting ? 6 : 4}
                      fill={node.accent}
                      className="shadow-lg"
                      style={{
                        filter: `drop-shadow(0 0 10px ${node.accent})`
                      }}
                    />
                  </g>
                );
              });
            })}
          </svg>

          {/* Render Interactive Reactor Nodes */}
          {nodes.map((node) => {
            const isSelected = selectedNode.id === node.id;

            return (
              <div
                key={node.id}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedNode(node);
                }}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                className={`absolute z-10 cursor-pointer transition-all ${
                  isSelected ? 'scale-125 z-20' : 'hover:scale-110'
                }`}
              >
                <div 
                  className="w-16 h-16 rounded-2xl glass-panel p-[2px] flex items-center justify-center relative shadow-2xl"
                  style={{
                    borderColor: node.accent,
                    boxShadow: isSelected ? `0 0 30px ${node.accent}` : `0 0 15px ${node.accent}66`
                  }}
                >
                  <div className="w-full h-full bg-[#080d24] rounded-[13px] flex flex-col items-center justify-center">
                    <Cpu className="w-6 h-6" style={{ color: node.accent }} />
                    <span className="text-[9px] font-mono font-bold text-slate-200 mt-0.5">
                      {node.load}%
                    </span>
                  </div>

                  {/* Status Indicator */}
                  {node.status === 'overclocked' && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-[8px] font-black animate-ping" />
                  )}
                </div>

                <p className="text-[10px] font-mono font-bold text-center text-slate-200 mt-2 whitespace-nowrap bg-black/60 px-2 py-0.5 rounded-full border border-white/10">
                  {node.name}
                </p>
              </div>
            );
          })}

        </div>

        {/* Selected Node Telemetry Panel */}
        <div className="lg:col-span-4 glass-panel rounded-3xl p-6 border border-teal-500/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold uppercase">
              NODE TELEMETRY
            </span>
            <span className={`text-xs font-mono font-bold ${
              selectedNode.status === 'overclocked' ? 'text-rose-400' : 'text-emerald-400'
            }`}>
              ● {selectedNode.status.toUpperCase()}
            </span>
          </div>

          <h3 className="text-2xl font-black text-white mb-1">
            {selectedNode.name}
          </h3>
          <p className="text-xs font-mono text-slate-400 mb-6">
            Capacity Limit: {selectedNode.capacity}
          </p>

          {/* Load Meter Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
              <span>CURRENT LOAD</span>
              <span className="font-bold text-teal-300">{selectedNode.load}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-black/60 p-0.5 border border-white/10">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-teal-400 to-purple-500 transition-all duration-300 shadow-[0_0_10px_#14b8a6]"
                style={{ width: `${selectedNode.load}%` }}
              />
            </div>
          </div>

          <button
            onClick={toggleOverclock}
            className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs font-bold border border-white/20 mb-6 flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Flame className="w-4 h-4 text-rose-400" />
            <span>TOGGLE OVERCLOCK MODE</span>
          </button>

          {/* Live System Log Terminal Output */}
          <div className="p-3.5 rounded-2xl bg-black/80 border border-white/10 text-[10px] font-mono text-slate-300 space-y-1.5">
            <p className="text-cyan-400 font-bold flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5" />
              SYSTEM LOG STREAM
            </p>
            {logs.map((log, i) => (
              <p key={i} className="text-slate-400 truncate">
                {log}
              </p>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
};
