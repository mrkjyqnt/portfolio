import { describe, expect, it } from "vitest"
import { screen } from "@testing-library/react"
import { Experience } from "./experience"
import { renderSection } from "@/test/render-section"

describe("Experience", () => {
  it("renders the current Signarama role", () => {
    renderSection(<Experience />)
    expect(
      screen.getAllByText(/Signarama Philippines/i).length
    ).toBeGreaterThan(0)
  })

  it("renders bullets for the role", () => {
    renderSection(<Experience />)
    const bullets = screen.getAllByRole("listitem")
    expect(bullets.length).toBeGreaterThanOrEqual(3)
  })

  it("renders 'Present' for the current role (formatEnd helper)", () => {
    renderSection(<Experience />)
    expect(screen.getAllByText(/Present/).length).toBeGreaterThan(0)
  })

  it("renders in dark mode", () => {
    renderSection(<Experience />, { defaultTheme: "dark" })
    expect(document.documentElement.classList.contains("dark")).toBe(true)
    expect(
      screen.getAllByText(/Signarama Philippines/i).length
    ).toBeGreaterThan(0)
  })
})