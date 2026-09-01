import { describe, expect, it } from "vitest"
import { screen, within } from "@testing-library/react"
import { Projects } from "./projects"
import { renderSection, getLinks } from "@/test/render-section"
import { projects } from "@/data/projects"

describe("Projects", () => {
  it("renders all three projects by title", () => {
    renderSection(<Projects />)
    for (const p of projects) {
      expect(screen.getByText(p.title)).toBeInTheDocument()
    }
  })

  it("pins the Hackathon badge to BasePaint Plugin (not all projects)", () => {
    renderSection(<Projects />)
    const pluginArticle = screen.getByText("BasePaint Plugin").closest("article")!
    expect(pluginArticle).toHaveTextContent(/Hackathon/)
    const classroomArticle = screen.getByText("CSE Classroom").closest("article")!
    expect(classroomArticle).not.toHaveTextContent(/Hackathon/)
    const assistArticle = screen.getByText("BasePaint Assist").closest("article")!
    expect(assistArticle).not.toHaveTextContent(/Hackathon/)
  })

  it("renders GitHub + Live links for every project", () => {
    renderSection(<Projects />)
    const allLinks = getLinks()
    for (const p of projects) {
      expect(allLinks).toContain(p.githubUrl)
      if (p.liveUrl) {
        expect(allLinks).toContain(p.liveUrl)
      }
    }
  })

  it("links every project to its dedicated /projects/:slug page (Read more)", () => {
    renderSection(<Projects />)
    for (const p of projects) {
      const article = screen.getByText(p.title).closest("article")!
      const readMore = within(article).getByRole("link", { name: /read more/i })
      expect(readMore).toHaveAttribute("href", `/projects/${p.slug}`)
    }
  })

  it("renders in dark mode (parallel assertion set)", () => {
    renderSection(<Projects />, { defaultTheme: "dark" })
    for (const p of projects) {
      expect(screen.getByText(p.title)).toBeInTheDocument()
    }
    expect(document.documentElement.classList.contains("dark")).toBe(true)
  })
})