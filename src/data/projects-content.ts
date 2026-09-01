/**
 * Project-page content. Each entry feeds one /projects/:slug page.
 * Sourced from the research in wayfinder ticket #14 (Issue #19).
 * If a detail isn't in this file, it isn't documented — the page must
 * say so or link out, not invent.
 */

export type ProjectSection =
  | { kind: "paragraph"; text: string }
  | { kind: "code"; caption: string; code: string; lang?: string }
  | { kind: "bullets"; items: string[] }
  | { kind: "kv"; pairs: { label: string; value: string }[] }

export type ProjectContent = {
  slug: string
  title: string
  tagline: string
  screenshot: string
  screenshotCaption: string
  heroCtas: { label: string; href: string; external?: boolean }[]
  overview: string
  howItWorks: ProjectSection[]
  techStack: { name: string; note?: string }[]
  license: string
  liveUrl?: string
  githubUrl: string
  nextSlug: string | null
}

export const projectsContent: ProjectContent[] = [
  {
    slug: "basepaint-plugin",
    title: "BasePaint Plugin",
    tagline: "Tools that should've been there from day one.",
    screenshot: "/projects/basepaint-plugin.png",
    screenshotCaption:
      "Landing page — Hackathon 2026 winner banner + the four injected tools.",
    heroCtas: [
      {
        label: "Try the demo",
        href: "https://mrkjyqnt.github.io/basepaint-plugin/",
        external: true,
      },
      {
        label: "GitHub",
        href: "https://github.com/mrkjyqnt/basepaint-plugin",
        external: true,
      },
    ],
    overview:
      "A Chrome MV3 extension that injects four new drawing tools — Bucket Fill, Image Upload, Color Picker, Stroke Download — directly into basepaint.xyz's collaborative daily pixel-art canvas. Won the BasePaint Hackathon 2026, For Artists category. Zero declared permissions: the content script injects alongside the native toolbar and reuses BasePaint's existing on-chain submit path, so the wallet never sees the plugin.",
    howItWorks: [
      {
        kind: "paragraph",
        text:
          "The extension is a single content script scoped to basepaint.xyz. On document_idle it polls for BasePaint's Next.js SPA to hydrate, then walks the DOM (not fragile class names) to discover the native toolbar. A MutationObserver re-injects if React unmounts the toolbar somewhere down the route tree.",
      },
      {
        kind: "paragraph",
        text:
          "Bucket Fill is an explicit-queue BFS over a Uint8Array visited bitmap in logical pixel coordinates, with a flood mode (exact RGB match) and a magic-wand mode (any non-transparent pixel). Strokes are written back via the same clipboard-paste path the native toolbox uses — or, as a fallback, the script walks React fibers to find a component whose memoizedProps.onPaste is a function and invokes it.",
      },
      {
        kind: "kv",
        pairs: [
          { label: "Bucket Fill", value: "8-way BFS, hotkey B, treats alpha < 16 as transparent" },
          { label: "Image Upload", value: "drop an image, palette-match every pixel, emit strokes" },
          { label: "Color Picker", value: "rAF-throttled live swatch, hotkey I" },
          { label: "Stroke Download", value: "PNG or paste-ready text, split into N-pixel chunks under the per-stroke cap" },
        ],
      },
    ],
    techStack: [
      { name: "Vanilla JS (ES2017+)", note: "no build step, no bundler, no framework, no deps" },
      { name: "Chrome MV3", note: "manifest, content script, run_at: document_idle, zero permissions" },
      { name: "Canvas 2D API", note: "willReadFrequently + putImageData for atomic writes" },
      { name: "MutationObserver", note: "re-injects on toolbar remount" },
      { name: "React fiber traversal", note: "fallback path when the upload paste channel isn't available" },
    ],
    license: "CC0 (public domain)",
    liveUrl: "https://mrkjyqnt.github.io/basepaint-plugin/",
    githubUrl: "https://github.com/mrkjyqnt/basepaint-plugin",
    nextSlug: "cse-classroom",
  },
  {
    slug: "cse-classroom",
    title: "CSE Classroom",
    tagline:
      "An unofficial, AI-tutored reviewer for the Philippine Civil Service Exam.",
    screenshot: "/projects/cse-classroom.png",
    screenshotCaption:
      "Live demo — locked / unlocked topic grid with progress tracking.",
    heroCtas: [
      {
        label: "Open the app",
        href: "https://cse-classroom.vercel.app",
        external: true,
      },
      {
        label: "GitHub",
        href: "https://github.com/mrkjyqnt/cse-classroom",
        external: true,
      },
    ],
    overview:
      "A full-stack study web app for Filipinos preparing for the Civil Service Examination (Professional + Sub-Professional). 18 lessons across five subjects, gated per-topic quizzes, an 80-item timed practice exam, and a printable Certificate of Achievement at 70%+. A bilingual EN/TL AI tutor sits as a floating bubble on every lesson page and is intentionally disabled during quizzes.",
    howItWorks: [
      {
        kind: "paragraph",
        text:
          "Next.js 16 App Router app. Static lesson + quiz data lives in lib/data.ts. Progress is read/written via lib/session.ts over both localStorage and cookies so refreshes don't lose state.",
      },
      {
        kind: "paragraph",
        text:
          "The AI tutor is a floating chat widget that hits app/api/chat/route.ts — a thin OpenRouter proxy forwarding { messages, systemPrompt } to openai/gpt-oss-20b:free. The client builds the system prompt with the lesson title, the first ~1000 chars of the lesson content, a hardcoded anti-cheat clause (\"create a SIMILAR example with different numbers instead\" if asked for a quiz answer), a language instruction, and tone rules. Only the last 6 turns are sent each request to bound tokens.",
      },
      {
        kind: "kv",
        pairs: [
          { label: "Subjects", value: "Mathematics · English · Filipino · Philippine Constitution · Inductive Reasoning" },
          { label: "Lessons", value: "18 lessons across 5 subjects" },
          { label: "Quiz items", value: "99 topic quiz questions" },
          { label: "Practice exam", value: "80 items, 90 minutes, question navigator + flag-for-review" },
          { label: "Certificate", value: "printable, shareable, requires 70%+" },
        ],
      },
    ],
    techStack: [
      { name: "Next.js 16 App Router" },
      { name: "React 19 + TypeScript 5" },
      { name: "Tailwind CSS 4" },
      { name: "OpenRouter API", note: "default model openai/gpt-oss-20b:free; system prompt is client-built" },
      { name: "localStorage + cookies", note: "client + server progress persistence" },
      { name: "Vercel", note: "AI tutor needs the server-side /api/chat route" },
    ],
    license: "MIT",
    liveUrl: "https://cse-classroom.vercel.app",
    githubUrl: "https://github.com/mrkjyqnt/cse-classroom",
    nextSlug: "basepaint-assist",
  },
  {
    slug: "basepaint-assist",
    title: "BasePaint Assist",
    tagline: "Ask the canvas anything — typed, server-only, never signs.",
    screenshot: "/projects/basepaint-assist.png",
    screenshotCaption:
      "Live demo — chat with slash-command routing + image-to-strokes.",
    heroCtas: [
      {
        label: "Try it",
        href: "https://basepaint-assist.vercel.app",
        external: true,
      },
      {
        label: "GitHub",
        href: "https://github.com/mrkjyqnt/basepaint-assist",
        external: true,
      },
    ],
    overview:
      "A Next.js + TypeScript chat web app for basepaint.xyz. A typed, server-only assistant answers natural-language questions about today's canvas, mints, streaks, and contributions; supports slash-command routing with tool follow-through; and converts images to strokes. The LLM itself never signs — every wallet/signing action is delegated to an external wallet (Coinbase Wallet primary, WalletConnect fallback) connected via Privy + Wagmi.",
    howItWorks: [
      {
        kind: "paragraph",
        text:
          "Next.js 15 App Router + React 18. The LLM is selected at boot: if OPENROUTER_API_KEY is set, calls go to OpenRouter (default model google/gemini-2.5-flash); otherwise it falls back to direct Google Gemini (gemini-2.5-flash); with neither key, a minimal StubLlmProvider keeps things runnable offline / in CI. The architecture is server-only — the model never holds signing keys.",
      },
      {
        kind: "paragraph",
        text:
          "The client uses Privy for connect; WagmiProvider underneath keeps the useAccount, useChainId, useWalletClient hooks unchanged so signing flows route through the user's actual wallet. Slash commands dispatch into tool follow-through on the server. dompurify + marked render markdown responses safely.",
      },
      {
        kind: "kv",
        pairs: [
          { label: "Provider chain", value: "OpenRouter → Gemini direct → StubLlmProvider offline fallback" },
          { label: "Wallets", value: "Coinbase Wallet primary, WalletConnect fallback" },
          { label: "Image-to-strokes", value: "drop an image, get basepaint strokes" },
          { label: "Architecture", value: "server-only; the LLM never sees signing keys" },
        ],
      },
    ],
    techStack: [
      { name: "Next.js 15 App Router" },
      { name: "React 18 + TypeScript 5" },
      { name: "@privy-io/react-auth + @privy-io/wagmi" },
      { name: "wagmi + viem" },
      { name: "@coinbase/wallet-sdk + @walletconnect/ethereum-provider" },
      { name: "OpenRouter + direct Google Gemini fallback" },
      { name: "marked + dompurify", note: "markdown rendering with sanitization" },
      { name: "Vercel Analytics" },
    ],
    license: "not documented",
    liveUrl: "https://basepaint-assist.vercel.app",
    githubUrl: "https://github.com/mrkjyqnt/basepaint-assist",
    nextSlug: null,
  },
]

export function getProjectContent(slug: string): ProjectContent | undefined {
  return projectsContent.find((p) => p.slug === slug)
}
