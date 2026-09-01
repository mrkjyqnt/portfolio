export type Project = {
  slug: string
  title: string
  hook: string
  description: string
  stack: string[]
  githubUrl: string
  liveUrl?: string
  highlight?: string
}

export const projects: Project[] = [
  {
    slug: "basepaint-plugin",
    title: "BasePaint Plugin",
    hook: "Won BasePaint Hackathon 2026 — \"For Artists\" category",
    description:
      "Chrome extension adding bucket fill, image upload, color picker, mirror drawing, and stroke export to the BasePaint canvas editor.",
    stack: ["JavaScript", "Chrome Extension API", "BasePaint"],
    githubUrl: "https://github.com/mrkjyqnt/basepaint-plugin",
    liveUrl: "https://mrkjyqnt.github.io/basepaint-plugin/",
    highlight: "hackathon-2026",
  },
  {
    slug: "cse-classroom",
    title: "CSE Classroom",
    hook: "Lesson-aware AI tutor",
    description:
      "Full-stack Civil Service Examination reviewer covering Professional and Sub-Professional subjects — lessons, quizzes, an 80-item timed exam, progress tracking, and certificates.",
    stack: ["TypeScript", "Next.js", "AI Tutor", "Vercel"],
    githubUrl: "https://github.com/mrkjyqnt/cse-classroom",
    liveUrl: "https://cse-classroom.vercel.app",
  },
  {
    slug: "basepaint-assist",
    title: "BasePaint Assist",
    hook: "Agentic assistant — slash commands route into real BasePaint actions",
    description:
      "Server-only chat assistant for BasePaint that handles contributions, streaks, mints, canvas info, and converts images to BasePaint-compatible pixel strokes via OpenRouter.",
    stack: ["TypeScript", "OpenRouter", "Vercel", "Agentic Routing"],
    githubUrl: "https://github.com/mrkjyqnt/basepaint-assist",
    liveUrl: "https://basepaint-assist.vercel.app",
  },
]