import React from 'react';
import { CorporateAppLayout } from './CorporateAppLayout';
import { ThemeBaseMode, AccentColor } from '../types';

interface Props {
  children: React.ReactNode;
  themeMode?: ThemeBaseMode;
  accentColor?: AccentColor;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  cartCount?: number;
  setIsCartOpen?: (open: boolean) => void;
  isMuted?: boolean;
  setIsMuted?: (muted: boolean) => void;
}

export const FuturisticBrowserFrame: React.FC<Props> = ({
  children,
  themeMode = 'dark-slate',
  accentColor = 'blue',
}) => {
  return (
    <CorporateAppLayout themeMode={themeMode} accentColor={accentColor}>
      {children}
    </CorporateAppLayout>
  );
};
