import { useEffect, useRef } from "react"

const LENGTH = 18 // number of blocks
const BLOCK = 14 // px per block (cell size)

// Time between each cell-step. ~110 ms = ~9 moves/sec, like the Nokia Snake.
const TICK_MS = 110
const EDGE_MARGIN = BLOCK * 2 // turn before hitting the edge

// 4 cardinal directions only (no diagonals). Each tick moves the head by
// BLOCK pixels in one of these directions.
const DIRECTIONS: { x: number; y: number }[] = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
]

/**
 * Autonomous pixelated snake wandering across the screen — Nokia-Snake
 * physics:
 *
 *   - The HEAD advances one BLOCK every TICK_MS (cell-based, like the
 *     original game). Not pixel-by-frame.
 *   - Each body block takes the position the block in front of it had at
 *     the last tick (1-tick delay per segment). The body forms a connected
 *     chain of BLOCK-sized squares — not separated dots, not overlapping.
 *   - The snake walks in a straight line until the head is within
 *     EDGE_MARGIN of a viewport edge, then turns 90° (no random turns).
 *
 * Tunables (top of file):
 *   - BLOCK          size of each cell (also the per-tick movement)
 *   - LENGTH         number of blocks in the snake
 *   - TICK_MS        time between each cell-step
 *   - EDGE_MARGIN    distance from any viewport edge that triggers a turn
 */
export function Cursor() {
  const positions = useRef(
    Array.from({ length: LENGTH }, () => ({ x: 0, y: 0 }))
  )
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const disabled = useRef(false)
  const lastTickAt = useRef(0)
  const dirIdx = useRef(0) // initial heading: right

  useEffect(() => {
    disabled.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  }, [])

  useEffect(() => {
    if (disabled.current) return

    // Seed on the 14-px grid, snapped to top-left so the snake visibly
    // walks across the screen rather than starting at the cursor.
    const startX = BLOCK * 6
    const startY = BLOCK * 4
    for (let i = 0; i < LENGTH; i++) {
      positions.current[i] = { x: startX + i * BLOCK, y: startY }
    }

    let raf = 0

    function pickTurnFromEdge() {
      const head = positions.current[LENGTH - 1]!
      const dx = window.innerWidth / 2 - head.x
      const dy = window.innerHeight / 2 - head.y
      const sx = Math.sign(dx)
      const sy = Math.sign(dy)
      // Score each direction by how much it heads toward viewport center.
      const candidates = DIRECTIONS.map((d, i) => ({
        i,
        score: d.x * sx + d.y * sy,
      }))
      candidates.sort((a, b) => b.score - a.score)
      // Pick from the top 2 so the snake doesn't always come straight back
      // to center (a touch of randomness on the edge turn).
      const chosen = candidates[Math.floor(Math.random() * 2)].i
      const opposite = (dirIdx.current + 2) % 4
      dirIdx.current = chosen === opposite ? (chosen + 1) % 4 : chosen
    }

    function step() {
      // One Nokia-style step: head moves BLOCK pixels in its current
      // direction; each body block inherits the previous block's cell.
      const head = positions.current[LENGTH - 1]!
      const dir = DIRECTIONS[dirIdx.current]!
      head.x += dir.x * BLOCK
      head.y += dir.y * BLOCK

      for (let i = 0; i < LENGTH - 1; i++) {
        positions.current[i] = positions.current[i + 1]!
      }

      // Turn only when the head's bounding rect crosses EDGE_MARGIN of any
      // viewport edge. No random or time-based turns.
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
        }
      }
    }

    function render() {
      for (let i = 0; i < LENGTH; i++) {
        const el = refs.current[i]
        const p = positions.current[i]
        if (!el || !p) continue
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`
      }
    }

    function tick() {
      const now = performance.now()
      if (now - lastTickAt.current >= TICK_MS) {
        step()
        render()
        lastTickAt.current = now
      }
      raf = requestAnimationFrame(tick)
    }

    // Initial render so blocks are visible at the seed position.
    lastTickAt.current = performance.now()
    render()
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
