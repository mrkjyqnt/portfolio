import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "./theme-toggle"

describe("ThemeToggle", () => {
  it("renders a button with the right accessible label in light mode", () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeToggle />
      </ThemeProvider>
    )
    const btn = screen.getByRole("button", { name: /switch to dark mode/i })
    expect(btn).toBeInTheDocument()
    expect(document.documentElement.classList.contains("light")).toBe(true)
  })

  it("flips to dark mode on click and updates the label", async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeToggle />
      </ThemeProvider>
    )
    const btn = screen.getByRole("button", { name: /switch to dark mode/i })
    await user.click(btn)
    expect(document.documentElement.classList.contains("dark")).toBe(true)
    expect(
      screen.getByRole("button", { name: /switch to light mode/i })
    ).toBeInTheDocument()
  })

  it("starts in dark mode when defaultTheme='dark'", () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeToggle />
      </ThemeProvider>
    )
    expect(
      screen.getByRole("button", { name: /switch to light mode/i })
    ).toBeInTheDocument()
    expect(document.documentElement.classList.contains("dark")).toBe(true)
  })
})
