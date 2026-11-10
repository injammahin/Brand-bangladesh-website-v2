'use client'
/**
 * <Reveal> — clip-path mask rise animation.
 * Children rise from below a clip mask when entering the viewport.
 * Respects prefers-reduced-motion (fades only).
 */

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from '@/lib/gsap'
import { ease, duration as dur } from '@/lib/tokens'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const inner = innerRef.current
    if (!wrap || !inner) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      gsap.fromTo(inner, { opacity: 0 }, {
        opacity: 1,
        duration: dur.standard,
        delay,
        scrollTrigger: { trigger: wrap, start: 'top 88%' },
      })
      return
    }

    // Clip-path reveal
    const ctx = gsap.context(() => {
      gsap.fromTo(inner, { yPercent: 110 }, {
        yPercent: 0,
        duration: dur.standard,
        ease: ease.out,
        delay,
        scrollTrigger: { trigger: wrap, start: 'top 88%' },
      })
    })

    return () => ctx.revert()
  }, [delay])

  return (
    <div ref={wrapRef} className={className} style={{ overflow: 'hidden' }}>
      <div ref={innerRef}>{children}</div>
    </div>
  )
}
