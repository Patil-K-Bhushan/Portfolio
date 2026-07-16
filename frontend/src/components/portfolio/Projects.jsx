import React from 'react';
import * as Icons from 'lucide-react';
import SectionHead from '../common/SectionHead';
import Reveal from '../common/Reveal';

export default function Projects({ data }) {
  if (!data?.projects) return null;
  return (
    <section id="projects" className="py-28 px-6 max-w-[1180px] mx-auto relative">
      <SectionHead tag="character.missions" title="ACTIVE CAMPAIGNS" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.projects.map((p, i) => {
          const Icon = Icons[p.icon] || Icons.Folder;
          const stars = Array.from({ length: 5 }, (_, idx) => idx < p.difficulty);
          return (
            <Reveal key={p._id || i}>
              <div className="relative border border-[var(--border)] bg-[var(--card)] backdrop-blur-md [clip-path:polygon(0_0,calc(100%-26px)_0,100%_26px,100%_100%,26px_100%,0_calc(100%-26px))] transition-all duration-300 hover:border-neon-cyan hover:shadow-[0_0_34px_rgba(0,240,255,0.12)] group hover:-translate-y-1">
                <div className="h-[185px] relative overflow-hidden bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center border-b border-neon-cyan/10">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:26px_26px]" />
                  <Icon className="text-neon-cyan filter drop-shadow-[0_0_12px_#00f0ff] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" size={54} />
                  <div className="absolute top-3.5 left-3.5 text-[0.6rem] font-mono tracking-widest text-[#e8ecff] bg-[#020612]/70 border-l-2 border-l-neon-purple py-1 px-2.5 backdrop-blur-sm">
                    MISSION_0{i + 1}
                  </div>
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 text-[0.58rem] font-mono tracking-widest text-emerald-400 bg-[#020612]/70 border border-emerald-400/40 py-1 px-2.5 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" /> COMPLETED
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-display text-[1.02rem] tracking-wider text-[var(--text)]">{p.title.toUpperCase()}</h4>
                  <div className="flex items-center gap-0.5 my-2.5">
                    {stars.map((fill, sIdx) => (
                      <Icons.Star key={sIdx} size={11} className={`${fill ? 'text-neon-purple fill-neon-purple drop-shadow-[0_0_5px_rgba(177,108,255,0.7)]' : 'text-slate-800'}`} />
                    ))}
                    <span className="font-mono text-[0.56rem] tracking-widest text-[var(--muted)] ml-2">DIFF / {p.difficulty}</span>
                  </div>
                  <p className="text-[var(--muted)] text-[0.96rem] leading-relaxed mb-5 line-clamp-3 font-semibold">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tags.map((t) => (
                      <span key={t} className="font-mono text-[0.6rem] tracking-wider py-1 px-2.5 border border-neon-cyan/15 bg-neon-cyan/5 text-neon-cyan">{t.toUpperCase()}</span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a href={p.github} target="_blank" rel="noreferrer" className="flex-1 py-3 text-center font-display text-[0.66rem] font-bold tracking-widest text-[var(--text)] bg-[var(--surface)] border border-neon-cyan/10 hover:border-neon-cyan hover:text-neon-cyan hover:shadow-[0_0_18px_rgba(0,240,255,0.25)] transition-all duration-300 [clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,10px_100%,0_calc(100%-10px))]">
                      SOURCE
                    </a>
                    <a href={p.link} target="_blank" rel="noreferrer" className="flex-1 py-3 text-center font-display text-[0.66rem] font-bold tracking-widest text-[#02030a] bg-gradient-to-r from-neon-cyan to-neon-blue hover:shadow-[0_0_22px_rgba(0,240,255,0.4)] transition-all duration-300 [clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,10px_100%,0_calc(100%-10px))]">
                      LAUNCH
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
