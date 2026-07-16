import React, { useEffect, useRef } from 'react';
import { initParticles, updateParticles, drawLinks } from '../../utils/particleHelper';

export default function ParticleField({ theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const COUNT = window.innerWidth < 720 ? 38 : 75;
    const palette = theme === 'dark'
      ? ['rgba(0,240,255,', 'rgba(177,108,255,', 'rgba(77,124,255,']
      : ['rgba(0,140,180,', 'rgba(120,70,220,', 'rgba(40,90,220,'];

    let pts = [], raf, mouse = { x: -9999, y: -9999 };

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      pts = initParticles(canvas, COUNT, palette);
    };

    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateParticles(pts, canvas, mouse, 140);
      for (const p of pts) {
        const alpha = 0.35 + Math.sin(p.tw) * 0.25;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c + alpha + ')';
        ctx.fill();
      }
      drawLinks(ctx, pts, 130);
      raf = requestAnimationFrame(frame);
    };

    init();
    if (reduced) { frame(); cancelAnimationFrame(raf); }
    else {
      raf = requestAnimationFrame(frame);
      window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
      window.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
    }
    window.addEventListener('resize', init);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', init);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />;
}
