import { describe, expect, it } from "vitest"
import { about } from "./about"

describe("about data", () => {
  it("has at least three paragraphs", () => {
    expect(about.paragraphs.length).toBeGreaterThanOrEqual(3)
  })

  it("every paragraph is non-empty", () => {
    for (const p of about.paragraphs) {
      expect(p.trim().length).toBeGreaterThan(0)
    }
  })

  it("mentions Mark Jay's location (Malabon or Signarama)", () => {
    const combined = about.paragraphs.join(" ")
    expect(combined).toMatch(/Malabon|Signarama/)
  })

  it("mentions his Signarama Philippines role", () => {
    expect(about.paragraphs.join(" ")).toMatch(/Signarama/)
  })
})