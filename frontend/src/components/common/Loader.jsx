import React, { useState, useEffect } from 'react';

export default function Loader({ done, onDone }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setPct((p) => {
        const next = Math.min(p + 5 + Math.random() * 8, 100);
        if (next >= 100) {
          clearInterval(iv);
          setTimeout(onDone, 450);
        }
        return next;
      });
    }, 150);
    return () => clearInterval(iv);
  }, [onDone]);

  const status = pct < 30
    ? 'INITIALIZING CORE SYSTEMS...'
    : pct < 60
    ? 'LOADING NEON ASSETS...'
    : pct < 85
    ? 'CALIBRATING PARTICLE FIELD...'
    : 'READY PLAYER ONE';

  return (
    <div className={`fixed inset-0 z-[1000] bg-[#04040c] flex flex-col items-center justify-center gap-6 transition-all duration-700 ${done ? 'opacity-0 pointer-events-none invisible' : ''}`}>
      <div className="font-display text-[3.2rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple animate-pulse-glow">BP_</div>
      <div className="font-mono text-[0.72rem] tracking-[0.3em] text-[#8b93b5] min-h-[1.2em] text-center">{status}</div>
      <div className="w-[min(420px,72vw)] h-[7px] border border-neon-cyan/35 bg-neon-cyan/5 p-[1px] [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]">
        <div className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple shadow-[0_0_16px_#00f0ff] transition-all duration-150" style={{ width: `${pct}%` }} />
      </div>
      <div className="font-mono text-sm text-neon-cyan tracking-widest">{Math.round(pct)}%</div>
    </div>
  );
}
