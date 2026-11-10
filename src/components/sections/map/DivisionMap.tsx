'use client'
/**
 * DivisionMap — interactive map of the 8 divisions (BRD 5.4.1).
 * Real division boundaries (geoBoundaries, CC BY 4.0) in pastel tones; the active division
 * lifts out of the map as a 3D extrusion with a pin. Hover / focus / tap selects,
 * second tap or "Open division" navigates. Every division is a focusable link.
 */
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { geoMercator, geoPath, type GeoPermissibleObjects } from 'd3-geo'
import divisions from '../../../../data/divisions.json'
import { REGIONS } from '@/content/regions'
import { t, num, type L } from '@/lib/i18n'

const W = 600
const H = 720
const LIFT = 16 // px the active division rises
const LAYERS = 8 // extrusion slices

type Feature = { type: 'Feature'; properties: { slug: string }; geometry: GeoPermissibleObjects }

/** Mix a hex colour with white (amt>0) or black (amt<0) */
function tone(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16)
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) =>
    Math.round(amt >= 0 ? c + (255 - c) * amt : c * (1 + amt)),
  )
  return `rgb(${ch.join(',')})`
}

const S = {
  hint: { en: 'Click a division to explore — click again to open it', bn: 'বিভাগে ক্লিক করুন — আবার ক্লিক করলে বিভাগটি খুলবে' },
  districts: { en: 'districts', bn: 'জেলা' },
  open: { en: 'Open division', bn: 'বিভাগটি দেখুন' },
  bay: { en: 'Bay of Bengal', bn: 'বঙ্গোপসাগর' },
}

export function DivisionMap({ locale }: { locale: string }) {
  const router = useRouter()
  const [features, setFeatures] = useState<Feature[]>([])
  const [active, setActive] = useState<string>('dhaka')

  useEffect(() => {
    fetch('/data/bangladesh-divisions.json')
      .then((r) => r.json())
      .then((d) => setFeatures(d.features))
      .catch(() => setFeatures([]))
  }, [])

  const { path, projection } = useMemo(() => {
    const projection = geoMercator()
    if (features.length) {
      projection.fitExtent([[24, 30], [W - 24, H - 70]], { type: 'FeatureCollection', features } as never)
    } else {
      projection.center([90.34, 23.61]).scale(5000).translate([W / 2, H / 2])
    }
    return { projection, path: geoPath(projection) }
  }, [features])

  const shapes = useMemo(() => features.map((f) => {
    const d = divisions.find((x) => x.slug === f.properties.slug)!
    const r = REGIONS[d.slug]
    // Label at HQ for long/irregular divisions, centroid otherwise
    const [cx, cy] = ['chattogram', 'barishal', 'khulna'].includes(d.slug)
      ? projection([r.lng, r.lat]) ?? [0, 0]
      : path.centroid(f.geometry)
    return { slug: d.slug, d: path(f.geometry) ?? '', accent: d.accent, name: d.name as L, count: d.districtCount, cx, cy }
  }), [features, path, projection])

  const cur = divisions.find((d) => d.slug === active)!
  const region = REGIONS[active]
  const act = shapes.find((s) => s.slug === active)
  const go = (slug: string) => router.push(`/${locale}/divisions/${slug}`)

  const label = (s: (typeof shapes)[number], on: boolean) => (
    <text
      x={s.cx}
      y={s.cy + (on ? -LIFT : 0) + 4}
      textAnchor="middle"
      fontSize={on ? 15 : 13}
      fontWeight={600}
      fontFamily={locale === 'bn' ? 'var(--font-hind-siliguri)' : 'var(--font-inter)'}
      fill={on ? '#FBFAF7' : '#101414'}
      opacity={on ? 1 : 0.75}
      pointerEvents="none"
      style={{ transition: 'all .45s cubic-bezier(.16,1,.3,1)' }}
    >
      {t(s.name, locale)}
    </text>
  )

  return (
    <div className="grid lg:grid-cols-[1.25fr_1fr] gap-8 lg:gap-12 items-center">
      <div data-slide="left" className="relative w-full max-w-[600px] mx-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Map of Bangladesh's eight divisions">
          <defs>
            <filter id="bb-soft" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#101414" floodOpacity="0.12" />
            </filter>
            <filter id="bb-lift" x="-30%" y="-30%" width="160%" height="170%">
              <feDropShadow dx="0" dy="18" stdDeviation="10" floodColor="#101414" floodOpacity="0.28" />
            </filter>
          </defs>

          {/* Base map — every division in pastel, with a soft paper shadow */}
          <g filter="url(#bb-soft)">
            {shapes.map((s) => (
              <a
                key={s.slug}
                href={`/${locale}/divisions/${s.slug}`}
                onClick={(e) => { e.preventDefault(); active === s.slug ? go(s.slug) : setActive(s.slug) }}
                onKeyDown={(e) => { if (e.key === ' ') { e.preventDefault(); setActive(s.slug) } }}
                aria-label={`${t(s.name, locale)} — ${num(s.count, locale)} ${t(S.districts, locale)}`}
                data-cursor="view"
                style={{ outline: 'none' }}
              >
                <path
                  d={s.d}
                  fill={s.slug === active ? tone(s.accent, -0.35) : tone(s.accent, 0.78)}
                  stroke="#FBFAF7"
                  strokeWidth={1.6}
                  strokeLinejoin="round"
                  className="cursor-pointer hover:brightness-95"
                  style={{ transition: 'fill .4s, filter .2s' }}
                />
              </a>
            ))}
          </g>

          {/* Labels for inactive divisions */}
          {shapes.filter((s) => s.slug !== active).map((s) => <g key={s.slug}>{label(s, false)}</g>)}

          {/* Active division — extruded and lifted */}
          {act && (
            <g key={act.slug} style={{ animation: 'bb-rise .5s cubic-bezier(.16,1,.3,1)' }} pointerEvents="none">
              {Array.from({ length: LAYERS }, (_, i) => {
                const y = -(LIFT * i) / LAYERS
                return <path key={i} d={act.d} transform={`translate(0 ${y})`} fill={tone(act.accent, -0.55 + i * 0.03)} stroke={tone(act.accent, -0.65)} strokeWidth={0.6} />
              })}
              <path d={act.d} transform={`translate(0 ${-LIFT})`} fill={tone(act.accent, -0.2)} stroke={tone(act.accent, 0.35)} strokeWidth={1.4} filter="url(#bb-lift)" />
              <path d={act.d} transform={`translate(0 ${-LIFT})`} fill={tone(act.accent, -0.2)} stroke={tone(act.accent, 0.35)} strokeWidth={1.4} />
              {/* Pin */}
              <g transform={`translate(${act.cx} ${act.cy - LIFT - 26})`}>
                <circle r="16" fill="#FECB02" opacity="0.25" />
                <path d="M0 12 C -8 2, -10 -2, -10 -6 A 10 10 0 1 1 10 -6 C 10 -2, 8 2, 0 12 Z" fill="#FECB02" stroke="#FBFAF7" strokeWidth="1.5" />
                <circle cy="-6" r="3.6" fill="#FBFAF7" />
              </g>
              {label(act, true)}
            </g>
          )}

          <text x={W * 0.58} y={H - 22} textAnchor="middle" fontFamily="var(--font-cormorant)" fontStyle="italic" fontSize="22" fill="#479E90" opacity="0.8">
            {t(S.bay, locale)}
          </text>
        </svg>
        <p className="micro-label text-ink/40 text-center mt-2">{t(S.hint, locale)}</p>
        <p className="font-inter text-[10px] text-ink/30 text-center mt-1">Boundaries: geoBoundaries (CC BY 4.0)</p>
        <style jsx>{`
          @keyframes bb-rise { from { transform: translateY(${LIFT}px); opacity: .6 } to { transform: translateY(0); opacity: 1 } }
        `}</style>
      </div>

      {/* Summary panel */}
      <div data-slide="right" aria-live="polite" className="border border-ink/10 rounded-xl overflow-hidden bg-cream">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img key={active} src={region.photo} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${cur.accent}aa 0%, transparent 60%)` }} />
        </div>
        <div className="p-6">
          <div className="w-8 h-px mb-3" style={{ backgroundColor: cur.accent }} />
          <p className="micro-label mb-1" style={{ color: cur.accent }}>{num(cur.districtCount, locale)} {t(S.districts, locale)}</p>
          <h3 className="font-cormorant text-4xl text-ink leading-heading mb-3">{t(cur.name as L, locale)}</h3>
          <p className="font-inter text-sm text-ink/60 leading-relaxed mb-5">{t(region.intro, locale)}</p>
          <a
            href={`/${locale}/divisions/${cur.slug}`}
            onClick={(e) => { e.preventDefault(); go(cur.slug) }}
            className="inline-flex items-center gap-2 font-inter text-xs uppercase tracking-label px-5 py-2.5 rounded-full bg-ink text-cream hover:bg-ink/80 transition-colors"
          >
            {t(S.open, locale)} →
          </a>
        </div>
      </div>
    </div>
  )
}
