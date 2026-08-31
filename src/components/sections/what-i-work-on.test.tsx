import { describe, expect, it } from "vitest"
import { screen } from "@testing-library/react"
import { WhatIWorkOn } from "./what-i-work-on"
import { renderSection } from "@/test/render-section"

describe("WhatIWorkOn", () => {
  it("renders three pill badges (shipping / stack / intent)", () => {
    renderSection(<WhatIWorkOn />)
    expect(
      screen.getByText(/Shipping AI agents/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/Next\.js · TypeScript/i)).toBeInTheDocument()
    expect(screen.getByText(/Open to AI \+ full-stack/i)).toBeInTheDocument()
  })

  it("renders in dark mode", () => {
    renderSection(<WhatIWorkOn />, { defaultTheme: "dark" })
    expect(screen.getByText(/Shipping AI agents/i)).toBeInTheDocument()
  })
})