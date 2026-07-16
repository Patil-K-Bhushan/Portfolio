import { useRef, useCallback } from 'react';

export default function useSound(enabled) {
  const ctxRef = useRef(null);
  const lastHover = useRef(0);

  const playHover = (ctx, now) => {
    const t = performance.now();
    if (t - lastHover.current < 90) return;
    lastHover.current = t;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(700, now);
    gain.gain.setValueAtTime(0.025, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  };

  const playClick = (ctx, now) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(640, now + 0.12);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.17);
  };

  return useCallback((kind) => {
    if (!enabled) return;
    try {
      if (!ctxRef.current) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        ctxRef.current = new AC();
      }
      const ctx = ctxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      const now = ctx.currentTime;
      if (kind === 'hover') playHover(ctx, now);
      else playClick(ctx, now);
    } catch (e) {
      /* Audio unsupported — fail silently */
    }
  }, [enabled]);
}
