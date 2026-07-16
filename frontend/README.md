# ⚡ Client Console - Frontend Subproject

The client-side interface of the gaming portfolio. Built using React, powered by Vite, and styled with utility classes.

## 📂 Folder Layout
- `public/`: Raw media, static fonts, and the resume PDF (`Bhushan_Patil_Resume.pdf`).
- `src/components/common/`: Shared layout controls (HUD particles, counters, reveal transitions).
- `src/components/portfolio/`: Section segments (Lobby banner, Backstory HUD, Campaign quest timeline).
- `src/data/portfolioData.json`: Pinned details of the developer (bio details, skills points, completed missions).

## 🎨 Tailwind v4 Configurations
- Styled using pure Tailwind utility classes.
- Keyframes, custom variables (neon cyan, neon purple, etc.) are declared directly inside `@theme` in `src/index.css`.

## ⚙️ Scripts
- `npm run dev`: Launch local Vite dev server.
- `npm run build`: Package source files into static assets under `dist/` ready for free deployments.
