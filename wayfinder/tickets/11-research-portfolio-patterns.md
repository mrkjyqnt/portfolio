# Survey dark-mode + motion-driven dev portfolio patterns

**Status:** closed
**Type:** research (AFK)
**Date closed:** 2026-08-29
**Blocks:** [Build the full single-page prototype](20-build-full-page-prototype.md)
**Resolution:** findings in [wayfinder/research/11-portfolio-patterns.md](../research/11-portfolio-patterns.md).

## Resolution Summary

8 portfolios surveyed (Brittany Chiang, Bruno Simon, craftzdog, Anthony Fu, Maxime Heckel, Olivia Ng, Robin Mastromarino, SITCON Bento). 8 concrete "moves to consider" extracted — each pattern one-line, with a specific source portfolio. Verified against source `package.json` files where the live page was JS-heavy.

**8 moves the prototype can pick from:**
1. Numbered scroll-rail navigation (Brittany Chiang)
2. Stagger-on-mount card reveal via Framer Motion `staggerChildren` (craftzdog)
3. Smooth-scroll inertia via Lenis (SITCON, craftzdog)
4. Custom-cursor with magnetic snap on CTAs (Robin Mastromarino, Jhey)
5. Tag-driven project cloud with spring physics (Anthony Fu)
6. Pinned horizontal-scroll strip for case studies (SITCON Bento)
7. Loader + typewriter headline (Brittany, Maxime)
8. CSS-only horizontal marquee as section divider (Olivia Ng)

Bonus: cursor-reactive gradient — cheap-to-render premium feel (Larose / Codrops family).

**Caveat for next session:** subagent flagged that some search results for `anthony-fouad.com`, `sarahedo.com`, `lucasflandoli.com` returned ECONNREFUSED / 404 / looked fabricated and were dropped. Robin Mastromarino's description is from public Awwwards / FWA case studies (couldn't fetch his live page) — worth a quick manual visit before borrowing patterns from him.

**Suggested default for the prototype** (not yet decided): combine **#2 stagger-on-mount** for hero + sections, **#7 typewriter headline** in hero, and **#8 marquee divider** between sections. Lenis (#3) if the scroll feel needs work. Tag-driven cloud (#5) as the Projects section shape if user picks it in [15 — grilling](15-grilling-content-and-priority.md).

## Question

What patterns do well-regarded dark-mode, motion-driven developer portfolios use for hero sections, section transitions, project cards, and contact blocks? The goal is *not* to copy a single site, but to surface a vocabulary of moves the prototype can draw from.

## Subagent brief

Spin up a `/research` subagent with this prompt:

> Research task: Survey 5–8 developer / engineer / designer portfolios that combine (a) dark mode and (b) motion (Framer Motion, GSAP, Lottie, or scroll-driven animation). For each, note: the hero's main moves (type animation, gradient, scroll cue), how sections transition (fade / slide / scroll-snap / parallax), how the projects grid is laid out (uniform cards / bento / masonry), and one distinctive micro-interaction worth borrowing. Then write a short "moves to consider" section listing 6–10 concrete animation patterns the prototype can pick — each with a one-line description and a pointer to one example portfolio that uses it.
>
> **Avoid** any specific portfolio the user explicitly excluded. Aim for variety: at least one bento-style portfolio, at least one typography-led portfolio, at least one with strong scroll-driven transitions.
>
> Write findings to `wayfinder/research/11-portfolio-patterns.md`. Report under 600 words once done.