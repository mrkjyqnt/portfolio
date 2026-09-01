import { describe, expect, it } from "vitest"
import { screen } from "@testing-library/react"
import { Github } from "./github"
import { renderSection } from "@/test/render-section"

describe("Github", () => {
  it("renders the contribution graph (image OR fallback)", () => {
    renderSection(<Github />)
    const link = screen.getByRole("link", {
      name: /github\.com\/mrkjyqnt/i,
    })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "https://github.com/mrkjyqnt")
  })

  it("renders in dark mode", () => {
    renderSection(<Github />, { defaultTheme: "dark" })
    const link = screen.getByRole("link", {
      name: /github\.com\/mrkjyqnt/i,
    })
    expect(link).toBeInTheDocument()
    expect(document.documentElement.classList.contains("dark")).toBe(true)
  })
})