export function initParticles(canvas, COUNT, palette) {
  return Array.from({ length: COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
    r: Math.random() * 1.8 + 0.7,
    c: palette[Math.floor(Math.random() * palette.length)],
    tw: Math.random() * Math.PI * 2,
  }));
}

export function updateParticles(pts, canvas, mouse, MOUSE_R) {
  for (const p of pts) {
    p.x += p.vx;
    p.y += p.vy;
    p.tw += 0.02;
    const dx = p.x - mouse.x;
    const dy = p.y - mouse.y;
    const d = Math.hypot(dx, dy);
    if (d < MOUSE_R && d > 0.01) {
      const f = ((MOUSE_R - d) / MOUSE_R) * 0.6;
      p.x += (dx / d) * f;
      p.y += (dy / d) * f;
    }
    if (p.x < -20) p.x = canvas.width + 20;
    if (p.x > canvas.width + 20) p.x = -20;
    if (p.y < -20) p.y = canvas.height + 20;
    if (p.y > canvas.height + 20) p.y = -20;
  }
}

export function drawLinks(ctx, pts, LINK) {
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x;
      const dy = pts[i].y - pts[j].y;
      const d = Math.hypot(dx, dy);
      if (d < LINK) {
        ctx.beginPath();
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[j].x, pts[j].y);
        ctx.strokeStyle = pts[i].c + (1 - d / LINK) * 0.14 + ')';
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    }
  }
}
