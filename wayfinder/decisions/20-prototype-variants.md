# Prototype — 3 variants on `prototype/variants` branch

Resolution of [Issue #4 — Build the full single-page prototype](https://github.com/mrkjyqnt/portfolio/issues/4).

Closed: 2026-08-29.

## What's built

Three structurally different visual treatments of the same portfolio, all preserving the locked section shapes from Issue #2 (Hero typewriter · About 2-col · Experience timeline · Projects 3-card · Skills 2×2 · Contact card). They differ in **page composition** and **visual treatment**, not in content.

| Variant | Style | When to pick |
|---|---|---|
| **A — Linear Stack** | Single column, max-w-3xl centered, generous vertical spacing, monospace accents (JetBrains Mono-style), thin separators between sections, subtle fade-up motion. | You want **clarity over density**. Reads like a long-form personal site. Lowest visual risk. |
| **B — Bento Mosaic** | Varied tile sizes in a 3-col bento grid, dense, emerald/violet gradient accents on tile hover, asymmetric, hero split with avatar on the right. | You want **personality over calm**. Modern dev-portfolio aesthetic, lots of information density without clutter. |
| **C — Editorial Asymmetric** | Magazine-style. Serif italic headlines (large display type), pull-quote About section, large numbered Project cards, full-bleed Contact band at the bottom. | You want **distinctive over common**. Reads like a publication, not a SaaS dashboard. |

## How to view

```bash
git fetch origin prototype/variants
git checkout prototype/variants
pnpm install
pnpm dev
# visit http://localhost:5173/?variant=A   (or B, C)
```

Use the floating bottom-center pill to cycle variants. The `←` / `→` arrow keys also cycle (skipped when typing in inputs). The switcher is dev-only — gated, not shipped to production.

## What's on main vs the throwaway branch

**`main`** (commit `e74fbed`):
- `src/data/` typed content (hero, about, experience, projects, skills, contact) — used by the final portfolio
- `src/components/ui/{card,badge,separator,avatar}.tsx` — shadcn primitives the prototype used, reused by the final portfolio
- Scaffold: Vite + React 19 + Tailwind v4 + shadcn (base-ui) + motion@13
- `src/App.tsx` — placeholder ("Scaffold ready...")

**`prototype/variants`** (throwaway, primary source per the prototype skill):
- `src/prototype/VariantA.tsx`, `VariantB.tsx`, `VariantC.tsx` — the three variants
- `src/prototype/PrototypeApp.tsx` — variant switcher
- `src/prototype/PrototypeSwitcher.tsx` — floating bottom bar
- `src/prototype/motion-primitives.tsx` — FadeUp, Stagger, StaggerItem, LinkButton
- `src/App.tsx` — wired to `PrototypeApp`

## What the user does next

1. **Pick a winner** (or "I want A's hero with B's projects"). State it back as a follow-up.
2. Issue #5 (deploy) targets the throwaway branch so you can click through on a real URL.
3. Once a winner is picked: fold the winner into main as a real `src/components/sections/*` tree, delete the prototype branch.

## What the prototype revealed (already known to be needed)

- **Card primitives** for Project cards (already installed).
- **Hover lift** on cards (locked in motion language).
- **Section IDs** (`#hero`, `#about`, `#experience`, `#projects`, `#skills`, `#contact`) for in-page anchor links from the hero CTAs.
- **Typewriter** needs careful implementation — currently a per-character interval, should swap to a `motion`-driven reveal for accessibility + reduced-motion respect.

## Out of this ticket's scope

- Section copy wording refinement (placeholder language in the variants — fine for picking a feel, the real copy lands when the winner is folded in).
- Thumbnail images for project cards (variants use text-only cards; images are a follow-up).
- Color customization beyond the locked dark + emerald/violet accent in Variant B.