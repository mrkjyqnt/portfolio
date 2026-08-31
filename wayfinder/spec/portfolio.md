# Portfolio — Spec

## Problem Statement

The user, Mark Jay Sarcia Quinto, is an AI Developer / Full-Stack Engineer based in Malabon City, Philippines. He's looking for new opportunities (full-time roles and freelance work) and needs a portfolio that:

- Signals "Open to work" clearly to HR and technical viewers within the first screen
- Shows his actual shipped work (BasePaint Plugin, CSE Classroom, BasePaint Assist) — not lorem-ipsum
- Reads cleanly in both light and dark mode, since the audience will arrive from any context
- Survives motion sensitivity (`prefers-reduced-motion`) and slow networks
- Doesn't look like a generic template — a designer, hiring manager, or fellow developer should remember it after one scroll

## Solution

A single-page portfolio deployed from the GitHub `main` branch (Vercel auto-deploy on push). Light-mode default with a dark-mode toggle. Scroll-fade-in motion that respects `prefers-reduced-motion`. Content sourced from typed data files in `src/data/*.ts` so the resume and projects stay in one editable place.

Sections, in order: Hero · About · Experience · Selected work · Skills · What I work on · GitHub · Get in touch · Footer. Each section is its own file in `src/components/sections/*`. The page is the section tree composed in `App.tsx` — nothing else.

Tech chips on Skills and Projects each carry a brand icon (Simple Icons for Claude/Python/JS/TS/Next/Vercel/HTML/CSS/.NET; Lucide fallbacks for conceptual skills like Brain/Terminal/Network/Cpu/etc.). The Hackathon badge uses a Lucide `Trophy` icon (not an emoji). The GitHub contribution graph is a third-party SVG (`ghchart.rshah.org/{username}`) with light/dark adaptation via `dark:invert dark:hue-rotate-180` and a "View on GitHub" fallback when the image fails.

## User Stories

1. As an HR recruiter visiting the portfolio, I want to see Mark Jay's name, role, location, and a clear "Open to work" badge on the first screen, so that I can assess fit in under 5 seconds
2. As an HR recruiter, I want the hero to put Email / LinkedIn / GitHub CTAs next to a Resume download, so that I can reach out or save his CV without leaving the page
3. As an HR recruiter, I want each section to have a numbered label (01 / 02 / 03…) so that I can mentally map where I am in the document
4. As a technical reviewer, I want the Skills section to show specific tools with brand icons (Claude Code, TypeScript, Next.js, Vercel), so that I can verify his stack in 5 seconds
5. As a technical reviewer, I want project cards to lead with the hook (hackathon win, lesson-aware tutor, agentic routing) before the description, so that I can scan what he's shipped
6. As a technical reviewer, I want the GitHub contribution graph to show real recent activity, so that the portfolio doesn't look stale
7. As any visitor, I want a light/dark toggle, so that I can read the portfolio in my preferred theme
8. As any visitor on a low-power device or with motion sensitivity, I want animations to disable automatically, so that the page doesn't trigger discomfort
9. As a recruiter receiving the link on LinkedIn / Twitter / Slack, I want the page to render quickly (under 200 KB JS gzipped), so that I don't bounce
10. As Mark Jay, I want to add a new project by editing one typed file, so that updates don't require touching component code
11. As Mark Jay, I want the current role to render as "Present" instead of an end date, so that the experience section stays accurate without re-editing the formatEnd helper
12. As a visitor with a screen reader, I want each section to have a proper heading level, so that I can navigate by landmarks
13. As a visitor on mobile, I want the layout to reflow cleanly, so that I can read everything on a phone
14. As a visitor, I want external project links to open in new tabs, so that I don't lose my place on the portfolio
15. As a visitor who skims, I want the "What I work on" pill row to summarize his current focus + stack + intent, so that I can understand his value prop at a glance
16. As Mark Jay, I want the GitHub contribution graph to fail gracefully when the third-party image service is down, so that visitors still see a "View on GitHub →" link instead of a broken image
17. As Mark Jay, I want the portfolio's design language to be coherent (typography, motion, icons, spacing) across all sections, so that it doesn't read as stitched-together templates

## Implementation Decisions

- **Single App composition seam**: `src/App.tsx` renders Hero → Separator → About → Separator → Experience → Separator → Projects → Skills → WhatIWorkOn → Github → Contact → Footer, all inside `max-w-3xl px-6 py-12`. Section order is fixed at the composition site.

- **Single data seam**: All editable content lives in `src/data/{hero,about,experience,projects,skills,contact}.ts`. Each file exports a single typed const. Adding a new project = adding one entry to `projects`. Updating the bio = editing `about.ts`. No component file needs to change.

- **Single section primitive**: Every section starts with `<FadeUp>` (motion wrapper that respects `prefers-reduced-motion`) and a `<SectionLabel>` (numbered section header with optional hint). Sections compose these two primitives + their own content; no other wrapper is needed.

- **Single theme primitive**: One `ThemeProvider` controls `.light` / `.dark` on `<html>`. The `:root` and `.dark` CSS variables in `src/index.css` define the palette. Sections use `bg-background` / `text-foreground` / `border-border` (theme-aware Tailwind utilities) so the same section code renders correctly in both modes.

- **Single GitHub graph primitive**: One component (`src/components/sections/github-graph.tsx`) wraps `ghchart.rshah.org/{username}` in a white card. In dark mode the card stays light and the image inverts (`dark:invert dark:hue-rotate-180`). On image error, falls back to "View on GitHub →".

- **Single tool-icon map**: One shared `ICON_MAP` (`Record<string, ReactNode>`) at the top of each section that uses icons. Brand icons for tools with Simple Icons entries; Lucide icons for conceptual skills. Adding a new tool = adding one entry to the map.

- **LinkButton helper**: One component (`src/components/ui/link-button.tsx`) applies `buttonVariants` to an `<a>` element so links can be styled as buttons while staying native anchors (no JavaScript routing).

- **Current-role date formatting**: A `formatEnd` helper in `Experience.tsx` renders `"August 2026"` (or similar future dates) as `"Present"`. No date library needed; the helper is 4 lines.

- **Vercel deployment**: A `vercel.json` SPA rewrite rule (`{ "source": "/(.*)", "destination": "/index.html" }`) lets deep links like `/#projects` work after refresh. Already on disk.

- **Motion language**: One `FadeUp` wrapper per section. Stagger is intentionally avoided (the user wanted "plain"). `useReducedMotion` short-circuits the animation if the user prefers reduced motion.

- **Tooltips**: One shadcn `TooltipProvider` at the app root. Used for: skill chips (category on hover), project links ("Opens in new tab" on hover), Trophy badge (explains the hackathon win).

## Testing Decisions

Tests ride the existing seams. No new architectural cuts, no new test framework choice — `vitest` + `@testing-library/react` (per Vite / shadcn precedent in this stack).

- **Data shape tests** (`src/data/*.test.ts`)
 - One file per data export.
 - Asserts the typed exports contain Mark Jay's actual content (name === "Mark Jay Sarcia Quinto"; projects includes the BasePaint Plugin with `highlight === "hackathon-2026"`; skills has 4 categories with the right tool counts; contact has non-empty email/LinkedIn/GitHub).
 - No mocks needed. Pure data.

- **Section render tests** (`src/components/sections/*.test.tsx`)
 - For each section: render with Mark Jay's real data wrapped in `<ThemeProvider>` + `<TooltipProvider>`; assert the user-visible content (heading text, project titles, skill names, links with correct `href`s, the "Open to work" badge).
 - Tests external behavior (what the user sees), not implementation (which shadcn primitives are used).
 - Two cases per section: light mode and dark mode — assert the section renders cleanly in both.

- **Provider tests** (`src/components/theme-provider.test.tsx`, `src/components/ui/tooltip.test.tsx`)
 - Theme: toggle, verify `<html>` class, verify localStorage persistence.
 - Tooltip: render trigger, verify content appears on hover.

- **GitHub graph fallback** (`src/components/sections/github-graph.test.tsx`)
 - Mock the image `onError`; verify the fallback "View on GitHub →" renders.
 - Mock successful load; verify the image element is rendered (not the fallback).

Prior art: shadcn ships examples for `vitest` + `@testing-library` with `jsdom`. Tailwind v4 + base-ui components don't need extra config.

**What makes a good test**: only test external behavior. Don't snapshot the DOM tree (brittle). Don't test that `Card` wraps a `div` (vendor detail). Test that the right text appears in the right order with the right links.

## Out of Scope

- Contact form backend (form validation, rate-limiting, anti-spam) — the portfolio uses static email/LinkedIn/GitHub links.
- Custom domain registration.
- Analytics / monitoring / SEO tuning beyond basic OG tags.
- CMS / content layer — content lives in-repo typed data files, no CMS.
- Per-section mobile-specific design — Tailwind responsive utilities handle reflow, no separate mobile spec.
- OG image generation — separate ticket.
- Blog / writing section — not in scope; the user does not publish long-form content.
- Testimonials / quotes from colleagues — invented content, not in scope.

## Further Notes

- This is a static portfolio. No backend, no database, no auth.
- Deployments happen via Git push to `main` triggering Vercel auto-deploy.
- The 6 typed data files are the entire surface area for content edits. No CMS, no admin UI.
- The throwaway-branch prototype phase is complete. This spec describes the production fold on `main` (commit `e58ac8a`).
- The deployed bundle is **152 KB JS gzipped / 9 KB CSS gzipped** — well under the recruiter-friendly threshold.
- The `ThemeProvider` defaults to `light` but a recruiter who arrives from a `prefers-color-scheme: dark` system will see dark mode.