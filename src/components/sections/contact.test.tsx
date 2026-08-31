import { describe, expect, it } from "vitest"
import { screen } from "@testing-library/react"
import { Contact, Footer } from "./contact"
import { renderSection } from "@/test/render-section"

describe("Contact", () => {
  it("renders the 'Open to roles' copy", () => {
    renderSection(<Contact />)
    expect(screen.getByText(/Open to roles/i)).toBeInTheDocument()
  })

  it("has email, GitHub, and LinkedIn links", () => {
    renderSection(<Contact />)
    const links = Array.from(document.querySelectorAll("a")).map(
      (a) => a.getAttribute("href") ?? ""
    )
    expect(links.some((h) => h.startsWith("mailto:"))).toBe(true)
    expect(links).toContain("https://github.com/mrkjyqnt")
    expect(links.some((h) => h.startsWith("https://linkedin.com/"))).toBe(true)
  })

  it("renders in dark mode", () => {
    renderSection(<Contact />, { defaultTheme: "dark" })
    expect(screen.getByText(/Open to roles/i)).toBeInTheDocument()
  })
})

describe("Footer", () => {
  it("shows the © line and the mrkjyqnt/portfolio attribution", () => {
    renderSection(<Footer />)
    expect(screen.getByText(/© 2026 Mark Jay Sarcia Quinto/)).toBeInTheDocument()
    expect(screen.getByText("mrkjyqnt/portfolio")).toBeInTheDocument()
  })
})