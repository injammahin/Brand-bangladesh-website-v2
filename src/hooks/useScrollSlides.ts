'use client'
import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

/**
 * Scroll-scrubbed side entrances for every [data-slide="left|right|up"] inside #main-content.
 * Elements fade + glide in as they enter the viewport and reverse when scrolling back up.
 * Optional data-slide-distance="200". Disabled for prefers-reduced-motion.
 */
export function useScrollSlides() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const root = document.getElementById('main-content') ?? document.body
    const wide = window.innerWidth >= 768
    const tweens = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('[data-slide]')).map((el) => {
      const dir = el.dataset.slide
      const d = Number(el.dataset.slideDistance) || (wide ? 160 : 48)
      const from = dir === 'left' ? { x: -d } : dir === 'right' ? { x: d } : { y: 70 }
      return gsap.fromTo(el, { ...from, opacity: 0 }, {
        x: 0, y: 0, opacity: 1, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 96%', end: 'top 58%', scrub: 1.1 },
      })
    })
    ScrollTrigger.refresh()
    return () => tweens.forEach((tw) => { tw.scrollTrigger?.kill(); tw.revert(); tw.kill() })
  }, [])
}
