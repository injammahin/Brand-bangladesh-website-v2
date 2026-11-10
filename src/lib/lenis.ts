'use client'
/**
 * Lenis smooth scroll factory.
 * Creates a single Lenis instance synced to the GSAP ticker.
 * Call initLenis() once at app mount; call destroyLenis() on route change.
 */

import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

let lenis: Lenis | null = null

function updateLenis(time: number) {
  if (lenis) {
    lenis.raf(time * 1000)
  }
}

export function initLenis(): Lenis {
  if (lenis) return lenis

  lenis = new Lenis({
    lerp: 0.09,
    smoothWheel: true,
    touchMultiplier: 1.5,
    infinite: false,
  })

  // Sync Lenis to GSAP ticker so ScrollTrigger updates correctly
  gsap.ticker.add(updateLenis)
  gsap.ticker.lagSmoothing(0)

  // Force ScrollTrigger to update on Lenis scroll
  lenis.on('scroll', ScrollTrigger.update)

  return lenis
}

export function destroyLenis() {
  if (!lenis) return
  gsap.ticker.remove(updateLenis)
  lenis.destroy()
  lenis = null
}

export function getLenis() {
  return lenis
}
