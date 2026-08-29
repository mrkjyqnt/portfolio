# Vite + React + shadcn + Framer Motion setup best practices (2026)

**Status:** closed
**Type:** research (AFK)
**Date closed:** 2026-08-29
**Blocks:** [Scaffold the Vite + React + Tailwind + shadcn + Framer Motion project](30-scaffold-project.md)
**Resolution:** findings in [wayfinder/research/12-stack-setup.md](../research/12-stack-setup.md).

## Resolution Summary

- **Scaffold command (canonical):** `pnpm dlx shadcn@latest init -t vite` — shadcn CLI v4 (March 2026) scaffolds full Vite + React 19 + Tailwind v4 starter with dark mode included. Manual fallback: `pnpm create vite@latest` + add `@tailwindcss/vite` + `pnpm dlx shadcn@latest init`.
- **Package pins:** Vite 7+, React 19, Tailwind v4 + `@tailwindcss/vite`, `motion@^12` (NOT `framer-motion`), `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`. Node 20.19+ or 22.12+. pnpm 9+ preferred.
- **Framer Motion rename confirmed:** install `motion`, import from `"motion/react"`. v11.11.17+ required for React 19.
- **Tailwind v3 vs v4:** Use v4 (OKLCH, `@theme inline`, no `forwardRef`, `new-york`-only style). v3 only if legacy browser support needed.
- **Dark mode:** shadcn ships a custom `ThemeProvider` for Vite (NOT `next-themes` — that's Next.js-specific). localStorage key `vite-ui-theme`. CSS variables under `:root` and `.dark`.
- **Vercel SPA gotcha:** Must add `vercel.json` with `rewrites: [{source: "/(.*)", destination: "/index.html"}]` or deep-link refreshes 404. Build = `pnpm run build`, output = `dist`, Node = 22.x.
- **Templates surveyed:** `ts-react-shadcn-starter` (minimal), Aceternity UI / Magic UI (animated blocks, mostly Next.js), Motion Primitives (animated shadcn components). Canonical Vite path = shadcn CLI v4 itself; add motion manually.
- **Implication for scaffold ticket:** update [#30](30-scaffold-project.md) — recommend pnpm over npm, `motion` instead of `framer-motion`, Tailwind v4 default.

## Question

What is the canonical, current setup for a Vite + React + TypeScript + Tailwind + shadcn/ui + Framer Motion project as of 2026 — and what are the gotchas (Tailwind v4 vs v3, `components.json` choices, Framer Motion → `motion` rename, React 19 compat, Vite plugin ordering)?

## Subagent brief

Spin up a `/research` subagent with this prompt:

> Research task: Document the canonical, current (2026) setup for a new Vite + React + TypeScript project that adds Tailwind CSS, shadcn/ui, and Framer Motion. Cover: the exact `npm create` / `pnpm create` commands, package versions to pin (Vite, React, Tailwind, shadcn/ui's `components.json`, `framer-motion` vs the renamed `motion` package), Tailwind v3 vs v4 tradeoffs for shadcn/ui, the `shadcn` CLI init flow (`npx shadcn@latest init` + add commands), Framer Motion's current package name and import path (it has been renamed to `motion`), React 19 / 18 compatibility notes, dark mode setup (CSS variables via shadcn's defaults vs `next-themes`-style), and Vercel deployment gotchas for a Vite SPA (output dir, build command, SPA rewrites).
>
> Also: list 3–4 high-quality community templates that already combine Vite + React + shadcn + Framer Motion, with one-line pros/cons per template.
>
> Write findings to `wayfinder/research/12-stack-setup.md`. Report under 700 words once done. This unblocks the scaffold ticket — keep the recommendation actionable, not theoretical.