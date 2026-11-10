'use client'
/**
 * <ParallaxImg> — an image that drifts inside its (overflow-hidden) frame while scrolling,
 * giving photographs depth. `amount` = % of travel (default 12). Reduced motion: static.
 */
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function ParallaxImg({ src, alt = '', amount = 12, className = '', eager = false }: {
  src: string; alt?: string; amount?: number; className?: string; eager?: boolean
}) {
  const ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const frame = el.parentElement ?? el
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { yPercent: -amount / 2 }, {
        yPercent: amount / 2,
        ease: 'none',
        scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    })
    return () => ctx.revert()
  }, [amount])

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={`absolute left-0 w-full object-cover will-change-transform ${className}`}
      style={{ top: `-${amount / 2}%`, height: `${100 + amount}%` }}
    />
  )
}
