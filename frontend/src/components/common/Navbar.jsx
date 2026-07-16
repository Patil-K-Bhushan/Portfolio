import React from 'react';
import { Volume2, VolumeX, Sun, Moon, X, Menu } from 'lucide-react';

const NAV_LINKS = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'PROFILE' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'MISSIONS' },
  { id: 'achievements', label: 'TROPHIES' },
  { id: 'journey', label: 'CAMPAIGN' },
  { id: 'contact', label: 'CONTACT' },
];

export default function Navbar({
  active, scrolled, theme, setTheme, soundOn, setSoundOn,
  menuOpen, setMenuOpen, scrollTo
}) {
  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-28px)] max-w-[1180px] z-[900] flex items-center justify-between gap-4 px-[22px] border border-neon-cyan/15 bg-slate-950/60 backdrop-blur-md transition-all duration-300 [clip-path:polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)] ${scrolled ? 'py-[9px] shadow-2xl' : 'py-[14px]'}`}>
      <a href="#home" className="font-display font-black text-sm tracking-[0.12em] flex items-center gap-1.5 text-[#e8ecff]" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>
        <span className="text-neon-cyan animate-[pulseGlow_2.6s_ease-in-out_infinite_alternate]">&lt;</span>BP<span className="text-neon-cyan animate-[pulseGlow_2.6s_ease-in-out_infinite_alternate]">/&gt;</span>
      </a>
      <ul className="hidden md:flex gap-6 list-none">
        {NAV_LINKS.map((l) => (
          <li key={l.id}>
            <a
              href={`#${l.id}`}
              className={`font-mono text-[0.74rem] tracking-[0.14em] px-0.5 py-1 relative transition-all duration-250 ${active === l.id ? 'text-neon-cyan shadow-[0_0_10px_rgba(0,240,255,0.6)]' : 'text-[#8b93b5] hover:text-neon-cyan'}`}
              onClick={(e) => { e.preventDefault(); scrollTo(l.id); }}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2.5">
        <button className="w-9 h-9 grid place-items-center border border-neon-cyan/15 bg-white/5 text-[#e8ecff] hover:text-neon-cyan hover:border-neon-cyan hover:shadow-[0_0_16px_rgba(0,240,255,0.35)] transition-all duration-300 [clip-path:polygon(7px_0,100%_0,100%_calc(100%-7px),calc(100%-7px)_100%,0_100%,0_7px)] cursor-pointer" onClick={() => setSoundOn(!soundOn)}>
          {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
        <button className="w-9 h-9 grid place-items-center border border-neon-cyan/15 bg-white/5 text-[#e8ecff] hover:text-neon-cyan hover:border-neon-cyan hover:shadow-[0_0_16px_rgba(0,240,255,0.35)] transition-all duration-300 [clip-path:polygon(7px_0,100%_0,100%_calc(100%-7px),calc(100%-7px)_100%,0_100%,0_7px)] cursor-pointer" onClick={setTheme}>
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button className="md:hidden w-9 h-9 grid place-items-center border border-neon-cyan/15 bg-white/5 text-[#e8ecff] hover:text-neon-cyan hover:border-neon-cyan hover:shadow-[0_0_16px_rgba(0,240,255,0.35)] transition-all duration-300 [clip-path:polygon(7px_0,100%_0,100%_calc(100%-7px),calc(100%-7px)_100%,0_100%,0_7px)] cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={17} /> : <Menu size={17} />}
        </button>
      </div>
    </nav>
  );
}
export { NAV_LINKS };
