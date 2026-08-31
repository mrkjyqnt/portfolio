import { LinkButton } from "@/components/ui/link-button"
import { contact } from "@/data/contact"
import { hero } from "@/data/hero"
import { SectionLabel } from "./section-label"
import { FadeUp } from "@/components/motion/fade-up"

export function Contact() {
  return (
    <FadeUp>
      <section>
        <SectionLabel index={7} title="Get in touch" />
        <p className="text-base leading-relaxed text-foreground/85">
          Open to roles and freelance work. Email is the fastest way to reach
          me.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <LinkButton href={`mailto:${contact.email}`} size="lg">
            Email me
          </LinkButton>
          <LinkButton
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            variant="outline"
            size="lg"
          >
            GitHub
          </LinkButton>
          <LinkButton
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            variant="outline"
            size="lg"
          >
            LinkedIn
          </LinkButton>
        </div>
      </section>
    </FadeUp>
  )
}

export function Footer() {
  return (
    <FadeUp>
      <footer className="mt-12 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-6 font-mono text-xs text-muted-foreground">
        <span>© 2026 {hero.name}.</span>
        <span>mrkjyqnt/portfolio</span>
      </footer>
    </FadeUp>
  )
}