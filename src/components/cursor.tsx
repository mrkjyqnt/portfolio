import { useEffect, useRef } from "react"

const LENGTH = 12
const BLOCK = 14 // px — size of each square segment

// Snake physics: every block eases toward the target in front of it each
// frame. The head chases the cursor (not snaps to it); each body block
// chases the block in front of it, lagging more as you go down the tail.
const HEAD_LAG = 0.18 // head eases toward cursor
const BODY_LAG = 0.14 // each body block eases toward the block in front

type Pt = { x: number; y: number }

/**
 * Nokia-Snake-style trailing cursor.
 *  - Square blocks (no rounding) at a fixed grid scale
 *  - Head (segment 0) chases the real cursor with light easing
 *  - Each subsequent block eases toward the previous block, producing
 *    the classic snake-body lag
 *  - All blocks rendered on a single rAF loop, GPU-friendly (just transforms)
 *  - Hidden on `prefers-reduced-motion` and on viewports < md (touch)
 *  - Hidden when the cursor leaves the window
 */
export function Cursor() {
  const positions = useRef<Pt[]>(
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

    let active = false
    let raf = 0
    const cursor: Pt = { x: -9999, y: -9999 }

    const tick = () => {
      // Snake physics:
      //   - Head chases the cursor with HEAD_LAG easing (does NOT snap to
      //     cursor — that's what made it look glued before)
      //   - Each body block chases the block in front of it with BODY_LAG
      //   - The chain produces the classic trailing-body lag — each segment
      //     is a few frames behind the one ahead, so the snake visibly
      //     stretches behind the cursor
      const head = positions.current[0]!
      head.x += (cursor.x - head.x) * HEAD_LAG
      head.y += (cursor.y - head.y) * HEAD_LAG
      for (let i = 1; i < LENGTH; i++) {
        const target = positions.current[i - 1]!
        const cur = positions.current[i]!
        cur.x += (target.x - cur.x) * BODY_LAG
        cur.y += (target.y - cur.y) * BODY_LAG
      }

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
        // Seed the snake at the cursor so it doesn't sweep across on first move
        for (let i = 0; i < LENGTH; i++) {
          positions.current[i] = { x: cursor.x, y: cursor.y }
        }
        for (let i = 0; i < LENGTH; i++) {
          const el = refs.current[i]
          if (el) el.style.opacity = i === 0 ? "1" : String(1 - i / LENGTH)
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
      {Array.from({ length: LENGTH }).map((_, i) => {
        // Head is primary; each subsequent block fades. Slight color shift
        // head → tail: head is full foreground, tail nudges toward primary.
        const isHead = i === 0
        return (
          <div
            key={i}
            aria-hidden
            ref={(el) => {
              refs.current[i] = el
            }}
            className={
              "pointer-events-none fixed left-0 top-0 hidden md:block " +
              (isHead ? "bg-foreground" : "bg-foreground/70")
            }
            style={{
              width: `${BLOCK}px`,
              height: `${BLOCK}px`,
              opacity: 0,
              zIndex: 100 + (LENGTH - i),
            }}
          />
        )
      })}
    </>
  )
}
