export type SkillCategory = {
  title: string
  skills: string[]
}

export const skills: SkillCategory[] = [
  {
    title: "AI & Agentic Tools",
    skills: [
      "Claude Code",
      "Codex",
      "Agentic Engineering",
      "Prompt Engineering",
      "AI-Assisted Development",
      "AI Automation",
    ],
  },
  {
    title: "Programming Languages",
    skills: ["Visual Basic.NET", "C#", "Python", "XAML", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Technical",
    skills: [
      "Basic Networking Concepts",
      "Basic Hardware Knowledge",
      "Operating Systems",
      "Troubleshooting",
      "Configuration and Maintenance",
      "Basic Server Concepts",
    ],
  },
  {
    title: "Other",
    skills: ["UI/UX Designing", "Manual Testing"],
  },
]