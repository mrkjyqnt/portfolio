import { describe, expect, it } from "vitest"
import { skills } from "./skills"

describe("skills data", () => {
  it("has exactly four categories", () => {
    expect(skills.length).toBe(4)
  })

  it("includes the AI & Agentic Tools category with Claude Code", () => {
    const aiCategory = skills.find((c) => c.title.includes("AI"))
    expect(aiCategory).toBeDefined()
    expect(aiCategory?.skills).toContain("Claude Code")
  })

  it("every category has at least one skill", () => {
    for (const cat of skills) {
      expect(cat.skills.length).toBeGreaterThan(0)
    }
  })

  it("total tool count is at least 15", () => {
    const total = skills.reduce((n, c) => n + c.skills.length, 0)
    expect(total).toBeGreaterThanOrEqual(15)
  })

  it("no duplicate skills across categories", () => {
    const all = skills.flatMap((c) => c.skills)
    const set = new Set(all)
    expect(set.size).toBe(all.length)
  })
})