'use client'
/**
 * <Magnetic> — children follow the mouse with a magnetic pull on hover.
 * Resets on mouse leave. Disabled on touch devices.
 */

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from '@/lib/gsap'

interface MagneticProps {
  children: ReactNode
  strength?: number // 0.3 = subtle, 0.5 = strong
  className?: string
}

export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength
      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' })
    }

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
      gsap.set(el, { x: 0, y: 0 })
    }
  }, [strength])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
