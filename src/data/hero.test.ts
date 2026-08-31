import { describe, expect, it } from "vitest"
import { hero } from "./hero"

describe("hero data", () => {
  it("identifies Mark Jay Sarcia Quinto as the portfolio owner", () => {
    expect(hero.name).toBe("Mark Jay Sarcia Quinto")
  })

  it("declares a role line that mentions AI or engineering", () => {
    expect(hero.role.length).toBeGreaterThan(0)
    expect(hero.role.toLowerCase()).toMatch(/ai|engineer|developer/)
  })

  it("has a tagline that frames the AI development pitch", () => {
    expect(hero.tagline.toLowerCase()).toMatch(/agent|ai|product|ship/)
  })

  it("has two CTAs with non-empty labels and hrefs", () => {
    expect(hero.ctas.length).toBe(2)
    for (const cta of hero.ctas) {
      expect(cta.label.length).toBeGreaterThan(0)
      expect(cta.href.startsWith("#")).toBe(true)
    }
  })
})