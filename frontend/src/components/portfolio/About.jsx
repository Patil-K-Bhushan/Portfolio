import React from 'react';
import { User, Trophy, ShieldAlert, Award } from 'lucide-react';
import Counter from '../common/Counter';
import SectionHead from '../common/SectionHead';

export default function About({ data }) {
  if (!data) return null;
  return (
    <section id="about" className="py-28 px-6 max-w-[1180px] mx-auto relative">
      <SectionHead tag="character.status" title="PLAYER STATUS" />
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-[42px] items-start">
        <div className="relative text-center p-9 pt-[36px] border border-[var(--border)] bg-[var(--card)] backdrop-blur-md [clip-path:polygon(22px_0,100%_0,100%_calc(100%-22px),calc(100%-22px)_100%,0_100%,0_22px)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-neon-cyan before:via-neon-purple before:to-neon-pink before:shadow-[0_0_14px_#00f0ff]">
          <div className="w-[172px] h-[172px] mx-auto my-[10px] relative">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-neon-cyan/70 animate-[spin_14s_linear_infinite]" />
            <div className="absolute -inset-[13px] rounded-full border-[1.5px] border-dotted border-neon-purple/50 animate-[spin_24s_linear_infinite_reverse]" />
            <div className="absolute inset-[13px] rounded-full overflow-hidden border border-neon-cyan/30 bg-slate-900 shadow-[0_0_32px_rgba(0,240,255,0.3),inset_0_0_26px_rgba(77,124,255,0.25)] flex items-center justify-center">
              <img src="/profile_pic.jpeg" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 font-display text-[0.62rem] font-bold tracking-[0.14em] text-white bg-gradient-to-r from-neon-purple to-neon-pink py-1.5 px-3.5 whitespace-nowrap [clip-path:polygon(7px_0,100%_0,100%_calc(100%-7px),calc(100%-7px)_100%,0_100%,0_7px)] shadow-[0_0_16px_rgba(177,108,255,0.5)]">
              LEVEL {data.stats?.experience || 3}
            </div>
          </div>
          <h3 className="font-display text-lg tracking-wider mt-[22px] text-[var(--text)]">{data.name.toUpperCase()}</h3>
          <p className="font-mono text-[0.68rem] tracking-[0.24em] text-neon-cyan mt-1.5 uppercase">{data.role}</p>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/15 to-transparent my-5" />
          <div className="text-left space-y-3 font-mono text-[0.7rem] tracking-wide text-[var(--muted)]">
            <div className="border border-[var(--border)] p-3 bg-[var(--surface)] [clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,8px_100%,0_calc(100%-8px))]">
              <span className="text-neon-cyan font-bold">CS CORE:</span> DSA, OOP, DBMS, OS, Networks
            </div>
            <div className="border border-[var(--border)] p-3 bg-[var(--surface)] [clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,8px_100%,0_calc(100%-8px))]">
              <span className="text-neon-purple font-bold">PLATFORMS:</span> Git, Firebase, Vercel, Pages
            </div>
          </div>
          <div className="font-mono text-[0.62rem] tracking-widest text-[var(--muted)] mt-5">UID: 0098-BKP</div>
        </div>
        <div className="grid gap-5">
          <div className="border border-[var(--border)] border-l-2 border-l-neon-cyan bg-[var(--card)] backdrop-blur-md p-[24px] px-[26px] [clip-path:polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,0_100%)]">
            <h4 className="flex items-center gap-2.5 font-display text-[0.8rem] tracking-[0.2em] text-neon-cyan mb-3.5"><User size={14} /> BACKSTORY</h4>
            <p className="text-[var(--muted)] leading-relaxed text-sm whitespace-pre-line font-medium">{data.bio}</p>
          </div>
          <div className="border border-[var(--border)] border-l-2 border-l-neon-cyan bg-[var(--card)] backdrop-blur-md p-[24px] px-[26px] [clip-path:polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,0_100%)]">
            <h4 className="flex items-center gap-2.5 font-display text-[0.8rem] tracking-[0.2em] text-neon-cyan mb-3.5"><Award size={14} /> GUILD / EDUCATION</h4>
            <div className="grid gap-1.5 text-[var(--muted)] text-sm font-medium">
              <div><strong className="text-[var(--text)] font-display text-[0.92rem] tracking-wider">{data.education?.degree}</strong></div>
              <div>{data.education?.college} ({data.education?.years})</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px] mt-[46px]">
        {[['PROJECTS LAUNCHED', data.stats?.projects || 3, Trophy], ['DEVELOPER LEVEL', data.stats?.experience || 3, ShieldAlert], ['COMMITS LOGGED', data.stats?.commits || 420, Award]].map(([lbl, val, Icon]) => (
          <div key={lbl} className="text-center p-[30px] border border-[var(--border)] bg-[var(--card)] backdrop-blur-md [clip-path:polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)] hover:-translate-y-1.5 hover:border-neon-cyan/35 hover:shadow-[0_14px_36px_rgba(0,240,255,0.16)] transition-all duration-300">
            <Icon size={24} className="mx-auto mb-3 text-neon-cyan filter drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
            <div className="font-display font-black text-[2.35rem] text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple leading-none"><Counter target={val} duration={1400} /></div>
            <div className="font-mono text-[0.66rem] tracking-[0.2em] text-[var(--muted)] mt-2.5 uppercase">{lbl}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
