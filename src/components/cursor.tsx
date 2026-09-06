import { useEffect, useRef } from "react"

const LENGTH = 6 // total blocks (head + 5 tail)
const BLOCK = 20 // px per block

type Pt = { x: number; y: number }

/**
 * Simple, slow pixelated snake. The head eases toward the cursor at
 * ~60 fps with very low per-frame speed (1 px per frame at most). The body
 * follows by copying the head's previous position with a fixed 1-frame
 * delay per segment. No wrap, no orbit, no collision respawn — if the
 * head goes off-screen, the snake follows naturally. Smooth per-frame
 * interpolation = no visible stepping.
 */
export function Cursor() {
  // head = current head position; body[i] = position of block i+1 tick ago.
  const head = useRef<Pt>({ x: 0, y: 0 })
  const body = useRef<Pt[]>(
    Array.from({ length: LENGTH - 1 }, () => ({ x: 0, y: 0 }))
  )
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const disabled = useRef(false)
  const cursor = useRef({ x: 0, y: 0, active: false })
  const scroll = useRef({ x: 0, y: 0 })
  // Head's previous cell (for detecting cell-boundary crossings).
  const prevHeadCell = useRef<Pt>({ x: -9999, y: -9999 })

  useEffect(() => {
    disabled.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  }, [])

  useEffect(() => {
    if (disabled.current) return

    let raf = 0

    function tick() {
      const targetX = cursor.current.active
        ? cursor.current.x + scroll.current.x
        : head.current.x
      const targetY = cursor.current.active
        ? cursor.current.y + scroll.current.y
        : head.current.y

      // Move head toward target.
      const dx = targetX - head.current.x
      const dy = targetY - head.current.y
      const dist = Math.hypot(dx, dy)
      if (dist > 0) {
        const step = Math.min(2, dist)
        head.current.x += (dx / dist) * step
        head.current.y += (dy / dist) * step
      }

      // Cell-boundary crossing: when the head's snapped cell changes,
      // push the OLD cell onto the body queue. Now the body is always
      // 1 cell (20px) behind each other — a real visible chain instead
      // of a packed cluster at the head.
      const cellX = Math.round(head.current.x / BLOCK) * BLOCK
      const cellY = Math.round(head.current.y / BLOCK) * BLOCK
      if (cellX !== prevHeadCell.current.x || cellY !== prevHeadCell.current.y) {
        if (prevHeadCell.current.x >= 0) {
          body.current.unshift({ x: prevHeadCell.current.x, y: prevHeadCell.current.y })
          if (body.current.length > LENGTH - 1) {
            body.current.length = LENGTH - 1
          }
        }
        prevHeadCell.current = { x: cellX, y: cellY }
      }

      // Render: head at its current position, body block i at body[i].
      // Subtract scroll so the snake moves with the page (z-index: -1
      // + position: fixed is handled by CSS).
      const sx = scroll.current.x
      const sy = scroll.current.y
      render(refs.current[LENGTH - 1], head.current.x - sx, head.current.y - sy)
      for (let i = 0; i < LENGTH - 1; i++) {
        const p = body.current[i]
        if (!p) continue
        render(refs.current[i], p.x - sx, p.y - sy)
      }

      raf = requestAnimationFrame(tick)
    }

    function render(el: HTMLDivElement | null, x: number, y: number) {
      if (!el) return
      el.style.transform = `translate3d(${x - BLOCK / 2}px, ${y - BLOCK / 2}px, 0)`
    }

    requestAnimationFrame(() => {
      // Seed head + body in a visible area so the chain is visible from
      // the first frame.
      head.current = { x: 200, y: 200 }
      for (let i = 0; i < LENGTH - 1; i++) {
        body.current[i] = { x: 200 - (i + 1) * BLOCK, y: 200 }
      }
      for (const el of refs.current) {
        if (el) el.style.opacity = "1"
      }
      raf = requestAnimationFrame(tick)
    })

    const onMove = (e: MouseEvent) => {
      cursor.current.x = e.clientX
      cursor.current.y = e.clientY
      cursor.current.active = true
    }
    const onLeave = () => {
      cursor.current.active = false
    }
    const onScroll = () => {
      scroll.current.x = window.scrollX
      scroll.current.y = window.scrollY
    }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseleave", onLeave)
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
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
          className="pointer-events-none fixed left-0 top-0 hidden bg-foreground/30 mix-blend-difference md:block [image-rendering:pixelated]"
          style={{
            width: `${BLOCK}px`,
            height: `${BLOCK}px`,
            opacity: 0,
            zIndex: -1,
          }}
        />
      ))}
    </>
  )
}
