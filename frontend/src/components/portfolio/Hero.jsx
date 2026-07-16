import React from 'react';
import { Eye, MessageSquare } from 'lucide-react';
import useTypewriter from '../../hooks/useTypewriter';

const ROLES = ['Aspiring Software Engineer', 'Frontend Developer', 'React Enthusiast','Problem Solver', 'Tech Explorer', 'Lifelong Learner', 'System Design Enthusiast', 'Full Stack Developer'];

export default function Hero({ data, scrollTo }) {
  const role = useTypewriter(ROLES, 60, 30, 1100);
  if (!data) return null;

  return (
    <section id="home" className="min-h-screen flex items-center justify-center text-center px-6 py-[150px] relative">
      <div className="max-w-[980px] w-full flex flex-col items-center">
        <div className="inline-block font-mono text-[0.74rem] tracking-[0.32em] text-neon-cyan py-2.2 px-5 border border-[var(--border)] bg-[var(--card)] [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] animate-[pulseGlow_3s_ease-in-out_infinite]">
          SYSTEM ONLINE · PLAYER_FOUND
        </div>
        <p className="font-mono tracking-[0.5em] text-[var(--muted)] text-[clamp(0.8rem,2vw,1rem)] mt-[30px] mb-2 uppercase">
          WELCOME TO THE LOBBY OF
        </p>
        <h1 className="font-display font-black text-[clamp(2.4rem,8vw,5.1rem)] line-height-[1.06] mb-[22px] text-[var(--text)] relative select-none">
          <span className="relative inline-block glitch after:text-neon-pink before:text-neon-cyan animate-[pulseGlow_4s_ease-in-out_infinite]" data-text={data.name.toUpperCase()}>
            {data.name.toUpperCase()}
          </span>
        </h1>
        <div className="font-mono text-[clamp(1rem,3.2vw,1.45rem)] min-h-[1.7em] text-[var(--text)] tracking-wider mb-5">
          <span className="text-neon-purple">&gt; </span>
          <span>{role}</span>
          <span className="inline-block w-2.5 h-[1.1em] ml-1 bg-neon-cyan shadow-[0_0_10px_#00f0ff] align-text-bottom animate-ping" />
        </div>
        <p className="text-[var(--muted)] text-[clamp(0.98rem,2vw,1.15rem)] font-semibold max-w-[640px] mb-10 leading-relaxed">
          {data.title}
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center w-full max-w-[320px] sm:max-w-none">
          <a
            href={data.resumeUrl || '/Bhushan_Patil_Resume.pdf'}
            target="_blank"
            rel="noreferrer"
            className="font-display text-[0.78rem] font-bold tracking-[0.16em] py-4 px-8 inline-flex items-center justify-center gap-2.5 [clip-path:polygon(0_0,calc(100%-14px)_0,100%_14px,100%_100%,14px_100%,0_calc(100%-14px))] transition-all duration-300 active:scale-95 bg-gradient-to-r from-neon-cyan to-neon-blue text-[#02030a] hover:-translate-y-[3px] hover:shadow-[0_0_28px_rgba(0,240,255,0.55),0_12px_30px_rgba(0,0,0,0.35)] cursor-pointer"
          >
            <Eye size={15} /> VIEW RESUME
          </a>
          <button
            onClick={() => scrollTo('contact')}
            className="font-display text-[0.78rem] font-bold tracking-[0.16em] py-4 px-8 inline-flex items-center justify-center gap-2.5 [clip-path:polygon(0_0,calc(100%-14px)_0,100%_14px,100%_100%,14px_100%,0_calc(100%-14px))] transition-all duration-300 active:scale-95 text-[var(--text)] bg-neon-purple/7 shadow-[inset_0_0_0_1px_#b16cff] hover:-translate-y-[3px] hover:shadow-[inset_0_0_0_1px_#b16cff,0_0_24px_rgba(177,108,255,0.45)] cursor-pointer"
          >
            <MessageSquare size={15} /> ESTABLISH UPLINK
          </button>
        </div>
      </div>
    </section>
  );
}
