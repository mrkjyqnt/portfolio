import { useEffect, useRef } from "react"

const LENGTH = 4 // total blocks (head + 3 tail — less lag, tighter chain)
const BLOCK = 18 // px per block (chunkier so the chain is easy to see)

// Fixed pixels per tick the head advances toward its target. Constant
// step (not eased) so the snake moves at a steady rate — doesn't speed
// up at long distances and crawl when close.
const STEP = 2

// Time between each cell-step. ~110 ms = ~9 moves/sec, like the Nokia Snake.
const TICK_MS = 110

// If true, the head chases the user's cursor instead of walking in its
// own direction. Easy to flip back to the wandering snake.
const SNAKE_CHASES_CURSOR = true

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
 *     cardinal direction, and TELEPORTS through every edge of the page —
 *     reappears on the opposite side (toroidal wrap on the entire PAGE,
 *     not just the viewport). The snake is "aware of the whole page",
 *     so when the user scrolls the snake scrolls with the page (offset by
 *     scrollX/scrollY each render) rather than staying glued to the view.
 *   - Toggle SNAKE_CHASES_CURSOR to switch the head from walking in a
 *     fixed direction to easing toward the user's cursor (the cursor
 *     position is converted to page coordinates so the chase spans the
 *     full page, not just the viewport).
 *
 * Tunables (top of file):
 *   - BLOCK          size of each cell (also the per-tick movement)
 *   - LENGTH         number of blocks in the snake
 *   - TICK_MS        time between each cell-step
 *   - TURN_MIN_MS    minimum time between random direction changes
 *   - TURN_RAND_MS   additional random delay on top of TURN_MIN_MS
 *   - SNAKE_CHASES_CURSOR   boolean — true: head chases cursor;
 *                             false (default): walks in its own direction
 *   - STEP           px per tick each block advances toward its target
 *                     (constant speed, no easing)
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
  const scroll = useRef({ x: 0, y: 0 }) // current scroll offset
  const cursor = useRef({ x: 0, y: 0, active: false })

  useEffect(() => {
    disabled.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  }, [])

  useEffect(() => {
    if (disabled.current) return

    // Seed on the 18-px grid near the top of the page.
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
        // Page-aware bounds: snake wraps around the entire document, not just
      // the current viewport.
      const w = Math.max(
        document.documentElement.scrollWidth,
        window.innerWidth
      )
      const h = Math.max(
        document.documentElement.scrollHeight,
        window.innerHeight
      )

      // Two movement modes:
      //   - SNAKE_CHASES_CURSOR: every block (head AND body) moves at a
      //     fixed STEP px/tick toward its target (head → cursor, body →
      //     block in front). Constant speed, no easing — pixel by pixel,
      //     no rushing.
      //   - default (Nokia-step): head moves one BLOCK per tick, each
      //     body block takes the previous tick's position of the block
      //     in front — discrete steps.
      if (SNAKE_CHASES_CURSOR && cursor.current.active) {
        const head = positions.current[LENGTH - 1]!
        const hdx = cursor.current.x - head.x
        const hdy = cursor.current.y - head.y
        const hdist = Math.hypot(hdx, hdy)
        if (hdist > 0) {
          head.x += (hdx / hdist) * STEP
          head.y += (hdy / hdist) * STEP
        }
        for (let i = LENGTH - 2; i >= 0; i--) {
          const cur = positions.current[i]!
          const next = positions.current[i + 1]!
          const dx = next.x - cur.x
          const dy = next.y - cur.y
          const dist = Math.hypot(dx, dy)
          if (dist > 0) {
            cur.x += (dx / dist) * STEP
            cur.y += (dy / dist) * STEP
          }
        }
      } else {
        // Snapshot before moving so the body shift uses the previous tick's
        // position of the block in front (not the head's NEW position).
        const snapshot = positions.current.map((p) => ({ x: p.x, y: p.y }))
        const head = positions.current[LENGTH - 1]!
        const dir = DIRECTIONS[dirIdx.current]!
        head.x += dir.x * BLOCK
        head.y += dir.y * BLOCK
        for (let i = 0; i < LENGTH - 1; i++) {
          positions.current[i] = snapshot[i + 1]
        }
      }

      // Wrap every block within the page bounds so the whole chain
      // teleports together (no "tail disappears" on wrap).
      for (let i = 0; i < LENGTH; i++) {
        const p = positions.current[i]!
        if (p.x < 0) p.x += w
        else if (p.x >= w) p.x -= w
        if (p.y < 0) p.y += h
        else if (p.y >= h) p.y -= h
      }

      // Periodic random direction change so the wandering snake doesn't
      // loop forever in a straight line. Skip when chasing cursor.
      if (
        !SNAKE_CHASES_CURSOR &&
        performance.now() >= nextTurnAt.current
      ) {
        pickRandomTurn()
        nextTurnAt.current =
          performance.now() + TURN_MIN_MS + Math.random() * TURN_RAND_MS
      }
    }

    function render() {
      // Subtract scroll so the snake moves WITH the page (it scrolls
      // out of view as the user scrolls), not pinned to the viewport.
      // The snake's logical position lives in page coordinates; we shift
      // its visual position by -scroll so it appears stuck to the page.
      const sx = scroll.current.x
      const sy = scroll.current.y
      for (let i = 0; i < LENGTH; i++) {
        const el = refs.current[i]
        const p = positions.current[i]
        if (!el || !p) continue
        el.style.transform = `translate3d(${p.x - sx}px, ${p.y - sy}px, 0)`
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
      scroll.current.x = window.scrollX
      scroll.current.y = window.scrollY
    }
    const onMove = (e: MouseEvent) => {
      // Convert viewport (clientX/Y) to page coordinates by adding the
      // current scroll offset. Then the snake chases the cursor across
      // the entire page, not just the visible viewport.
      cursor.current.x = e.clientX + window.scrollX
      cursor.current.y = e.clientY + window.scrollY
      cursor.current.active = true
    }
    const onLeave = () => {
      cursor.current.active = false
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseleave", onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
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
