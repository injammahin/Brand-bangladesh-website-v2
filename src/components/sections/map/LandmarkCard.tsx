'use client'
/**
 * LandmarkCard — slides in from right when a landmark is active.
 * Edges dissolve into the page with mask-image gradients.
 */

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { ease } from '@/lib/tokens'

interface Landmark {
  id: string
  name: { en: string; bn: string }
  division: string
  tagline: { en: string; bn: string }
  image: string
  pillar: string
}

interface LandmarkCardProps {
  landmark: Landmark
  staticPosition?: boolean
  locale?: string
}

export function LandmarkCard({ landmark, staticPosition = false, locale = 'en' }: LandmarkCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const ctx = gsap.context(() => {
      // Container wipe-in
      gsap.fromTo(card,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0, x: -20 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }
      )
      
      // Image subtle scale down (parallax feel)
      gsap.fromTo(card.querySelector('img'),
        { scale: 1.15, transformOrigin: 'center center' },
        { scale: 1, duration: 1.2, ease: 'power2.out' }
      )
      
      // Text stagger up
      gsap.fromTo(card.querySelectorAll('.animate-text'),
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.2, ease: 'power2.out' }
      )
    }, cardRef)

    return () => ctx.revert()
  }, [])

  const bn = locale === 'bn'

  return (
    <div
      ref={cardRef}
      className={`${staticPosition ? 'relative h-full aspect-[3/4] flex flex-col p-4 mx-auto' : 'absolute top-1/2 -translate-y-1/2 right-8 w-56 md:w-64 pointer-events-none p-3'} bg-cream rounded-xl border border-ink/5 shadow-lg`}
      aria-hidden="true"
    >
      {/* Image or placeholder */}
      <div className={`relative w-full flex-1 rounded-lg overflow-hidden bg-ink/5`}>
        <img
          src={landmark.image}
          alt={bn ? landmark.name.bn : landmark.name.en}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Text */}
      <div className="mt-4 px-2 overflow-hidden">
        <p className="micro-label text-gold mb-1 animate-text">{landmark.division} · {landmark.pillar}</p>
        <p className="font-cormorant text-2xl text-ink leading-tight animate-text">{bn ? landmark.name.bn : landmark.name.en}</p>
        <p className="font-inter text-xs text-ink/50 mt-1 leading-relaxed animate-text">{bn ? landmark.tagline.bn : landmark.tagline.en}</p>
      </div>
    </div>
  )
}
