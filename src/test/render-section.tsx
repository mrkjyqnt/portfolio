import type { ReactElement } from "react"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"

/**
 * Render a section with the same provider tree the production app uses.
 * Defaults to the light theme; pass defaultTheme="dark" for the dark-mode case.
 */
export function renderSection(
  ui: ReactElement,
  options: { defaultTheme?: "light" | "dark" } = {}
) {
  return render(
    <ThemeProvider defaultTheme={options.defaultTheme ?? "light"}>
      <TooltipProvider delay={0}>
        <MemoryRouter>{ui}</MemoryRouter>
      </TooltipProvider>
    </ThemeProvider>
  )
}

/**
 * Collect every anchor's href in the rendered tree.
 * Returns lowercase, trimmed strings — or empty array if no anchors.
 */
export function getLinks(container: HTMLElement = document.body): string[] {
  return Array.from(container.querySelectorAll("a"))
    .map((a) => (a.getAttribute("href") ?? "").trim().toLowerCase())
    .filter(Boolean)
}