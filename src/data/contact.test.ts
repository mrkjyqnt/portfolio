import { describe, expect, it } from "vitest"
import { contact } from "./contact"

describe("contact data", () => {
  it("has a non-empty email", () => {
    expect(contact.email).toMatch(/^[^@]+@[^@]+\.[^@]+$/)
  })

  it("GitHub URL points at mrkjyqnt", () => {
    expect(contact.github).toMatch(/^https:\/\/github\.com\/mrkjyqnt\/?$/)
  })

  it("LinkedIn URL is a valid linkedin.com URL", () => {
    expect(contact.linkedin).toMatch(/^https:\/\/(www\.)?linkedin\.com\//)
  })

  it("status and currentLine are non-empty (marketing hooks)", () => {
    expect(contact.status.length).toBeGreaterThan(0)
    expect(contact.currentLine.length).toBeGreaterThan(0)
  })
})