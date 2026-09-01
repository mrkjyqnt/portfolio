import { describe, expect, it, vi } from "vitest"
import { render, screen, act } from "@testing-library/react"
import { ThemeProvider, useTheme } from "./theme-provider"

function Consumer() {
  const { theme, setTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={() => setTheme("dark")}>to-dark</button>
      <button onClick={() => setTheme("light")}>to-light</button>
    </div>
  )
}

describe("ThemeProvider", () => {
  it("applies the default theme class to <html> on mount", () => {
    render(
      <ThemeProvider defaultTheme="light">
        <Consumer />
      </ThemeProvider>
    )
    expect(document.documentElement.classList.contains("light")).toBe(true)
  })

  it("switches the <html> class when setTheme is called", () => {
    render(
      <ThemeProvider defaultTheme="light">
        <Consumer />
      </ThemeProvider>
    )
    expect(document.documentElement.classList.contains("light")).toBe(true)
    act(() => {
      screen.getByText("to-dark").click()
    })
    expect(document.documentElement.classList.contains("dark")).toBe(true)
    expect(document.documentElement.classList.contains("light")).toBe(false)
  })

  it("persists the chosen theme to localStorage", () => {
    render(
      <ThemeProvider defaultTheme="light" storageKey="theme-test">
        <Consumer />
      </ThemeProvider>
    )
    act(() => {
      screen.getByText("to-dark").click()
    })
    expect(localStorage.getItem("theme-test")).toBe("dark")
  })

  it("resolves 'system' from window.matchMedia when defaultTheme='system'", () => {
    const matchMedia = window.matchMedia
    window.matchMedia = vi.fn().mockImplementation((q: string) => ({
      matches: q === "(prefers-color-scheme: dark)",
      media: q,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    })) as typeof matchMedia
    try {
      render(
        <ThemeProvider defaultTheme="system">
          <Consumer />
        </ThemeProvider>
      )
      expect(document.documentElement.classList.contains("dark")).toBe(true)
    } finally {
      window.matchMedia = matchMedia
    }
  })
})