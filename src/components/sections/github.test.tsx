import { describe, expect, it } from "vitest"
import { screen } from "@testing-library/react"
import { Github } from "./github"
import { renderSection } from "@/test/render-section"

describe("Github", () => {
  it("renders the section heading", () => {
    renderSection(<Github />)
    expect(screen.getByRole("heading", { name: /GitHub/i })).toBeInTheDocument()
  })

  it("renders the contribution graph image (or fallback)", () => {
    renderSection(<Github />)
    // Either the image OR the fallback must be in the document.
    const img = screen.queryByRole("img", { name: /contribution graph/i })
    const fallback = screen.queryByText(/couldn't load/i)
    expect(img !== null || fallback !== null).toBe(true)
  })

  it("renders in dark mode", () => {
    renderSection(<Github />, { defaultTheme: "dark" })
    expect(screen.getByRole("heading", { name: /GitHub/i })).toBeInTheDocument()
  })
})