'use client'
/** DivisionLocator — real division outlines; the current division is raised in its colour. */
import { useEffect, useMemo, useState } from 'react'
import { geoMercator, geoPath, type GeoPermissibleObjects } from 'd3-geo'

type F = { type: 'Feature'; properties: { slug: string }; geometry: GeoPermissibleObjects }
const W = 320
const H = 400

export function DivisionLocator({ slug, accent, label }: { slug: string; accent: string; label: string }) {
  const [fs, setFs] = useState<F[]>([])
  useEffect(() => {
    fetch('/data/bangladesh-divisions.json').then((r) => r.json()).then((d) => setFs(d.features)).catch(() => {})
  }, [])
  const path = useMemo(() => {
    const p = geoMercator()
    if (fs.length) p.fitExtent([[12, 12], [W - 12, H - 16]], { type: 'FeatureCollection', features: fs } as never)
    return geoPath(p)
  }, [fs])
  const others = fs.filter((f) => f.properties.slug !== slug)
  const me = fs.find((f) => f.properties.slug === slug)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={label}>
      {others.map((f) => (
        <path key={f.properties.slug} d={path(f.geometry) ?? ''} fill="#E9E3D7" stroke="#FBFAF7" strokeWidth={1.2} />
      ))}
      {me && (
        <g className="animate-[bb-lift_1s_cubic-bezier(.16,1,.3,1)_0.3s_both]">
          <path d={path(me.geometry) ?? ''} fill="rgba(16,20,20,.22)" transform="translate(0 7)" />
          <path d={path(me.geometry) ?? ''} fill={accent} stroke="#FBFAF7" strokeWidth={1.4} />
        </g>
      )}
      <style>{`@keyframes bb-lift { from { transform: translateY(10px); opacity: 0 } to { transform: translateY(-4px); opacity: 1 } }`}</style>
    </svg>
  )
}
