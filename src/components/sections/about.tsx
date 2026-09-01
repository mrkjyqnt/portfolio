import { about } from "@/data/about"
import { SectionLabel } from "./section-label"
import { FadeUp } from "@/components/motion/fade-up"

export function About() {
  return (
    <FadeUp>
      <section>
        <SectionLabel
          title="About"
          hint="Who I am, where I work"
        />
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>
    </FadeUp>
  )
}