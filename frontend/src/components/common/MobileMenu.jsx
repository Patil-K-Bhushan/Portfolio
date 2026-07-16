import React from 'react';
import { NAV_LINKS } from './Navbar';

export default function MobileMenu({ menuOpen, scrollTo }) {
  return (
    <div className={`fixed inset-0 z-[850] bg-[#04040c] flex flex-col items-center justify-center gap-[4vh] transition-transform duration-500 ${menuOpen ? 'translate-y-0' : '-translate-y-[102%]'}`}>
      {NAV_LINKS.map((l, i) => (
        <a
          key={l.id}
          href={`#${l.id}`}
          className={`font-display text-2xl font-bold tracking-[0.14em] text-[#e8ecff] flex items-baseline gap-3.5 hover:text-neon-cyan hover:shadow-[0_0_18px_rgba(0,240,255,0.6)] transition-all duration-300 ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: menuOpen ? `${120 + i * 60}ms` : '0ms' }}
          onClick={(e) => { e.preventDefault(); scrollTo(l.id); }}
        >
          <span className="font-mono text-xs text-neon-purple">0{i + 1}</span> {l.label}
        </a>
      ))}
    </div>
  );
}
