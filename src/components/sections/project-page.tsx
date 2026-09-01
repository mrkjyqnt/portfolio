import { Link, useParams } from "react-router-dom"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"
import { SiGithub } from "react-icons/si"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FadeUp } from "@/components/motion/fade-up"
import { SectionLabel } from "./section-label"
import { LinkButton } from "@/components/ui/link-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { getProjectContent, type ProjectContent, type ProjectSection } from "@/data/projects-content"

function Section({ content }: { content: ProjectSection }) {
  switch (content.kind) {
    case "paragraph":
      return (
        <p className="text-base leading-relaxed text-foreground/80">
          {content.text}
        </p>
      )
    case "code":
      return (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {content.caption && (
              <p className="border-b border-border bg-muted/50 px-4 py-2 font-mono text-xs text-muted-foreground">
                {content.caption}
              </p>
            )}
            <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed">
              <code>{content.code}</code>
            </pre>
          </CardContent>
        </Card>
      )
    case "bullets":
      return (
        <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground/80">
          {content.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )
    case "kv":
      return (
        <dl className="divide-y divide-border rounded-md border border-border">
          {content.pairs.map((p, i) => (
            <div
              key={i}
              className="grid grid-cols-[180px_1fr] gap-4 px-4 py-3 first:pt-4 last:pb-4"
            >
              <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {p.label}
              </dt>
              <dd className="text-sm">{p.value}</dd>
            </div>
          ))}
        </dl>
      )
  }
}

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project: ProjectContent | undefined = slug ? getProjectContent(slug) : undefined

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <FadeUp>
          <Card>
            <CardContent className="space-y-4 py-12 text-center">
              <h1 className="text-3xl font-bold">Project not found</h1>
              <p className="text-muted-foreground">
                No project matches <code className="font-mono">{slug}</code>.
              </p>
              <Link to="/" className="text-primary underline-offset-4 hover:underline">
                ← Back to home
              </Link>
            </CardContent>
          </Card>
        </FadeUp>
      </div>
    )
  }

  const next = project.nextSlug ? getProjectContent(project.nextSlug) : undefined

  return (
    <div className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <ThemeToggle />
      {/* HERO */}
      <FadeUp>
        <header className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" /> Back to home
          </Link>
          <h1 className="text-5xl font-bold leading-tight tracking-tight">
            {project.title}
          </h1>
          <p className="text-xl text-muted-foreground">{project.tagline}</p>
          <div className="flex flex-wrap gap-2">
            {project.heroCtas.map((cta) => (
              <LinkButton
                key={cta.label}
                href={cta.href}
                target={cta.external ? "_blank" : undefined}
                rel={cta.external ? "noreferrer" : undefined}
                size="lg"
              >
                {cta.label}
                {cta.external && <ExternalLink className="ml-1.5 h-3.5 w-3.5" />}
              </LinkButton>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-2 font-mono text-xs text-muted-foreground">
            <Badge variant="outline">License: {project.license}</Badge>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-foreground"
            >
              <SiGithub className="h-3 w-3" /> View source
            </a>
          </div>
        </header>
      </FadeUp>

      <Separator />

      {/* OVERVIEW */}
      <FadeUp>
        <section aria-label="Overview" className="space-y-6">
          <SectionLabel title="Overview" />
          <p className="text-base leading-relaxed text-foreground/85">
            {project.overview}
          </p>
        </section>
      </FadeUp>

      <Separator />

      {/* HOW IT WORKS */}
      <FadeUp>
        <section aria-label="How it works" className="space-y-6">
          <SectionLabel
            title="How it works"
            hint={`${project.howItWorks.length} parts`}
          />
          <div className="space-y-4">
            {project.howItWorks.map((s, i) => (
              <Section key={i} content={s} />
            ))}
          </div>
        </section>
      </FadeUp>

      <Separator />

      {/* TECH STACK */}
      <FadeUp>
        <section aria-label="Tech stack" className="space-y-6">
          <SectionLabel
            title="Tech stack"
            hint={`${project.techStack.length} tools`}
          />
          <ul className="divide-y divide-border rounded-md border border-border">
            {project.techStack.map((t) => (
              <li
                key={t.name}
                className="flex flex-col gap-1 px-4 py-3 first:pt-4 last:pb-4 sm:flex-row sm:items-baseline sm:gap-4"
              >
                <span className="font-mono text-sm font-medium sm:w-56 sm:shrink-0">
                  {t.name}
                </span>
                {t.note && (
                  <span className="text-sm text-muted-foreground">{t.note}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      </FadeUp>

      {/* FOOTER */}
      <FadeUp>
        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" /> Back to home
          </Link>
          {next ? (
            <Link
              to={`/projects/${next.slug}`}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              Next: {next.title} <ArrowRight className="h-3 w-3" />
            </Link>
          ) : (
            <span className="text-sm text-muted-foreground">End of selected work</span>
          )}
        </footer>
      </FadeUp>
    </div>
  )
}
