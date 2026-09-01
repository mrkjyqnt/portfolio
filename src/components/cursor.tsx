import { useEffect, useRef } from "react"

const LENGTH = 4 // total blocks (head + 3 tail — tight chain)
const BLOCK = 20 // px per block (cell size — also the per-tick movement distance)

// Time between each cell-step. ~110 ms = ~9 moves/sec, like the Nokia Snake.
const TICK_MS = 110

// The snake picks a new direction every TURN_MIN..TURN_MIN+TURN_RAND ms
// (so it doesn't loop forever in a straight line when wandering).
const TURN_MIN_MS = 3500
const TURN_RAND_MS = 4000

// If true, the head chases the user's cursor. If false (default), the
// snake walks in its own direction on a grid.
const SNAKE_CHASES_CURSOR = true

// 4 cardinal directions only.
const DIRECTIONS: { x: number; y: number }[] = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
]

/**
 * Autonomous pixelated snake on a fixed grid — Nokia-Snake mechanics:
 *  - The head occupies one grid cell. Each tick it advances ONE CELL in
 *    the current cardinal direction (BLOCK px).
 *  - Each body block occupies the cell the block in front of it occupied
 *    last tick (1-tick delay per segment). The whole snake is always on
 *    the grid.
 *  - In CHASE mode, the head moves one cell per tick in whichever
 *    cardinal direction most heads toward the cursor (whichever axis has
 *    the larger delta). Discrete, cell-per-cell movement — no easing,
 *    no pixel-by-pixel creep.
 *  - Snake is page-aware: wraps at document bounds (full page width /
 *    height) and renders with scrollX/scrollY subtracted so it scrolls
 *    with the page (out of view as the user scrolls).
 *
 * Tunables (top of file):
 *   - BLOCK          px per cell (= per-tick movement distance)
 *   - LENGTH         number of blocks in the snake
 *   - TICK_MS        time between each cell-step
 *   - TURN_MIN_MS    minimum time between random direction changes
 *   - TURN_RAND_MS   additional random delay
 *   - SNAKE_CHASES_CURSOR   boolean — chase mode vs wander mode
 */
export function Cursor() {
  const positions = useRef(
    Array.from({ length: LENGTH }, () => ({ x: 0, y: 0 }))
  )
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const disabled = useRef(false)
  const lastTickAt = useRef(0)
  const dirIdx = useRef(0) // initial heading: right
  const nextTurnAt = useRef(0)
  const scroll = useRef({ x: 0, y: 0 })
  const cursor = useRef({ x: 0, y: 0, active: false })

  useEffect(() => {
    disabled.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  }, [])

  useEffect(() => {
    if (disabled.current) return

    // Snap the head seed to the grid and lay the body out one cell apart.
    const startX = BLOCK * 4
    const startY = BLOCK * 2
    for (let i = 0; i < LENGTH; i++) {
      positions.current[i] = {
        x: Math.round(startX / BLOCK) * BLOCK,
        y: Math.round(startY / BLOCK) * BLOCK,
      }
    }
    // Shift the body leftward from the head so the snake points right
    positions.current[0]!.x -= (LENGTH - 1) * BLOCK

    let raf = 0

    function pickRandomTurn() {
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
      // Page bounds for wrap.
      const w = Math.max(
        document.documentElement.scrollWidth,
        window.innerWidth
      )
      const h = Math.max(
        document.documentElement.scrollHeight,
        window.innerHeight
      )

      // Snapshot before the head moves, so the body shift reads the
      // previous tick's position of each block (not the head's NEW cell).
      const snapshot = positions.current.map((p) => ({ x: p.x, y: p.y }))

      // Decide the head's step this tick:
      //   - CHASE: pick the cardinal axis with the larger delta to the
      //     cursor and step one cell toward it. Ties resolved randomly
      //     between the two axes. Cursor coords are converted to grid
      //     cells first so the chase happens in cells, not pixels.
      //   - wander: step in the current <DIRECTIONS> heading.
      const head = positions.current[LENGTH - 1]!
      let stepX = 0
      let stepY = 0
      if (SNAKE_CHASES_CURSOR && cursor.current.active) {
        // Snap the cursor to the grid so the chase is in cell units.
        const tgx = Math.round(cursor.current.x / BLOCK) * BLOCK
        const tgy = Math.round(cursor.current.y / BLOCK) * BLOCK
        const dx = tgx - head.x
        const dy = tgy - head.y
        if (Math.abs(dx) >= Math.abs(dy) && dx !== 0) {
          stepX = Math.sign(dx) * BLOCK
        } else if (dy !== 0) {
          stepY = Math.sign(dy) * BLOCK
        } else {
          // On the target cell — pick a random axis to keep moving.
          if (Math.random() < 0.5 && dx !== 0) stepX = Math.sign(dx) * BLOCK
          else if (dy !== 0) stepY = Math.sign(dy) * BLOCK
          else stepX = (Math.random() < 0.5 ? -1 : 1) * BLOCK
        }
      } else {
        const dir = DIRECTIONS[dirIdx.current]!
        stepX = dir.x * BLOCK
        stepY = dir.y * BLOCK
      }

      // Move the head one cell. If it crosses a viewport edge, shift it
      // back into bounds by exactly ±w / ±h — the amount the head wrapped.
      // We use this exact wrap amount for every body block too, so the
      // whole chain teleports together as one creature instead of head
      // wrapping while the body stays put (which collapses the chain).
      head.x += stepX
      head.y += stepY
      const wrapX = head.x < 0 ? w : head.x >= w ? -w : 0
      const wrapY = head.y < 0 ? h : head.y >= h ? -h : 0
      head.x += wrapX
      head.y += wrapY

      // Body shift: each block takes the cell the block in front of it
      // occupied at the start of this tick (from the snapshot), with the
      // same wrap delta applied so the chain shape is preserved.
      for (let i = 0; i < LENGTH - 1; i++) {
        const sw = snapshot[i + 1]!
        positions.current[i]!.x = sw.x + wrapX
        positions.current[i]!.y = sw.y + wrapY
      }

      // Periodic random turn (wandering mode only — chase just follows).
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
      // Subtract scroll so the snake moves with the page content rather
      // than staying glued to the viewport.
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
