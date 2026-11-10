'use client'
/**
 * HexagonSection — pinned ~450vh scroll-driven hexagon animation.
 * Flat-top hexagon. Pillars clockwise: Tourism, Exports, Governance,
 * Investment & Immigration, Culture & Heritage, People.
 *
 * Timeline:
 * 0→0.12   outer stroke draws
 * 0.12→0.25 spokes extend
 * 0.25→0.35 centre label + logo
 * 0.35→0.90 each pillar lights up (~0.09 each)
 * 0.90→1   all lit, idle glow
 */

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { pillars } from '@/lib/tokens'
import { PillarCard } from './hexagon/PillarCard'
import { getPillar } from '@/content/pillars'
import { t } from '@/lib/i18n'

// SVG geometry — flat-top hexagon
const CX = 350
const CY = 350
const R = 220   // outer radius
const SPOKE_R = R * 0.9

function hexPoint(angleDeg: number, radius: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) }
}

// Flat-top: vertices at 0°, 60°, 120°, 180°, 240°, 300°
const HEX_VERTICES = [0, 60, 120, 180, 240, 300].map((a) => hexPoint(a, R))

// Build the hexagon polygon points string
const hexPoints = HEX_VERTICES.map((p) => `${p.x},${p.y}`).join(' ')

// Wedge path for each pillar (sector between two vertices)
function wedgePath(index: number, innerR = 0) {
  // Same angles as HEX_VERTICES so every wedge fills exactly one sector of the outline
  const startAngle = index * 60
  const endAngle = (index + 1) * 60
  const p1 = hexPoint(startAngle, innerR)
  const p2 = hexPoint(endAngle, innerR)
  const p3 = hexPoint(endAngle, R)
  const p4 = hexPoint(startAngle, R)
  return `M ${p1.x} ${p1.y} L ${p4.x} ${p4.y} L ${p3.x} ${p3.y} L ${p2.x} ${p2.y} Z`
}

const PILLAR_DESCRIPTIONS: Record<string, string> = {
  tourism: 'Cox\'s Bazar to the Sundarbans — the world\'s wonders, rooted in Bangladesh.',
  exports: 'The garments that clothe the world, grown from Bangladeshi ingenuity.',
  governance: 'A democracy building institutions, transparency, and civic pride.',
  investment: 'A rising economy, a skilled diaspora, and open doors for the world.',
  culture: 'Tagore\'s homeland, cradle of music, art, and the Bengali renaissance.',
  people: '170 million dreamers driving the most resilient nation on earth.',
}

export function HexagonSection({ locale = 'en' }: { locale?: string }) {
  const name = (id: string, fallback: string) => { const p = getPillar(id); return p ? t(p.name, locale) : fallback }
  const sectionRef = useRef<HTMLElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const hexOutlineRef = useRef<SVGPolygonElement>(null)
  const spokesRef = useRef<SVGLineElement[]>([])
  const wedgesRef = useRef<SVGPathElement[]>([])
  const labelsRef = useRef<SVGTextElement[]>([])
  const centreLabelRef = useRef<SVGGElement>(null)
  const logoMarkRef = useRef<SVGGElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Show all at once
      gsap.set([wedgesRef.current, labelsRef.current, centreLabelRef.current], { opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      const hexOutline = hexOutlineRef.current
      if (!hexOutline) return

      gsap.set(hexOutline, {
        strokeDasharray: 1,
        strokeDashoffset: 1,
        opacity: 1,
      })

      // Initial states
      gsap.set(spokesRef.current, { scaleY: 0, transformOrigin: `${CX}px ${CY}px` })
      gsap.set(wedgesRef.current, { opacity: 0, scale: 0.8, transformOrigin: `${CX}px ${CY}px` })
      gsap.set(labelsRef.current, { opacity: 0, y: 10 })
      gsap.set(centreLabelRef.current, { opacity: 0 })
      gsap.set(cardRefs.current, { clipPath: 'inset(0 100% 0 0)', opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=750vh',
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      })

      // 0 → 0.12: stroke draw
      tl.to(hexOutline, { strokeDashoffset: 0, duration: 0.12, ease: 'none' }, 0)

      // 0.12 → 0.25: spokes extend
      tl.to(spokesRef.current, {
        scaleY: 1,
        duration: 0.13,
        ease: 'power2.out',
        stagger: 0.02,
      }, 0.12)

      // 0.25 → 0.35: centre label + logo
      tl.to(centreLabelRef.current, { opacity: 1, duration: 0.08, ease: 'none' }, 0.25)
      if (logoMarkRef.current) {
        tl.to(logoMarkRef.current, { opacity: 1, duration: 0.08 }, 0.27)
      }

      // 0.35 → 0.90: each pillar in sequence
      const pillarDur = 0.09
      pillars.forEach((pillar, i) => {
        const start = 0.35 + i * pillarDur
        const wedge = wedgesRef.current[i]
        const label = labelsRef.current[i]
        const card = cardRefs.current[i]

        // Dim previous
        if (i > 0) {
          const prev = wedgesRef.current[i - 1]
          const prevCard = cardRefs.current[i - 1]
          tl.to([prev], { opacity: 0.4, duration: 0.04 }, start)
          if (prevCard) tl.to(prevCard, { clipPath: 'inset(0 100% 0 0)', opacity: 0, duration: 0.04 }, start)
        }

        // Light up current wedge
        tl.to(wedge, { opacity: 1, scale: 1, duration: 0.07, ease: 'back.out(1.5)' }, start)
        tl.to(label, { opacity: 1, y: 0, duration: 0.06, ease: 'expo.out' }, start + 0.02)

        // Card reveal
        if (card) {
          tl.to(card, {
            clipPath: 'inset(0 0% 0 0)',
            opacity: 1,
            duration: 0.07,
            ease: 'expo.out',
            pointerEvents: 'auto',
          }, start + 0.03)
        }
      })

      // 0.90 → 1: all lit, gentle glow (CSS handles the glow animation)
      tl.to(wedgesRef.current, { opacity: 1, duration: 0.1 }, 0.9)

    }, section)

    return () => ctx.revert()
  }, [])

  const labelOffset = R * 1.25

  return (
    <section
      ref={sectionRef}
      id="hexagon"
      className="relative bg-cream h-screen flex items-center overflow-hidden"
      aria-label="Nation Brand pillars"
    >
      <div className="relative flex flex-col lg:flex-row items-center justify-between w-full max-w-[1600px] mx-auto h-full px-6 lg:px-12 xl:px-24">
        
        {/* Hexagon SVG (Massive on the Left) */}
        <div className="flex-1 flex justify-center lg:justify-start items-center h-full w-full">
          <svg
            ref={svgRef}
            viewBox="0 0 700 700"
            className="w-full max-w-full lg:h-[95vh] lg:max-h-[1200px] lg:w-auto aspect-square object-contain"
            aria-hidden="true"
            style={{ overflow: 'visible' }}
          >
            {/* Wedges (filled sectors) */}
            {pillars.map((pillar, i) => (
              <path
                key={pillar.id}
                ref={(el) => { wedgesRef.current[i] = el! }}
                d={wedgePath(i, 65)}
                fill={pillar.color}
                opacity={0}
                className="cursor-pointer"
                data-cursor="view"
                style={{ transition: 'filter 0.3s' }}
                onMouseEnter={(e) => { (e.currentTarget as SVGPathElement).style.filter = `drop-shadow(0 0 16px ${pillar.color})` }}
                onMouseLeave={(e) => { (e.currentTarget as SVGPathElement).style.filter = '' }}
              />
            ))}

            {/* Hex outline */}
            <polygon
              ref={hexOutlineRef}
              points={hexPoints}
              pathLength="1"
              fill="none"
              stroke="#101414"
              strokeWidth="1"
              opacity={0}
            />

            {/* Spokes */}
            {pillars.map((pillar, i) => {
              const vertex = HEX_VERTICES[i]
              return (
                <line
                  key={pillar.id}
                  ref={(el) => { spokesRef.current[i] = el! }}
                  x1={CX}
                  y1={CY}
                  x2={vertex.x}
                  y2={vertex.y}
                  stroke="#101414"
                  strokeWidth="0.5"
                  opacity={0.15}
                />
              )
            })}

            {/* Labels */}
            {pillars.map((pillar, i) => {
              // Label sits outside the middle of its wedge's outer edge
              const pt = hexPoint(i * 60 + 30, labelOffset)
              const label = name(pillar.id, pillar.label)
              const joiner = locale === 'bn' ? ' ও ' : ' & '
              const words = (locale === 'bn' ? label : label.toUpperCase()).split(joiner)
              return (
                <text
                  key={pillar.id}
                  ref={(el) => { labelsRef.current[i] = el! }}
                  x={pt.x}
                  y={pt.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={pillar.color}
                  fontSize="14"
                  fontFamily="var(--font-inter)"
                  fontWeight="700"
                  letterSpacing="2.5"
                  opacity={0}
                >
                  {words.length === 1 ? (
                    words[0]
                  ) : (
                    <>
                      <tspan x={pt.x} dy="-0.6em">{words[0]}{joiner.trimEnd()}</tspan>
                      <tspan x={pt.x} dy="1.2em">{words[1]}</tspan>
                    </>
                  )}
                </text>
              )
            })}

            {/* Centre Logo */}
            <g ref={centreLabelRef} opacity={0}>
              <svg x={CX - 35} y={CY - 40} width="70" height="80" viewBox="0 0 250.2 262.5">
                <path fill="#DF1A23" d="M101.8,114.8 L101.5,117.5 L43.2,261.2 L41.0,262.5 L0.2,262.2 L0.0,260.0 L98.0,118.2 L100.5,115.0Z"/>
                <path fill="#F68421" d="M123.8,75.8 L122.8,100.8 L110.8,250.8 L109.0,260.8 L106.5,262.5 L61.2,262.5 L59.0,260.2 L59.0,258.2 L80.2,193.2 L120.2,75.2Z"/>
                <path fill="#FECB02" d="M132.2,48.5 L133.8,50.0 L146.8,229.0 L148.5,261.0 L146.5,262.5 L126.2,262.5 L124.0,262.0 L123.2,260.0 L122.2,238.2 L128.2,101.8 L131.0,57.8Z"/>
                <path fill="#016171" d="M136.8,29.5 L138.5,30.5 L142.2,36.0 L146.0,50.2 L164.0,254.5 L163.2,260.5 L161.2,262.5 L153.2,262.5 L152.0,261.5 L148.5,233.2 L136.5,64.2 L135.5,31.0Z"/>
                <path fill="#010101" d="M159.2,112.2 L187.2,121.0 L195.8,124.5 L173.5,235.5 L171.5,226.2 L158.8,114.8Z"/>
                <path fill="#010101" d="M152.8,55.8 L154.0,56.2 L183.8,112.2 L184.2,114.5 L162.0,107.5 L158.0,105.2 L152.8,61.5Z"/>
                <path fill="#A5CD2F" d="M146.8,0.0 L148.5,0.5 L164.5,38.8 L194.5,114.5 L195.0,117.5 L194.2,118.2 L186.0,115.2 L152.0,53.5 L146.8,6.8Z"/>
                <path fill="#EF1551" d="M189.2,127.0 L196.5,127.0 L198.2,128.2 L250.2,257.0 L250.2,260.2 L248.5,262.5 L179.2,261.2 L177.5,259.2 L176.2,254.5 L175.5,234.0 L176.5,218.2 L187.8,128.2Z"/>
              </svg>
            </g>
          </svg>
        </div>

        {/* Right Side: Title + Cards */}
        <div className="relative w-full lg:w-[400px] flex flex-col justify-center h-full">
          {/* Section header moved to right column */}
          <div className="relative z-10 mb-8 lg:mb-16">
            <p className="micro-label mb-3">{t({ en: 'The six pillars', bn: 'ছয় স্তম্ভ' }, locale)}</p>
            <h2 className="font-cormorant text-4xl md:text-5xl lg:text-display-sm text-ink leading-display tracking-tighter">
              {t({ en: 'Brand Bangladesh', bn: 'ব্র্যান্ড বাংলাদেশ' }, locale)}
            </h2>
          </div>

          {/* Pillar cards container */}
          <div className="relative h-72 w-full hidden md:block">
            {pillars.map((pillar, i) => (
              <PillarCard
                key={pillar.id}
                ref={(el) => { cardRefs.current[i] = el }}
                id={pillar.id}
                label={name(pillar.id, pillar.label)}
                color={pillar.color}
                description={getPillar(pillar.id) ? t(getPillar(pillar.id)!.hook, locale) : PILLAR_DESCRIPTIONS[pillar.id]}
                href={`/${locale}/pillars/${pillar.id}`}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
