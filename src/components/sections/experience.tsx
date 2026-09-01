import { Badge } from "@/components/ui/badge"
import { experience } from "@/data/experience"
import { SectionLabel } from "./section-label"
import { FadeUp } from "@/components/motion/fade-up"

function formatEnd(end: string): string {
  const currentYear = new Date().getFullYear()
  const yearMatch = end.match(/\d{4}/)
  const year = yearMatch ? parseInt(yearMatch[0], 10) : 0
  const isCurrent =
    /August\s+\d{4}|Present/i.test(end) && year >= currentYear
  return isCurrent ? "Present" : end
}

export function Experience() {
  return (
    <FadeUp>
      <section aria-label="Work experience">
        <SectionLabel
          title="Experience"
          hint={`${experience.length} role`}
        />
        {experience.map((e) => (
          <article key={e.company} className="space-y-3">
            <header className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-semibold">{e.role}</h3>
              <span className="font-mono text-xs tabular-nums text-muted-foreground">
                {e.start} — {formatEnd(e.end)}
              </span>
            </header>
            <p className="text-sm text-muted-foreground">
              {e.company} · {e.location}
            </p>
            <ul className="space-y-1.5 text-sm leading-relaxed text-foreground/85">
              {e.bullets.map((b, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-muted-foreground">—</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1">
              {e.stack.map((s) => (
                <Badge
                  key={s}
                  variant="outline"
                  className="text-xs transition hover:bg-muted"
                >
                  {s}
                </Badge>
              ))}
            </div>
          </article>
        ))}
      </section>
    </FadeUp>
  )
}