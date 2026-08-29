# Build the full single-page prototype

**Status:** closed
**Type:** prototype (HITL — agent builds, user reacts to the artifact)
**Date closed:** 2026-08-29
**GitHub:** https://github.com/mrkjyqnt/portfolio/issues/4
**Prototype branch:** https://github.com/mrkjyqnt/portfolio/tree/prototype/variants
**Resolution:** [decisions/20-prototype-variants.md](../decisions/20-prototype-variants.md)
**Blocked by:**
- [Pull mrkjyqnt GitHub repos and pick portfolio-worthy ones](10-research-github-repos.md)
- [Survey dark-mode + motion-driven dev portfolio patterns](11-research-portfolio-patterns.md)
- [Scaffold the Vite + React + Tailwind + shadcn + Framer Motion project](30-scaffold-project.md)
- [Lock content per section + project priority + headshot strategy](15-grilling-content-and-priority.md)
**Blocks:** [Deploy prototype to a Vercel preview URL](40-deploy-to-vercel.md)

## Question

Build the prototype: a full single-page portfolio with all six sections stubbed (Hero, About, Experience, Projects, Skills, Contact), using Mark Jay's real content, dark mode default, section transitions wired, deployed-ready but not yet deployed.

What "built" means:
- All six sections render with real Mark Jay content (no lorem ipsum).
- Each section uses the shape locked in [15 — content + priority](15-grilling-content-and-priority.md).
- Projects section uses the curated list from [10 — GitHub research](10-research-github-repos.md).
- Section transitions match a picked style from [11 — patterns research](11-research-portfolio-patterns.md) — recommend Framer Motion `AnimatePresence` for section-in / section-out + `useScroll` for per-section scroll-triggered micro-animations, but record what was actually chosen.
- Component boundaries match the separated-concerns / reusable-components intent: section shells in `src/components/sections`, primitives in `src/components/ui`, content typed in `src/data`.
- A `npm run dev` boots the prototype cleanly. No console errors. Dark mode is the default.

What "built" does **not** mean:
- Final polish. This is throwaway — the prototype's job is to surface decisions, not to ship.
- Backend / contact form. Static links only.
- Custom domain. Deployed to a fresh Vercel preview URL by [40](40-deploy-to-vercel.md).
- The user's "do not copy any external portfolio" constraint — we use the *vocabulary* of motion only, not any specific portfolio's structure, copy, or branding.

## Subagent brief

None — this is the build itself. Use `/prototype` skill to drive the build. Capture the prototype in the project's repo root (where [30](30-scaffold-project.md) landed it). Link the running dev URL and any screenshots from `wayfinder/decisions/20-prototype-screenshots.md` once rendered.

Resolution format: a screenshot or short Loom-style note per section, the chosen section-transition style, the project tree at the end, and a one-paragraph summary of what the prototype *reveals* about the architecture decisions for the final build (which become fresh tickets).