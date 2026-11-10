'use client'
/**
 * Preloader — white overlay with Brand Bangladesh logo bars animating in
 * one by one (stagger by data-order), 0→100 counter, then curtain wipes up.
 */

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { ease } from '@/lib/tokens'
import { getLenis } from '@/lib/lenis'

interface PreloaderProps {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const counter = counterRef.current
    const svg = svgRef.current
    if (!overlay || !counter || !svg) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      gsap.to(overlay, {
        opacity: 0, duration: 0.5, delay: 0.3,
        onComplete: () => { 
          overlay.style.display = 'none'
          onComplete() 
          ScrollTrigger.refresh()
        },
      })
      return
    }

    // Lock scroll during preloader
    document.body.style.overflow = 'hidden'
    getLenis()?.stop()

    // Group bars by data-order and sort
    const bars = Array.from(svg.querySelectorAll<SVGPathElement>('[data-order]'))
    const groups: SVGPathElement[][] = []
    bars.forEach((bar) => {
      const order = parseInt(bar.dataset.order || '0', 10)
      if (!groups[order]) groups[order] = []
      groups[order].push(bar)
    })

    const tl = gsap.timeline()

    // Hide all bars initially (translate down)
    groups.forEach((group) => {
      gsap.set(group, { yPercent: 110, opacity: 0 })
    })

    // Animate counter 0 → 100
    const obj = { val: 0 }
    tl.to(obj, {
      val: 100,
      duration: 1.8,
      ease: 'power1.inOut',
      onUpdate: () => { counter.textContent = Math.round(obj.val).toString() },
    }, 0)

    // Bars animate in by order group
    groups.forEach((group, i) => {
      tl.to(group, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: ease.out,
        stagger: 0.03,
      }, i * 0.1)
    })

    // Curtain wipe up
    tl.to(overlay, {
      yPercent: -100,
      duration: 0.9,
      ease: ease.out,
      onComplete: () => {
        overlay.style.display = 'none'
        document.body.style.overflow = ''
        getLenis()?.start()
        setTimeout(() => {
          ScrollTrigger.refresh()
        }, 100)
        onComplete()
      },
    }, '+=0.2')
  }, [onComplete])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-preloader bg-cream flex flex-col items-center justify-center"
      aria-label="Loading Brand Bangladesh"
      role="status"
    >
      {/* Logo mark */}
      <div className="w-24 h-24 overflow-hidden">
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 250.2 262.5"
          className="w-full h-full"
          aria-hidden="true"
        >
          <path id="bar-red-0" data-order="0" fill="#DF1A23" d="M101.8,114.8 L101.5,117.5 L43.2,261.2 L41.0,262.5 L0.2,262.2 L0.0,260.0 L98.0,118.2 L100.5,115.0Z"/>
          <path id="bar-orange-0" data-order="1" fill="#F68421" d="M123.8,75.8 L122.8,100.8 L110.8,250.8 L109.0,260.8 L106.5,262.5 L61.2,262.5 L59.0,260.2 L59.0,258.2 L80.2,193.2 L120.2,75.2Z"/>
          <path id="bar-yellow-0" data-order="2" fill="#FECB02" d="M132.2,48.5 L133.8,50.0 L146.8,229.0 L148.5,261.0 L146.5,262.5 L126.2,262.5 L124.0,262.0 L123.2,260.0 L122.2,238.2 L128.2,101.8 L131.0,57.8Z"/>
          <path id="bar-teal-0" data-order="3" fill="#016171" d="M136.8,29.5 L138.5,30.5 L142.2,36.0 L146.0,50.2 L164.0,254.5 L163.2,260.5 L161.2,262.5 L153.2,262.5 L152.0,261.5 L148.5,233.2 L136.5,64.2 L135.5,31.0Z"/>
          <path id="bar-black-0" data-order="4" fill="#010101" d="M159.2,112.2 L187.2,121.0 L195.8,124.5 L173.5,235.5 L171.5,226.2 L158.8,114.8Z"/>
          <path id="bar-black-1" data-order="4" fill="#010101" d="M152.8,55.8 L154.0,56.2 L183.8,112.2 L184.2,114.5 L162.0,107.5 L158.0,105.2 L152.8,61.5Z"/>
          <path id="bar-lime-0" data-order="5" fill="#A5CD2F" d="M146.8,0.0 L148.5,0.5 L164.5,38.8 L194.5,114.5 L195.0,117.5 L194.2,118.2 L186.0,115.2 L152.0,53.5 L146.8,6.8Z"/>
          <path id="bar-pink-0" data-order="6" fill="#EF1551" d="M189.2,127.0 L196.5,127.0 L198.2,128.2 L250.2,257.0 L250.2,260.2 L248.5,262.5 L179.2,261.2 L177.5,259.2 L176.2,254.5 L175.5,234.0 L176.5,218.2 L187.8,128.2Z"/>
        </svg>
      </div>

      {/* Counter */}
      <div className="mt-8 font-inter text-ink/40 text-sm tracking-widest">
        <span ref={counterRef} aria-live="polite">0</span>
        <span>%</span>
      </div>

      {/* Brand name */}
      <p className="mt-3 font-cormorant text-ink/20 text-sm tracking-label uppercase">
        Brand Bangladesh
      </p>
    </div>
  )
}
