import { describe, expect, it } from "vitest"
import { screen } from "@testing-library/react"
import { Experience } from "./experience"
import { renderSection } from "@/test/render-section"
import { experience } from "@/data/experience"

describe("Experience", () => {
  it("renders each role (scoped to the Experience region)", () => {
    renderSection(<Experience />)
    const region = screen.getByRole("region", { name: /work experience/i })
    for (const e of experience) {
      expect(region).toHaveTextContent(e.role)
    }
  })

  it("renders bullets scoped to the Experience region", () => {
    renderSection(<Experience />)
    const region = screen.getByRole("region", { name: /work experience/i })
    const bullets = region.querySelectorAll("li")
    expect(bullets.length).toBeGreaterThanOrEqual(3)
  })

  it("renders 'Present' for the current role (formatEnd helper)", () => {
    renderSection(<Experience />)
    expect(screen.getByText(/Present/)).toBeInTheDocument()
  })

  it("renders in dark mode (parallel assertion set)", () => {
    renderSection(<Experience />, { defaultTheme: "dark" })
    const region = screen.getByRole("region", { name: /work experience/i })
    for (const e of experience) {
      expect(region).toHaveTextContent(e.role)
    }
    expect(region).toHaveTextContent(/Present/)
    expect(document.documentElement.classList.contains("dark")).toBe(true)
  })
})