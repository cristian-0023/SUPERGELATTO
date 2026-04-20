import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import FlavorImage from './FlavorImage';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background-dark/80 backdrop-blur-sm z-[70]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-background-dark border-l border-white/10 z-[80] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-2xl font-playfair font-bold flex items-center gap-3">
                Tu <span className="text-gold-premium italic">Pedido</span> <ShoppingBag className="text-white/20" />
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <div className="text-6xl mb-4">🍨</div>
                  <p className="font-bold uppercase tracking-widest text-xs">Tu carrito está vacío</p>
                  <Link 
                    to="/productos" 
                    onClick={onClose} 
                    className="mt-4 text-gold-premium text-sm font-bold hover:underline"
                  >
                    Ir a comprar sabores
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 rounded-2xl bg-white/5 flex-shrink-0 flex items-center justify-center overflow-hidden border border-white/5 group-hover:border-gold-premium/30 transition-all duration-500">
                      <FlavorImage flavor={item} className="w-full h-full text-2xl" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h4 className="font-bold text-white leading-tight truncate">{item.nombre || item.name}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="flex-shrink-0 text-white/20 hover:text-red-400 transition-colors p-1">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-white/40 mb-4">${item.precio} c/u</p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-gold-premium">
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-gold-premium">
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="font-bold text-gold-premium">${(item.quantity * item.precio).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-white/[0.02] space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-sm text-white/40 font-bold uppercase tracking-widest">Total</span>
                  <span className="text-3xl font-bold text-gold-premium">${totalPrice.toFixed(2)}</span>
                </div>
                <Link 
                  to="/checkout" 
                  onClick={onClose}
                  className="w-full py-4 bg-gold-premium text-background-dark font-bold rounded-full flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-lg shadow-gold-premium/20"
                >
                  Continuar al Pago <ArrowRight size={20} />
                </Link>
                <p className="text-[10px] text-center text-white/20 font-bold uppercase tracking-tighter">
                  💰 +{(totalPrice / 10).toFixed(0)} SuperPoints ganados con esta compra
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
