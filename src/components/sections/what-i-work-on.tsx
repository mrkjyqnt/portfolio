import { Badge } from "@/components/ui/badge"
import { Rocket, Code2, Brain } from "lucide-react"
import { SectionLabel } from "./section-label"
import { FadeUp } from "@/components/motion/fade-up"

export function WhatIWorkOn() {
  return (
    <FadeUp>
      <section>
        <SectionLabel
          title="What I work on"
          hint="Right now"
        />
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="gap-1.5 px-2.5 py-1">
            <Rocket className="h-3.5 w-3.5" />
            Shipping AI agents that turn prompts into products
          </Badge>
          <Badge variant="secondary" className="gap-1.5 px-2.5 py-1">
            <Code2 className="h-3.5 w-3.5" />
            Next.js · TypeScript · Claude Code · motion
          </Badge>
          <Badge variant="secondary" className="gap-1.5 px-2.5 py-1">
            <Brain className="h-3.5 w-3.5" />
            Open to AI + full-stack roles
          </Badge>
        </div>
      </section>
      <div className="mt-12" />
    </FadeUp>
  )
}