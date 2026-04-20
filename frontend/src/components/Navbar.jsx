import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, LogOut, User, Menu, X, Star, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';

const Navbar = ({ user, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Productos', path: '/productos' },
    { name: 'Perfil', path: '/perfil' },
  ];

  const scrollToBuilder = () => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById('gelato-builder-360');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.href = '/#gelato-builder-360';
    }
  };

  const scrollToSuperPoints = () => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById('super-points-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.href = '/#super-points-section';
    }
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-background-dark/80 backdrop-blur-lg border-b border-white/10 py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-3xl group-hover:scale-110 transition-transform">🍦</span>
            <span className="text-2xl font-playfair font-bold text-gold-premium tracking-tight">Super Gelatto</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-gold-premium ${
                  location.pathname === link.path ? 'text-gold-premium' : 'text-white/70'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {/* 360 Builder Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={scrollToBuilder}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400/15 to-orange-500/10 border border-amber-400/30 text-amber-300 text-sm font-bold hover:border-amber-400/60 hover:bg-amber-400/20 transition-all duration-300 shadow-sm shadow-amber-400/10"
            >
              <RotateCcw size={14} className="animate-spin" style={{ animationDuration: '3s' }} />
              Gelato 360°
            </motion.button>

            {/* SuperPoints Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={scrollToSuperPoints}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/15 to-amber-500/10 border border-yellow-400/30 text-yellow-300 text-sm font-bold hover:border-yellow-400/60 hover:bg-yellow-400/20 transition-all duration-300 shadow-sm shadow-yellow-400/10"
            >
              <Star size={14} className="fill-yellow-300 text-yellow-300" />
              SuperPoints
            </motion.button>
          </div>

          {/* User Info & Cart */}
          <div className="hidden md:flex items-center gap-6">
            {/* SuperPoints */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-gold-premium/10 border border-gold-premium/20 rounded-full">
              <Star size={14} className="text-gold-premium fill-gold-premium" />
              <span className="text-xs font-bold text-gold-premium">120 pts</span>
            </div>

            {/* Cart Icon */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white/70 hover:text-gold-premium transition-colors"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-premium text-background-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Avatar & Logout */}
            <div className="flex items-center gap-4 pl-6 border-l border-white/10">
              <Link to="/perfil" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pastel-pink to-gold-premium flex items-center justify-center text-background-dark font-bold text-xs ring-2 ring-white/10 group-hover:ring-gold-premium/50 transition-all">
                  {user?.name?.charAt(0).toUpperCase() || <User size={14} />}
                </div>
                <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  {user?.name?.split(' ')[0] || 'Gourmet'}
                </span>
              </Link>
              <button 
                onClick={onLogout}
                className="p-2 text-white/40 hover:text-red-400 transition-colors"
                title="Cerrar Sesión"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white/70"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-premium text-background-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white/70 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-background-dark/95 backdrop-blur-xl border-b border-white/10 md:hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-white/80 hover:text-gold-premium"
                  >
                    {link.name}
                  </Link>
                ))}
                {/* 360 Builder — mobile */}
                <button
                  onClick={scrollToBuilder}
                  className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-400/10 to-orange-500/10 border border-amber-400/30 text-amber-300 font-bold text-left hover:bg-amber-400/15 transition-all"
                >
                  <RotateCcw size={18} className="animate-spin" style={{ animationDuration: '3s' }} />
                  Gelato 360°
                </button>
                {/* SuperPoints — mobile */}
                <button
                  onClick={scrollToSuperPoints}
                  className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-yellow-400/10 to-amber-500/10 border border-yellow-400/30 text-yellow-300 font-bold text-left hover:bg-yellow-400/15 transition-all"
                >
                  <Star size={18} className="fill-yellow-300 text-yellow-300" />
                  SuperPoints
                </button>
                <hr className="border-white/10 my-2" />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gold-premium/20 flex items-center justify-center text-gold-premium font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-medium">{user?.name}</p>
                      <p className="text-gold-premium text-xs">⭐ 120 pts</p>
                    </div>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="p-2 text-red-400"
                  >
                    <LogOut size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
