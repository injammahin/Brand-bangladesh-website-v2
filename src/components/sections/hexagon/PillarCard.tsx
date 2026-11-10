'use client'
/**
 * PillarCard — side card that slides in when a hexagon pillar is active.
 * Shows title, one-line description, "Explore →" link.
 */

import { forwardRef } from 'react'

interface PillarCardProps {
  id: string
  label: string
  color: string
  description: string
  href: string
  locale?: string
}

export const PillarCard = forwardRef<HTMLDivElement, PillarCardProps>(
  ({ id, label, color, description, href, locale = 'en' }, ref) => {
    return (
      <div
        ref={ref}
        id={`pillar-card-${id}`}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-72 bg-cream border border-ink/8 p-6 opacity-0 pointer-events-none"
        style={{ clipPath: 'inset(0 100% 0 0)' }}
        aria-hidden="true"
      >
        {/* Accent line */}
        <div className="w-8 h-px mb-4" style={{ backgroundColor: color }} />

        {/* Label */}
        <p className="micro-label mb-2" style={{ color }}>
          {locale === 'bn' ? 'স্তম্ভ' : 'Pillar'}
        </p>

        {/* Title */}
        <h3 className="font-cormorant text-2xl text-ink leading-heading mb-3">
          {label}
        </h3>

        {/* Description */}
        <p className="font-inter text-xs text-ink/50 leading-relaxed mb-5">
          {description}
        </p>

        {/* CTA */}
        <a
          href={href}
          className="inline-flex items-center gap-2 font-inter text-xs uppercase tracking-label"
          style={{ color }}
          data-cursor="link"
        >
          {locale === 'bn' ? 'ঘুরে দেখুন' : 'Explore'}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    )
  }
)

PillarCard.displayName = 'PillarCard'
