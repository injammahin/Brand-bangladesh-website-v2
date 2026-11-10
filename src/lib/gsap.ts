'use client'
/**
 * GSAP singleton registration — safe for SSR.
 * Import { gsap } from '@/lib/gsap' everywhere instead of directly from 'gsap'.
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'

let registered = false

export function registerGSAP() {
  if (typeof window === 'undefined' || registered) return
  registered = true
  gsap.registerPlugin(ScrollTrigger, Flip)
}

// Auto-register immediately on the client before any React components render
if (typeof window !== 'undefined') {
  registerGSAP()
}

export { gsap, ScrollTrigger, Flip }
