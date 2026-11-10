'use client'
/**
 * Header — solid black bar with full logo, hides on scroll-down, returns on scroll-up.
 * Progress bar at bottom edge (accent colour, driven by scroll progress).
 * BRD 4.1: main menu + language switcher (stays on the same page) + search + share.
 */

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from '@/lib/gsap'
import { ui, t, switchLocalePath } from '@/lib/i18n'

interface HeaderProps {
  accent?: string
  locale?: string
}

export function Header({ accent = '#479E90', locale = 'en' }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const lastScrollY = useRef(0)
  const hidden = useRef(false)
  const pathname = usePathname() || `/${locale}`

  useEffect(() => {
    const header = headerRef.current
    const bar = progressRef.current
    if (!header || !bar) return

    const onScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollY / docHeight : 0
      gsap.set(bar, { scaleX: progress, transformOrigin: 'left center' })

      const delta = scrollY - lastScrollY.current
      if (delta > 8 && scrollY > 80 && !hidden.current) {
        hidden.current = true
        gsap.to(header, { yPercent: -100, duration: 0.4, ease: 'power2.inOut' })
      } else if (delta < -4 && hidden.current) {
        hidden.current = false
        gsap.to(header, { yPercent: 0, duration: 0.4, ease: 'power2.out' })
      }
      lastScrollY.current = scrollY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on navigation
  useEffect(() => { setMenuOpen(false) }, [pathname])

  const base = `/${locale}`
  const navItems = [
    { label: t(ui.nav.story, locale), href: `${base}/story` },
    { label: t(ui.nav.pillars, locale), href: `${base}/pillars` },
    { label: t(ui.nav.regions, locale), href: `${base}/regions` },
    { label: t(ui.nav.numbers, locale), href: `${base}/numbers` },
    { label: t(ui.nav.publication, locale), href: `${base}/publication` },
    { label: t(ui.nav.community, locale), href: `${base}/community` },
    { label: t(ui.nav.about, locale), href: `${base}/about` },
  ]
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) await navigator.share({ title: document.title, url })
      else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      }
    } catch { /* user cancelled */ }
  }

  return (
    <header
      ref={headerRef}
      className="fixed top-0 inset-x-0 z-header bg-ink text-cream"
      role="banner"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 bg-cream text-ink px-3 py-2 font-inter text-xs"
      >
        {t(ui.skipToContent, locale)}
      </a>

      <div className="flex items-center justify-between gap-4 px-6 md:px-10 py-3">
        {/* Full logo */}
        <Link
          href={base}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300 shrink-0"
          aria-label={`Brand Bangladesh — ${t(ui.home, locale)}`}
        >
          <img
            src="/assets/brand/logo-full-light.png"
            alt="Brand Bangladesh"
            width={908}
            height={284}
            className="h-10 md:h-11 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-6" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-inter text-[0.6875rem] uppercase tracking-label transition-colors duration-200 ${
                isActive(item.href) ? 'text-gold' : 'text-cream/60 hover:text-cream'
              } ${locale === 'bn' ? 'font-bengali normal-case tracking-normal text-sm' : ''}`}
              aria-current={isActive(item.href) ? 'page' : undefined}
              data-cursor="link"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Utilities */}
        <div className="flex items-center gap-3 md:gap-4">
          <Link
            href={`${base}/search`}
            className="p-1 text-cream/60 hover:text-cream transition-colors"
            aria-label={t(ui.search, locale)}
            data-cursor="link"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </Link>

          <button
            onClick={share}
            className="hidden sm:block p-1 text-cream/60 hover:text-cream transition-colors relative"
            aria-label={t(ui.share, locale)}
            data-cursor="link"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="12" cy="3.5" r="2" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="4" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="12" cy="12.5" r="2" stroke="currentColor" strokeWidth="1.2" />
              <path d="M5.8 7l4.4-2.5M5.8 9l4.4 2.5" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            {copied && (
              <span role="status" className="absolute top-full right-0 mt-2 whitespace-nowrap bg-cream text-ink font-inter text-[10px] px-2 py-1 rounded">
                {t(ui.copied, locale)}
              </span>
            )}
          </button>

          {/* Language toggle — keeps the visitor on the same page */}
          <div className="flex items-center gap-1 font-inter text-xs text-cream/50">
            <Link
              href={switchLocalePath(pathname, 'en')}
              lang="en"
              className={`px-1 transition-colors ${locale === 'en' ? 'text-cream font-medium' : 'hover:text-cream/80'}`}
              aria-label="Switch to English"
              aria-current={locale === 'en' ? 'true' : undefined}
            >
              EN
            </Link>
            <span aria-hidden="true" className="text-cream/20">|</span>
            <Link
              href={switchLocalePath(pathname, 'bn')}
              lang="bn"
              className={`px-1 font-bengali transition-colors ${locale === 'bn' ? 'text-cream font-medium' : 'hover:text-cream/80'}`}
              aria-label="বাংলায় দেখুন"
              aria-current={locale === 'bn' ? 'true' : undefined}
            >
              বাংলা
            </Link>
          </div>

          {/* Hamburger (below xl) */}
          <button
            className="xl:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={t(menuOpen ? ui.menuClose : ui.menuOpen, locale)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <span className={`block w-6 h-px bg-cream transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-6 h-px bg-cream transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-cream transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        className="absolute bottom-0 left-0 h-px w-full origin-left"
        style={{ backgroundColor: accent, transform: 'scaleX(0)' }}
        aria-hidden="true"
      />

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          className="xl:hidden bg-ink px-6 pb-6 border-t border-cream/10 max-h-[calc(100vh-64px)] overflow-y-auto"
          aria-label="Mobile navigation"
          data-lenis-prevent
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block py-3 font-inter text-sm uppercase tracking-label border-b border-cream/10 transition-colors ${
                isActive(item.href) ? 'text-gold' : 'text-cream/70 hover:text-cream'
              } ${locale === 'bn' ? 'font-bengali normal-case tracking-normal text-base' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
