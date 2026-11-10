'use client'
/**
 * Shared editorial building blocks for inner pages — premium magazine system built on the
 * approved theme: cream ground, Cormorant display, Inter text, brand colours, hairlines.
 *
 * Signature details used everywhere:
 *  - BrandStripe: the logo's colour bars as a thin divider
 *  - Section headers: index number + micro-label + stripe + measured title
 *  - Warm alternating section tone for rhythm
 *  - Framed images with an offset colour block
 */
import Link from 'next/link'
import { ReactNode } from 'react'
import { useMotionInit } from '@/hooks/useMotionInit'
import { useScrollSlides } from '@/hooks/useScrollSlides'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { Reveal } from '@/components/motion/Reveal'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { ParallaxImg } from '@/components/motion/ParallaxImg'
import { Parallax } from '@/components/motion/Parallax'
import { Stagger } from '@/components/motion/Stagger'
import { t, ui } from '@/lib/i18n'

export const BRAND_COLORS = ['#DF1A23', '#F68421', '#FECB02', '#016171', '#A5CD2F', '#EF1551', '#479E90', '#D9AA66']
export const WARM = '#F5EFE5'

/** Wrap each inner page: initialises Lenis/GSAP and provides <main> */
export function Page({ children }: { children: ReactNode }) {
  useMotionInit()
  useScrollSlides()
  return <main id="main-content" tabIndex={-1} className="bg-cream pt-[64px] outline-none overflow-x-clip">{children}</main>
}

/** The logo's colour bars as a slim decorative rule */
export function BrandStripe({ className = '', width = 'w-24' }: { className?: string; width?: string }) {
  return (
    <div className={`flex h-[3px] ${width} rounded-full overflow-hidden ${className}`} aria-hidden="true">
      {BRAND_COLORS.slice(0, 6).map((c) => <span key={c} className="flex-1" style={{ backgroundColor: c }} />)}
    </div>
  )
}

export function Crumbs({ locale, items }: { locale: string; items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 font-inter text-[11px] uppercase tracking-label text-ink/40">
        <li><Link href={`/${locale}`} className="hover:text-ink">{t(ui.home, locale)}</Link></li>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {it.href ? <Link href={it.href} className="hover:text-ink">{it.label}</Link> : <span aria-current="page" className="text-ink/70">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Faint outline of the logo mark — decorative watermark */
function MarkOutline({ className = '', color = '#101414' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 250.2 262.5" className={className} fill="none" stroke={color} strokeWidth="0.6" aria-hidden="true">
      <path d="M101.8,114.8 L101.5,117.5 L43.2,261.2 L41.0,262.5 L0.2,262.2 L0.0,260.0 L98.0,118.2 L100.5,115.0Z" />
      <path d="M123.8,75.8 L122.8,100.8 L110.8,250.8 L109.0,260.8 L106.5,262.5 L61.2,262.5 L59.0,260.2 L59.0,258.2 L80.2,193.2 L120.2,75.2Z" />
      <path d="M132.2,48.5 L133.8,50.0 L146.8,229.0 L148.5,261.0 L146.5,262.5 L126.2,262.5 L124.0,262.0 L123.2,260.0 L122.2,238.2 L128.2,101.8 L131.0,57.8Z" />
      <path d="M136.8,29.5 L138.5,30.5 L142.2,36.0 L146.0,50.2 L164.0,254.5 L163.2,260.5 L161.2,262.5 L153.2,262.5 L152.0,261.5 L148.5,233.2 L136.5,64.2 L135.5,31.0Z" />
      <path d="M159.2,112.2 L187.2,121.0 L195.8,124.5 L173.5,235.5 L171.5,226.2 L158.8,114.8Z" />
      <path d="M152.8,55.8 L154.0,56.2 L183.8,112.2 L184.2,114.5 L162.0,107.5 L158.0,105.2 L152.8,61.5Z" />
      <path d="M146.8,0.0 L148.5,0.5 L164.5,38.8 L194.5,114.5 L195.0,117.5 L194.2,118.2 L186.0,115.2 L152.0,53.5 L146.8,6.8Z" />
      <path d="M189.2,127.0 L196.5,127.0 L198.2,128.2 L250.2,257.0 L250.2,260.2 L248.5,262.5 L179.2,261.2 L177.5,259.2 L176.2,254.5 L175.5,234.0 L176.5,218.2 L187.8,128.2Z" />
    </svg>
  )
}

/**
 * Cover-style page hero. With an image: photo bleeds in from the right and fades into the
 * cream page (same blend as the division heroes). Without: decorative logo watermark.
 */
export function PageHero({
  label, title, intro, image, imageClass = '', accent = '#D9AA66', locale, crumbs, meta, aside, children,
}: {
  label: string; title: string; intro?: string; image?: string; imageClass?: string; accent?: string; locale: string
  crumbs?: { label: string; href?: string }[]; meta?: string[]; aside?: ReactNode; children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden" style={{ background: `radial-gradient(120% 90% at 0% 0%, ${WARM} 0%, #FBFAF7 60%)` }}>
      {image ? (
        <div className="absolute inset-y-0 right-0 w-full md:w-[58%]" aria-hidden="true">
          <ImageReveal className="relative w-full h-full overflow-hidden">
            <ParallaxImg src={image} amount={22} eager className={imageClass} />
          </ImageReveal>
          <div className="absolute inset-0 md:hidden bg-cream/85" />
          <div className="absolute inset-0 hidden md:block" style={{ background: 'linear-gradient(to right, #FBFAF7 0%, rgba(251,250,247,.85) 18%, rgba(251,250,247,0) 55%)' }} />
          <div className="absolute inset-x-0 bottom-0 h-24" style={{ background: 'linear-gradient(to top, #FBFAF7, transparent)' }} />
        </div>
      ) : (
        <MarkOutline className="absolute -right-10 -bottom-16 w-[340px] md:w-[460px] opacity-[0.07]" color={accent} />
      )}

      <div className="relative px-6 md:px-10 lg:px-16 pt-10 md:pt-14 pb-14 md:pb-20 min-h-[440px] md:min-h-[520px] flex flex-col justify-end">
        {crumbs && <Crumbs locale={locale} items={crumbs} />}
        {aside && <div className="hidden lg:block absolute right-10 xl:right-16 bottom-12 z-10">{aside}</div>}
        <Parallax speed={0.5} className={`max-w-2xl ${image ? 'md:max-w-[44%]' : ''}`}>
          <div className="flex items-center gap-4 mb-5">
            <BrandStripe width="w-16" />
            <p className="micro-label" style={{ color: accent }}>{label}</p>
          </div>
          <SplitHeading as="h1" className="font-cormorant text-ink leading-[1.02] tracking-tight mb-5 text-[clamp(2.4rem,4.8vw,4.4rem)]">
            {title}
          </SplitHeading>
          {intro && (
            <Reveal delay={0.15}>
              <p className="font-inter text-base md:text-[1.0625rem] text-ink/65 leading-relaxed max-w-xl">{intro}</p>
            </Reveal>
          )}
          {meta && meta.length > 0 && (
            <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-6">
              {meta.map((m, i) => (
                <li key={m} className="flex items-center gap-2 micro-label text-ink/50">
                  <span className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: BRAND_COLORS[i % BRAND_COLORS.length] }} />{m}
                </li>
              ))}
            </ul>
          )}
          {children}
        </Parallax>
      </div>
    </section>
  )
}

/** Section with a numbered editorial header; tone="warm" alternates the ground colour */
export function Section({ id, label, title, intro, index, children, className = '', accent, tone = 'plain', action }: {
  id?: string; label?: string; title?: string; intro?: string; index?: number; children: ReactNode
  className?: string; accent?: string; tone?: 'plain' | 'warm'; action?: ReactNode
}) {
  return (
    <section id={id} className={`relative px-6 md:px-10 lg:px-16 py-14 md:py-20 scroll-mt-20 ${className}`} style={tone === 'warm' ? { backgroundColor: WARM } : undefined}>
      {(label || title) && (
        <header data-slide="left" className="mb-10 md:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              {typeof index === 'number' && (
                <span className="font-cormorant text-lg text-ink/35 tabular-nums">{String(index).padStart(2, '0')}</span>
              )}
              <span className="h-px w-8" style={{ backgroundColor: accent ?? '#D9AA66' }} />
              {label && <p className="micro-label" style={accent ? { color: accent } : undefined}>{label}</p>}
            </div>
            {title && (
              <SplitHeading as="h2" className="font-cormorant text-ink leading-[1.05] tracking-tight text-[clamp(1.9rem,3.4vw,3rem)]">
                {title}
              </SplitHeading>
            )}
            {intro && <p className="font-inter text-sm md:text-base text-ink/55 leading-relaxed mt-4 max-w-xl">{intro}</p>}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  )
}

export function PillLink({ href, children, dark = false, external = false }: { href: string; children: ReactNode; dark?: boolean; external?: boolean }) {
  const cls = `group/pill inline-flex items-center gap-2 font-inter text-xs uppercase tracking-label px-5 py-2.5 rounded-full transition-all duration-300 ${
    dark ? 'bg-ink text-cream hover:bg-teal shadow-[0_8px_24px_-12px_rgba(16,20,20,.6)]' : 'border border-ink/20 text-ink/70 hover:bg-ink hover:text-cream hover:border-ink'
  }`
  const arrow = (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover/pill:translate-x-0.5">
      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
  if (external) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls} data-cursor="link">{children}{arrow}</a>
  return <Link href={href} className={cls} data-cursor="link">{children}{arrow}</Link>
}

/** Filter chips used by archive, stats, story wall and reports */
export function Chips<T extends string>({ options, value, onChange, label }: {
  options: { value: T; label: string }[]; value: T; onChange: (v: T) => void; label: string
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={`font-inter text-xs px-3.5 py-1.5 rounded-full border transition-all duration-200 ${
            value === o.value ? 'bg-ink text-cream border-ink shadow-sm' : 'bg-cream border-ink/15 text-ink/60 hover:border-ink/40 hover:text-ink'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

/** Editorial story card — framed image, accent rule, label, title, excerpt */
export function StoryCard({ href, image, label, title, excerpt, accent, meta, delay = 0 }: {
  href: string; image: string; label: string; title: string; excerpt?: string; accent: string; meta?: string; delay?: number
}) {
  return (
    <article className="group h-full">
      <Link href={href} className="flex flex-col h-full rounded-xl bg-cream border border-ink/[0.06] p-3 pb-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(16,20,20,.35)]" data-cursor="view">
        <ImageReveal delay={delay} className="relative w-full aspect-[4/3] mb-5 rounded-lg overflow-hidden bg-ink/5">
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"><ParallaxImg src={image} amount={14} /></div>
          <span className="absolute top-3 left-3 micro-label bg-cream/90 backdrop-blur px-2.5 py-1 rounded-full" style={{ color: accent }}>{label}</span>
        </ImageReveal>
        <div className="px-3 flex flex-col flex-1">
          <h3 className="font-cormorant text-[1.65rem] text-ink leading-heading mb-3 group-hover:text-teal transition-colors">{title}</h3>
          {excerpt && <p className="font-inter text-sm text-ink/55 leading-relaxed line-clamp-3">{excerpt}</p>}
          <div className="mt-auto pt-5 flex items-center justify-between">
            <span className="h-px w-8" style={{ backgroundColor: accent }} />
            {meta ? <span className="micro-label text-ink/35">{meta}</span> : <span className="micro-label text-ink/40 group-hover:text-ink transition-colors">→</span>}
          </div>
        </div>
      </Link>
    </article>
  )
}

/** Image framed with an offset colour block and corner bracket */
export function FramedImage({ src, color, className = '', aspect = 'aspect-[4/5]', flip = false, caption }: {
  src: string; color: string; className?: string; aspect?: string; flip?: boolean; caption?: string
}) {
  return (
    <figure className={`relative ${className}`}>
      <div className={`absolute inset-0 rounded-xl translate-y-3 ${flip ? '-translate-x-3' : 'translate-x-3'}`} style={{ backgroundColor: `${color}2e` }} aria-hidden="true" />
      <div className={`absolute -top-2.5 w-12 h-12 border-t ${flip ? 'border-r -right-2.5' : 'border-l -left-2.5'}`} style={{ borderColor: color }} aria-hidden="true" />
      <ImageReveal className={`relative w-full ${aspect} rounded-xl overflow-hidden bg-ink/5 shadow-[0_20px_40px_-24px_rgba(16,20,20,.45)]`}>
        <ParallaxImg src={src} amount={18} />
      </ImageReveal>
      {caption && (
        <figcaption className={`absolute -bottom-3.5 ${flip ? 'right-5' : 'left-5'} bg-cream border border-ink/10 rounded-full px-3.5 py-1 shadow-sm`}>
          <span className="micro-label" style={{ color }}>{caption}</span>
        </figcaption>
      )}
    </figure>
  )
}

/** Slow editorial marquee band — italic serif words between brand-colour diamonds */
export function Marquee({ words, className = '' }: { words: string[]; className?: string }) {
  const row = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {words.map((w, i) => (
        <span key={i} className="flex items-center gap-10">
          <span className="font-cormorant italic text-[clamp(1.8rem,3.6vw,3.2rem)] text-ink/80 whitespace-nowrap">{w}</span>
          <span className="w-2.5 h-2.5 rotate-45 shrink-0" style={{ backgroundColor: BRAND_COLORS[i % BRAND_COLORS.length] }} />
        </span>
      ))}
    </div>
  )
  return (
    <div className={`relative overflow-hidden py-8 border-y border-ink/[0.07] ${className}`} aria-hidden="true">
      <div className="flex w-max animate-[bb-marquee_40s_linear_infinite] motion-reduce:animate-none">{row}{row}</div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-cream to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-cream to-transparent" />
    </div>
  )
}

/** "Up next" — keeps readers moving through the magazine */
export function UpNext({ locale, items }: { locale: string; items: { href: string; label: string; title: string; image: string; color: string }[] }) {
  return (
    <section className="px-6 md:px-10 lg:px-16 py-14 md:py-16" style={{ backgroundColor: WARM }} aria-label={t({ en: 'Continue reading', bn: 'পড়তে থাকুন' }, locale)}>
      <div className="flex items-center gap-4 mb-8">
        <BrandStripe width="w-12" />
        <p className="micro-label">{t({ en: 'Continue reading', bn: 'পড়তে থাকুন' }, locale)}</p>
      </div>
      <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it) => (
          <Link key={it.href} href={it.href} className="group relative flex items-center gap-5 rounded-xl bg-cream p-3 pr-6 border border-ink/[0.06] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(16,20,20,.35)]" data-cursor="view">
            <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden">
              <img src={it.image} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="min-w-0">
              <p className="micro-label mb-1" style={{ color: it.color }}>{it.label}</p>
              <p className="font-cormorant text-2xl text-ink leading-tight group-hover:text-teal transition-colors">{it.title}</p>
            </div>
            <span className="ml-auto text-ink/30 group-hover:text-ink group-hover:translate-x-1 transition-all" aria-hidden="true">→</span>
          </Link>
        ))}
      </Stagger>
    </section>
  )
}

/** Light CTA band — warm gradient card with logo watermark */
export function CtaBand({ label, title, body, children }: { label: string; title: string; body?: string; children: ReactNode }) {
  return (
    <section className="px-6 md:px-10 lg:px-16 py-14">
      <div
        className="relative overflow-hidden rounded-2xl border border-gold/25 px-6 md:px-12 py-12 md:py-14 grid md:grid-cols-[1.4fr_1fr] gap-8 items-end"
        style={{ background: 'linear-gradient(135deg, #F6EBDA 0%, #FBFAF7 55%, #E6F1EE 100%)' }}
      >
        <MarkOutline className="absolute -right-6 -top-10 w-56 opacity-[0.08]" color="#479E90" />
        <div className="relative" data-slide="left">
          <BrandStripe width="w-14" className="mb-5" />
          <p className="micro-label mb-3">{label}</p>
          <h2 className="font-cormorant text-[clamp(1.9rem,3.2vw,2.8rem)] text-ink leading-[1.08] tracking-tight mb-3">{title}</h2>
          {body && <p className="font-inter text-sm text-ink/60 leading-relaxed max-w-xl">{body}</p>}
        </div>
        <div className="relative flex flex-wrap gap-3 md:justify-end" data-slide="right">{children}</div>
      </div>
    </section>
  )
}
