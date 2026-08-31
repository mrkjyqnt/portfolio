import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  SiClaude,
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiDotnet,
} from "react-icons/si"
import {
  Brain,
  Terminal,
  Sparkles,
  Cog,
  Network,
  Cpu,
  Monitor,
  Wrench,
  Settings,
  Server,
  Layout,
  FlaskConical,
  Layers,
} from "lucide-react"
import { skills } from "@/data/skills"
import { SectionLabel } from "./section-label"
import { FadeUp } from "@/components/motion/fade-up"
import type { ReactNode } from "react"

const ICON_MAP: Record<string, ReactNode> = {
  "Claude Code": <SiClaude className="h-3 w-3" />,
  Codex: <SiClaude className="h-3 w-3" />,
  "Agentic Engineering": <Brain className="h-3 w-3" />,
  "Prompt Engineering": <Terminal className="h-3 w-3" />,
  "AI-Assisted Development": <Sparkles className="h-3 w-3" />,
  "AI Automation": <Cog className="h-3 w-3" />,
  "Visual Basic.NET": <SiDotnet className="h-3 w-3" />,
  "C#": <SiDotnet className="h-3 w-3" />,
  Python: <SiPython className="h-3 w-3" />,
  XAML: <Layers className="h-3 w-3" />,
  JavaScript: <SiJavascript className="h-3 w-3" />,
  HTML: <SiHtml5 className="h-3 w-3" />,
  CSS: <SiCss className="h-3 w-3" />,
  "Basic Networking Concepts": <Network className="h-3 w-3" />,
  "Basic Hardware Knowledge": <Cpu className="h-3 w-3" />,
  "Operating Systems": <Monitor className="h-3 w-3" />,
  Troubleshooting: <Wrench className="h-3 w-3" />,
  "Configuration and Maintenance": <Settings className="h-3 w-3" />,
  "Basic Server Concepts": <Server className="h-3 w-3" />,
  "UI/UX Designing": <Layout className="h-3 w-3" />,
  "Manual Testing": <FlaskConical className="h-3 w-3" />,
}

export function Skills() {
  return (
    <FadeUp>
      <section>
        <SectionLabel
          index={4}
          title="Skills"
          hint="Where I spend my time"
        />
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {skills.map((cat) => (
            <div key={cat.title}>
              <h3 className="text-sm font-semibold">{cat.title}</h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {cat.skills.map((s) => (
                  <Tooltip key={s}>
                    <TooltipTrigger>
                      <Badge
                        variant="secondary"
                        className="cursor-default gap-1 transition hover:bg-secondary/70"
                      >
                        {ICON_MAP[s]}
                        {s}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>{cat.title}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="mt-12" />
    </FadeUp>
  )
}