import React from 'react';
import { ThemeBaseMode, AccentColor } from '../types';
import { BASE_THEME_CLASSES, ACCENT_CONFIGS } from '../utils/theme';

interface Props {
  children: React.ReactNode;
  themeMode: ThemeBaseMode;
  accentColor: AccentColor;
}

export const CorporateAppLayout: React.FC<Props> = ({
  children,
  themeMode,
  accentColor,
}) => {
  const baseTheme = BASE_THEME_CLASSES[themeMode] || BASE_THEME_CLASSES['dark-slate'];
  const accent = ACCENT_CONFIGS[accentColor] || ACCENT_CONFIGS['blue'];

  return (
    <div className={`min-h-screen ${baseTheme.bg} transition-colors duration-300 relative overflow-x-hidden font-sans selection:bg-blue-600/30 selection:text-white`}>
      {/* Background Decorative Mesh & Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle Ambient Orbs matching accent color */}
        <div 
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 transition-all duration-700" 
          style={{ backgroundColor: accent.hex }}
        />
        <div 
          className="absolute top-1/3 -right-40 w-[550px] h-[550px] rounded-full blur-[160px] opacity-20 transition-all duration-700" 
          style={{ backgroundColor: accent.hex }}
        />
        <div 
          className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] rounded-full blur-[180px] opacity-15 transition-all duration-700" 
          style={{ backgroundColor: accent.hex }}
        />

        {/* Professional Subtle Grid overlay */}
        <div className={`absolute inset-0 ${baseTheme.isDark ? 'bg-cyber-grid opacity-30' : 'bg-cyber-grid opacity-10'}`} />
      </div>

      {/* Main Content Viewport */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </div>
  );
};
