# Stack is Vite + React + shadcn + Framer Motion

**Status:** closed
**Type:** grilling
**Date closed:** 2026-08-29

## Question

Which framework + UI library + animation library combination to use?

## Resolution

Stack (locked):
- **Vite** (build tool, fast HMR, Rolldown-ready)
- **React** (UI library, same as reference)
- **Tailwind CSS** (utility CSS, required by shadcn/ui)
- **shadcn/ui** (component primitives — copy-in, owned in repo; satisfies "reusable components, separated concerns")
- **Framer Motion** (animation library, same as reference)
- **Lucide React** (icons, same as reference)
- Deployment: **Vercel**

Rationale: mirrors the reference site's stack so the aesthetic transfers without translation; satisfies user's "we may use shadcn, or other free components" signal; Vite SPA is the simplest path to the reference's snappy feel without SSR overhead.

Decision recorded in [map.md → Decisions so far](../map.md#decisions-so-far).