# Reference feel — dark mode + motion-driven, geometric type

**Status:** closed
**Type:** grilling
**Date closed:** 2026-08-29

## Question

What aesthetic does the portfolio aim for? User described wanting the "feel of Astro" — fast, snappy, motion-driven, modular component feel.

## Resolution

Aesthetic target (locked):
- **Dark mode default** (matches the "Astro feel" description and current dev-portfolio conventions).
- **Motion-driven UX** — sections transition smoothly, micro-interactions on hover/click, scroll-triggered reveals.
- **Geometric typography** — Space Grotesk for display, DM Sans for body, JetBrains Mono for code/accents (Google Fonts).
- **Modular component feel** — clean separation of primitives and section shells.

Stack (locked): **Vite + React + Tailwind + shadcn/ui + Framer Motion + Lucide**, deployable to Vercel.

No copying of any specific external portfolio's content, URL, brand, project descriptions, or personal information. The feel is borrowed as a *vocabulary of moves* — research in [research/11-portfolio-patterns.md](../research/11-portfolio-patterns.md) catalogues 8 other dev portfolios for moves like stagger-on-mount, typewriter headlines, Lenis smooth scroll, tag-driven project clouds, marquee dividers, and pinned scroll-rails.

Decision recorded in [map.md → Decisions so far](../map.md#decisions-so-far).