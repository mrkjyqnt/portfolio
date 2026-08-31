import { describe, expect, it } from "vitest"
import { screen } from "@testing-library/react"
import { Hero } from "./hero"
import { renderSection } from "@/test/render-section"

describe("Hero", () => {
  it("renders Mark Jay's name, role, and 'Open to work' badge", () => {
    renderSection(<Hero />)
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Mark Jay Sarcia Quinto"
    )
    expect(screen.getByText(/AI Developer/)).toBeInTheDocument()
    expect(screen.getByText(/Open to work/i)).toBeInTheDocument()
  })

  it("has mail, GitHub, LinkedIn, and Resume links", () => {
    renderSection(<Hero />)
    const links = Array.from(document.querySelectorAll("a")).map(
      (a) => a.getAttribute("href") ?? ""
    )
    expect(links.some((h) => h.startsWith("mailto:"))).toBe(true)
    expect(links).toContain("https://github.com/mrkjyqnt")
    expect(
      links.some((h) => h.startsWith("https://linkedin.com/"))
    ).toBe(true)
    expect(links.some((h) => h.endsWith(".pdf"))).toBe(true)
  })

  it("renders cleanly in dark mode too", () => {
    renderSection(<Hero />, { defaultTheme: "dark" })
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Mark Jay Sarcia Quinto"
    )
    expect(document.documentElement.classList.contains("dark")).toBe(true)
  })
})