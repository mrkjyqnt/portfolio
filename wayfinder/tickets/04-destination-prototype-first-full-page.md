# Destination is prototype-first, full single-page

**Status:** closed
**Type:** grilling
**Date closed:** 2026-08-29

## Question

What does "done" look like for this map? Plan-only, architecture-only, build-in-place, or prototype-first?

## Resolution

Destination = **prototype-first, full single-page**.

What the prototype must include:
- All six sections stubbed: Hero, About, Experience, Projects, Skills, Contact.
- Mark Jay Sarcia Quinto's actual content (from resume + GitHub), not lorem ipsum.
- Section transitions wired (style TBD — Framer Motion `AnimatePresence` is the default; alternative is scroll-triggered via `useScroll`).
- Dark mode default; reference site's typography (Space Grotesk / DM Sans / JetBrains Mono) unless `/grilling` overrides.
- Deployed to a Vercel preview URL for live inspection.

What the prototype is **not**: the final portfolio. After the prototype lands, the architecture / content / animation decisions become specifiable, and a follow-up effort builds the final.

This override carries execution into the map (wayfinder default is plan-only). Future sessions can resolve build tickets directly.

Decision recorded in [map.md → Decisions so far](../map.md#decisions-so-far).