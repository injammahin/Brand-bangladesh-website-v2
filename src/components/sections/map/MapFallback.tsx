'use client'
/**
 * MapFallback — static map.jpg with animated hotspot rings for mobile/low-power.
 * Shows landmark name card on click.
 */

import Image from 'next/image'
import { useState } from 'react'
import landmarks from '../../../../data/landmarks.json'

// Bangladesh bounding box for rough lat/lng → % coordinate projection
// Lat: 20.59 → 26.63 | Lng: 88.01 → 92.67
const LAT_MIN = 20.59, LAT_MAX = 26.63
const LNG_MIN = 88.01, LNG_MAX = 92.67

function latLngToPercent(lat: number, lng: number) {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * 100
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * 100
  return { x, y }
}

interface MapFallbackProps {
  activeLandmark: number
  onLandmarkChange: (i: number) => void
}

export function MapFallback({ activeLandmark, onLandmarkChange }: MapFallbackProps) {
  const active = landmarks[activeLandmark]

  return (
    <div className="relative w-full h-full min-h-[60vh]">
      <Image
        src="/assets/map.jpg"
        alt="Bangladesh relief map"
        fill
        className="object-contain object-center"
        priority={false}
      />

      {/* Hotspot rings */}
      {landmarks.map((lm, i) => {
        const pos = latLngToPercent(lm.lat, lm.lng)
        const isActive = i === activeLandmark
        return (
          <button
            key={lm.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            onClick={() => onLandmarkChange(i)}
            aria-label={lm.name.en}
            aria-pressed={isActive}
          >
            {/* Pulsing ring */}
            <span
              className={`block w-3 h-3 rounded-full border-2 relative ${isActive ? 'border-gold' : 'border-teal'}`}
            >
              {isActive && (
                <span className="absolute inset-0 rounded-full border border-gold animate-ping opacity-60" />
              )}
            </span>
          </button>
        )
      })}

      {/* Active landmark label */}
      {active && (
        <div className="absolute bottom-4 left-4 right-4 bg-cream/90 backdrop-blur-sm p-4 rounded-lg border border-ink/8">
          <p className="micro-label mb-1 text-gold">{active.division} — {active.pillar}</p>
          <p className="font-cormorant text-xl text-ink">{active.name.en}</p>
        </div>
      )}
    </div>
  )
}
