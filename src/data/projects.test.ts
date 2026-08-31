import { describe, expect, it } from "vitest"
import { projects } from "./projects"

describe("projects data", () => {
  it("has exactly three projects in the locked order", () => {
    expect(projects.length).toBe(3)
    expect(projects[0]?.title).toBe("BasePaint Plugin")
    expect(projects[1]?.title).toBe("CSE Classroom")
    expect(projects[2]?.title).toBe("BasePaint Assist")
  })

  it("BasePaint Plugin is marked as the hackathon winner", () => {
    expect(projects[0]?.highlight).toBe("hackathon-2026")
  })

  it("every project has a GitHub URL", () => {
    for (const p of projects) {
      expect(p.githubUrl).toMatch(/^https:\/\/github\.com\/mrkjyqnt\//)
    }
  })

  it("every project has a non-empty stack list", () => {
    for (const p of projects) {
      expect(p.stack.length).toBeGreaterThan(0)
      for (const s of p.stack) {
        expect(s.trim().length).toBeGreaterThan(0)
      }
    }
  })

  it("every project has a hook (lead sentence) and description", () => {
    for (const p of projects) {
      expect(p.hook.length).toBeGreaterThan(0)
      expect(p.description.length).toBeGreaterThan(0)
    }
  })

  it("at least one project has a live URL", () => {
    const withLive = projects.filter((p) => p.liveUrl)
    expect(withLive.length).toBeGreaterThanOrEqual(1)
  })
})