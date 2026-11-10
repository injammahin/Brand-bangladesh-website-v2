'use client'
/**
 * Manifesto section — large statement with word-by-word opacity scrub.
 * Key words rendered in gold italic. Pinned scroll during reveal.
 */

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

const MANIFESTO_P1 = [
  'Bangladesh', 'is', 'not', 'just', 'a', 'country.',
  'It', 'is', 'a', 'civilisation', 'of', 'rivers,', 'of', 'resilience,', 'of', 'over', '170', 'million', 'dreams.'
]

const MANIFESTO_P2 = [
  'A', 'nation', 'that', 'weaves', 'the', "world's", 'garments,', 'that', 'feeds', 'its', 'neighbours,', 'that', 'shelters', 'the', "world's", 'largest', 'mangrove', 'forest.',
  'This', 'is', 'Brand', 'Bangladesh.'
]

const BN_P1 = 'বাংলাদেশ কেবল একটি দেশ নয়। এটি নদীর, অদম্য সহনশীলতার, সতেরো কোটিরও বেশি স্বপ্নের এক সভ্যতা।'.split(' ')
const BN_P2 = 'যে জাতি বিশ্বের পোশাক বোনে, প্রতিবেশীর মুখে অন্ন তোলে, আগলে রাখে পৃথিবীর বৃহত্তম ম্যানগ্রোভ বন। এই হলো ব্র্যান্ড বাংলাদেশ।'.split(' ')

export function Manifesto({ locale = 'en' }: { locale?: string }) {
  const P1 = locale === 'bn' ? BN_P1 : MANIFESTO_P1
  const P2 = locale === 'bn' ? BN_P2 : MANIFESTO_P2
  const sectionRef = useRef<HTMLElement>(null)
  const wordsRef1 = useRef<(HTMLSpanElement | null)[]>([])
  const wordsRef2 = useRef<(HTMLSpanElement | null)[]>([])
  const logoRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const words1 = wordsRef1.current.filter(Boolean) as HTMLSpanElement[]
    const words2 = wordsRef2.current.filter(Boolean) as HTMLSpanElement[]
    const allWords = [...words1, ...words2]
    
    if (!section || allWords.length === 0) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(allWords, { opacity: 1 })
      return
    }

    gsap.set(allWords, { opacity: 0.15 })
    
    if (logoRef.current) {
      gsap.set(logoRef.current, { opacity: 1, x: 40 })
      // Prepare SVG lines for drawing using normalized pathLength="1"
      const paths = logoRef.current.querySelectorAll('path')
      paths.forEach((p) => {
        gsap.set(p, { strokeDasharray: 1, strokeDashoffset: 1 })
      })
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          scrub: 1.5, // Increase scrub smoothness
          pin: true,
        },
      })

      allWords.forEach((word, i) => {
        tl.to(word, {
          opacity: 1,
          duration: 0.1,
          ease: 'none',
        }, (i / allWords.length) * 0.8) // Scrub words over first 80%
      })

      if (logoRef.current) {
        // Slide logo in
        tl.to(logoRef.current, {
          x: 0,
          duration: 0.4,
          ease: 'power2.out',
        }, 0)

        // Draw SVG strokes
        const paths = logoRef.current.querySelectorAll('path')
        paths.forEach((p, i) => {
          tl.to(p, {
            strokeDashoffset: 0,
            duration: 0.8,
            ease: 'power1.inOut',
          }, 0.1 + (i * 0.05))
        })
      }
    })

    return () => ctx.revert()
  }, [locale])

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative h-screen bg-cream overflow-hidden"
      aria-label="Nation brand manifesto"
    >
      <div className="flex items-center justify-center h-full w-full px-6 md:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl gap-12 lg:gap-20">
          
          {/* Text block (Left) */}
          <div className="flex-1 w-full max-w-2xl flex flex-col gap-8">
            <p
              className="font-cormorant text-3xl md:text-4xl lg:text-5xl leading-[1.15] text-teal"
              aria-label={P1.join(' ')}
            >
              {P1.map((word, i) => (
                <span key={i}>
                  <span
                    ref={(el) => { wordsRef1.current[i] = el }}
                    aria-hidden="true"
                  >
                    {word}
                  </span>
                  {' '}
                </span>
              ))}
            </p>
            <p
              className="font-inter text-base md:text-lg lg:text-xl leading-relaxed text-teal/80 max-w-lg"
              aria-label={P2.join(' ')}
            >
              {P2.map((word, i) => (
                <span key={i}>
                  <span
                    ref={(el) => { wordsRef2.current[i] = el }}
                    aria-hidden="true"
                  >
                    {word}
                  </span>
                  {' '}
                </span>
              ))}
            </p>
          </div>

          {/* Wireframe Logo (Right) */}
          <div className="flex-1 w-full flex justify-end">
            <svg
              ref={logoRef}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 250.2 262.5"
              className="w-full max-w-sm lg:max-w-md text-teal"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            >
              <path pathLength="1" d="M101.8,114.8 L101.5,117.5 L43.2,261.2 L41.0,262.5 L0.2,262.2 L0.0,260.0 L98.0,118.2 L100.5,115.0Z"/>
              <path pathLength="1" d="M123.8,75.8 L122.8,100.8 L110.8,250.8 L109.0,260.8 L106.5,262.5 L61.2,262.5 L59.0,260.2 L59.0,258.2 L80.2,193.2 L120.2,75.2Z"/>
              <path pathLength="1" d="M132.2,48.5 L133.8,50.0 L146.8,229.0 L148.5,261.0 L146.5,262.5 L126.2,262.5 L124.0,262.0 L123.2,260.0 L122.2,238.2 L128.2,101.8 L131.0,57.8Z"/>
              <path pathLength="1" d="M136.8,29.5 L138.5,30.5 L142.2,36.0 L146.0,50.2 L164.0,254.5 L163.2,260.5 L161.2,262.5 L153.2,262.5 L152.0,261.5 L148.5,233.2 L136.5,64.2 L135.5,31.0Z"/>
              <path pathLength="1" d="M159.2,112.2 L187.2,121.0 L195.8,124.5 L173.5,235.5 L171.5,226.2 L158.8,114.8Z"/>
              <path pathLength="1" d="M152.8,55.8 L154.0,56.2 L183.8,112.2 L184.2,114.5 L162.0,107.5 L158.0,105.2 L152.8,61.5Z"/>
              <path pathLength="1" d="M146.8,0.0 L148.5,0.5 L164.5,38.8 L194.5,114.5 L195.0,117.5 L194.2,118.2 L186.0,115.2 L152.0,53.5 L146.8,6.8Z"/>
              <path pathLength="1" d="M189.2,127.0 L196.5,127.0 L198.2,128.2 L250.2,257.0 L250.2,260.2 L248.5,262.5 L179.2,261.2 L177.5,259.2 L176.2,254.5 L175.5,234.0 L176.5,218.2 L187.8,128.2Z"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
