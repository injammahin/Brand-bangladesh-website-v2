'use client'
/**
 * <Counter> — animates a number from 0 to the target value on scroll entry.
 * Displays with optional prefix/suffix.
 * Respects prefers-reduced-motion (shows final value immediately).
 */

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { num } from '@/lib/i18n'

interface CounterProps {
  to: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
  /** 'bn' renders Bangla numerals */
  locale?: string
}

export function Counter({
  to,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 2,
  className,
  locale = 'en',
}: CounterProps) {
  const fmt = (v: number) => `${prefix}${num(v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }), locale)}${suffix}`
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = fmt(to)
      return
    }

    const obj = { val: 0 }
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: to,
        duration,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
        onUpdate: () => {
          el.textContent = fmt(obj.val)
        },
      })
    })

    return () => ctx.revert()
  }, [to, prefix, suffix, decimals, duration, locale]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={ref} className={className} aria-label={fmt(to)}>
      {prefix}{num(0, locale)}{suffix}
    </span>
  )
}
