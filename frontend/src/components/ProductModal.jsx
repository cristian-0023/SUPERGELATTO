import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductModal = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = React.useState(1);
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background-dark/90 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card border-white/20 z-[110] flex flex-col md:flex-row shadow-[0_0_50px_rgba(212,175,55,0.15)]"
          >
            {/* Image Section */}
            <div className="md:w-1/2 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center p-12 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-gold-premium/5 blur-3xl rounded-full translate-x-1/4 translate-y-1/4" />
               <motion.div 
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                className="text-[200px] drop-shadow-[0_20px_50px_rgba(255,183,197,0.4)] z-10"
               >
                {product.emoji || '🍨'}
               </motion.div>
            </div>

            {/* Info Section */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <button onClick={onClose} className="absolute top-6 right-6 p-2 text-white/30 hover:text-white hover:bg-white/5 rounded-full transition-all">
                  <X size={24} />
                </button>
                <div>
                  <span className="px-3 py-1 bg-gold-premium/10 border border-gold-premium/30 rounded-full text-[10px] font-bold text-gold-premium uppercase tracking-widest mb-4 inline-block">
                    {product.categoria || 'Artesanal'}
                  </span>
                  <h2 className="text-4xl font-playfair font-bold text-white mb-2">{product.nombre}</h2>
                  <div className="flex items-center gap-2 text-yellow-400">
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map(i => <Star key={i} size={14} fill={i <= 4 ? "currentColor" : "none"} />)}
                    </div>
                    <span className="text-sm font-bold text-white/40">(4.8 / 5)</span>
                  </div>
                </div>
              </div>

              <p className="text-white/60 leading-relaxed mb-8 flex-1">
                {product.descripcion || 'Nuestra receta secreta combina las mejores materias primas con un proceso de batido lento para lograr una cremosidad inigualable. Ideal para los paladares más exigentes que buscan una experiencia de sabor profunda y auténtica.'}
              </p>

              <div className="space-y-6 pt-8 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1.5">
                    <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="p-2 hover:text-gold-premium"><Minus size={18} /></button>
                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                    <button onClick={() => setQuantity(q => q+1)} className="p-2 hover:text-gold-premium"><Plus size={18} /></button>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/40 font-bold uppercase tracking-widest mb-1">Precio Total</p>
                    <p className="text-3xl font-bold text-gold-premium">${(product.precio * quantity).toFixed(2)}</p>
                  </div>
                </div>

                <button 
                  onClick={handleAdd}
                  className="w-full py-4 bg-gold-premium text-background-dark font-bold rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-lg shadow-gold-premium/20"
                >
                  <ShoppingCart size={20} /> Añadir al Pedido
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
