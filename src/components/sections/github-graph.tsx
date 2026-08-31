import { useEffect, useState } from "react"

export type GithubGraphProps = {
  username?: string
}

/**
 * Renders the real GitHub contributions chart via ghchart.rshah.org.
 * Light/dark mode: image sits on a white card and is inverted in dark mode
 * (Tailwind dark:invert + dark:hue-rotate-180) so it adapts cleanly.
 */
export function GithubGraph({ username = "mrkjyqnt" }: GithubGraphProps) {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setFailed(false)
  }, [username])

  if (failed) {
    return (
      <div className="rounded border border-dashed border-border p-4 text-sm text-muted-foreground">
        Couldn't load GitHub activity.{" "}
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="underline-offset-4 hover:underline"
        >
          View on GitHub →
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-md border border-border bg-white p-2 dark:bg-neutral-900">
        <div className="overflow-x-auto">
          <img
            src={`https://ghchart.rshah.org/${username}`}
            alt={`${username}'s GitHub contribution graph`}
            className="block h-auto min-w-[700px] w-full dark:invert dark:hue-rotate-180"
            onError={() => setFailed(true)}
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
        <span>
          Last 12 months ·{" "}
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 hover:underline"
          >
            github.com/{username}
          </a>
        </span>
        <span>Public activity only</span>
      </div>
    </div>
  )
}