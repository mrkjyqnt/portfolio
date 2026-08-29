export type Experience = {
  company: string
  role: string
  location: string
  start: string
  end: string
  bullets: string[]
  stack: string[]
}

export const experience: Experience[] = [
  {
    company: "Signarama Philippines",
    role: "Software Developer & IT Officer",
    location: "Caloocan City",
    start: "May 2025",
    end: "August 2026",
    bullets: [
      "Shipped shop.signs.com.ph, an online retail shop for Signarama Philippines.",
      "Built the Signarama Assessment Site — streamlined HR candidate assessment across five previously-separate sites.",
      "Created SignAI, an agent that generates leads and converts inquiries into customer quotations.",
      "Applied agentic engineering to transition the company's Business ERP from a legacy system to a new web app.",
    ],
    stack: ["VB.NET", "C#", "Python", "XAML", "Claude Code"],
  },
]