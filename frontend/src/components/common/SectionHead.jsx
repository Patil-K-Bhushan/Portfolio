import React from 'react';

export default function SectionHead({ tag, title }) {
  return (
    <div className="text-center mb-[58px]">
      <span className="font-mono text-[0.74rem] tracking-[0.32em] text-neon-cyan uppercase">{tag}</span>
      <h2 className="font-display font-black text-[clamp(1.65rem,4.5vw,2.55rem)] mt-3 text-[#e8ecff] tracking-wide">{title}</h2>
      <div className="w-[84px] h-[3px] mx-auto mt-[18px] bg-gradient-to-r from-neon-cyan to-neon-purple shadow-[0_0_12px_#00f0ff]" />
    </div>
  );
}
