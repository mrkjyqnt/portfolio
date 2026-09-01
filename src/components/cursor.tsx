import { useEffect, useRef } from "react"

const LENGTH = 22 // number of blocks
const BLOCK = 12 // px — each square segment
const STEP = 3 // px per frame the head advances

// 8 cardinal + diagonal directions as unit vectors.
const DIRECTIONS: { x: number; y: number }[] = [
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
  { x: -1, y: 1 },
  { x: -1, y: 0 },
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
]

const DIR_NAMES = [
  "right",
  "down-right",
  "down",
  "down-left",
  "left",
  "up-left",
  "up",
  "up-right",
] as const

/**
 * Autonomous pixelated snake wandering across the screen — not a cursor
 * follower. The snake picks a direction, walks in it, occasionally turns
 * to a new direction (every few seconds + when it nears a viewport edge),
 * and its body trails behind the head by inheriting the head's past
 * positions one frame at a time.
 *
 * Wander tunables (top of file):
 *   - BLOCK          segment size
 *   - STEP           head speed (px/frame)
 *   - TURN_MIN_MS    minimum time between random turns
 *   - TURN_RAND_MS   additional random delay on top of TURN_MIN_MS
 *   - EDGE_MARGIN    distance from any viewport edge at which the
 *                     snake forces a turn away
 */
const TURN_MIN_MS = 1200
const TURN_RAND_MS = 2200
const EDGE_MARGIN = 60

export function Cursor() {
  const positions = useRef(
    Array.from({ length: LENGTH }, () => ({ x: 0, y: 0 }))
  )
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const disabled = useRef(false)

  useEffect(() => {
    disabled.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  }, [])

  useEffect(() => {
    if (disabled.current) return

    // Seed in the middle of the viewport with a random heading.
    const startX = window.innerWidth / 2
    const startY = window.innerHeight / 2
    for (let i = 0; i < LENGTH; i++) {
      positions.current[i] = { x: startX, y: startY }
    }
    // Initial direction biased toward "right"
    let dirIdx = 0

    let raf = 0
    let lastTurnAt = performance.now()
    let nextTurnIn = TURN_MIN_MS + Math.random() * TURN_RAND_MS

    function pickTurnFromEdge() {
      // Pick a direction whose unit vector moves the head AWAY from the
      // nearest edge (away = positive component if near left/right edge,
      // positive/negative for top/bottom).
      const head = positions.current[LENGTH - 1]!
      const dx = window.innerWidth / 2 - head.x // > 0 = need to move right
      const dy = window.innerHeight / 2 - head.y
      const candidates = DIRECTIONS.map((d, i) => ({
        i,
        score: d.x * Math.sign(dx) + d.y * Math.sign(dy),
      }))
      // Pick the highest-scoring direction (most "toward center").
      candidates.sort((a, b) => b.score - a.score)
      // Random among the top 2 so it doesn't always head straight back.
      const chosen = candidates[Math.floor(Math.random() * 2)].i
      // Avoid a 180° flip (sudden U-turn looks unnatural)
      const opposite = (dirIdx + 4) % 8
      if (chosen === opposite) dirIdx = (chosen + 1) % 8
      else dirIdx = chosen
    }

    function pickRandomTurn() {
      // Pick a direction that's not the current or the opposite (no U-turns)
      const opposite = (dirIdx + 4) % 8
      let next = Math.floor(Math.random() * 8)
      let tries = 0
      while ((next === dirIdx || next === opposite) && tries < 8) {
        next = Math.floor(Math.random() * 8)
        tries++
      }
      dirIdx = next
    }

    const tick = () => {
      const head = positions.current[LENGTH - 1]!
      const dir = DIRECTIONS[dirIdx]!

      // Head moves STEP px per frame along its current direction.
      head.x += dir.x * STEP
      head.y += dir.y * STEP

      // Body trails: each segment copies the previous segment's position
      // (1-frame delay per segment → snake lag).
      for (let i = 0; i < LENGTH - 1; i++) {
        positions.current[i] = positions.current[i + 1]!
      }

      // Decide if it's time to turn. Two triggers:
      //   1. Time-based random turn (every TURN_MIN..TURN_MIN+TURN_RAND ms)
      //   2. Edge-based forced turn (when the head is within EDGE_MARGIN
      //      of any viewport edge)
      const now = performance.now()
      if (now - lastTurnAt >= nextTurnIn) {
        pickRandomTurn()
        lastTurnAt = now
        nextTurnIn = TURN_MIN_MS + Math.random() * TURN_RAND_MS
      } else {
        const hx = head.x
        const hy = head.y
        if (
          hx < EDGE_MARGIN ||
          hx > window.innerWidth - EDGE_MARGIN ||
          hy < EDGE_MARGIN ||
          hy > window.innerHeight - EDGE_MARGIN
        ) {
          pickTurnFromEdge()
          lastTurnAt = now
          nextTurnIn = TURN_MIN_MS + Math.random() * TURN_RAND_MS
        }
      }

      // Render every block at its current position.
      for (let i = 0; i < LENGTH; i++) {
        const el = refs.current[i]
        const p = positions.current[i]
        if (!el || !p) continue
        el.style.transform = `translate3d(${p.x - BLOCK / 2}px, ${p.y - BLOCK / 2}px, 0)`
      }

      raf = requestAnimationFrame(tick)
    }

    // Fade in once we know the snake is seeded.
    requestAnimationFrame(() => {
      for (const el of refs.current) {
        if (el) el.style.opacity = "1"
      }
      raf = requestAnimationFrame(tick)
    })

    return () => {
      cancelAnimationFrame(raf)
    }
  }, [])

  if (disabled.current) return null

  return (
    <>
      {Array.from({ length: LENGTH }).map((_, i) => (
        <div
          key={i}
          aria-hidden
          ref={(el) => {
            refs.current[i] = el
          }}
          className="pointer-events-none fixed left-0 top-0 hidden rounded-sm bg-foreground md:block"
          style={{
            width: `${BLOCK}px`,
            height: `${BLOCK}px`,
            opacity: 0,
            zIndex: 100 + (LENGTH - i),
          }}
        />
      ))}
    </>
  )
}

// Exported for diagnostics only.
export const __diag = { LENGTH, BLOCK, STEP, TURN_MIN_MS, TURN_RAND_MS, EDGE_MARGIN, DIR_NAMES }
