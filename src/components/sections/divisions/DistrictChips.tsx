'use client'
/**
 * DistrictChips — staggered chip animation for district names.
 */

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { ease, stagger } from '@/lib/tokens'

interface DistrictChipsProps {
  districts: string[]
  accent: string
}

export function DistrictChips({ districts, accent }: DistrictChipsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const chips = el.querySelectorAll<HTMLElement>('.district-chip')
    const ctx = gsap.context(() => {
      gsap.fromTo(chips,
        { opacity: 0, y: 16, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6, ease: ease.out,
          stagger: stagger.tight,
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }
      )
    })

    return () => ctx.revert()
  }, [districts])

  return (
    <div ref={containerRef} className="flex flex-wrap gap-2">
      {districts.map((district) => (
        <button
          key={district}
          className="district-chip font-inter text-xs px-3 py-1.5 rounded-full border transition-all duration-200"
          style={{ borderColor: `${accent}40` }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.backgroundColor = accent
            el.style.color = '#FBFAF7'
            el.style.borderColor = accent
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.backgroundColor = ''
            el.style.color = ''
            el.style.borderColor = `${accent}40`
          }}
        >
          {district}
        </button>
      ))}
    </div>
  )
}
