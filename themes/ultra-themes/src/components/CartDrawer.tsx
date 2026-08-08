import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Zap, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CartItem } from '../types';
import { soundFx } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [isDeployedSuccess, setIsDeployedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleDeployRequest = () => {
    soundFx.playPulse();
    setIsDeploying(true);

    setTimeout(() => {
      soundFx.playSuccess();
      setIsDeploying(false);
      setIsDeployedSuccess(true);
      setTimeout(() => {
        setIsDeployedSuccess(false);
        onClearCart();
        onClose();
      }, 2500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex justify-end animate-in fade-in duration-200">
      
      <div className="w-full max-w-md bg-[#080d22]/95 h-full border-l border-purple-500/40 p-6 flex flex-col justify-between relative shadow-2xl overflow-y-auto">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold font-mono text-white">
                PROVISIONING CART
              </h2>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          {cart.length === 0 ? (
            <div className="text-center py-16 text-slate-400 space-y-3 font-mono">
              <Zap className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm font-bold">NO NODES IN QUEUE</p>
              <p className="text-xs text-slate-500">
                Browse the Product Universe to provision quantum hardware instances.
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 no-scrollbar">
              {cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="glass-panel p-3.5 rounded-2xl border border-white/10 flex items-center gap-3 justify-between"
                >
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-contain rounded-xl bg-black/40 p-1 border border-white/5" 
                  />

                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-white line-clamp-1">
                      {item.product.name}
                    </h4>
                    <p className="text-xs font-mono text-cyan-400 font-bold mt-0.5">
                      ${item.product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 bg-black/60 p-1.5 rounded-xl border border-white/10">
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        onUpdateQuantity(item.product.id, -1);
                      }}
                      className="p-1 text-slate-400 hover:text-white cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-mono font-bold text-white px-1">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        onUpdateQuantity(item.product.id, 1);
                      }}
                      className="p-1 text-slate-400 hover:text-white cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      soundFx.playClick();
                      onRemoveItem(item.product.id);
                    }}
                    className="p-2 text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                    title="Remove Node"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="space-y-1 font-mono text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal Hardware:</span>
                <span>${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Fiber Sync Fee:</span>
                <span className="text-emerald-400">0.00 (WAIVED)</span>
              </div>
              <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-white/10">
                <span>Total Provision Cost:</span>
                <span className="text-cyan-300">${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            {isDeployedSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-center text-emerald-300 font-mono text-xs space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
                <p className="font-extrabold text-sm">PROVISIONING DEPLOYED!</p>
                <p className="text-[11px] text-slate-300">Cluster instances allocated & fiber channels synced.</p>
              </div>
            ) : (
              <button
                onClick={handleDeployRequest}
                disabled={isDeploying}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-mono text-xs font-extrabold tracking-wider shadow-[0_0_25px_rgba(168,85,247,0.6)] cursor-pointer flex items-center justify-center gap-2"
              >
                {isDeploying ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-cyan-200" />
                    <span>SYNCHRONIZING FIBER...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-cyan-200" />
                    <span>DEPLOY PROVISIONING REQUEST</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
