import { useEffect, useRef } from 'react'
import { initLenis, destroyLenis } from '@/lib/lenis'
import { registerGSAP } from '@/lib/gsap'

/**
 * Initialises GSAP plugins and Lenis once at app mount.
 * Cleans up Lenis on unmount.
 */
export function useMotionInit() {
  const initialised = useRef(false)

  useEffect(() => {
    if (initialised.current) return
    initialised.current = true
    registerGSAP()
    initLenis()
    return () => {
      destroyLenis()
    }
  }, [])
}
