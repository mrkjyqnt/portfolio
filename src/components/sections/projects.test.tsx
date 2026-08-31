import { describe, expect, it } from "vitest"
import { screen } from "@testing-library/react"
import { Projects } from "./projects"
import { renderSection } from "@/test/render-section"

describe("Projects", () => {
  it("renders all three projects", () => {
    renderSection(<Projects />)
    expect(screen.getByText("BasePaint Plugin")).toBeInTheDocument()
    expect(screen.getByText("CSE Classroom")).toBeInTheDocument()
    expect(screen.getByText("BasePaint Assist")).toBeInTheDocument()
  })

  it("shows the hackathon badge on BasePaint Plugin", () => {
    renderSection(<Projects />)
    expect(screen.getByText("Hackathon")).toBeInTheDocument()
  })

  it("shows the project index numbers (01 / 03, 02 / 03, 03 / 03)", () => {
    renderSection(<Projects />)
    expect(screen.getByText("01 / 03")).toBeInTheDocument()
    expect(screen.getByText("02 / 03")).toBeInTheDocument()
    expect(screen.getByText("03 / 03")).toBeInTheDocument()
  })

  it("renders GitHub + Live links for each project", () => {
    renderSection(<Projects />)
    const allLinks = Array.from(document.querySelectorAll("a")).map(
      (a) => a.getAttribute("href") ?? ""
    )
    const pluginLink = allLinks.find((h) => h.includes("basepaint-plugin"))
    expect(pluginLink).toMatch(/github\.com\/mrkjyqnt/)
    const liveLinks = allLinks.filter((h) => h.startsWith("https://"))
    expect(liveLinks.length).toBeGreaterThanOrEqual(2)
  })

  it("renders in dark mode", () => {
    renderSection(<Projects />, { defaultTheme: "dark" })
    expect(screen.getByText("BasePaint Plugin")).toBeInTheDocument()
  })
})