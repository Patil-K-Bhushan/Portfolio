import React from 'react';
import { ArrowUp, Github, Linkedin, Heart } from 'lucide-react';

export default function Footer({ showTop, scrollTo }) {
  return (
    <footer className="relative z-10 border-t border-neon-cyan/10 py-11 px-7 text-center bg-[var(--card)] backdrop-blur-md">
      <div className="font-display text-lg font-black tracking-[0.14em] text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple animate-pulse-glow mb-4">
        BP_
      </div>
      <div className="flex justify-center gap-[22px] mb-[22px]">
        {[['github', 'https://github.com/Patil-K-Bhushan', Github], ['linkedin', 'https://linkedin.com/in/bhushan-k-patil', Linkedin]].map(([key, url, Icon]) => (
          <a key={key} href={url} target="_blank" rel="noreferrer" className="w-[42px] h-[42px] grid place-items-center text-neon-cyan bg-neon-cyan/5 border border-neon-cyan/20 [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)] hover:shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all duration-300">
            <Icon size={16} />
          </a>
        ))}
      </div>
      <div className="font-mono text-[0.6rem] tracking-[0.14em] text-[var(--muted)] uppercase">
        DESIGNED WITH <Heart size={10} className="inline text-neon-pink mx-0.5" /> BY BHUSHAN PATIL © 2026
      </div>
      <button
        onClick={() => scrollTo('home')}
        className={`fixed right-[26px] bottom-[26px] z-50 w-12 h-12 grid place-items-center text-neon-cyan bg-slate-950/60 border border-neon-cyan/25 backdrop-blur-sm [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)] shadow-[inset_0_0_0_1.5px_rgba(0,240,255,0.25),0_0_18px_rgba(0,240,255,0.25)] transition-all duration-300 hover:shadow-[0_0_28px_rgba(0,240,255,0.5)] cursor-pointer ${showTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        <ArrowUp size={16} />
      </button>
    </footer>
  );
}
