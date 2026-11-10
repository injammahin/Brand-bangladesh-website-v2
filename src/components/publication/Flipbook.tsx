'use client'
/**
 * Flipbook — lightweight page-turning reader (BRD 5.5.2).
 * Desktop: two-page spread with a 3D leaf turn. Mobile: single page with slide.
 * Keyboard: ← / →. Reduced motion: instant page change.
 * Pages are React nodes, so the CMS can feed either rendered PDF pages (images) or HTML.
 */
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { num } from '@/lib/i18n'

export function Flipbook({ pages, locale, label }: { pages: ReactNode[]; locale: string; label: string }) {
  const [isWide, setIsWide] = useState(false)
  const [idx, setIdx] = useState(0) // index of left page (wide) or current page (narrow)
  const [turn, setTurn] = useState<null | 'next' | 'prev'>(null)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)')
    const on = () => setIsWide(mq.matches)
    on(); mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  // Wide view: page 0 (cover) alone on the right, then spreads [1,2], [3,4]…
  const stepSize = isWide ? 2 : 1
  const spreadStart = isWide ? (idx === 0 ? -1 : idx % 2 === 1 ? idx : idx - 1) : idx
  const max = pages.length - 1

  const go = useCallback((dir: 'next' | 'prev') => {
    if (turn) return
    const target = dir === 'next'
      ? (isWide ? (spreadStart < 0 ? 1 : spreadStart + stepSize) : idx + 1)
      : (isWide ? (spreadStart <= 1 ? 0 : spreadStart - stepSize) : idx - 1)
    if (target < 0 || target > max) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setIdx(target); return }
    setTurn(dir)
    setTimeout(() => { setIdx(target); setTurn(null) }, 650)
  }, [turn, isWide, spreadStart, stepSize, idx, max])

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest('input,textarea,select')) return
      if (e.key === 'ArrowRight') go('next')
      if (e.key === 'ArrowLeft') go('prev')
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [go])

  const Page = ({ i, side }: { i: number; side: 'l' | 'r' | 's' }) => (
    <div className={`absolute inset-0 bg-[#fffdf8] overflow-hidden ${side === 'l' ? 'rounded-l-md' : side === 'r' ? 'rounded-r-md' : 'rounded-md'}`}>
      {i >= 0 && i <= max ? pages[i] : <div className="w-full h-full bg-cream" />}
      {side !== 's' && (
        <div className="absolute inset-y-0 w-10 pointer-events-none"
          style={{ [side === 'l' ? 'right' : 'left']: 0, background: `linear-gradient(to ${side === 'l' ? 'left' : 'right'}, rgba(0,0,0,.12), transparent)` }} />
      )}
    </div>
  )

  const L = spreadStart, R = spreadStart + 1
  const nextL = turn === 'next' ? (spreadStart < 0 ? 1 : spreadStart + 2) : -1
  const prevR = turn === 'prev' ? (spreadStart <= 1 ? 0 : spreadStart - 1) : -1

  const currentLabel = isWide
    ? (L < 0 ? `${num(1, locale)}` : `${num(L + 1, locale)}–${num(Math.min(R + 1, pages.length), locale)}`)
    : num(idx + 1, locale)

  return (
    <div className="select-none" role="region" aria-roledescription="flipbook" aria-label={label}>
      <div className="relative mx-auto" style={{ perspective: '2400px', maxWidth: isWide ? 1000 : 460, aspectRatio: isWide ? '1.414 / 1' : '0.707 / 1' }}>
        {isWide ? (
          <>
            {/* Static left & right pages (under the turning leaf) */}
            <div className="absolute inset-y-0 left-0 w-1/2 shadow-xl">
              <Page i={turn === 'prev' ? prevR - 1 : L} side="l" />
            </div>
            <div className="absolute inset-y-0 right-0 w-1/2 shadow-xl">
              <Page i={turn === 'next' ? nextL + 1 : R} side="r" />
            </div>
            {/* Turning leaf */}
            {turn && (
              <div
                className="absolute inset-y-0 w-1/2"
                style={{
                  left: turn === 'next' ? '50%' : 0,
                  transformOrigin: turn === 'next' ? 'left center' : 'right center',
                  transformStyle: 'preserve-3d',
                  animation: `${turn === 'next' ? 'bb-flip-next' : 'bb-flip-prev'} .65s cubic-bezier(.65,0,.35,1) forwards`,
                }}
              >
                <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
                  <Page i={turn === 'next' ? R : L} side={turn === 'next' ? 'r' : 'l'} />
                </div>
                <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <Page i={turn === 'next' ? nextL : prevR} side={turn === 'next' ? 'l' : 'r'} />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 shadow-xl" style={{ animation: turn ? `bb-slide-${turn} .65s ease forwards` : undefined }}>
            <Page i={idx} side="s" />
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-6 mt-8">
        <button onClick={() => go('prev')} disabled={idx === 0} className="w-11 h-11 rounded-full border border-ink/20 hover:bg-ink hover:text-cream disabled:opacity-30 transition-colors" aria-label="Previous page">←</button>
        <span className="micro-label text-ink/50" aria-live="polite">{currentLabel} / {num(pages.length, locale)}</span>
        <button onClick={() => go('next')} disabled={isWide ? R >= max : idx >= max} className="w-11 h-11 rounded-full border border-ink/20 hover:bg-ink hover:text-cream disabled:opacity-30 transition-colors" aria-label="Next page">→</button>
      </div>

      <style jsx global>{`
        @keyframes bb-flip-next { from { transform: rotateY(0deg); } to { transform: rotateY(-180deg); } }
        @keyframes bb-flip-prev { from { transform: rotateY(0deg); } to { transform: rotateY(180deg); } }
        @keyframes bb-slide-next { 0% { transform: translateX(0); opacity: 1 } 50% { transform: translateX(-30%); opacity: 0 } 51% { transform: translateX(30%); opacity: 0 } 100% { transform: translateX(0); opacity: 1 } }
        @keyframes bb-slide-prev { 0% { transform: translateX(0); opacity: 1 } 50% { transform: translateX(30%); opacity: 0 } 51% { transform: translateX(-30%); opacity: 0 } 100% { transform: translateX(0); opacity: 1 } }
      `}</style>
    </div>
  )
}
