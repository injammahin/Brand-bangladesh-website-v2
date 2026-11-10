'use client'
/**
 * BangladeshMap2D — SVG-based interactive map of Bangladesh.
 * Uses d3-geo to project the real country boundary from GeoJSON.
 * Renders landmark pins with hover/click interaction and auto-tour.
 */

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { geoMercator, geoPath, type GeoPermissibleObjects } from 'd3-geo'
import { gsap } from '@/lib/gsap'
import landmarks from '../../../../data/landmarks.json'
import { LandmarkCard } from './LandmarkCard'

// Bangladesh bounding box
const LAT_MIN = 20.59, LAT_MAX = 26.63
const LNG_MIN = 88.01, LNG_MAX = 92.67
const CENTER_LNG = (LNG_MIN + LNG_MAX) / 2
const CENTER_LAT = (LAT_MIN + LAT_MAX) / 2

// Division accent colors
const DIVISION_COLORS: Record<string, string> = {
  barishal: '#016171',
  chattogram: '#479E90',
  dhaka: '#EF1551',
  khulna: '#A5CD2F',
  mymensingh: '#F68421',
  rajshahi: '#D9AA66',
  rangpur: '#DF1A23',
  sylhet: '#FECB02',
}

interface BangladeshMap2DProps {
  activeLandmark: number
  onLandmarkChange: (i: number) => void
}

export function BangladeshMap2D({ activeLandmark, onLandmarkChange }: BangladeshMap2DProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [boundary, setBoundary] = useState<GeoPermissibleObjects | null>(null)
  const [hoveredPin, setHoveredPin] = useState<number | null>(null)
  const activeRef = useRef(activeLandmark)
  activeRef.current = activeLandmark

  // Fetch boundary GeoJSON
  useEffect(() => {
    fetch('/data/bangladesh-boundary.json')
      .then(res => res.json())
      .then(data => setBoundary(data.geometry || data))
      .catch(() => {
        // Fallback: skip boundary, just show pins
        console.warn('Could not load boundary GeoJSON')
      })
  }, [])

  // Auto-tour
  useEffect(() => {
    const interval = setInterval(() => {
      const next = (activeRef.current + 1) % landmarks.length
      onLandmarkChange(next)
    }, 4000)
    return () => clearInterval(interval)
  }, [onLandmarkChange])

  // SVG dimensions
  const WIDTH = 500
  const HEIGHT = 700

  // d3-geo projection
  const projection = useMemo(() => {
    return geoMercator()
      .center([CENTER_LNG, CENTER_LAT])
      .scale(4500)
      .translate([WIDTH / 2, HEIGHT / 2])
  }, [])

  // Path generator
  const pathGenerator = useMemo(() => geoPath().projection(projection), [projection])

  // Project landmark lat/lng to SVG coordinates
  const projectPoint = useCallback((lat: number, lng: number): [number, number] => {
    const p = projection([lng, lat])
    return p ? [p[0], p[1]] : [0, 0]
  }, [projection])

  // Animate active pin
  useEffect(() => {
    if (!svgRef.current) return
    const pins = svgRef.current.querySelectorAll('.landmark-pin')
    pins.forEach((pin, i) => {
      if (i === activeLandmark) {
        gsap.to(pin, { scale: 1.5, duration: 0.4, ease: 'back.out(2)', transformOrigin: 'center center' })
      } else {
        gsap.to(pin, { scale: 1, duration: 0.3, ease: 'power2.out', transformOrigin: 'center center' })
      }
    })
  }, [activeLandmark])

  const activeLm = landmarks[activeLandmark]

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-full max-h-[75vh]"
        style={{ overflow: 'visible' }}
      >
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="map-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C8B89A" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#A89A7A" stopOpacity="0.5" />
          </linearGradient>
          <filter id="map-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="#101414" floodOpacity="0.12" />
          </filter>
          {/* Glow filter for active pin */}
          <filter id="pin-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Country boundary */}
        {boundary && (
          <path
            d={pathGenerator(boundary) || ''}
            fill="url(#map-gradient)"
            stroke="#B8A88A"
            strokeWidth="1.5"
            filter="url(#map-shadow)"
            className="transition-all duration-500"
          />
        )}

        {/* Grid lines for visual richness */}
        {[21, 22, 23, 24, 25, 26].map(lat => {
          const start = projection([LNG_MIN, lat])
          const end = projection([LNG_MAX, lat])
          if (!start || !end) return null
          return (
            <line
              key={`lat-${lat}`}
              x1={start[0]} y1={start[1]}
              x2={end[0]} y2={end[1]}
              stroke="#101414"
              strokeWidth="0.3"
              strokeOpacity="0.08"
              strokeDasharray="4 4"
            />
          )
        })}
        {[89, 90, 91, 92].map(lng => {
          const start = projection([lng, LAT_MIN])
          const end = projection([lng, LAT_MAX])
          if (!start || !end) return null
          return (
            <line
              key={`lng-${lng}`}
              x1={start[0]} y1={start[1]}
              x2={end[0]} y2={end[1]}
              stroke="#101414"
              strokeWidth="0.3"
              strokeOpacity="0.08"
              strokeDasharray="4 4"
            />
          )
        })}

        {/* Landmark pins */}
        {landmarks.map((lm, i) => {
          const [cx, cy] = projectPoint(lm.lat, lm.lng)
          const isActive = i === activeLandmark
          const isHovered = i === hoveredPin
          const color = DIVISION_COLORS[lm.division] ?? '#479E90'

          return (
            <g
              key={lm.id}
              className="landmark-pin cursor-pointer"
              onClick={() => onLandmarkChange(i)}
              onMouseEnter={() => setHoveredPin(i)}
              onMouseLeave={() => setHoveredPin(null)}
              data-cursor="view"
            >
              {/* Pulsing ring for active pin */}
              {isActive && (
                <>
                  <circle
                    cx={cx} cy={cy} r="12"
                    fill="none"
                    stroke={color}
                    strokeWidth="1"
                    opacity="0.4"
                  >
                    <animate attributeName="r" from="6" to="18" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                  <circle
                    cx={cx} cy={cy} r="8"
                    fill="none"
                    stroke={color}
                    strokeWidth="0.5"
                    opacity="0.3"
                  >
                    <animate attributeName="r" from="4" to="14" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
                  </circle>
                </>
              )}

              {/* Pin dot */}
              <circle
                cx={cx} cy={cy}
                r={isActive ? 5 : isHovered ? 4 : 3}
                fill={color}
                stroke="white"
                strokeWidth={isActive ? 2 : 1}
                filter={isActive ? 'url(#pin-glow)' : undefined}
                className="transition-all duration-300"
              />

              {/* Label for active/hovered pin */}
              {(isActive || isHovered) && (
                <text
                  x={cx + 10}
                  y={cy + 4}
                  fill="#101414"
                  fontSize="10"
                  fontFamily="var(--font-inter)"
                  fontWeight="600"
                  letterSpacing="0.5"
                  className="pointer-events-none"
                >
                  {lm.name.en}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {/* Landmark card overlay */}
      {activeLm && (
        <LandmarkCard key={activeLandmark} landmark={activeLm} />
      )}

      {/* Pause auto-tour button */}
      <button
        className="absolute bottom-4 right-4 micro-label text-ink/40 hover:text-ink/80 transition-colors"
        aria-label="Pause map auto-tour"
        onClick={() => { /* TODO: implement pause */ }}
      >
        ⏸ Pause tour
      </button>
    </div>
  )
}
