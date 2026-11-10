'use client'
/**
 * <Parallax> — wraps children in a parallax layer tied to scroll.
 * speed > 0 moves slower than scroll (parallax back); speed < 0 moves faster.
 * Respects prefers-reduced-motion (no effect).
 */

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from '@/lib/gsap'

interface ParallaxProps {
  children: ReactNode
  speed?: number // 0.5 = half scroll speed, -0.3 = moves opposite
  className?: string
}

export function Parallax({ children, speed = 0.5, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * -20,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [speed])

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  )
}
