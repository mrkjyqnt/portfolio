import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Trophy } from "lucide-react"
import { Link } from "react-router-dom"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { projects } from "@/data/projects"
import { SectionLabel } from "./section-label"
import { FadeUp } from "@/components/motion/fade-up"

import {
  SiClaude,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiVercel,
  SiHtml5,
  SiCss,
  SiDotnet,
} from "react-icons/si"
import {
  Brain,
  Network,
  Layers,
  Puzzle,
  Workflow,
} from "lucide-react"
import type { ReactNode } from "react"

const ICON_MAP: Record<string, ReactNode> = {
  "Claude Code": <SiClaude className="h-3 w-3" />,
  Codex: <SiClaude className="h-3 w-3" />,
  "Agentic Engineering": <Brain className="h-3 w-3" />,
  "Prompt Engineering": <SiClaude className="h-3 w-3" />,
  "AI-Assisted Development": <SiClaude className="h-3 w-3" />,
  "AI Automation": <SiClaude className="h-3 w-3" />,
  "Visual Basic.NET": <SiDotnet className="h-3 w-3" />,
  "C#": <SiDotnet className="h-3 w-3" />,
  Python: <SiPython className="h-3 w-3" />,
  XAML: <Layers className="h-3 w-3" />,
  JavaScript: <SiJavascript className="h-3 w-3" />,
  TypeScript: <SiTypescript className="h-3 w-3" />,
  "Next.js": <SiNextdotjs className="h-3 w-3" />,
  Vercel: <SiVercel className="h-3 w-3" />,
  HTML: <SiHtml5 className="h-3 w-3" />,
  CSS: <SiCss className="h-3 w-3" />,
  "Chrome Extension API": <Puzzle className="h-3 w-3" />,
  BasePaint: <Workflow className="h-3 w-3" />,
  "AI Tutor": <Brain className="h-3 w-3" />,
  OpenRouter: <Network className="h-3 w-3" />,
  "Agentic Routing": <Workflow className="h-3 w-3" />,
}

function ProjectLink({
  href,
  label,
}: {
  href: string
  label: string
}) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="rounded text-foreground underline-offset-4 transition hover:text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {label} →
        </a>
      </TooltipTrigger>
      <TooltipContent>Opens in new tab</TooltipContent>
    </Tooltip>
  )
}

export function Projects() {
  return (
    <FadeUp>
      <section>
        <SectionLabel
          title="Selected work"
          hint={`${projects.length} shipped`}
        />
        <div className="divide-y divide-border rounded-md border border-border">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group relative space-y-2 p-5 transition first:pt-6 last:pb-6 hover:bg-muted/40 hover:pl-6"
            >
              <span className="absolute bottom-0 left-0 top-0 w-0.5 origin-top scale-y-0 bg-primary transition-transform duration-300 group-hover:scale-y-100" />
              <header className="flex items-start justify-between gap-2">
                <h3 className="text-base font-semibold transition group-hover:text-primary">
                  {p.title}
                </h3>
                {p.highlight && (
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-300">
                        <Trophy className="h-3 w-3" />
                        Hackathon
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      Won BasePaint Hackathon 2026, For Artists
                    </TooltipContent>
                  </Tooltip>
                )}
              </header>
              <p className="text-sm font-medium text-foreground/85">
                {p.hook}
              </p>
              <p className="text-sm text-muted-foreground">{p.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <Badge
                    key={s}
                    variant="outline"
                    className="gap-1 text-xs transition hover:bg-muted"
                  >
                    {ICON_MAP[s]}
                    {s}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-1 text-sm">
                <Link
                  to={`/projects/${p.slug}`}
                  className={cn(
                    buttonVariants({ variant: "link", size: "sm" }),
                    "text-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring px-0"
                  )}
                >
                  Read more →
                </Link>
                <ProjectLink href={p.githubUrl} label="GitHub" />
                {p.liveUrl && <ProjectLink href={p.liveUrl} label="Live" />}
              </div>
            </article>
          ))}
        </div>
      </section>
      <div className="mt-12" />
    </FadeUp>
  )
}