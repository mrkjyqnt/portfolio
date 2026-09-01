import { describe, expect, it } from "vitest"
import { fireEvent, screen } from "@testing-library/react"
import { GithubGraph } from "./github-graph"
import { renderSection } from "@/test/render-section"

describe("GithubGraph", () => {
  it("renders the contribution image when the load succeeds", () => {
    renderSection(<GithubGraph />)
    const img = screen.getByRole("img", { name: /contribution graph/i })
    expect(img).toBeInTheDocument()
    expect(img.tagName).toBe("IMG")
  })

  it("falls back to 'View on GitHub →' when the image errors", () => {
    renderSection(<GithubGraph />)
    const img = screen.getByRole("img", { name: /contribution graph/i })
    fireEvent.error(img)
    const link = screen.getByRole("link", { name: /view on github/i })
    expect(link).toHaveAttribute("href", "https://github.com/mrkjyqnt")
  })

  it("renders the 'Last 12 months' meta with the GitHub link", () => {
    renderSection(<GithubGraph />)
    const link = screen.getByRole("link", {
      name: /github\.com\/mrkjyqnt/i,
    })
    expect(link).toHaveAttribute("href", "https://github.com/mrkjyqnt")
  })
})