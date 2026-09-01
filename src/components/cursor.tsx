import { useEffect, useRef } from "react"

const LENGTH = 22 // number of blocks
const BLOCK = 14 // px — each square segment
const STEP = 7 // px per frame the head advances (half a block, so blocks overlap = connected snake)

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

/**
 * Autonomous pixelated snake wandering across the screen — not a cursor
 * follower. Picks a direction, walks in it, turns every few seconds or
 * when it nears a viewport edge. Body trails the head by inheriting the
 * head's past positions one frame at a time.
 *
 * Tunables (top of file):
 *   - BLOCK          segment size
 *   - STEP           head speed (px/frame)
 *   - TURN_MIN_MS    minimum time between random turns
 *   - TURN_RAND_MS   additional random delay
 *   - EDGE_MARGIN    distance from any viewport edge that forces a turn
 *
 * Hidden when:
 *  - `prefers-reduced-motion: reduce`
 *  - the viewport is narrower than `md` (touch)
 *
 * Mounts a `data-cursor=\"snake\"` flag on <html> so global CSS can hide
 * the OS cursor (only one pointer on screen — the snake).
 */
const TURN_MIN_MS = 900
const TURN_RAND_MS = 1800
const EDGE_MARGIN = 80

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

    // Start the snake near the top-left so it's clearly NOT at the cursor.
    const startX = 80
    const startY = 80
    for (let i = 0; i < LENGTH; i++) {
      positions.current[i] = { x: startX, y: startY }
    }
    // Initial heading: right
    let dirIdx = 0

    let raf = 0
    let lastTurnAt = performance.now()
    let nextTurnIn = TURN_MIN_MS + Math.random() * TURN_RAND_MS

    function pickTurnFromEdge() {
      const head = positions.current[LENGTH - 1]!
      // Direction that heads away from the nearest edge.
      const dx = window.innerWidth / 2 - head.x
      const dy = window.innerHeight / 2 - head.y
      const sx = Math.sign(dx)
      const sy = Math.sign(dy)
      const candidates = DIRECTIONS.map((d, i) => ({
        i,
        score: d.x * sx + d.y * sy,
      }))
      candidates.sort((a, b) => b.score - a.score)
      const chosen = candidates[Math.floor(Math.random() * 2)].i
      const opposite = (dirIdx + 4) % 8
      if (chosen === opposite) dirIdx = (chosen + 1) % 8
      else dirIdx = chosen
    }

    function pickRandomTurn() {
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

      head.x += dir.x * STEP
      head.y += dir.y * STEP

      // Body trails the head via 1-frame delay per segment.
      for (let i = 0; i < LENGTH - 1; i++) {
        positions.current[i] = positions.current[i + 1]!
      }

      // Two turn triggers: time-based random, and edge-based forced.
      const now = performance.now()
      if (now - lastTurnAt >= nextTurnIn) {
        pickRandomTurn()
        lastTurnAt = now
        nextTurnIn = TURN_MIN_MS + Math.random() * TURN_RAND_MS
      } else {
        const headEl = refs.current[LENGTH - 1]
        if (headEl) {
          const rect = headEl.getBoundingClientRect()
          if (
            rect.left < EDGE_MARGIN ||
            rect.right > window.innerWidth - EDGE_MARGIN ||
            rect.top < EDGE_MARGIN ||
            rect.bottom > window.innerHeight - EDGE_MARGIN
          ) {
            pickTurnFromEdge()
            lastTurnAt = now
            nextTurnIn = TURN_MIN_MS + Math.random() * TURN_RAND_MS
          }
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

    document.documentElement.dataset.cursor = "snake"

    requestAnimationFrame(() => {
      for (const el of refs.current) {
        if (el) el.style.opacity = "1"
      }
      raf = requestAnimationFrame(tick)
    })

    return () => {
      cancelAnimationFrame(raf)
      delete document.documentElement.dataset.cursor
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
