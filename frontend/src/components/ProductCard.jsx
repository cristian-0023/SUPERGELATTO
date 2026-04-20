import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, Minus, ShoppingCart, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal';

const ProductCard = ({ product, index }) => {
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, quantity);
  };

  const increment = (e) => {
    e.stopPropagation();
    setQuantity(q => q + 1);
  };

  const decrement = (e) => {
    e.stopPropagation();
    setQuantity(q => Math.max(1, q - 1));
  };

  const categoryColors = {
    'Vegano': 'bg-pastel-green text-background-dark',
    'Temporada': 'bg-gold-premium text-background-dark',
    'Clásico': 'bg-pastel-blue text-background-dark',
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
        className="glass-card overflow-hidden group hover:border-gold-premium/30 transition-all duration-500 cursor-pointer"
      >
        {/* Product Image */}
        <div className="h-64 relative bg-gradient-to-br from-white/5 to-white/0 flex items-center justify-center overflow-hidden">
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            className="text-[120px] drop-shadow-2xl select-none"
          >
            {product.emoji || '🍨'}
          </motion.div>
          
          {/* Category Badge */}
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${categoryColors[product.categoria] || 'bg-white/10 text-white'}`}>
            {product.categoria || 'Gourmet'}
          </div>

          {/* Info Button */}
          <button className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-gold-premium hover:text-background-dark transition-all opacity-0 group-hover:opacity-100">
            <Info size={16} />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-playfair font-bold text-white group-hover:text-gold-premium transition-colors">
              {product.nombre}
            </h3>
            <span className="text-lg font-bold text-gold-premium">${product.precio}</span>
          </div>

          <div className="flex items-center gap-1 mb-6 text-yellow-400">
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={12} fill={i <= 4 ? "currentColor" : "none"} />
            ))}
            <span className="text-[10px] text-white/40 ml-1">(4.8)</span>
          </div>

          <p className="text-sm text-white/50 mb-6 line-clamp-2">
            {product.descripcion || 'Una deliciosa preparación artesanal con ingredientes de la más alta calidad.'}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full h-10 px-2">
              <button onClick={decrement} className="p-1 hover:text-gold-premium transition-colors">
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm font-bold">{quantity}</span>
              <button onClick={increment} className="p-1 hover:text-gold-premium transition-colors">
                <Plus size={14} />
              </button>
            </div>
            
            <button 
              onClick={handleAdd}
              className="flex-1 h-10 bg-gold-premium/10 border border-gold-premium/50 text-gold-premium rounded-full flex items-center justify-center gap-2 text-sm font-bold hover:bg-gold-premium hover:text-background-dark transition-all"
            >
              <ShoppingCart size={16} />
              Añadir
            </button>
          </div>
        </div>
      </motion.div>

      <ProductModal 
        product={product} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default ProductCard;
