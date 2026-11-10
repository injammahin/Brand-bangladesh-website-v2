import { useEffect, useRef } from 'react'

/**
 * Returns true if the user prefers reduced motion.
 * Subscribes to the media query change event.
 */
export function usePrefersReducedMotion(): boolean {
  const prefersRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersRef.current = mq.matches

    const handler = (e: MediaQueryListEvent) => {
      prefersRef.current = e.matches
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return prefersRef.current
}
