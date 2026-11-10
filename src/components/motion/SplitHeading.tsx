'use client'
/**
 * <SplitHeading> — splits text into words and animates each in.
 * Uses manual DOM split (no GSAP Club SplitText required).
 * Respects prefers-reduced-motion.
 */

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { ease, duration as dur, stagger as stg } from '@/lib/tokens'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'p'

interface SplitHeadingProps {
  children: string
  as?: HeadingTag
  className?: string
  delay?: number
  stagger?: number
}

export function SplitHeading({
  children,
  as: Tag = 'h2',
  className,
  delay = 0,
  stagger = stg.normal,
}: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      gsap.fromTo(el, { opacity: 0 }, {
        opacity: 1, duration: dur.standard, delay,
        scrollTrigger: { trigger: el, start: 'top 90%' },
      })
      return
    }

    // Manual word split
    const text = el.textContent || ''
    const words = text.split(' ').filter(Boolean)

    el.innerHTML = words
      .map((w) => `<span style="display:inline-block;overflow:hidden;vertical-align:top;"><span class="split-inner" style="display:inline-block;">${w}</span></span>`)
      .join(' ') // normal space so long headings can wrap

    const inners = el.querySelectorAll<HTMLElement>('.split-inner')

    const ctx = gsap.context(() => {
      gsap.fromTo(inners, { yPercent: 110 }, {
        yPercent: 0,
        duration: dur.standard,
        ease: ease.out,
        delay,
        stagger,
        scrollTrigger: { trigger: el, start: 'top 90%' },
      })
    })

    return () => ctx.revert()
  }, [children, delay, stagger])

  // Use createElement to avoid TS generic tag error
  if (Tag === 'h1') return <h1 ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>{children}</h1>
  if (Tag === 'h2') return <h2 ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>{children}</h2>
  if (Tag === 'h3') return <h3 ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>{children}</h3>
  if (Tag === 'h4') return <h4 ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>{children}</h4>
  return <p ref={ref as React.RefObject<HTMLParagraphElement>} className={className}>{children}</p>
}
