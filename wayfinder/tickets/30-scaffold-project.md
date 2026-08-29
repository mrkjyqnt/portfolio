# Scaffold the Vite + React + Tailwind + shadcn + Framer Motion project

**Status:** open
**Type:** task (AFK — once research settles the setup, the scaffolding itself is mechanical)
**Blocked by:** [Vite + React + shadcn + Framer Motion setup best practices (2026)](12-research-stack-setup.md)
**Blocks:** [Build the full single-page prototype](20-build-full-single-page-prototype.md)
**Resolution:** pending — scaffold lives at the repo root or under `portfolio/` (decide in resolution).

## Question

How do we go from zero to a runnable Vite + React + Tailwind + shadcn/ui + Framer Motion project, ready to receive prototype content?

Scope:
- Project root decision (this directory vs a new `portfolio/` subfolder) — recommend `portfolio/` to keep wayfinder artifacts separate from the app code.
- `npm create vite@latest` with the `react-ts` template.
- Tailwind install + config.
- `npx shadcn@latest init` with sensible defaults (neutral base color, CSS variables, dark mode).
- `framer-motion` (or `motion`, per research findings) install.

**Locked by [research #12](12-research-stack-setup.md):** use `pnpm dlx shadcn@latest init -t vite`, install **`motion@^12`** (NOT `framer-motion`), import from `"motion/react"`. Node 22.x. Tailwind v4 default.
- Initial folder structure that satisfies "separated concerns, reusable components" — propose: `src/components/ui` (shadcn primitives), `src/components/sections` (section shells: Hero / About / Experience / Projects / Skills / Contact), `src/lib` (utils, content data), `src/data` (typed content: projects, experience, skills).
- TypeScript path aliases (`@/components`, `@/lib`).
- `vercel.json` or equivalent so the SPA rewrites work on Vercel.
- Smoke test: `npm run dev` boots, dark mode renders, one shadcn component renders.

Out of scope (later tickets):
- Filling in section content (that's [20 — build the prototype](20-build-single-page-prototype.md)).
- Animations (added in the prototype ticket).
- Deployment (that's [40 — deploy to Vercel preview](40-deploy-to-vercel.md)).

Resolution format: record the chosen project location, the `package.json` final dependency list, the folder structure, and the commit hash / link to the scaffolded state.