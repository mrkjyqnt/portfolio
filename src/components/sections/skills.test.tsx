import { describe, expect, it } from "vitest"
import { screen } from "@testing-library/react"
import { Skills } from "./skills"
import { renderSection } from "@/test/render-section"

describe("Skills", () => {
  it("renders the four skill categories", () => {
    renderSection(<Skills />)
    expect(screen.getByText(/AI & Agentic Tools/i)).toBeInTheDocument()
    expect(screen.getByText(/Programming Languages/i)).toBeInTheDocument()
    expect(screen.getByText(/Technical/i)).toBeInTheDocument()
  })

  it("includes Claude Code in the AI category", () => {
    renderSection(<Skills />)
    expect(screen.getByText("Claude Code")).toBeInTheDocument()
  })

  it("renders many tools across the categories", () => {
    renderSection(<Skills />)
    // Assert by presence of well-known tools across the categories.
    const expected = ["Claude Code", "Python", "JavaScript", "HTML", "CSS"]
    for (const tool of expected) {
      expect(screen.getAllByText(tool).length).toBeGreaterThan(0)
    }
  })

  it("renders in dark mode", () => {
    renderSection(<Skills />, { defaultTheme: "dark" })
    expect(screen.getByText("Claude Code")).toBeInTheDocument()
  })
})