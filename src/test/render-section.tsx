import type { ReactElement } from "react"
import { render } from "@testing-library/react"
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
      <TooltipProvider delay={0}>{ui}</TooltipProvider>
    </ThemeProvider>
  )
}