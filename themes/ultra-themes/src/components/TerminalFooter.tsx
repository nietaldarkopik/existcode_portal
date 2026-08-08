import React, { useState } from 'react';
import { 
  Building2, 
  Terminal, 
  Send, 
  ShieldCheck, 
  Check, 
  Globe2, 
  Lock, 
  FileText 
} from 'lucide-react';
import { ThemeBaseMode, AccentColor, CompanyBranding } from '../types';
import { BASE_THEME_CLASSES, ACCENT_CONFIGS } from '../utils/theme';
import { soundFx } from '../utils/audio';

interface Props {
  themeMode?: ThemeBaseMode;
  accentColor?: AccentColor;
  branding?: CompanyBranding;
}

export const TerminalFooter: React.FC<Props> = ({
  themeMode = 'dark-slate',
  accentColor = 'blue',
  branding = {
    name: 'NexusCorp Global',
    tagline: 'Next-Gen Enterprise Infrastructure & AI Systems',
    industry: 'Cloud & Technology Infrastructure',
  },
}) => {
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    `${branding.name} Enterprise Console [Version 4.2.0]`,
    'Type "help" or "status" to inspect operational data centers.'
  ]);

  const [emailInput, setEmailInput] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const baseTheme = BASE_THEME_CLASSES[themeMode] || BASE_THEME_CLASSES['dark-slate'];
  const accent = ACCENT_CONFIGS[accentColor] || ACCENT_CONFIGS['blue'];

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    soundFx.playClick();
    const cmd = terminalInput.trim().toLowerCase();
    const newLogs = [...terminalLogs, `> ${terminalInput}`];

    if (cmd === 'help') {
      newLogs.push('Available commands: status, regions, compliance, clear, ping');
    } else if (cmd === 'status') {
      newLogs.push('STATUS: All 48 Enterprise Regions Operational | Uptime: 99.999% | SLA: Active');
    } else if (cmd === 'regions') {
      newLogs.push('REGIONS: Jakarta, Singapore, Tokyo, Frankfurt, London, New York active.');
    } else if (cmd === 'compliance') {
      newLogs.push('COMPLIANCE: ISO 27001, SOC 2 Type II, GDPR, HIPAA certified.');
    } else if (cmd === 'clear') {
      setTerminalLogs([]);
      setTerminalInput('');
      return;
    } else {
      newLogs.push(`Command not recognized: "${cmd}". Type "help" for a list of commands.`);
    }

    setTerminalLogs(newLogs);
    setTerminalInput('');
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    soundFx.playSuccess();
    setIsSubscribed(true);
    setEmailInput('');
  };

  return (
    <footer className={`mt-20 border-t ${baseTheme.border} ${baseTheme.navBg} relative overflow-hidden z-10 pt-16 pb-12 px-4 sm:px-8`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Brand & Console Prompt (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${accent.gradient} p-[1px] bg-gradient-to-br shrink-0`}>
                <div className={`w-full h-full rounded-[11px] flex items-center justify-center ${baseTheme.isDark ? 'bg-slate-900' : 'bg-white'}`}>
                  <Building2 className={`w-5 h-5 ${accent.text}`} />
                </div>
              </div>
              <span className={`font-black text-xl tracking-tight ${baseTheme.textPrimary}`}>
                {branding.name}
              </span>
            </div>

            <p className={`text-xs ${baseTheme.textMuted} leading-relaxed max-w-sm`}>
              {branding.tagline}. High-performance cloud solutions, sub-millisecond AI tensor orchestration, and enterprise zero-trust security architecture.
            </p>

            {/* Interactive Corporate Shell Console */}
            <div className={`p-4 rounded-2xl border ${baseTheme.card} ${baseTheme.border} text-xs font-mono max-w-md shadow-lg`}>
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] text-slate-400">
                <span className={`flex items-center gap-1.5 ${accent.text}`}>
                  <Terminal className="w-3.5 h-3.5" />
                  ENTERPRISE SHELL CONSOLE
                </span>
                <span>STATUS: NOMINAL</span>
              </div>

              <div className="h-28 overflow-y-auto space-y-1 mb-3 text-[11px] font-mono no-scrollbar opacity-90">
                {terminalLogs.map((log, idx) => (
                  <p key={idx} className={log.startsWith('>') ? accent.text : baseTheme.textMuted}>
                    {log}
                  </p>
                ))}
              </div>

              <form onSubmit={handleCommandSubmit} className="flex items-center gap-2">
                <span className={accent.text}>&gt;</span>
                <input 
                  type="text" 
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder='Type "help" or "status"'
                  className={`w-full bg-transparent text-xs ${baseTheme.textPrimary} outline-none font-mono`}
                />
              </form>
            </div>
          </div>

          {/* Links & Information (Span 7) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Solutions */}
            <div>
              <h4 className={`text-xs font-mono font-bold uppercase tracking-wider mb-4 ${baseTheme.textMuted}`}>
                Solutions & Cloud
              </h4>
              <ul className={`space-y-2.5 text-xs ${baseTheme.textMuted}`}>
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Quantum Synapse Cloud</li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Holographic Shield Zero</li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Hyper-Flux Database Matrix</li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Orbital Neural Telemetry</li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Edge Micro-Enclaves</li>
              </ul>
            </div>

            {/* Enterprise & Security */}
            <div>
              <h4 className={`text-xs font-mono font-bold uppercase tracking-wider mb-4 ${baseTheme.textMuted}`}>
                Compliance & Trust
              </h4>
              <ul className={`space-y-2.5 text-xs ${baseTheme.textMuted}`}>
                <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> ISO 27001 Certified</li>
                <li className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-emerald-400" /> SOC 2 Type II Audited</li>
                <li className="flex items-center gap-1.5"><Globe2 className="w-3.5 h-3.5 text-emerald-400" /> GDPR & HIPAA Compliant</li>
                <li className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-emerald-400" /> Post-Quantum Kyber Key</li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className={`text-xs font-mono font-bold uppercase tracking-wider mb-4 ${baseTheme.textMuted}`}>
                Executive Insights
              </h4>
              <p className={`text-xs ${baseTheme.textMuted} mb-3`}>
                Subscribe to quarterly whitepapers and enterprise architecture updates.
              </p>

              {isSubscribed ? (
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Subscribed successfully.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="executive@company.com"
                    className={`w-full px-3 py-2 rounded-xl text-xs bg-black/20 border ${baseTheme.border} ${baseTheme.textPrimary} outline-none focus:border-blue-500`}
                  />
                  <button
                    type="submit"
                    className={`w-full py-2 rounded-xl ${accent.primary} text-white font-mono text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5`}
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className={`pt-6 border-t ${baseTheme.border} flex flex-col sm:flex-row items-center justify-between text-xs ${baseTheme.textMuted} gap-4`}>
          <p>© {new Date().getFullYear()} {branding.name}. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[11px] font-mono">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Security SLAs</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
