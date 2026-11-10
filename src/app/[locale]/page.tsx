'use client'
/**
 * Home page — premium monthly-magazine experience: cinematic reveal, issue spread, story rail,
 * archive, pillar panels, numbers, division map, audience paths.
 * Header, footer and cursor come from the [locale] layout.
 */
import { useMotionInit } from '@/hooks/useMotionInit'
import { useScrollSlides } from '@/hooks/useScrollSlides'
import { Preloader } from '@/components/layout/Preloader'
import { Hero } from '@/components/sections/Hero'
import { Magazine } from '@/components/sections/Magazine'
import { Audiences } from '@/components/sections/Audiences'
import { Manifesto } from '@/components/sections/Manifesto'
import { IssueSpread } from '@/components/sections/IssueSpread'
import { StoriesRail } from '@/components/sections/StoriesRail'
import { HexagonSection } from '@/components/sections/HexagonSection'
import { GlanceNumbers } from '@/components/sections/GlanceNumbers'
import { MapSection } from '@/components/sections/MapSection'
import { DivisionExplorer } from '@/components/sections/DivisionExplorer'
import { useState, useCallback } from 'react'


interface Props {
  params: { locale: string }
}

export default function LocaleHomePage({ params }: Props) {
  useMotionInit()
  useScrollSlides()
  const [preloaderDone, setPreloaderDone] = useState(false)
  const handlePreloaderComplete = useCallback(() => setPreloaderDone(true), [])
  const locale = params.locale

  return (
    <>
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero isLoaded={preloaderDone} locale={locale} />
        <Manifesto locale={locale} />
        <IssueSpread locale={locale} />
        <StoriesRail locale={locale} />
        <Magazine locale={locale} />
        <HexagonSection locale={locale} />
        <GlanceNumbers locale={locale} />
        <MapSection locale={locale} />
        <DivisionExplorer locale={locale} />
        <Audiences locale={locale} />
      </main>
    </>
  )
}
