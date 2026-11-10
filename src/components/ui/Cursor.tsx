'use client'
/**
 * Custom cursor — ring + dot with mix-blend-mode: difference.
 * Grows over interactive elements. Shows labels: "Drag", "Play", "View".
 * Disabled on touch devices.
 */

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

type CursorState = 'default' | 'link' | 'drag' | 'play' | 'view'

export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(false)
  const stateRef = useRef<CursorState>('default')

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    setVisible(true)
  }, [])

  useEffect(() => {
    if (!visible) return

    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    gsap.set(ring, { xPercent: -50, yPercent: -50 })
    gsap.set(dot, { xPercent: -50, yPercent: -50 })

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.08, ease: 'power3.out' })
    }

    // Ring follows with lag
    const tick = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      gsap.set(ring, { x: ringX, y: ringY })
    }
    gsap.ticker.add(tick)

    // State detection via data-cursor attribute
    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]') as HTMLElement | null
      const state = (target?.dataset.cursor ?? 'default') as CursorState
      stateRef.current = state

      const label = labelRef.current
      if (label) label.textContent = state === 'drag' ? 'Drag' : state === 'play' ? 'Play' : state === 'view' ? 'View' : ''

      const size = state === 'default' ? 40 : 80
      const opacity = state === 'default' ? 1 : 0.9
      gsap.to(ring, { width: size, height: size, opacity, duration: 0.3, ease: 'power2.out' })
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      gsap.ticker.remove(tick)
    }
  }, [visible])

  if (!visible) return null

  return (
    <>
      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-cursor flex items-center justify-center rounded-full border border-white mix-blend-difference"
        style={{ width: 40, height: 40 }}
        aria-hidden="true"
      >
        <span ref={labelRef} className="text-white text-[9px] uppercase tracking-widest font-inter" />
      </div>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-cursor w-1.5 h-1.5 rounded-full bg-white mix-blend-difference"
        aria-hidden="true"
      />
    </>
  )
}
