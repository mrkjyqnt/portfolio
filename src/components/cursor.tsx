import { useEffect, useRef } from "react"

const LENGTH = 5 // total blocks (head + 4 tail — tight stick)
const BLOCK = 18 // px per block (cell size = per-tick movement distance)

// Time between each cell-step. ~150 ms = ~6.5 moves/sec.
const TICK_MS = 150

// The snake picks a new direction every TURN_MIN..TURN_MIN+TURN_RAND ms
// (so it doesn't loop forever in a straight line when wandering).
const TURN_MIN_MS = 3500
const TURN_RAND_MS = 4000

// If true, the head chases the user's cursor. If false, the snake
// wanders (walks in its own direction).
const SNAKE_CHASES_CURSOR = true

// 4 cardinal directions only.
const DIRECTIONS: { x: number; y: number }[] = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
]

type Pt = { x: number; y: number }

/**
 * Autonomous pixelated snake on a fixed grid. Classic Nokia-Snake
 * physics, no over-engineering:
 *  - One BLOCK per tick (cell-per-cell movement).
 *  - Body = FIFO shift: each block takes the cell the block in front of
 *    it occupied at the start of this tick. Body hugs the head with one
 *    cell of lag — a connected chain that always moves together.
 *  - Every frame interpolates each block from its previous cell to its
 *    new cell so the whole chain glides smoothly between ticks.
 *  - Toroidal wrap on page bounds; snake is page-anchored (renders
 *    with scrollX/scrollY subtracted so it scrolls with the page).
 *  - In chase mode, the head orbits the cursor cell in a 4-square loop
 *    when it arrives there, instead of being dragged back each tick.
 */
export function Cursor() {
  // positions[i] = each block's cell at the END of the current tick.
  const positions = useRef<Pt[]>(
    Array.from({ length: LENGTH }, () => ({ x: 0, y: 0 }))
  )
  // prevBlocks[i] = each block's cell at the START of the current tick.
  // The render function interpolates from prevBlocks[i] → positions[i].
  const prevBlocks = useRef<Pt[]>(
    Array.from({ length: LENGTH }, () => ({ x: 0, y: 0 }))
  )
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const disabled = useRef(false)
  const lastTickAt = useRef(0)
  const dirIdx = useRef(0)
  // Orbit state — see step() for the chase+orbit logic.
  const orbitStep = useRef(0)
  const orbiting = useRef(false)
  const orbitCenter = useRef({ x: 0, y: 0 })
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

    // Snap the head seed to the grid.
    const startX = BLOCK * 4
    const startY = BLOCK * 2
    const headSeed = {
      x: Math.round(startX / BLOCK) * BLOCK,
      y: Math.round(startY / BLOCK) * BLOCK,
    }
    // Lay the body out one cell apart behind the head, as if the snake
    // had been moving toward (+x, 0) for LENGTH-1 ticks.
    for (let i = 0; i < LENGTH; i++) {
      positions.current[i] = {
        x: headSeed.x - (LENGTH - 1 - i) * BLOCK,
        y: headSeed.y,
      }
    }

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
      // Snapshot every block's CURRENT cell into prevBlocks so the render
      // function can interpolate from each block's old cell to its new
      // cell across the tick. Snapshotted BEFORE any updates this tick.
      for (let i = 0; i < LENGTH; i++) {
        prevBlocks.current[i]!.x = positions.current[i]!.x
        prevBlocks.current[i]!.y = positions.current[i]!.y
      }

      // Page bounds for wrap.
      const w = Math.max(
        document.documentElement.scrollWidth,
        window.innerWidth
      )
      const h = Math.max(
        document.documentElement.scrollHeight,
        window.innerHeight
      )

      // Decide the head's step this tick.
      //   - CHASE + head on cursor cell → orbit the cursor.
      //   - CHASE + head off cursor → step one cell toward cursor.
      //   - wander → step in current heading.
      const head = positions.current[LENGTH - 1]!
      let stepX = 0
      let stepY = 0
      if (SNAKE_CHASES_CURSOR && cursor.current.active) {
        const tgx = Math.round(cursor.current.x / BLOCK) * BLOCK
        const tgy = Math.round(cursor.current.y / BLOCK) * BLOCK
        if (orbiting.current) {
          if (
            Math.round(cursor.current.x / BLOCK) * BLOCK !==
              orbitCenter.current.x ||
            Math.round(cursor.current.y / BLOCK) * BLOCK !==
              orbitCenter.current.y
          ) {
            orbiting.current = false
          } else {
            const side = DIRECTIONS[orbitStep.current]!
            stepX = side.x * BLOCK
            stepY = side.y * BLOCK
            orbitStep.current = (orbitStep.current + 1) % 4
          }
        }
        if (!orbiting.current) {
          const dx = tgx - head.x
          const dy = tgy - head.y
          if (dx === 0 && dy === 0) {
            orbiting.current = true
            orbitCenter.current = { x: tgx, y: tgy }
            orbitStep.current = 0
            const side = DIRECTIONS[0]!
            stepX = side.x * BLOCK
            stepY = side.y * BLOCK
            orbitStep.current = 1
          } else if (Math.abs(dx) >= Math.abs(dy) && dx !== 0) {
            stepX = Math.sign(dx) * BLOCK
          } else if (dy !== 0) {
            stepY = Math.sign(dy) * BLOCK
          }
        }
      } else {
        const dir = DIRECTIONS[dirIdx.current]!
        stepX = dir.x * BLOCK
        stepY = dir.y * BLOCK
      }

      // 1. Move head FIRST (with toroidal wrap).
      head.x += stepX
      head.y += stepY
      const wrapX = head.x < 0 ? w : head.x >= w ? -w : 0
      const wrapY = head.y < 0 ? h : head.y >= h ? -h : 0
      head.x += wrapX
      head.y += wrapY

      // 2. Body shift using the PRE-HEAD-MOVE snapshot. block[i] takes
      //    block[i+1]'s old cell — i.e., each body block slides into the
      //    cell the block in front of it was in at the start of this tick.
      //    The head (positions[L-1]) is NOT touched here — it's already
      //    at its new cell from step 1.
      for (let i = LENGTH - 2; i >= 0; i--) {
        positions.current[i]!.x = prevBlocks.current[i + 1]!.x + wrapX
        positions.current[i]!.y = prevBlocks.current[i + 1]!.y + wrapY
      }

      // Periodic random turn (wandering mode only).
      if (
        !SNAKE_CHASES_CURSOR &&
        performance.now() >= nextTurnAt.current
      ) {
        pickRandomTurn()
        nextTurnAt.current =
          performance.now() + TURN_MIN_MS + Math.random() * TURN_RAND_MS
      }
    }

    function render(progress: number) {
      const sx = scroll.current.x
      const sy = scroll.current.y
      for (let i = 0; i < LENGTH; i++) {
        const el = refs.current[i]
        const prev = prevBlocks.current[i]
        const cur = positions.current[i]
        if (!el || !prev || !cur) continue
        const x = prev.x + (cur.x - prev.x) * progress - sx
        const y = prev.y + (cur.y - prev.y) * progress - sy
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
    }

    function tick() {
      const now = performance.now()
      const elapsed = now - lastTickAt.current
      if (elapsed >= TICK_MS) {
        step()
        lastTickAt.current = now
      }
      const progress = Math.min(1, elapsed / TICK_MS)
      render(progress)
      raf = requestAnimationFrame(tick)
    }

    lastTickAt.current = performance.now()
    nextTurnAt.current =
      performance.now() + TURN_MIN_MS + Math.random() * TURN_RAND_MS
    render(0)

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
          className="pointer-events-none fixed left-0 top-0 hidden rounded-sm bg-foreground/30 mix-blend-difference md:block"
          style={{
            width: `${BLOCK}px`,
            height: `${BLOCK}px`,
            opacity: 0,
            // Negative z-index + position: fixed → paints behind any
            // content (z-index 0 or auto). mix-blend-difference inverts
            // against any background so the dim snake is always visible
            // (lighter over dark, darker over light).
            zIndex: -1,
          }}
        />
      ))}
    </>
  )
}
