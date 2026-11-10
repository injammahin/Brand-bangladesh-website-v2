'use client'
/**
 * PageTransition — accent-coloured panel wipes in before route change, wipes out after.
 * Used via the TransitionLink component for internal navigation.
 */

import { useEffect, useRef, createContext, useContext, useState, ReactNode, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'

interface TransitionCtx {
  navigate: (href: string, accent?: string) => void
}

const TransitionContext = createContext<TransitionCtx>({ navigate: () => {} })

export function useTransition() {
  return useContext(TransitionContext)
}

interface PageTransitionProviderProps {
  children: ReactNode
  defaultAccent?: string
}

export function PageTransitionProvider({ children, defaultAccent = '#479E90' }: PageTransitionProviderProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [accent, setAccent] = useState(defaultAccent)

  const navigate = useCallback((href: string, nextAccent?: string) => {
    const overlay = overlayRef.current
    if (!overlay) { router.push(href); return }

    const color = nextAccent ?? defaultAccent
    setAccent(color)

    gsap.set(overlay, { yPercent: 100, display: 'block' })
    gsap.to(overlay, {
      yPercent: 0,
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete: () => {
        router.push(href)
        setTimeout(() => {
          gsap.to(overlay, {
            yPercent: -100,
            duration: 0.7,
            ease: 'power3.inOut',
            onComplete: () => gsap.set(overlay, { display: 'none', yPercent: 100 }),
          })
        }, 100)
      },
    })
  }, [router, defaultAccent])

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-transition pointer-events-none hidden"
        style={{ backgroundColor: accent }}
        aria-hidden="true"
      />
    </TransitionContext.Provider>
  )
}

/** Drop-in replacement for <Link> that uses the page transition */
interface TransitionLinkProps {
  href: string
  accent?: string
  children: ReactNode
  className?: string
}

export function TransitionLink({ href, accent, children, className }: TransitionLinkProps) {
  return (
    <Link href={href} className={className} data-accent={accent}>
      {children}
    </Link>
  )
}
