import { describe, expect, it } from "vitest"
import { screen } from "@testing-library/react"
import { Hero } from "./hero"
import { renderSection, getLinks } from "@/test/render-section"

describe("Hero", () => {
  it("renders Mark Jay's name, role, and 'Open to work' badge", () => {
    renderSection(<Hero />)
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Mark Jay Sarcia Quinto"
    )
    expect(screen.getByText(/AI Developer/)).toBeInTheDocument()
    expect(screen.getByText(/Open to work/i)).toBeInTheDocument()
  })

  it("has email, GitHub, LinkedIn, and Resume links with the right hrefs", () => {
    renderSection(<Hero />)
    const links = getLinks()
    expect(links).toContain("mailto:personal.markjay@gmail.com")
    expect(links).toContain("https://github.com/mrkjyqnt")
    expect(links).toContain("https://linkedin.com/in/mrkjyqnt")
    expect(links.some((h) => h.endsWith(".pdf"))).toBe(true)
  })

  it("renders cleanly in dark mode (parallel assertion set)", () => {
    renderSection(<Hero />, { defaultTheme: "dark" })
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Mark Jay Sarcia Quinto"
    )
    expect(screen.getByText(/AI Developer/)).toBeInTheDocument()
    expect(screen.getByText(/Open to work/i)).toBeInTheDocument()
    const links = getLinks()
    expect(links).toContain("mailto:personal.markjay@gmail.com")
    expect(links).toContain("https://github.com/mrkjyqnt")
    expect(links).toContain("https://linkedin.com/in/mrkjyqnt")
    expect(document.documentElement.classList.contains("dark")).toBe(true)
  })
})