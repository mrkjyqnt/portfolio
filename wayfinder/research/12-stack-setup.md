# Stack Setup Research: Vite + React + TS + Tailwind + shadcn/ui + Framer Motion (2026)

Canonical setup for a new SPA scaffold as of August 2026. Actionable commands and pin recommendations for the scaffold ticket.

## TL;DR — Recommended Stack

- **Build tool:** Vite 7+ (latest)
- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4 (OKLCH, `@theme inline`)
- **Components:** shadcn/ui (CLI v4, `new-york` style)
- **Animation:** `motion` v12+ (renamed from `framer-motion`, import from `motion/react`)
- **Runtime:** Node 20.19+ or 22.12+
- **Package manager:** pnpm 9+ (or npm 10+)

---

## 1. Scaffold Commands (exact)

### Option A — All-in-one (recommended): shadcn CLI scaffolds full Vite starter

Per the [shadcn CLI v4 changelog](https://ui.shadcn.com/docs/changelog/2026-03-cli-v4), `shadcn init` can now scaffold a complete Vite template (with dark mode included):

```bash
pnpm dlx shadcn@latest init -t vite
# interactive prompts: style (new-york), base color, CSS variables (yes)
```

### Option B — Manual two-step

```bash
# Step 1: Vite + React + TS
pnpm create vite@latest my-app --template react-ts
cd my-app
pnpm install

# Step 2: Tailwind v4 via official Vite plugin
pnpm add tailwindcss @tailwindcss/vite
```

Then replace `src/index.css` with:
```css
@import "tailwindcss";
```

Configure `tsconfig.json` + `tsconfig.app.json` with `baseUrl: "."` and `"paths": { "@/*": ["./src/*"] }`. Update `vite.config.ts` with `@tailwindcss/vite` plugin and `resolve.alias`. Then:

```bash
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card dialog
```

---

## 2. Package Versions to Pin (Aug 2026)

| Package | Version | Notes |
|---|---|---|
| `vite` | `^7.0.0` | Current major |
| `react` / `react-dom` | `^19.0.0` | Required for Tailwind v4 + shadcn CLI v4 |
| `typescript` | `^5.6.0` | |
| `tailwindcss` | `^4.0.0` | v4 is default; install `@tailwindcss/vite` |
| `@tailwindcss/vite` | `^4.0.0` | First-party Vite plugin |
| `motion` | `^12.0.0` | Renamed from `framer-motion`; v11.11.17+ required for React 19 |
| `lucide-react` | latest | Icons used by shadcn |
| `class-variance-authority`, `clsx`, `tailwind-merge` | latest | shadcn utilities |
| `@radix-ui/*` | latest | Primitives installed per shadcn component |

---

## 3. Tailwind v3 vs v4 — Use v4 for New Projects

shadcn/ui [officially supports Tailwind v4](https://ui.shadcn.com/docs/tailwind-v4). Tradeoffs:

| Aspect | v3 | v4 |
|---|---|---|
| Color system | HSL wrappers | OKLCH, `@theme inline` |
| Animation plugin | `tailwindcss-animate` | `tw-animate-css` (v4 native) |
| `forwardRef` | Required | Removed; `data-slot` props |
| Style variant | `default` / `new-york` | `new-york` only (`default` deprecated) |
| Browser support | Broad | Modern browsers only |
| `toast` component | Available | Deprecated — use `sonner` |

**Recommendation:** Tailwind v4 + React 19 + shadcn CLI v4. v3 path only if you must support legacy browsers.

---

## 4. shadcn CLI Flow

```bash
pnpm dlx shadcn@latest init     # interactive: style, color, CSS vars
pnpm dlx shadcn@latest add button card input dialog dropdown-menu sonner
pnpm dlx shadcn@latest add form tabs sheet tooltip
```

`components.json` (created by init):
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "hooks": "@/hooks"
  }
}
```

For monorepos: `pnpm dlx shadcn@latest add card -c apps/web`.

---

## 5. Framer Motion → `motion` Rename

The library was [rebranded from Framer Motion to Motion](https://motion.dev/docs/react-quick-start). Same team, same API.

- **Install:** `pnpm add motion` (do **not** install `framer-motion`)
- **Import:** `import { motion } from "motion/react"`
- **React 19 compatibility:** requires `motion@^11.11.17` (recommend `^12`)
- Old `framer-motion` package is in maintenance mode

```tsx
import { motion } from "motion/react"
<motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} />
```

---

## 6. React 19 Compatibility

shadcn/ui [fully supports React 19](https://github.com/shadcn-ui/ui/discussions/6714). Notes:
- `forwardRef` removed from primitives; refs become regular props with `data-slot` attributes.
- New JSX transform required (default in Vite TS template).
- `motion@^12` is the safe pairing.
- TypeScript types around `ref` may need attention in third-party deps.

---

## 7. Dark Mode Setup

Per the [official Vite dark mode guide](https://ui.shadcn.com/docs/dark-mode/vite), shadcn ships a **custom `ThemeProvider` for Vite** (not `next-themes`, which is Next.js-specific). The provider:
- Stores choice in `localStorage` (key `vite-ui-theme`)
- Toggles `light` / `dark` / `system` classes on `document.documentElement`
- Reads `prefers-color-scheme` for system mode

CSS variables are defined in `src/index.css` under `:root` and `.dark`, applied automatically by Tailwind's `bg-background`, `text-foreground` utilities (via `@theme inline` in v4).

If you want `next-themes` anyway (it works outside Next.js), install `next-themes` and use `attribute="class"` — but it's not the documented Vite path.

---

## 8. Vercel Deployment (Vite SPA)

Vercel has [first-class Vite support](https://vercel.com/docs/frameworks/frontend/vite). For an SPA, you **must** add a `vercel.json` for deep-linking:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Settings (auto-detected, but verify):
- **Build Command:** `pnpm run build` (or `npm run build`)
- **Output Directory:** `dist`
- **Install Command:** `pnpm install` (or auto-detected)
- **Node Version:** 22.x (set in Project Settings)

Gotchas:
- Without the rewrite rule, refreshes on `/about` return 404.
- If you enable `cleanUrls`, use `"/"` as the destination (no `.html`).
- Env vars must be prefixed with `VITE_` to be exposed to the client.

---

## 9. Community Templates (Vite + React + shadcn + Motion)

| Template | Pros | Cons |
|---|---|---|
| [**ts-react-shadcn-starter**](https://github.com/muhammadranju/ts-react-shadcn-template) | Minimal, ESLint preconfigured, lean | No motion pre-installed; basic |
| [**Aceternity UI**](https://ui.aceternity.com/) | 200+ animated blocks + components, motion baked in | Primarily Next.js-flavored; copy-paste model |
| [**Magic UI**](https://magicui.design/) | 150+ animated components, Tailwind + Motion native | Most templates Next.js; Vite via copy-paste |
| [**Motion Primitives**](https://allshadcn.com/tools/motion-primitives/) | Drop-in animated shadcn-compatible primitives | Component library, not a scaffold |

For a Vite scaffold specifically, **shadcn CLI v4 `init -t vite`** is the canonical starting point — add motion manually as needed rather than relying on community forks.

---

## Sources

- [Vite — Getting Started](https://vitejs.dev/guide/)
- [shadcn/ui — Vite Installation](https://ui.shadcn.com/docs/installation/vite)
- [shadcn/ui — Tailwind v4](https://ui.shadcn.com/docs/tailwind-v4)
- [shadcn/ui — Dark Mode (Vite)](https://ui.shadcn.com/docs/dark-mode/vite)
- [shadcn/ui — CLI v4 Changelog](https://ui.shadcn.com/docs/changelog/2026-03-cli-v4)
- [Motion (React) — Quick Start](https://motion.dev/docs/react-quick-start)
- [Motion — Installation](https://motion.dev/docs/react-installation)
- [motion on npm](https://www.npmjs.com/package/motion)
- [Vercel — Vite Framework Guide](https://vercel.com/docs/frameworks/frontend/vite)
- [shadcn-ui/ui Discussion #6714 — Tailwind v4 + React 19](https://github.com/shadcn-ui/ui/discussions/6714)