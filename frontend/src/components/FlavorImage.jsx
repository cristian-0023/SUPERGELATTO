import React from 'react';

/**
 * Renders a product image OR a CSS gradient composition when no photo is available.
 * Props:
 *   flavor  – the full flavor object
 *   className – extra classes applied to the wrapper div
 */
const FlavorImage = ({ flavor, className = '' }) => {
  if (flavor?.image) {
    return (
      <img
        src={flavor.image}
        alt={flavor.name}
        className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${className}`}
      />
    );
  }

  // — Gradient art fallback ————————————————————————
  const gradientArt = flavor?.gradientArt || {
    gradient: 'linear-gradient(135deg, #333 0%, #111 100%)',
    emoji: flavor?.emoji || '🍦',
    decorEmoji: '✨'
  };

  const { gradient, emoji, decorEmoji } = gradientArt;

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center relative overflow-hidden ${className}`}
      style={{ background: gradient }}
    >
      {/* Blurred glow blob */}
      <div
        className="absolute w-48 h-48 rounded-full blur-3xl opacity-40 group-hover:scale-125 transition-transform duration-700"
        style={{ background: 'white' }}
      />
      {/* Decorative small emoji top-right */}
      {decorEmoji && (
        <span className="absolute top-4 right-6 text-4xl opacity-60 select-none">
          {decorEmoji}
        </span>
      )}
      {/* Main emoji */}
      <span className="relative text-[96px] drop-shadow-2xl select-none group-hover:scale-110 transition-transform duration-700 leading-none">
        {emoji}
      </span>
      {/* Subtle name watermark */}
      <span className="relative mt-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 select-none">
        {flavor?.name || 'Super Gelatto'}
      </span>
    </div>
  );
};

export default FlavorImage;
