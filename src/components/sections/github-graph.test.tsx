import { describe, expect, it } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { GithubGraph } from "./github-graph"

describe("GithubGraph", () => {
  it("renders the image with the ghchart URL for the username", () => {
    render(<GithubGraph username="mrkjyqnt" />)
    const img = screen.getByRole("img", { name: /mrkjyqnt's GitHub contribution graph/i })
    expect(img).toHaveAttribute("src", "https://ghchart.rshah.org/mrkjyqnt")
  })

  it("falls back to a 'View on GitHub' link when the image errors", () => {
    render(<GithubGraph username="mrkjyqnt" />)
    const img = screen.getByRole("img", { name: /mrkjyqnt's GitHub contribution graph/i })
    fireEvent.error(img)
    expect(screen.getByText(/couldn't load github activity/i)).toBeInTheDocument()
    const fallback = screen.getByRole("link", { name: /view on github/i })
    expect(fallback).toHaveAttribute("href", "https://github.com/mrkjyqnt")
  })
})