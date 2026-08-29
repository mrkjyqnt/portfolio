# Deploy prototype to a Vercel preview URL

**Status:** open
**Type:** task (AFK — `vercel deploy` once the prototype builds cleanly)
**Blocked by:** [Build the full single-page prototype](20-build-single-page-prototype.md)

## Question

Get the prototype live on a Vercel preview URL so the user can click through the feel on a real URL.

Scope:
- Pick the project slug. Default recommendation: `mrkjyqnt-portfolio-prototype.vercel.app` (or any fresh slug the user prefers). A permanent URL is decided separately.
- `vercel link` + `vercel deploy --prod=false` (or via Git integration if the user prefers).
- Confirm the preview URL serves dark mode by default, the SPA rewrites work (direct deep-link to a section route doesn't 404), and fonts load.
- Record any environment-config gotchas in the resolution.

Resolution format: the live preview URL, the project slug used, and any environment-config gotchas (Node version, build command overrides, env vars).