import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

describe("Tooltip", () => {
  it("reveals content on hover", async () => {
    const user = userEvent.setup()
    render(
      <TooltipProvider delay={0}>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>The tip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
    expect(screen.queryByText("The tip text")).not.toBeInTheDocument()
    await user.hover(screen.getByText("Hover me"))
    expect(await screen.findByText("The tip text")).toBeInTheDocument()
  })

  it("reveals content on focus", async () => {
    const user = userEvent.setup()
    render(
      <TooltipProvider delay={0}>
        <Tooltip>
          <TooltipTrigger>Focus me</TooltipTrigger>
          <TooltipContent>Focused tip</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
    expect(screen.queryByText("Focused tip")).not.toBeInTheDocument()
    await user.tab()
    expect(await screen.findByText("Focused tip")).toBeInTheDocument()
  })
})