# Portfolio Prototype — Map

## Destination

A working prototype of Mark Jay Sarcia Quinto's portfolio (full single-page, all sections stubbed) that nails the visual feel of the reference site and surfaces the architecture decisions (component structure, animation patterns, content model) the final portfolio build will rest on. Deployed to a Vercel preview URL.

## Notes

- **This map carries execution** — user picked prototype-first, overriding wayfinder's planning default. Tickets include build work, not just decisions.
- **Stack (locked):** Vite + React + Tailwind + shadcn/ui + Framer Motion, dark mode default, deployable to Vercel.
- **Reference feel:** dark mode default, motion-driven, geometric typography (Space Grotesk / DM Sans / JetBrains Mono), modular component feel. Stack references the same libraries the user described as the "Astro feel" target. *No copying of any specific external portfolio's content, URL, brand, or personal info.*
- **Content sources:** resume PDF in this folder (`Resume - Quinto.pdf`) + GitHub `github.com/mrkjyqnt`.
- **Tracker:** GitHub Issues on this repo (issues for open tickets; closed tickets live in the `wayfinder/tickets/` folder as commit history).
- **Skills every session should consult:** `/prototype`, `/research`, `/grilling`, `/domain-modeling`.

## Decisions so far

- [Brand is Mark Jay Sarcia Quinto](tickets/01-brand-is-mark-jay.md) — handle `mrkjyqnt`; resume is the source of truth for name and content.
- [Reference feel — dark mode + motion-driven, geometric type](tickets/02-reference-feel.md) — aesthetic target only; no copying of any specific external portfolio's content, URL, brand, or personal info.
- [Stack is Vite + React + shadcn + Framer Motion](tickets/03-stack-vite-react-shadcn-framer.md) — mirrors reference stack; Vercel-deployable; dark mode default.
- [Destination is prototype-first full single-page](tickets/04-destination-prototype-first-full-page.md) — all sections stubbed; prototype surfaces architecture decisions for the final build.
- [mrkjyqnt's GitHub: 8 repos, 3 on resume, 4th optional](tickets/10-research-github-repos.md) — resume projects (`basepaint-assist`, `basepaint-plugin`, `cse-classroom`) are the anchors; `basepaint-lite` is the optional 4th; the three VB.NET repos are out.
- [Stack setup (Aug 2026) locked](tickets/12-research-stack-setup.md) — `pnpm dlx shadcn@latest init -t vite`, React 19, Tailwind v4, install **`motion@^12`** (Framer Motion is renamed; import from `motion/react`), Node 22.x, Vercel needs `vercel.json` SPA rewrites.
- [Scaffold landed at the repo root](../../issues/3) — `pnpm dlx shadcn@latest init -t vite -p nova`, `motion@13` added, `vercel.json` with SPA rewrites, folder structure (`src/components/sections`, `src/data`, `src/components/effects`). Build clean. **Adjustment:** preset brought in base-ui (not Radix) and Geist font (not Space Grotesk / DM Sans / JetBrains Mono) — both fine, both swappable later. **Restructure:** originally scaffolded under `portfolio/` subfolder; flattened to repo root so GitHub URLs aren't double-nested (`github.com/mrkjyqnt/portfolio/blob/main/src/...`).
- [Section shapes + avatar + project priority locked](../../issues/2) — avatar = existing GitHub B&W photo. Projects order = Plugin → Classroom → Assist (basepaint-lite out). 6 section shapes: Hero typewriter + 2 CTAs · About 2-col + chips · Experience timeline · Projects 3-card grid · Skills 2×2 chip grid (no skill bars) · Contact card + status badge. Motion: `whileInView` stagger, hover lift, no parallax.
- [3-variant prototype built on `prototype/variants` branch](../../issues/4) — A = Linear Stack (single column, generous spacing) · B = Bento Mosaic (varied tile sizes, emerald/violet accents) · C = Editorial Asymmetric (serif italics, magazine numbers, full-bleed contact). Switch via `?variant=A|B|C` + bottom-center pill + ←/→ arrows. By-products on main: `src/data/` content + `card`/`badge`/`separator`/`avatar` shadcn primitives. Winner folds into main, throwaway branch deletes.
- **[DECISION] VariantB (Plain Pro) chosen as the winner** — light mode default + dark mode toggle, refined typography, section numbers in primary color, project numbering `01 / 03`, tech chips with brand icons (SiClaude / SiPython / SiJavascript / SiTypescript / SiNextdotjs / SiVercel / SiHtml5 / SiCss / SiDotnet + Lucide fallbacks), Trophy icon for hackathon, `ghchart.rshah.org` GitHub graph (with `dark:invert dark:hue-rotate-180`), `Present` for the current role, Tooltip on every skill chip and project link, project cards get a left-border accent on hover. Folder structure: `src/components/sections/*` to be extracted from `src/prototype/VariantB.tsx`.
- [8 portfolio patterns + 8 "moves to consider"](tickets/11-research-portfolio-patterns.md) — staggered hero reveal, typewriter headline, Lenis smooth scroll, tag-driven project cloud, pinned horizontal strip, CSS marquee divider, numbered scroll rail, custom magnetic cursor. Suggested prototype default: stagger + typewriter + marquee divider.

## Not yet specified

- Final deployment URL (Vercel preview slug, custom domain) — addressed by [Issue #6](../../issues/6) (build final portfolio + production polish).
- OG image + meta tags for social sharing (deferred to a polish ticket).
- Resume download — implemented as a `↓ Resume` ghost button in the hero (links to `Resume - Quinto.pdf` in repo). If hosting the PDF elsewhere becomes a need, that's a separate ticket.

## Out of scope

- The final portfolio build itself — separate effort, informed by the prototype's architecture decisions. **Now that VariantB is chosen, [Issue #6](../../issues/6) covers this.**
- Backend services (contact form backend, form validation, rate-limiting).
- Custom domain registration.
- Analytics / monitoring / SEO tuning beyond basic OG tags.
- CMS / content layer (prototype uses in-repo content; CMS is a later decision).