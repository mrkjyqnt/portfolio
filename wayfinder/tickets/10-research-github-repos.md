# Pull mrkjyqnt GitHub repos and pick portfolio-worthy ones

**Status:** closed
**Type:** research (AFK)
**Date closed:** 2026-08-29
**Blocks:** [Build the full single-page prototype](20-build-single-page-prototype.md)
**Resolution:** findings in [wayfinder/research/10-github-repos.md](../research/10-github-repos.md).

## Resolution Summary

- 8 public repos on `github.com/mrkjyqnt` (full table in the research file).
- **Resume overlap is exactly 3:** `basepaint-assist`, `basepaint-plugin`, `cse-classroom` — all updated Aug 2026.
- **Optional 4th:** `basepaint-lite` (TypeScript / Next.js canvas rebuild). Adds Next.js breadth but overlaps thematically with `basepaint-assist` — use only if a 4-card slot is wanted.
- **Drop:** the three VB.NET repos (`DSAShare`, `IntegratedPaymentSystem`, `MarginSystem`) — predate the user's professional work, stack no longer in the resume. Also drop `GulaManYOW` (it's the profile README config, not a project).
- **Curation hooks** for the Projects section copy:
  - `basepaint-assist` → lead with agentic routing ("server-only chat assistant that routes slash commands into real BasePaint actions via OpenRouter").
  - `basepaint-plugin` → headline the **BasePaint Hackathon 2026 "For Artists"** win; feature list backs it up.
  - `cse-classroom` → frame as full-stack product with **lesson-aware AI tutor** as the technical hook.
- Stars are 0 across all three featured projects — no signal loss from omitting a star-count display.
- All featured repos are actively maintained (updated Aug 2026) so portfolio links won't 404.

## Question

Which of `github.com/mrkjyqnt`'s repositories are portfolio-worthy, and what does each project *say* on its own README / about page that the portfolio's Projects section can lean on?

Background context (from resume) to anchor the research:
- Resume lists **BasePaint Assist** (`basepaint-assist.vercel.app`), **BasePaint Plugin** (`mrkjyqnt.github.io/basepaint-plugin/`), and **CSE Classroom** (`cse-classroom.vercel.app`) as the named personal projects. The plugin won the Basepaint Hackathon 2026 "For Artists" category.
- Resume does **not** list every repo — GitHub may have more repos the resume doesn't highlight (WIPs, forks, experiments). The research should list *all* repos, mark which the resume already covers, and call out any the resume misses that look portfolio-worthy.

The research output should make the next two tickets cheap to resolve:
- "Lock content per section + project priority + headshot strategy" — needs a curated project list to choose feature priority from.
- "Build the full single-page prototype" → Projects section — needs project summaries + tech stacks + links per project.

## Subagent brief

Spin up a `/research` subagent with this prompt:

> Research task: Inventory all public repositories under `github.com/mrkjyqnt` (Mark Jay Sarcia Quinto). For each repo, capture: name, URL, primary language(s), description (from README first paragraph), star count, last-updated date, topics/tags. Cross-reference the resume PDF in `C:\Users\GulaManYOW\OneDrive\Documents\mrkjyqnt\Resume - Quinto.pdf` — flag which repos the resume already names (BasePaint Assist, BasePaint Plugin, CSE Classroom) and which it doesn't. Recommend a portfolio-worthy subset: which 3–5 projects should the portfolio's Projects section feature, and which can be left out (forks, unfinished experiments, duplicates).
>
> **Do not** scrape private content or write code. **Do** capture repo metadata + a 1–2 sentence curation note per recommended repo. Write findings to `wayfinder/research/10-github-repos.md` in markdown with the structure: a summary table of all repos, then a "Recommended for portfolio" section with per-project notes suitable to drop into the Projects section.
>
> Report under 500 words once done.