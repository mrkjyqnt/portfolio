import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Hero,
  About,
  Experience,
  Projects,
  Skills,
  WhatIWorkOn,
  Github,
  Contact,
  Footer,
} from "@/components/sections"

export function HomePage() {
  return (
    <>
      <ThemeToggle />
      <main>
        <div className="mx-auto max-w-3xl space-y-12 px-6 py-12">
          <Hero />
          <Separator />
          <About />
          <Separator />
          <Experience />
          <Separator />
          <Projects />
          <Skills />
          <WhatIWorkOn />
          <Github />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  )
}
