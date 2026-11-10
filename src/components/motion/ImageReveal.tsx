'use client'
/**
 * <ImageReveal> — reveals an image with a clip-path inset shrinking in,
 * while the image itself scales from 1.15 → 1 for a dramatic entrance.
 * Respects prefers-reduced-motion.
 */

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from '@/lib/gsap'
import { ease, duration as dur } from '@/lib/tokens'

interface ImageRevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function ImageReveal({ children, delay = 0, className }: ImageRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const inner = innerRef.current
    if (!wrap || !inner) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(wrap, { opacity: 0 }, {
        opacity: 1, duration: dur.standard, delay,
        scrollTrigger: { trigger: wrap, start: 'top 88%' },
      })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(wrap, { clipPath: 'inset(100% 0% 0% 0%)' })
      gsap.set(inner, { scale: 1.15, transformOrigin: 'center center' })

      const tl = gsap.timeline({
        delay,
        scrollTrigger: { trigger: wrap, start: 'top 88%' },
      })

      tl.to(wrap, { clipPath: 'inset(0% 0% 0% 0%)', duration: dur.standard, ease: ease.out })
        .to(inner, { scale: 1, duration: dur.slow, ease: ease.out }, '<')
    })

    return () => ctx.revert()
  }, [delay])

  return (
    <div ref={wrapRef} className={className}>
      <div ref={innerRef} style={{ width: '100%', height: '100%' }}>
        {children}
      </div>
    </div>
  )
}
