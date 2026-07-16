import React from 'react';
import { Award } from 'lucide-react';
import SectionHead from '../common/SectionHead';
import Reveal from '../common/Reveal';

const RARITY_MAP = {
  legendary: ['#f5c042', 'rgba(245,192,66,0.15)', 'LEGENDARY', 'text-[#f5c042]', 'border-[#f5c042]/40', 'bg-[#f5c042]/10'],
  epic: ['#b16cff', 'rgba(177,108,255,0.15)', 'EPIC', 'text-[#b16cff]', 'border-[#b16cff]/40', 'bg-[#b16cff]/10'],
  rare: ['#00f0ff', 'rgba(0,240,255,0.15)', 'RARE', 'text-[#00f0ff]', 'border-[#00f0ff]/40', 'bg-[#00f0ff]/10'],
};

export default function Achievements({ data }) {
  if (!data?.achievements) return null;
  return (
    <section id="achievements" className="py-28 px-6 max-w-[1180px] mx-auto relative">
      <SectionHead tag="character.achievements" title="TROPHY ROOM" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
        {data.achievements.map((a, i) => {
          const [cHex, cGlow, label, textCls, borderCls, bgCls] = RARITY_MAP[a.rarity] || RARITY_MAP.rare;
          return (
            <Reveal key={a._id || i}>
              <div
                className={`relative overflow-hidden p-6 bg-[var(--card)] backdrop-blur-md border border-[var(--border)] [clip-path:polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,16px_100%,0_calc(100%-16px))] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_24px_rgba(0,240,255,0.12)] ${borderCls}`}
                style={{ '--rc': cHex, '--rcGlow': cGlow }}
              >
                <div className="flex items-center justify-between mb-[18px]">
                  <div className={`w-[58px] h-[58px] grid place-items-center [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)] shadow-[inset_0_0_0_1px_var(--rc)] ${textCls} ${bgCls}`}>
                    <Award size={26} className="filter drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]" />
                  </div>
                  <span className={`font-mono text-[0.56rem] tracking-[0.24em] border py-1.2 px-2.5 ${textCls} ${borderCls} ${bgCls}`}>{label}</span>
                </div>
                <h4 className="font-display text-[0.95rem] tracking-wider mb-1.5 text-[var(--text)]">{a.title.toUpperCase()}</h4>
                <p className="font-mono text-[0.62rem] tracking-[0.14em] text-neon-cyan mb-3">{a.issuer.toUpperCase()}</p>
                <p className="text-[var(--muted)] text-[0.94rem] leading-[1.65] mb-4">{a.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="font-mono text-[0.58rem] tracking-[0.2em] text-[var(--muted)] flex items-center gap-2">
                    <div className="w-[22px] h-[1px] bg-[var(--rc)]" style={{ backgroundColor: cHex }} /> {a.year}
                  </div>
                  {a.certificateUrl && (
                    <a href={a.certificateUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center py-2 px-4 border border-neon-cyan/25 hover:border-neon-cyan hover:text-neon-cyan hover:shadow-[0_0_12px_rgba(0,240,255,0.25)] transition-all duration-300 font-mono text-[0.6rem] tracking-widest text-[var(--text)] bg-[var(--surface)] [clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,8px_100%,0_calc(100%-8px))] cursor-pointer">
                      VIEW TROPHY
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
