import { useEffect, useRef } from "react"

const LENGTH = 16 // number of blocks
const BLOCK = 14 // px — size of each square segment

/**
 * Nokia-Snake cursor. Pixel-by-pixel movement:
 *  - Each frame the HEAD moves toward the cursor at a fixed step (px/frame)
 *  - Each subsequent block takes the previous block's position (1-frame delay)
 *  - Result: a chain of blocks that visibly chases the cursor at a
 *    controlled speed, never glued to it, never snapping.
 *
 * Hidden when:
 *  - `prefers-reduced-motion: reduce`
 *  - the cursor leaves the window
 *  - the viewport is narrower than `md` (touch)
 */
const STEP = 9 // pixels per frame the head advances toward the cursor

export function Cursor() {
  const positions = useRef(
    Array.from({ length: LENGTH }, () => ({ x: -9999, y: -9999 }))
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

    let active = false
    let raf = 0
    const cursor = { x: 0, y: 0 }

    const tick = () => {
      const head = positions.current[LENGTH - 1]!
      const dx = cursor.x - head.x
      const dy = cursor.y - head.y
      const dist = Math.hypot(dx, dy)

      if (dist > 0) {
        // Move head at most STEP pixels toward the cursor this frame.
        // Math.min with STEP keeps it from overshooting when very close.
        const step = Math.min(STEP, dist)
        head.x += (dx / dist) * step
        head.y += (dy / dist) * step
      }

      // Shift the array: each block inherits the position of the one in
      // front of it, with a 1-frame delay. This is the classic snake trail.
      for (let i = 0; i < LENGTH - 1; i++) {
        positions.current[i] = positions.current[i + 1]!
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

    const onMove = (e: MouseEvent) => {
      cursor.x = e.clientX
      cursor.y = e.clientY
      if (!active) {
        active = true
        // Seed the snake at the cursor so it doesn't sweep across the screen
        for (let i = 0; i < LENGTH; i++) {
          positions.current[i] = { x: cursor.x, y: cursor.y }
        }
        for (const el of refs.current) {
          if (el) el.style.opacity = "1"
        }
        raf = requestAnimationFrame(tick)
      }
    }
    const onLeave = () => {
      active = false
      cancelAnimationFrame(raf)
      for (const el of refs.current) {
        if (el) el.style.opacity = "0"
      }
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseleave", onLeave)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
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
