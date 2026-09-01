import { useEffect, useRef } from "react"

const LENGTH = 5 // total blocks (head + 4 tail)
const BLOCK = 18 // px per block (chunkier so the chain is easy to see)

// Time between each cell-step. ~110 ms = ~9 moves/sec, like the Nokia Snake.
const TICK_MS = 110

// The snake picks a new direction every TURN_MIN..TURN_MIN+TURN_RAND ms
// (so it doesn't loop forever in a straight line — it "thinks" and turns).
const TURN_MIN_MS = 3500
const TURN_RAND_MS = 4000

// 4 cardinal directions only (no diagonals). The snake wraps toroidally.
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
 *   - The snake walks in a straight line, periodically picks a new
 *     cardinal direction, and TELEPORTS through every viewport edge —
 *     reappears on the opposite side (toroidal wrap).
 *   - The snake's position is page-anchored: subtracts `window.scrollY`
 *     each render so the snake stays anchored to the page content (it
 *     scrolls out of view as the user scrolls, not pinned to the viewport).
 *
 * Tunables (top of file):
 *   - BLOCK          size of each cell (also the per-tick movement)
 *   - LENGTH         number of blocks in the snake
 *   - TICK_MS        time between each cell-step
 *   - TURN_MIN_MS    minimum time between random direction changes
 *   - TURN_RAND_MS   additional random delay on top of TURN_MIN_MS
 */
export function Cursor() {
  const positions = useRef(
    Array.from({ length: LENGTH }, () => ({ x: 0, y: 0 }))
  )
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const disabled = useRef(false)
  const lastTickAt = useRef(0)
  const dirIdx = useRef(0) // initial heading: right
  const nextTurnAt = useRef(0) // when the snake next picks a new direction
  const scrollY = useRef(0) // current scrollY offset for page-anchoring

  useEffect(() => {
    disabled.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  }, [])

  useEffect(() => {
    if (disabled.current) return

    // Seed on the 18-px grid, snapped to top-left so the snake visibly
    // walks across the screen rather than starting at the cursor.
    const startX = BLOCK * 4
    const startY = BLOCK * 4
    for (let i = 0; i < LENGTH; i++) {
      positions.current[i] = { x: startX + i * BLOCK, y: startY }
    }

    let raf = 0

    function pickRandomTurn() {
      // Avoid flipping 180° (sudden U-turn looks unnatural).
      const opposite = (dirIdx.current + 2) % 4
      let next = Math.floor(Math.random() * 4)
      let tries = 0
      while ((next === dirIdx.current || next === opposite) && tries < 4) {
        next = Math.floor(Math.random() * 4)
        tries++
      }
      dirIdx.current = next
    }

    function step() {
      // Snapshot the positions BEFORE the head moves. Otherwise the body
      // shift reads the head's NEW position (just assigned) and every
      // block collapses onto the head — snake becomes a single dot.
      const snapshot = positions.current.map((p) => ({ x: p.x, y: p.y }))

      // Head moves one BLOCK in its current direction (toroidal wrap).
      const head = positions.current[LENGTH - 1]!
      const dir = DIRECTIONS[dirIdx.current]!
      head.x = (head.x + dir.x * BLOCK + window.innerWidth) % window.innerWidth
      head.y = (head.y + dir.y * BLOCK + window.innerHeight) % window.innerHeight

      // Body trails: each block takes the position of the block IN FRONT
      // of it from BEFORE this tick. block[0] takes what block[1] was
      // (head's old position for LENGTH=5 means block[L-2] takes the old
      // head cell; each earlier block takes the next cell up the chain).
      for (let i = 0; i < LENGTH - 1; i++) {
        positions.current[i] = snapshot[i + 1]
      }

      // Wrap EVERY block (not just the head) so the body that was near the
      // edge also teleports through with the head — keeps the chain
      // visually connected across wraps (no "tail disappears" when wrapping).
      const w = window.innerWidth
      const h = window.innerHeight
      for (let i = 0; i < LENGTH; i++) {
        const p = positions.current[i]!
        if (p.x < 0) p.x += w
        else if (p.x >= w) p.x -= w
        if (p.y < 0) p.y += h
        else if (p.y >= h) p.y -= h
      }

      // Periodic random direction change (every TURN_MIN..TURN_MIN+TURN_RAND
      // ms) so the snake doesn't loop forever in a straight line.
      if (performance.now() >= nextTurnAt.current) {
        pickRandomTurn()
        nextTurnAt.current =
          performance.now() + TURN_MIN_MS + Math.random() * TURN_RAND_MS
      }
    }

    function render() {
      // Subtract scrollY so the snake stays anchored to the page content.
      // As the user scrolls, the snake moves with the page (it scrolls
      // out of view), not pinned to the viewport.
      const ys = scrollY.current
      for (let i = 0; i < LENGTH; i++) {
        const el = refs.current[i]
        const p = positions.current[i]
        if (!el || !p) continue
        el.style.transform = `translate3d(${p.x}px, ${p.y - ys}px, 0)`
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
    nextTurnAt.current =
      performance.now() + TURN_MIN_MS + Math.random() * TURN_RAND_MS
    render()
    requestAnimationFrame(() => {
      for (const el of refs.current) {
        if (el) el.style.opacity = "1"
      }
      raf = requestAnimationFrame(tick)
    })

    const onScroll = () => {
      scrollY.current = window.scrollY
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
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
