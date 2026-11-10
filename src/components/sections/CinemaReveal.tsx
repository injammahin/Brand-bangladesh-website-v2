'use client'
/**
 * CinemaReveal — "fly through the clouds onto Bangladesh".
 * A framed sky opens to full screen as you scroll; clouds part and rush past the camera,
 * the map of the eight divisions zooms in, and the manifesto rises over it.
 * Built from our own division geometry (geoBoundaries) — no third-party footage.
 * To use a licensed film instead, put it in /public/assets and set VIDEO_SRC.
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import { geoMercator, geoPath, type GeoPermissibleObjects } from 'd3-geo'
import { gsap } from '@/lib/gsap'
import { t } from '@/lib/i18n'
import { REGIONS } from '@/content/regions'

// TEMPORARY — watermarked Dreamstime preview (clip ID 265576543), for internal client review only.
// Not licensed for publication: replace with the licensed file before launch, or set to '' to use the animated map.
const VIDEO_SRC = '' // licensed file path here, e.g. '/assets/bangladesh-clouds.webm'
// The 580px preview is shown in a framed screen (≈1.6× upscale) instead of full-bleed (≈3×) so it stays sharp.
// Set to false once the licensed HD/4K file is in place to let it fill the whole screen.
const FRAMED = true

const LINES = [
  { en: 'Bangladesh is not just a country.', bn: 'বাংলাদেশ শুধু একটি দেশ নয়।' },
  { en: 'It is a civilisation of rivers,', bn: 'এ এক নদীমাতৃক সভ্যতা,' },
  { en: 'of resilience, of 170 million dreams.', bn: 'অদম্য মানুষের, সতেরো কোটি স্বপ্নের।' },
]
const SIGN = { en: 'This is Brand Bangladesh', bn: 'এই আমাদের ব্র্যান্ড বাংলাদেশ' }
const CAPTION = { en: 'A journey across the delta', bn: 'ব-দ্বীপজুড়ে এক যাত্রা' }

// Cloud banks: [left%, top%, size% of frame width, flight direction x, y]
const CLOUDS: [number, number, number, number, number][] = [
  [-10, -15, 80, -1, -1], [35, -20, 85, 0.3, -1], [60, 5, 75, 1, -0.4],
  [-15, 35, 80, -1, 0.3], [30, 30, 90, 0.1, 0.2], [62, 50, 80, 1, 0.8],
  [5, 62, 85, -0.6, 1], [40, 70, 80, 0.4, 1],
]

type F = { type: 'Feature'; properties: { slug: string }; geometry: GeoPermissibleObjects }
const W = 1000
const H = 700

export function CinemaReveal({ locale = 'en' }: { locale?: string }) {
  const sec = useRef<HTMLElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const map = useRef<SVGGElement>(null)
  const [fs, setFs] = useState<F[]>([])

  useEffect(() => {
    fetch('/data/bangladesh-divisions.json').then((r) => r.json()).then((d) => setFs(d.features)).catch(() => {})
  }, [])
  const { path, proj } = useMemo(() => {
    const p = geoMercator()
    if (fs.length) p.fitExtent([[W * 0.3, H * 0.08], [W * 0.7, H * 0.92]], { type: 'FeatureCollection', features: fs } as never)
    return { path: geoPath(p), proj: p }
  }, [fs])

  useEffect(() => {
    const s = sec.current, f = frame.current, m = map.current
    const video = !!VIDEO_SRC
    if (!s || !f || (!video && !m)) return
    const boxed = video && FRAMED
    const fromClip = boxed ? 'inset(12% 14% 12% 14% round 28px)' : 'inset(17% 22% 17% 22% round 28px)'
    const toClip = boxed ? 'inset(0% 0% 0% 0% round 28px)' : 'inset(0% 0% 0% 0% round 0px)'
    const lines = s.querySelectorAll('[data-line]')
    const sign = s.querySelector('[data-sign]')
    const cap = s.querySelector('[data-cap]')
    const clouds = gsap.utils.toArray<HTMLElement>(s.querySelectorAll('[data-cloud]'))
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(f, { clipPath: toClip })
      gsap.set(clouds, { opacity: 0 })
      gsap.set([lines, sign], { opacity: 1 })
      return
    }
    const ctx = gsap.context(() => {
      if (m) gsap.set(m, { scale: 0.45, transformOrigin: '50% 50%' })
      const tl = gsap.timeline({
        scrollTrigger: { trigger: s, start: 'top top', end: '+=220%', scrub: 0.8, pin: true, anticipatePin: 1 },
      })
      tl.fromTo(f, { clipPath: fromClip, scale: boxed ? 0.92 : 1 }, { clipPath: toClip, scale: 1, ease: 'power2.inOut', duration: 1 }, 0)
        .to(cap, { opacity: 0, y: -20, duration: 0.25 }, 0.15)
      if (m) tl.to(m, { scale: 1, ease: 'power2.out', duration: 1.3 }, 0.1)
      clouds.forEach((c, i) => {
        const [, , , dx, dy] = CLOUDS[i]
        tl.to(c, { xPercent: dx * 120, yPercent: dy * 120, scale: 3.2, opacity: 0, ease: 'power2.in', duration: 0.9 }, 0.15 + (i % 4) * 0.06)
      })
      lines.forEach((l, i) => tl.fromTo(l, { opacity: 0, y: 70 }, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.45 }, 1.0 + i * 0.32))
      tl.fromTo(sign, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.35 }, 1.0 + lines.length * 0.32)
        .to({}, { duration: 0.5 })
    }, s)
    return () => ctx.revert()
  }, [fs.length])

  return (
    <section ref={sec} className="relative h-screen bg-cream overflow-hidden" aria-label={t(SIGN, locale)}>
      <div className={VIDEO_SRC && FRAMED ? 'absolute inset-0 flex items-center justify-center px-4' : 'contents'}>
      <div
        ref={frame}
        className={VIDEO_SRC && FRAMED
          ? 'relative w-full md:w-[66vw] max-w-[1120px] aspect-video rounded-[28px] overflow-hidden shadow-[0_40px_90px_-40px_rgba(16,20,20,.6)] will-change-[clip-path]'
          : 'absolute inset-0 will-change-[clip-path]'}
        style={{ clipPath: VIDEO_SRC && FRAMED ? 'inset(12% 14% 12% 14% round 28px)' : 'inset(17% 22% 17% 22% round 28px)' }}
      >
        {VIDEO_SRC ? (
          <>
            <video className="absolute inset-0 w-full h-full object-cover [filter:contrast(1.06)_saturate(1.08)]" src={VIDEO_SRC} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
            {/* light scrim so the manifesto stays readable */}
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(6,48,58,.18), rgba(6,48,58,.38))' }} />
          </>
        ) : (
          <>
            {/* Sea + glow */}
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 50%, #1f7f8e 0%, #0e5562 45%, #06303a 100%)' }} />
            {/* Map of the eight divisions */}
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full" aria-hidden="true">
              <defs>
                <filter id="bb-map-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="14" result="b" />
                  <feFlood floodColor="#7fd6e0" floodOpacity="0.55" />
                  <feComposite in2="b" operator="in" result="g" />
                  <feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <g ref={map} filter="url(#bb-map-glow)">
                <g className="bb-breathe">
                  {fs.map((f) => (
                    <path key={f.properties.slug} d={path(f.geometry) ?? ''} fill="#a8a197" stroke="rgba(255,255,255,.85)" strokeWidth={1.4} strokeLinejoin="round" />
                  ))}
                  {/* light travelling along the borders */}
                  {fs.map((f, i) => (
                    <path
                      key={'t' + f.properties.slug}
                      d={path(f.geometry) ?? ''}
                      fill="none"
                      stroke="rgba(255,255,255,.95)"
                      strokeWidth={2.4}
                      strokeLinecap="round"
                      pathLength={1000}
                      strokeDasharray="60 940"
                      className="bb-trace"
                      style={{ animationDuration: `${7 + (i % 4)}s`, animationDelay: `${-i * 1.3}s` }}
                    />
                  ))}
                  {/* divisional capitals */}
                  {fs.length > 0 && Object.values(REGIONS).map((r, i) => {
                    const pt = proj([r.lng, r.lat])
                    if (!pt) return null
                    return (
                      <g key={r.slug}>
                        <circle cx={pt[0]} cy={pt[1]} r={5} fill="none" stroke="#FECB02" strokeWidth={1.6} className="bb-ping" style={{ animationDelay: `${-i * 0.35}s` }} />
                        <circle cx={pt[0]} cy={pt[1]} r={3.6} fill="#FECB02" />
                      </g>
                    )
                  })}
                </g>
              </g>
            </svg>
            {/* Cloud banks that part as the camera flies in */}
            {CLOUDS.map(([l, tp, size], i) => (
              <div
                key={i}
                data-cloud
                className="absolute pointer-events-none animate-[bb-cloud_14s_ease-in-out_infinite_alternate]"
                style={{
                  left: `${l}%`, top: `${tp}%`, width: `${size}%`, aspectRatio: '1.6',
                  background: 'radial-gradient(closest-side, rgba(255,255,255,.97), rgba(255,255,255,.75) 45%, rgba(255,255,255,0) 100%)',
                  filter: 'blur(18px)', animationDelay: `${-i * 1.7}s`,
                }}
              />
            ))}
            {/* thin wisps that keep drifting past — the 'flying' feeling never stops */}
            {[[18, 30, 34], [52, 40, 42], [74, 26, 50]].map(([top, dur, delay], i) => (
              <div
                key={'w' + i}
                className="absolute left-0 pointer-events-none bb-wisp"
                style={{
                  top: `${top}%`, width: '55%', aspectRatio: '3.2',
                  background: 'radial-gradient(closest-side, rgba(255,255,255,.55), rgba(255,255,255,0))',
                  filter: 'blur(22px)', animationDuration: `${dur}s`, animationDelay: `${-delay}s`,
                }}
              />
            ))}
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(6,48,58,.15), rgba(6,48,58,.45))' }} />
          </>
        )}
        <p className="absolute right-6 bottom-6 z-10 micro-label text-cream/80">23.68° N · 90.35° E</p>
      </div>
      </div>

      <p data-cap className="absolute left-1/2 -translate-x-1/2 bottom-[9%] micro-label text-ink/50 flex items-center gap-3">
        <span className="h-px w-8 bg-gold" />{t(CAPTION, locale)}<span className="h-px w-8 bg-gold" />
      </p>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        {LINES.map((l, i) => (
          <p
            key={i}
            data-line
            className={`opacity-0 font-cormorant leading-[1.04] tracking-tight ${VIDEO_SRC && FRAMED ? 'text-[clamp(1.5rem,3.2vw,3.2rem)]' : 'text-[clamp(2.1rem,5.4vw,5.4rem)]'} drop-shadow-[0_2px_18px_rgba(0,0,0,.45)] ${i === 1 ? 'italic text-gold' : 'text-cream'}`}
          >
            {t(l, locale)}
          </p>
        ))}
        <p data-sign className="opacity-0 mt-10 flex items-center gap-4 micro-label text-cream/90">
          <span className="flex h-[3px] w-12 rounded-full overflow-hidden" aria-hidden="true">
            {['#DF1A23', '#F68421', '#FECB02', '#016171', '#A5CD2F', '#EF1551'].map((c) => <span key={c} className="flex-1" style={{ backgroundColor: c }} />)}
          </span>
          {t(SIGN, locale)}
        </p>
      </div>
      <style jsx global>{`
        @keyframes bb-cloud { from { transform: translate3d(-4%, 1%, 0) } to { transform: translate3d(5%, -3%, 0) } }
        @keyframes bb-breathe { from { transform: scale(1) translate(0, 0) } to { transform: scale(1.07) translate(-1%, -1.5%) } }
        .bb-breathe { transform-box: fill-box; transform-origin: center; animation: bb-breathe 11s ease-in-out infinite alternate; }
        @keyframes bb-trace { from { stroke-dashoffset: 1000 } to { stroke-dashoffset: 0 } }
        .bb-trace { animation: bb-trace 8s linear infinite; }
        @keyframes bb-ping { 0% { transform: scale(.6); opacity: .95 } 100% { transform: scale(3.4); opacity: 0 } }
        .bb-ping { transform-box: fill-box; transform-origin: center; animation: bb-ping 2.6s ease-out infinite; }
        @keyframes bb-wisp { from { transform: translate3d(-80%, 0, 0) } to { transform: translate3d(200%, 0, 0) } }
        .bb-wisp { animation: bb-wisp 36s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .bb-breathe, .bb-trace, .bb-ping, .bb-wisp { animation: none !important } }
      `}</style>
    </section>
  )
}
