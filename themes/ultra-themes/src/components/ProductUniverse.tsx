import React, { useState } from 'react';
import { 
  Database, 
  ShoppingBag, 
  Check, 
  Eye, 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  Star, 
  Layers, 
  X,
  Plus
} from 'lucide-react';
import { PRODUCTS_DATA } from '../data/mockData';
import { ProductItem } from '../types';
import { soundFx } from '../utils/audio';

interface Props {
  onAddToCart: (product: ProductItem) => void;
}

export const ProductUniverse: React.FC<Props> = ({ onAddToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', 'Ultra-Core Titan', 'Synapse Core', 'Photon Beam', 'Crystalline Storage'];

  const filteredProducts = filterCategory === 'all'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter(p => p.series === filterCategory);

  const handleAddToCartClick = (p: ProductItem, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClick();
    setAddingId(p.id);

    setTimeout(() => {
      soundFx.playSuccess();
      onAddToCart(p);
      setAddingId(null);
    }, 400);
  };

  return (
    <section id="products" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Title Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono tracking-widest uppercase mb-3">
            <Database className="w-3.5 h-3.5 animate-pulse" />
            <span>02 // HARDWARE MARKETPLACE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
            IMMERSIVE <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-teal-300 bg-clip-text text-transparent">
              PRODUCT UNIVERSE
            </span>
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFx.playHover();
                setFilterCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold border border-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.5)]'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:bg-white/10'
              }`}
            >
              {cat === 'all' ? 'All Hardware' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Products on Floating Glowing Platforms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((prod) => {
          const isAdding = addingId === prod.id;

          return (
            <div
              key={prod.id}
              onClick={() => {
                soundFx.playClick();
                setSelectedProduct(prod);
              }}
              className="glass-panel-interactive rounded-3xl p-5 border border-white/15 relative overflow-hidden group cursor-pointer flex flex-col justify-between"
            >
              {/* Hot Product Badge */}
              {prod.isHot && (
                <div className="absolute top-4 left-4 z-20 px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/50 text-[10px] font-mono font-extrabold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-pink-400 animate-spin" />
                  <span>HIGH DEMAND</span>
                </div>
              )}

              {/* Floating Glowing Product Image Platform with Reflection */}
              <div className="relative w-full h-52 rounded-2xl bg-gradient-to-b from-black/40 via-purple-950/20 to-black/80 p-4 flex items-center justify-center mb-5 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                
                {/* Platform Base Glow Ring */}
                <div className="absolute bottom-2 w-32 h-6 bg-cyan-500/30 rounded-full blur-xl group-hover:bg-purple-500/50 transition-colors" />

                {/* Hardware Product Image */}
                <img
                  src={prod.image}
                  alt={prod.name}
                  referrerPolicy="no-referrer"
                  className="max-h-40 max-w-full object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] z-10 group-hover:rotate-1 transition-transform duration-500"
                />

                {/* Reflection Floor Effect */}
                <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-cyan-500/20 to-transparent pointer-events-none" />
              </div>

              {/* Product Info */}
              <div>
                <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold mb-1">
                  {prod.series}
                </p>
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-purple-300 transition-colors">
                  {prod.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              {/* Active Ticker Price & Rating */}
              <div>
                <div className="flex items-center justify-between mb-4 pt-3 border-t border-white/10">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xl font-black font-mono text-white">
                        ${prod.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                      <span className={`text-[10px] font-mono font-bold flex items-center ${
                        prod.priceChange >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {prod.priceChange >= 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                        {prod.priceChange >= 0 ? '+' : ''}{prod.priceChange}%
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      Stock: <strong className="text-slate-200">{prod.stock} nodes</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400 bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20 text-xs font-mono font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{prod.rating}</span>
                  </div>
                </div>

                {/* Liquid Fill "Add to Cart / Provision Node" Button */}
                <button
                  onClick={(e) => handleAddToCartClick(prod, e)}
                  disabled={isAdding}
                  className={`w-full py-3 rounded-xl font-mono text-xs font-extrabold tracking-wider relative overflow-hidden transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                    isAdding
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.8)]'
                      : 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white border-pink-400/40 shadow-[0_0_20px_rgba(236,72,153,0.4)]'
                  }`}
                >
                  {isAdding ? (
                    <>
                      <Check className="w-4 h-4 animate-bounce" />
                      <span>NODE PROVISIONED</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>ADD TO QUANTUM CART</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Quick View Hardware Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-3xl rounded-3xl p-6 sm:p-8 border border-pink-500/40 shadow-2xl relative overflow-hidden">
            <button
              onClick={() => {
                soundFx.playClick();
                setSelectedProduct(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="relative h-64 rounded-2xl bg-black/60 p-4 border border-white/10 flex items-center justify-center">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="max-h-52 object-contain drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]" 
                />
              </div>

              <div>
                <p className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest mb-1">
                  {selectedProduct.series}
                </p>
                <h3 className="text-2xl font-black text-white mb-2">
                  {selectedProduct.name}
                </h3>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Specs List */}
                <div className="space-y-1.5 mb-6 text-xs font-mono">
                  {Object.entries(selectedProduct.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                      <span className="text-slate-400">{key}:</span>
                      <span className="text-cyan-300 font-bold">{val}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-mono text-slate-400 uppercase">Unit Price</p>
                    <p className="text-2xl font-black font-mono text-white">
                      ${selectedProduct.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      handleAddToCartClick(selectedProduct, e);
                      setSelectedProduct(null);
                    }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-mono text-xs font-bold tracking-wider shadow-[0_0_20px_rgba(236,72,153,0.5)] cursor-pointer"
                  >
                    PROVISION INSTANTLY
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
