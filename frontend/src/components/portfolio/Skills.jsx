import React from 'react';
import * as Icons from 'lucide-react';
import SectionHead from '../common/SectionHead';
import Reveal from '../common/Reveal';

const COLOR_MAP = {
  cyan: ['#00f0ff', 'rgba(0,240,255,0.15)', 'text-[#00f0ff]', 'hover:border-[#00f0ff]/40'],
  purple: ['#b16cff', 'rgba(177,108,255,0.15)', 'text-[#b16cff]', 'hover:border-[#b16cff]/40'],
  pink: ['#ff2d78', 'rgba(255,45,120,0.15)', 'text-[#ff2d78]', 'hover:border-[#ff2d78]/40'],
  blue: ['#4d7cff', 'rgba(77,124,255,0.15)', 'text-[#4d7cff]', 'hover:border-[#4d7cff]/40'],
  gold: ['#f5c042', 'rgba(245,192,66,0.15)', 'text-[#f5c042]', 'hover:border-[#f5c042]/40'],
};

export default function Skills({ data }) {
  if (!data?.skills) return null;
  return (
    <section id="skills" className="py-28 px-6 max-w-[1180px] mx-auto relative">
      <SectionHead tag="character.skills" title="EQUIPPED SKILL TREE" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">
        {data.skills.map((s, i) => {
          const IconComp = Icons[s.icon] || Icons.Code;
          const [, cGlow, textCls, borderCls] = COLOR_MAP[s.color] || COLOR_MAP.cyan;
          return (
            <Reveal key={s._id || i}>
              <div
                className={`relative overflow-hidden p-5 border border-[var(--border)] bg-[var(--card)] backdrop-blur-md [clip-path:polygon(0_0,calc(100%-18px)_0,100%_18px,100%_100%,0_100%)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_26px_rgba(0,240,255,0.12)] ${borderCls}`}
                style={{ '--cGlow': cGlow }}
              >
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_85%_10%,var(--cGlow),transparent_62%)] pointer-events-none" />
                <div className="flex justify-between items-center mb-3.5 relative">
                  <IconComp className={`${textCls} filter drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]`} size={22} />
                </div>
                <h4 className="font-display text-[0.88rem] tracking-wider text-[var(--text)] relative">{s.name.toUpperCase()}</h4>
                <p className="font-mono text-[0.6rem] tracking-[0.24em] text-[var(--muted)] my-1.5 uppercase relative">{s.category}</p>
                <div className="mt-4 flex justify-between items-center font-mono text-[0.62rem] tracking-[0.16em] relative border-t border-[var(--border)] pt-3">
                  <span className="text-[var(--muted)]">RANK:</span>
                  <span className={`font-bold ${textCls} filter drop-shadow-[0_0_6px_var(--cGlow)]`}>{s.rank}</span>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
