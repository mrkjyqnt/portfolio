# Lock content per section + project priority + headshot strategy

**Status:** closed
**Date closed:** 2026-08-29
**GitHub:** https://github.com/mrkjyqnt/portfolio/issues/2
**Resolution:** [decisions/15-section-shapes.md](../decisions/15-section-shapes.md)
**Type:** grilling (HITL — needs the user)
**Blocks:** [Build the full single-page prototype](20-build-full-single-page-prototype.md)

## Question

Three decisions the prototype needs before it can be built:

1. **Section content** — what is in each of Hero, About, Experience, Projects, Skills, Contact? Pulled from the resume + GitHub, but the *shape* of each section is the question. E.g.:
   - **Hero:** name + tagline + 2-3 CTAs? Or one CTA + scroll cue?
   - **About:** short bio paragraph? Bullet list of strengths? Avatar + blurb side-by-side?
   - **Experience:** timeline-style? Card grid? Accordion? What does each entry show (role / company / dates / bullets / tech stack)?
   - **Projects:** card grid with image + title + description + tech chips + links? Bento? Filterable by tech?
   - **Skills:** categorized chips (AI & Agentic / Languages / Technical / Other — from resume)? Visual skill bars? Icon grid?
   - **Contact:** email link + LinkedIn + GitHub? Form? "Available for..." status badge?
2. **Project feature priority** — of the resume's three named projects (BasePaint Assist, BasePaint Plugin, CSE Classroom), which 2–3 get hero cards in the Projects section and in what order? BasePaint Plugin is a strong candidate (won hackathon 2026). The full GitHub repo inventory comes from research ticket [10](10-research-github-repos.md) — has any repo the resume *doesn't* name earned a featured spot?
3. **Headshot / avatar** — does Mark Jay have a photo to use? If not, options: monogram initials, abstract logo, generative gradient avatar, no avatar. Privacy / professionalism tradeoffs to discuss.

## Subagent brief

None — this is HITL. Open `/grilling` with the user. Bring: the resume content, the GitHub research findings (from [10](10-research-github-repos.md) once it lands), and 2–3 example section shapes per section so the user can react.

Resolution format: a short markdown record under `wayfinder/decisions/15-section-shapes.md` with per-section shape, project feature list (in order), and avatar decision. Link from [map.md → Decisions so far](../map.md#decisions-so-far).