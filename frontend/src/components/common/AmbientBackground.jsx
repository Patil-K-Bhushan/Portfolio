import React from 'react';
import ParticleField from './ParticleField';
import CustomCursor from './CustomCursor';

export default function AmbientBackground({ theme, scrollPct }) {
  const isDark = theme === 'dark';
  return (
    <>
      <ParticleField theme={theme} />
      <div className={`fixed rounded-full blur-[110px] pointer-events-none z-0 w-[540px] h-[540px] -top-[180px] -left-[140px] bg-neon-cyan animate-[orbFloat_17s_ease-in-out_infinite_alternate] ${isDark ? 'opacity-30' : 'opacity-15'}`} />
      <div className={`fixed rounded-full blur-[110px] pointer-events-none z-0 w-[480px] h-[480px] -bottom-[160px] -right-[120px] bg-neon-purple animate-[orbFloat_21s_ease-in-out_infinite_alternate-reverse] ${isDark ? 'opacity-30' : 'opacity-15'}`} />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(var(--gridline)_1px,transparent_1px),linear-gradient(90deg,var(--gridline)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_78%)]" />
      {isDark && (
        <div className="fixed inset-0 z-60 pointer-events-none opacity-30 bg-[repeating-linear-gradient(0deg,transparent_0_2px,rgba(0,0,0,0.12)_2px_4px)]" />
      )}
      <div className="fixed top-0 left-0 h-[3px] z-[1500] bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink shadow-[0_0_10px_#00f0ff] transition-all duration-100" style={{ width: `${scrollPct}%` }} />
      <CustomCursor />
    </>
  );
}
