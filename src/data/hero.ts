export type HeroContent = {
  name: string
  role: string
  tagline: string
  ctas: { label: string; href: string }[]
}

export const hero: HeroContent = {
  name: "Mark Jay Sarcia Quinto",
  role: "AI Developer · Full-Stack Engineer",
  tagline: "I build agentic tools and full-stack apps that turn AI capability into shipped product.",
  ctas: [
    { label: "View projects", href: "#projects" },
    { label: "Get in touch", href: "#contact" },
  ],
}