import { SectionLabel } from "./section-label"
import { GithubGraph } from "@/components/sections/github-graph"
import { FadeUp } from "@/components/motion/fade-up"

export function Github() {
  return (
    <FadeUp>
      <section>
        <SectionLabel
          title="GitHub"
          hint="Public activity"
        />
        <GithubGraph username="mrkjyqnt" />
      </section>
      <div className="mt-12" />
    </FadeUp>
  )
}