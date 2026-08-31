import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { LinkButton } from "@/components/ui/link-button"
import { hero } from "@/data/hero"
import { contact } from "@/data/contact"
import { FadeUp } from "@/components/motion/fade-up"

const AVATAR = "https://avatars.githubusercontent.com/u/89252539?s=400&v=4"

export function Hero() {
  return (
    <FadeUp>
      <header className="space-y-5">
        <Badge className="bg-emerald-500/15 px-2.5 py-1 text-emerald-700 hover:bg-emerald-500/15 dark:text-emerald-300">
          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Open to work
        </Badge>

        <div className="flex items-start gap-5">
          <Avatar className="h-20 w-20 shrink-0 rounded-full ring-2 ring-border shadow-sm">
            <AvatarImage src={AVATAR} alt={hero.name} />
          </Avatar>
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-bold leading-[1.05] tracking-tight md:text-4xl">
              {hero.name}
            </h1>
            <p className="mt-1 text-base text-muted-foreground">
              {hero.role}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              {hero.tagline}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <LinkButton href={`mailto:${contact.email}`} size="sm">
            Email
          </LinkButton>
          <LinkButton
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            variant="outline"
            size="sm"
          >
            GitHub
          </LinkButton>
          <LinkButton
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            variant="outline"
            size="sm"
          >
            LinkedIn
          </LinkButton>
          <LinkButton
            href="/Resume - Quinto.pdf"
            target="_blank"
            rel="noreferrer"
            variant="ghost"
            size="sm"
          >
            ↓ Resume
          </LinkButton>
        </div>
      </header>
    </FadeUp>
  )
}