import React, { useState } from 'react';
import { CorporateAppLayout } from './components/CorporateAppLayout';
import { CorporateHeader } from './components/CorporateHeader';
import { ParticleHero } from './components/ParticleHero';
import { ServiceMatrix } from './components/ServiceMatrix';
import { ProductUniverse } from './components/ProductUniverse';
import { KineticNewsStream } from './components/KineticNewsStream';
import { OrbitalBlogSphere } from './components/OrbitalBlogSphere';
import { FeatureReactor } from './components/FeatureReactor';
import { TerminalFooter } from './components/TerminalFooter';
import { CartDrawer } from './components/CartDrawer';
import { ThemeCustomizerModal } from './components/ThemeCustomizerModal';
import { BentoLayoutView } from './components/BentoLayoutView';
import { SidebarLayoutView } from './components/SidebarLayoutView';
import { CompactPortalView } from './components/CompactPortalView';
import { ProductItem, CartItem, ThemeBaseMode, AccentColor, LayoutMode, CompanyBranding } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [themeMode, setThemeMode] = useState<ThemeBaseMode>('dark-slate');
  const [accentColor, setAccentColor] = useState<AccentColor>('blue');
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('showcase');
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);

  const [branding, setBranding] = useState<CompanyBranding>({
    name: 'NexusCorp Global',
    tagline: 'Next-Gen Enterprise Infrastructure & AI Systems',
    industry: 'Cloud & Technology Infrastructure',
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const handleAddToCart = (product: ProductItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CorporateAppLayout themeMode={themeMode} accentColor={accentColor}>
      {/* Header is shown in Showcase, Bento, and Compact modes */}
      {layoutMode !== 'sidebar' && (
        <CorporateHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          cartCount={totalCartCount}
          setIsCartOpen={setIsCartOpen}
          themeMode={themeMode}
          setThemeMode={setThemeMode}
          accentColor={accentColor}
          setAccentColor={setAccentColor}
          layoutMode={layoutMode}
          setLayoutMode={setLayoutMode}
          branding={branding}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />
      )}

      {/* Main Content Area rendering according to selected Layout Mode */}
      {layoutMode === 'showcase' && (
        <main className="space-y-12">
          {/* Executive Hero with 3D Canvas Particle Engine */}
          <ParticleHero themeMode={themeMode} accentColor={accentColor} branding={branding} />

          {/* Solution Matrix */}
          <ServiceMatrix />

          {/* Enterprise Product Universe */}
          <ProductUniverse onAddToCart={handleAddToCart} />

          {/* Corporate News Stream */}
          <KineticNewsStream />

          {/* Thought Leadership Blog Sphere */}
          <OrbitalBlogSphere />

          {/* Infrastructure Topology Reactor */}
          <FeatureReactor />
        </main>
      )}

      {layoutMode === 'bento' && (
        <BentoLayoutView
          themeMode={themeMode}
          accentColor={accentColor}
          branding={branding}
          onAddToCart={handleAddToCart}
          onNavigateTab={(tab) => {
            setActiveTab(tab);
            setLayoutMode('showcase');
            setTimeout(() => {
              const el = document.getElementById(tab);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
        />
      )}

      {layoutMode === 'sidebar' && (
        <SidebarLayoutView
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          themeMode={themeMode}
          accentColor={accentColor}
          branding={branding}
          cartCount={totalCartCount}
          setIsCartOpen={setIsCartOpen}
          onAddToCart={handleAddToCart}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />
      )}

      {layoutMode === 'compact' && (
        <CompactPortalView
          themeMode={themeMode}
          accentColor={accentColor}
          branding={branding}
          onAddToCart={handleAddToCart}
          onNavigateTab={(tab) => {
            setActiveTab(tab);
            setLayoutMode('showcase');
            setTimeout(() => {
              const el = document.getElementById(tab);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
        />
      )}

      {/* Corporate Footer (Rendered across all layout modes) */}
      <TerminalFooter themeMode={themeMode} accentColor={accentColor} branding={branding} />

      {/* Theme & Color Palette Customizer Modal */}
      <ThemeCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        accentColor={accentColor}
        setAccentColor={setAccentColor}
        layoutMode={layoutMode}
        setLayoutMode={setLayoutMode}
        branding={branding}
        setBranding={setBranding}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      {/* Enterprise Proposal Quote Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </CorporateAppLayout>
  );
}
