'use client'
/**
 * MapSection — 3D view video of Bangladesh with landmark sidebar.
 * The video blends seamlessly into the cream background.
 */

import { useState, useRef, useEffect } from 'react'
import landmarks from '../../../data/landmarks.json'
import { LandmarkCard } from './map/LandmarkCard'
import { t } from '@/lib/i18n'

export function MapSection({ locale = 'en' }: { locale?: string }) {
  const [activeLandmark, setActiveLandmark] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)
  const activeLm = landmarks[activeLandmark]
  
  // Preload every landmark photo so the auto-tour never shows an empty frame
  useEffect(() => {
    landmarks.forEach((lm) => { const img = new Image(); img.decoding = 'async'; img.src = lm.image })
  }, [])

  // Auto-tour
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLandmark((prev) => (prev + 1) % landmarks.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [activeLandmark])

  // Scroll active item into view within the nav container (without scrolling the page)
  useEffect(() => {
    if (!listRef.current) return
    const container = listRef.current
    const activeBtn = container.children[activeLandmark] as HTMLButtonElement
    
    if (activeBtn) {
      // Calculate the center position
      const containerHalf = container.clientWidth / 2
      const btnHalf = activeBtn.clientWidth / 2
      const targetScroll = activeBtn.offsetLeft - containerHalf + btnHalf
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      })
    }
  }, [activeLandmark])

  return (
    <section
      id="map"
      className="relative bg-cream py-24 px-6 md:px-10 lg:px-16"
      aria-label="Interactive map of Bangladesh"
    >
      {/* Top Header */}
      <div className="mb-8" data-slide="left">
        <h2 className="font-cormorant text-display-md text-ink leading-display tracking-tighter">
          {t({ en: 'Explore The Land', bn: 'ভূমি ঘুরে দেখুন' }, locale)}
        </h2>
      </div>

      <div className="flex flex-col gap-8">
        {/* Top Row: Video + Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:h-[70vh]">
          {/* Left Column: 3D Video */}
          <div data-slide="left" className="relative w-full h-[50vh] lg:h-full rounded-xl overflow-hidden flex items-center justify-center">
            <video
              src="/assets/3d-view.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover scale-[1.05]"
              style={{ mixBlendMode: 'multiply' }}
            />
            {/* Soft edge fade to blend into cream background */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(to top, rgba(251,250,247,1) 0%, transparent 15%),
                  linear-gradient(to bottom, rgba(251,250,247,1) 0%, transparent 15%),
                  linear-gradient(to left, rgba(251,250,247,1) 0%, transparent 15%),
                  linear-gradient(to right, rgba(251,250,247,1) 0%, transparent 15%)
                `,
              }}
            />
          </div>

          {/* Right Column: Tourism preview */}
          <div data-slide="right" className="h-full w-full rounded-xl flex items-center justify-center">
            {activeLm && (
              <LandmarkCard key={activeLandmark} landmark={activeLm} staticPosition={true} locale={locale} />
            )}
          </div>
        </div>

        {/* Bottom Row: Tourism list */}
        <div className="w-full bg-cream border border-ink/10 rounded-xl p-6 shadow-sm z-10 relative">
          <p className="micro-label mb-4">{t({ en: 'Landmarks', bn: 'দর্শনীয় স্থান' }, locale)}</p>
          <nav ref={listRef} className="relative flex overflow-x-auto gap-8 custom-scrollbar pb-4 snap-x">
            {landmarks.map((lm, i) => (
              <button
                key={lm.id}
                className={`flex-shrink-0 text-left min-w-[160px] group transition-all duration-300 snap-start ${
                  activeLandmark === i ? 'text-ink' : 'text-ink/40 hover:text-ink/80'
                }`}
                onClick={() => setActiveLandmark(i)}
                aria-pressed={activeLandmark === i}
              >
                <div className="mb-2 h-1 w-full rounded-full overflow-hidden bg-ink/5">
                  <div 
                    className={`h-full transition-all ${activeLandmark === i ? 'bg-gold w-full duration-[4000ms] ease-linear' : 'bg-transparent w-0 duration-300'}`} 
                  />
                </div>
                <p className="font-cormorant text-xl leading-tight mb-1">{locale === 'bn' && lm.name.bn !== 'TODO' ? lm.name.bn : lm.name.en}</p>
                <p className="micro-label capitalize" style={{
                  color: activeLandmark === i ? '#D9AA66' : undefined,
                }}>
                  {lm.division}
                </p>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* aria-live for auto-tour announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only" id="map-tour-announce" />
    </section>
  )
}
