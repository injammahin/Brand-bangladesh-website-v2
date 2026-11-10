'use client'
/**
 * <Stagger> — direct children lift + fade in one after another when the group enters view.
 * Optional `drift`: children in alternate columns keep a gentle parallax offset while scrolling.
 */
import { ReactNode, useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function Stagger({ children, className = '', drift = 0, as: Tag = 'div' }: {
  children: ReactNode; className?: string; drift?: number; as?: 'div' | 'ol' | 'ul'
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const items = Array.from(el.children) as HTMLElement[]
    const ctx = gsap.context(() => {
      gsap.fromTo(items, { y: 48, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.09,
        scrollTrigger: { trigger: el, start: 'top 85%' },
      })
      if (drift) {
        items.forEach((it, i) => {
          if (i % 2 === 0) return
          gsap.fromTo(it.firstElementChild ?? it, { y: drift }, {
            y: -drift, ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          })
        })
      }
    }, el)
    return () => ctx.revert()
  }, [drift])

  if (Tag === 'ol') return <ol ref={ref as React.RefObject<HTMLOListElement>} className={className}>{children}</ol>
  if (Tag === 'ul') return <ul ref={ref as React.RefObject<HTMLUListElement>} className={className}>{children}</ul>
  return <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>{children}</div>
}
