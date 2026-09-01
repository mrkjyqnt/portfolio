import { useEffect, useRef, useState } from "react"

const EASING = 0.18

/**
 * Smooth-following cursor dot.
 * - Hides the OS cursor (`cursor: none`) on interactive areas
 * - A small dot tracks the real cursor with a damped easing loop
 * - Grows + eases on interactive elements (links, buttons, inputs)
 * - Disabled under `prefers-reduced-motion: reduce`
 * - Hidden when the cursor leaves the window
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(false)
  const [overInteractive, setOverInteractive] = useState(false)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  }, [])

  useEffect(() => {
    if (reduced.current) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let dotX = mouseX
    let dotY = mouseY
    let ringX = mouseX
    let ringY = mouseY
    let raf = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!active) setActive(true)

      const target = e.target as HTMLElement
      setOverInteractive(
        !!target.closest("a, button, [role='button'], input, textarea, select")
      )
    }
    const onLeave = () => setActive(false)

    const tick = () => {
      dotX += (mouseX - dotX) * EASING
      dotY += (mouseY - dotY) * EASING
      ringX += (mouseX - ringX) * EASING * 0.45
      ringY += (mouseY - ringY) * EASING * 0.45
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseleave", onLeave)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
      cancelAnimationFrame(raf)
    }
  }, [active])

  if (reduced.current) return null

  return (
    <>
      <div
        aria-hidden
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/30 transition-[width,height,border-color] duration-200 md:block"
        style={{
          width: overInteractive ? 56 : 40,
          height: overInteractive ? 56 : 40,
          opacity: active ? 1 : 0,
          borderColor: overInteractive
            ? "color-mix(in oklch, var(--primary) 60%, transparent)"
            : "color-mix(in oklch, var(--foreground) 30%, transparent)",
        }}
      />
      <div
        aria-hidden
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[101] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground transition-opacity duration-150 md:block"
        style={{ opacity: active ? 1 : 0 }}
      />
    </>
  )
}
