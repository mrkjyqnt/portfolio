import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ProjectPage } from "./project-page"
import { projectsContent } from "@/data/projects-content"

function renderProject(slug: string, theme: "light" | "dark" = "light") {
  return render(
    <ThemeProvider defaultTheme={theme}>
      <TooltipProvider delay={0}>
        <MemoryRouter initialEntries={[`/projects/${slug}`]}>
          <Routes>
            <Route path="/projects/:slug" element={<ProjectPage />} />
          </Routes>
        </MemoryRouter>
      </TooltipProvider>
    </ThemeProvider>
  )
}

describe("ProjectPage", () => {
  it("renders the project title, tagline, and content sections", () => {
    renderProject("basepaint-plugin")
    const region = screen.getByRole("region", { name: /overview/i })
    expect(region).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "BasePaint Plugin"
    )
    expect(
      screen.getByText(/Tools that should've been there from day one\./i)
    ).toBeInTheDocument()
  })

  it("renders Overview, How it works, and Tech stack sections", () => {
    renderProject("cse-classroom")
    const overview = screen.getByRole("region", { name: /overview/i })
    expect(overview).toBeInTheDocument()
    expect(overview).toHaveTextContent(/Civil Service Exam/i)
    expect(screen.getByRole("region", { name: /how it works/i })).toBeInTheDocument()
    expect(screen.getByRole("region", { name: /tech stack/i })).toBeInTheDocument()
  })

  it("renders the GitHub CTA pointing at the project's repo", () => {
    renderProject("basepaint-assist")
    const link = screen.getByRole("link", {
      name: /view source/i,
    })
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/mrkjyqnt/basepaint-assist"
    )
  })

  it("shows 'Next: <title>' when a next project exists", () => {
    renderProject("basepaint-plugin")
    const next = screen.getByRole("link", { name: /Next:/i })
    expect(next).toHaveAttribute("href", "/projects/cse-classroom")
  })

  it("shows 'End of selected work' when there is no next project", () => {
    renderProject("basepaint-assist")
    expect(
      screen.getByText(/End of selected work/i)
    ).toBeInTheDocument()
  })

  it("renders a 'Back to home' link on every project", () => {
    for (const p of projectsContent) {
      renderProject(p.slug)
      const links = screen.getAllByRole("link", { name: /back to home/i })
      expect(links.length).toBeGreaterThanOrEqual(1)
    }
  })

  it("renders in dark mode without crashing", () => {
    renderProject("basepaint-plugin", "dark")
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "BasePaint Plugin"
    )
    expect(document.documentElement.classList.contains("dark")).toBe(true)
  })

  it("renders a 'Project not found' card for an unknown slug", () => {
    render(
      <ThemeProvider defaultTheme="light">
        <TooltipProvider delay={0}>
          <MemoryRouter initialEntries={["/projects/does-not-exist"]}>
            <Routes>
              <Route path="/projects/:slug" element={<ProjectPage />} />
            </Routes>
          </MemoryRouter>
        </TooltipProvider>
      </ThemeProvider>
    )
    expect(screen.getByText(/Project not found/i)).toBeInTheDocument()
  })
})
