# Section Shapes + Avatar + Project Priority

Resolution of [Issue #2 — Lock content per section + project priority + headshot strategy](https://github.com/mrkjyqnt/portfolio/issues/2).

Closed: 2026-08-29 via grilling.

## Headshot / Avatar

**Use the existing GitHub photo as-is.**
- Source: `avatars.githubusercontent.com/u/89252539` (already public, B&W portrait)
- Naturally fits the dark-mode palette
- No additional design work

Appears in: Hero (small top-right mark), About (left column on desktop).

## Project Feature Priority

Order in the Projects section, top-to-bottom:

1. **BasePaint Plugin** — Chrome extension. Lead with the **BasePaint Hackathon 2026 "For Artists"** win as the one-line hook.
2. **CSE Classroom** — AI-powered CSE reviewer. Lead with the **lesson-aware AI tutor** as the technical hook.
3. **BasePaint Assist** — AI-powered assistant. Lead with the agentic routing angle ("slash commands into real BasePaint actions via OpenRouter").

**basepaint-lite:** not featured (overlaps with Assist thematically; dilutes signal).

## Section Shapes (locked, motion-driven, dark-mode default)

### Hero
- Large name + typewriter-revealed role line (Framer Motion)
- One-line tagline
- 2 CTAs: "View projects" → `#projects`, "Get in touch" → `#contact`
- Subtle scroll cue
- Avatar in a small top-right mark (not center stage)

### About
- **Desktop:** 2-column — avatar left, ~3-paragraph bio right
- **Mobile:** single column with avatar above text
- Bio content: where Mark Jay is (Malabon City), what he does (AI Development), what makes him tick
- 2–3 highlight chips: "Claude Code", "AI Automation", "Signarama 2025–2026"

### Experience
- Vertical timeline-style card stack
- Each entry: company + role + dates header → 3–4 bullets → tech-stack chips
- Signarama Philippines (most recent, May 2025 – Aug 2026) at top

### Projects
- 3-card grid in locked order (Plugin → Classroom → Assist)
- Each card: thumbnail (or screenshot when available), title, 1-line description, tech chips, links (GitHub + live)
- Hover lift + border tint

### Skills
- 2×2 grid of category groups (from resume):
  - AI & Agentic Tools (Claude Code, Codex, Agentic Engineering, Prompt Engineering, AI-Assisted Development, AI Automation)
  - Programming Languages (Visual Basic.NET, C#, Python, XAML, JavaScript, HTML, CSS)
  - Technical (Basic Networking Concepts, Basic Hardware Knowledge, Operating Systems, Troubleshooting, Configuration and Maintenance, Basic Server Concepts)
  - Other (UI/UX Designing, Manual Testing)
- Chip cloud inside each group, **no skill bars** (they read dated)

### Contact
- Centered card
- mailto + LinkedIn + GitHub buttons
- "Available for…" status badge (green dot)
- One-line: "Currently at Signarama Philippines."

## Motion Language (consistent across all sections)

- Section enter: staggered fade-up via Framer Motion `whileInView` + `staggerChildren`
- Cards: lift on hover + border tint
- **No parallax** — keeps the prototype readable and fast
- Hero gets the typewriter headline as a distinctive micro-interaction

## Component Inventory (for Issue #4 to install via `pnpm dlx shadcn@latest add`)

- `button` ✓ already installed
- `card` — for Experience entries + Project cards
- `badge` — for tech chips, skill chips, status badge
- `separator` — for section dividers
- `avatar` — for About section
- Maybe: `tooltip` (for skill chip hover)

## Data Files (Issue #4 to populate in `src/data/`)

- `projects.ts` — 3 entries in locked order, typed as `Project[]`
- `experience.ts` — 1 entry (Signarama), typed as `Experience[]`
- `skills.ts` — 4 categories, typed as `SkillCategory[]`
- `about.ts` — bio paragraphs + highlights, typed as `AboutContent`
- `hero.ts` — name, role line, tagline, CTAs, typed as `HeroContent`
- `contact.ts` — email, LinkedIn URL, GitHub URL, status, typed as `ContactContent`

## Out of this ticket's scope

- Section copy wording (the actual paragraphs in About, project descriptions) — that's Issue #4 with the data files above as the carrier.
- Thumbnail images for projects — Issue #4 may need to source or generate placeholders.