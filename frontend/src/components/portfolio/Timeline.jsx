import React from 'react';
import { Target, CheckCircle2, Circle } from 'lucide-react';
import SectionHead from '../common/SectionHead';
import Reveal from '../common/Reveal';

export default function Timeline({ data }) {
  if (!data?.timeline) return null;
  return (
    <section id="journey" className="py-28 px-6 max-w-[1180px] mx-auto relative">
      <SectionHead tag="character.campaign" title="QUEST CAMPAIGN LOGS" />
      <div className="relative max-w-[900px] mx-auto before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-[18px] md:before:left-1/2 before:w-[2px] md:before:-translate-x-1/2 before:bg-gradient-to-b before:from-neon-cyan before:via-neon-purple before:to-neon-blue before:shadow-[0_0_12px_rgba(0,240,255,0.4)]">
        {data.timeline.map((item, i) => {
          const isProgress = item.status === 'in-progress';
          const isLocked = item.status === 'locked';
          const isCleared = item.status === 'cleared';
          return (
            <Reveal key={item._id || i} className={`relative w-full md:w-1/2 pb-12 pl-14 md:pl-0 ${i % 2 === 0 ? 'md:left-0 md:text-right md:pr-11' : 'md:left-1/2 md:text-left md:pl-11'}`}>
              <div className={`absolute top-1 left-1.5 md:left-auto w-11 h-11 grid place-items-center bg-[#04040c] [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)] z-10 ${i % 2 === 0 ? 'md:right-0 md:translate-x-1/2' : 'md:left-0 md:-translate-x-1/2'} ${isProgress ? 'text-neon-purple border border-neon-purple animate-[nodePulse_2.2s_ease-in-out_infinite]' : isLocked ? 'text-slate-700 border border-slate-800' : 'text-neon-cyan border border-neon-cyan'}`}>
                {isCleared ? <CheckCircle2 size={16} /> : isProgress ? <Target size={16} /> : <Circle size={16} />}
              </div>
              <div className={`inline-block w-full p-[22px] px-6 text-left bg-[var(--card)] border border-[var(--border)] backdrop-blur-md [clip-path:polygon(0_0,calc(100%-14px)_0,100%_14px,100%_100%,14px_100%,0_calc(100%-14px))] transition-all duration-300 hover:border-neon-cyan/40 hover:shadow-[0_0_22px_rgba(0,240,255,0.15)] hover:-translate-y-1 ${isLocked ? 'opacity-65' : ''}`}>
                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  <span className={`font-display text-[0.6rem] font-bold tracking-widest py-1 px-2.5 ${isProgress ? 'bg-gradient-to-r from-neon-purple to-neon-pink text-white shadow-[0_0_16px_rgba(177,108,255,0.4)]' : isLocked ? 'bg-slate-800 text-slate-400' : 'bg-gradient-to-r from-neon-cyan to-neon-blue text-[#02030a]'}`}>
                    LEVEL 0{i + 1}
                  </span>
                  <span className="font-mono text-[0.62rem] tracking-widest text-[var(--muted)]">{item.duration}</span>
                  <span className={`font-mono text-[0.56rem] tracking-widest ml-auto uppercase ${isCleared ? 'text-emerald-400 shadow-[0_0_8px_rgba(57,255,136,0.3)] animate-pulse' : isProgress ? 'text-neon-cyan' : 'text-slate-600'}`}>
                    {item.status}
                  </span>
                </div>
                <h4 className="font-display text-[0.92rem] tracking-wider text-[var(--text)] mb-1">{item.role.toUpperCase()}</h4>
                <div className="font-mono text-[0.62rem] tracking-wider text-neon-cyan mb-2.5">{item.company.toUpperCase()}</div>
                <p className="text-[var(--muted)] text-[0.94rem] leading-relaxed font-semibold">{item.description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
