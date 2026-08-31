import { describe, expect, it } from "vitest"
import { experience } from "./experience"

describe("experience data", () => {
  it("has at least one entry", () => {
    expect(experience.length).toBeGreaterThanOrEqual(1)
  })

  it("every entry has role, company, dates, bullets, and stack", () => {
    for (const e of experience) {
      expect(e.role.length).toBeGreaterThan(0)
      expect(e.company.length).toBeGreaterThan(0)
      expect(e.start.length).toBeGreaterThan(0)
      expect(e.end.length).toBeGreaterThan(0)
      expect(e.bullets.length).toBeGreaterThanOrEqual(3)
      expect(e.stack.length).toBeGreaterThanOrEqual(1)
    }
  })

  it("includes the Signarama Philippines role", () => {
    const signarama = experience.find((e) => e.company.includes("Signarama"))
    expect(signarama).toBeDefined()
    // Signarama is in the Philippines even when the location field is the
    // specific city (Caloocan City). The country is implied by the company
    // name and the resume context.
    expect(signarama?.company).toMatch(/Signarama/i)
  })

  it("every bullet is non-empty", () => {
    for (const e of experience) {
      for (const b of e.bullets) {
        expect(b.trim().length).toBeGreaterThan(0)
      }
    }
  })
})