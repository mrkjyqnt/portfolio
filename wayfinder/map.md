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
- [Scaffold landed in `portfolio/`](../../issues/3) — `pnpm dlx shadcn@latest init -t vite -p nova`, `motion@13` added, `vercel.json` with SPA rewrites, folder structure (`src/components/sections`, `src/data`, `src/components/effects`). Build clean. **Adjustment:** preset brought in base-ui (not Radix) and Geist font (not Space Grotesk / DM Sans / JetBrains Mono) — both fine, both swappable later.
- [8 portfolio patterns + 8 "moves to consider"](tickets/11-research-portfolio-patterns.md) — staggered hero reveal, typewriter headline, Lenis smooth scroll, tag-driven project cloud, pinned horizontal strip, CSS marquee divider, numbered scroll rail, custom magnetic cursor. Suggested prototype default: stagger + typewriter + marquee divider.

## Not yet specified

- Specific color palette (within dark mode — slate / neutral / pure black / accent choice).
- Typography pairings (Space Grotesk + DM Sans + JetBrains Mono from reference, or simplify to two fonts?).
- Project data source (manual JSON in repo vs GitHub API at build time).
- Headshot / avatar strategy (photo, monogram, abstract logo, none).
- Project feature priority — which 2–3 projects get hero treatment in the Projects section (BasePaint Assist, BasePaint Plugin (hackathon winner), CSE Classroom).
- Section transition style (Framer Motion `AnimatePresence`, scroll-triggered parallax via `useScroll`, CSS scroll-snap, route-based fade).
- Component boundaries — what becomes a reusable primitive (Section shell? Card? Button? Badge? Skill chip?).
- Contact method — static links (email / LinkedIn / GitHub) vs contact form (which needs a backend decision).
- Final deployment URL — pick a fresh Vercel preview slug (e.g. `mrkjyqnt-portfolio-prototype.vercel.app`) until a permanent URL is decided.

## Out of scope

- The final portfolio build itself — separate effort, informed by the prototype's architecture decisions.
- Backend services (contact form backend, form validation, rate-limiting).
- Custom domain registration.
- Analytics / monitoring / SEO tuning beyond basic OG tags.
- CMS / content layer (prototype uses in-repo content; CMS is a later decision).