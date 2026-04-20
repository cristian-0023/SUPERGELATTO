import React, { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 80;
const BASE = '/frames/';
const PREFIX = 'Gelato_splash_advertising_animation_1c7facb77e_';

const FrameAnimation = ({ fps = 24, className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Pre-load every frame into Image objects
    const images = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const img = new Image();
      img.src = `${BASE}${PREFIX}${String(i).padStart(3, '0')}.jpg`;
      return img;
    });

    let currentFrame = 0;
    let lastTime = 0;
    let rafId;
    const interval = 1000 / fps;

    const draw = (timestamp) => {
      if (timestamp - lastTime >= interval) {
        const img = images[currentFrame];
        if (img.complete && img.naturalWidth > 0) {
          // Clear and draw — no opacity flickering
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
        currentFrame = (currentFrame + 1) % TOTAL_FRAMES;
        lastTime = timestamp;
      }
      rafId = requestAnimationFrame(draw);
    };

    // Wait for the first frame before starting to avoid blank flash
    const firstImg = images[0];
    const start = () => { rafId = requestAnimationFrame(draw); };
    if (firstImg.complete) {
      start();
    } else {
      firstImg.onload = start;
    }

    return () => cancelAnimationFrame(rafId);
  }, [fps]);

  return (
    <div className={`relative ${className}`}>
      {/* Circular clip + glow ring */}
      <div
        className="w-full h-full rounded-full overflow-hidden"
        style={{
          boxShadow:
            '0 0 0 3px rgba(255,183,197,0.25), 0 0 60px 20px rgba(255,183,197,0.12), 0 0 120px 40px rgba(212,175,55,0.08)',
        }}
      >
        <canvas
          ref={canvasRef}
          width={480}
          height={480}
          className="w-full h-full block"
          style={{ borderRadius: '50%' }}
        />
      </div>
    </div>
  );
};

export default FrameAnimation;
