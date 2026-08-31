import { describe, expect, it } from "vitest"
import { screen } from "@testing-library/react"
import { About } from "./about"
import { renderSection } from "@/test/render-section"

describe("About", () => {
  it("renders multiple paragraphs about mention's story", () => {
    renderSection(<About />)
    const paragraphs = screen.getAllByRole("paragraph")
    expect(paragraphs.length).toBeGreaterThanOrEqual(3)
  })

  it("mentions Malabon or Signarama (Mark Jay's location context)", () => {
    renderSection(<About />)
    const text = screen.getAllByRole("paragraph").map((p) => p.textContent ?? "").join(" ")
    expect(text).toMatch(/Malabon|Signarama/)
  })

  it("renders in dark mode", () => {
    renderSection(<About />, { defaultTheme: "dark" })
    expect(screen.getAllByRole("paragraph").length).toBeGreaterThan(0)
  })
})