import { describe, expect, it } from "vitest"
import { screen } from "@testing-library/react"
import { Contact, Footer } from "./contact"
import { renderSection, getLinks } from "@/test/render-section"

describe("Contact", () => {
  it("renders the 'Open to roles' copy", () => {
    renderSection(<Contact />)
    expect(screen.getByText(/Open to roles/i)).toBeInTheDocument()
  })

  it("has email, GitHub, and LinkedIn links with the right hrefs", () => {
    renderSection(<Contact />)
    const links = getLinks()
    expect(links.some((h) => h.startsWith("mailto:"))).toBe(true)
    expect(links).toContain("https://github.com/mrkjyqnt")
    expect(links).toContain("https://linkedin.com/in/mrkjyqnt")
  })

  it("renders in dark mode (parallel assertion set)", () => {
    renderSection(<Contact />, { defaultTheme: "dark" })
    expect(screen.getByText(/Open to roles/i)).toBeInTheDocument()
    const links = getLinks()
    expect(links.some((h) => h.startsWith("mailto:"))).toBe(true)
    expect(document.documentElement.classList.contains("dark")).toBe(true)
  })
})

describe("Footer", () => {
  it("shows the © line and the mrkjyqnt/portfolio attribution", () => {
    renderSection(<Footer />)
    expect(screen.getByText(/© 2026 Mark Jay Sarcia Quinto/)).toBeInTheDocument()
    expect(screen.getByText("mrkjyqnt/portfolio")).toBeInTheDocument()
  })

  it("renders in dark mode too", () => {
    renderSection(<Footer />, { defaultTheme: "dark" })
    expect(screen.getByText(/© 2026 Mark Jay Sarcia Quinto/)).toBeInTheDocument()
    expect(document.documentElement.classList.contains("dark")).toBe(true)
  })
})