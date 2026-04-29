import React, { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 80;
const BASE = '/Frames/Animacion/';
const PREFIX = 'Ice_cream_scoops_202604270654_';

const FrameAnimation = ({ fps = 24, className = '', objectFit = 'object-contain' }) => {
  const canvasRef = useRef(null);
  const processedFrames = useRef(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const images = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const img = new Image();
      img.src = `${BASE}${PREFIX}${String(i).padStart(3, '0')}.jpg`;
      return img;
    });

    let currentFrame = 0;
    let lastTime = 0;
    let rafId;
    const interval = 1000 / fps;

    const processFrame = (img) => {
      if (processedFrames.current.has(img.src)) {
        return processedFrames.current.get(img.src);
      }

      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = 480; // Match internal resolution
      tempCanvas.height = 480;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.drawImage(img, 0, 0, 480, 480);

      // Simply return the tempCanvas without altering its pixels
      processedFrames.current.set(img.src, tempCanvas);
      return tempCanvas;
    };

    const draw = (timestamp) => {
      if (timestamp - lastTime >= interval) {
        const img = images[currentFrame];
        if (img.complete && img.naturalWidth > 0) {
          const processed = processFrame(img);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(processed, 0, 0, canvas.width, canvas.height);
        }
        currentFrame = (currentFrame + 1) % TOTAL_FRAMES;
        lastTime = timestamp;
      }
      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [fps]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        width={480}
        height={480}
        className={`w-full h-full block ${objectFit}`}
      />
    </div>
  );
};

export default FrameAnimation;
