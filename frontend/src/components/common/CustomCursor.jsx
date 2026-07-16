import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100, my = -100, rx = -100, ry = -100;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      const hov = e.target.closest(
        'a, button, input, textarea, .skill-card, .project-card, .ach-card, .chip'
      );
      dot.classList.toggle('scale-[1.5]', !!hov);
      ring.classList.toggle('scale-[1.5]', !!hov);
      ring.classList.toggle('border-neon-purple', !!hov);
      ring.classList.toggle('bg-neon-purple/10', !!hov);
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="fixed left-0 top-0 w-2 h-2 rounded-full bg-neon-cyan shadow-[0_0_12px_#00f0ff] z-[2000] pointer-events-none transition-transform duration-200 hidden md:block" />
      <div ref={ringRef} className="fixed left-0 top-0 w-[38px] h-[38px] rounded-full border-[1.5px] border-neon-cyan z-[1999] pointer-events-none -ml-[19px] -mt-[19px] transition-all duration-200 hidden md:block" />
    </>
  );
}
