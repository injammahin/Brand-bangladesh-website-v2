'use client'
/**
 * PillarPanels — the six brand pillars as full-height photo panels.
 * Click (or keyboard) opens a panel: it widens, the photo eases in, and the story + key fact appear.
 * Mobile: stacked accordion.
 */
import { useState } from 'react'
import Link from 'next/link'
import { PILLARS } from '@/content/pillars'
import { t, num, ui } from '@/lib/i18n'

const S = {
  label: { en: 'The six pillars', bn: 'ছয় স্তম্ভ' },
  title: { en: 'Six ways the world meets Bangladesh', bn: 'ছয় পথে বিশ্বের সঙ্গে বাংলাদেশের দেখা' },
  hint: { en: 'Click a pillar to open it', bn: 'খুলতে একটি স্তম্ভে ক্লিক করুন' },
  explore: { en: 'Explore the pillar', bn: 'স্তম্ভটি ঘুরে দেখুন' },
}

export function PillarPanels({ locale = 'en' }: { locale?: string }) {
  const [active, setActive] = useState(0)
  const b = `/${locale}`

  return (
    <section className="relative bg-cream px-6 md:px-10 lg:px-16 py-24 md:py-28" aria-label={t(S.label, locale)}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10" data-slide="left">
        <div>
          <div className="flex items-center gap-4 mb-5">
            <span className="font-cormorant text-lg text-ink/40">03</span>
            <span className="h-px w-8 bg-gold" />
            <p className="micro-label">{t(S.label, locale)}</p>
          </div>
          <h2 className="font-cormorant text-ink leading-[1] tracking-tight text-[clamp(2.4rem,4.6vw,4.4rem)] max-w-3xl">{t(S.title, locale)}</h2>
        </div>
        <p className="micro-label text-ink/45 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gold animate-pulse" />{t(S.hint, locale)}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-2.5 md:h-[74vh] md:min-h-[520px]" role="tablist" aria-label={t(S.label, locale)}>
        {PILLARS.map((p, i) => {
          const on = i === active
          const fact = p.facts[0]
          return (
            <div
              key={p.slug}
              className={`relative overflow-hidden rounded-2xl transition-all duration-700 ease-expo-out ${on ? 'h-[460px] md:h-auto md:flex-[5.5]' : 'h-[76px] md:h-auto md:flex-[1]'}`}
            >
              <img
                src={p.image}
                alt=""
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-expo-out ${on ? 'scale-100' : 'scale-125'}`}
              />
              <div className="absolute inset-0 transition-opacity duration-700" style={{ background: `linear-gradient(to top, ${p.color}f2 0%, ${p.color}99 32%, ${p.color}1a 70%, transparent 100%)`, opacity: on ? 0.95 : 1 }} />
              {!on && <div className="absolute inset-0" style={{ backgroundColor: `${p.color}55` }} />}

              {/* Closed: the whole panel is the control */}
              {!on && (
                <button
                  role="tab"
                  aria-selected={false}
                  onClick={() => setActive(i)}
                  className="absolute inset-0 z-10 flex md:flex-col items-center md:items-start justify-between md:justify-end gap-4 p-5 md:p-6 text-left group"
                >
                  <span className="font-cormorant text-cream/90 text-xl md:order-2">{num(String(i + 1).padStart(2, '0'), locale)}</span>
                  <span className="font-cormorant text-cream text-2xl md:text-[1.7rem] whitespace-nowrap md:[writing-mode:vertical-rl] md:rotate-180 transition-transform duration-500 group-hover:-translate-y-1">
                    {t(p.name, locale)}
                  </span>
                </button>
              )}

              {/* Open */}
              <div className={`absolute inset-x-0 bottom-0 p-6 md:p-10 text-cream transition-all duration-700 ${on ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-6 pointer-events-none'}`} role="tabpanel" aria-hidden={!on}>
                <div className="max-w-xl">
                  <p className="micro-label text-cream/80 mb-3">{num(String(i + 1).padStart(2, '0'), locale)} / {num('06', locale)}</p>
                  <h3 className="font-cormorant text-[clamp(2.4rem,4vw,3.8rem)] leading-[1] mb-4">{t(p.name, locale)}</h3>
                  <p className="font-inter text-sm md:text-base text-cream/90 leading-relaxed mb-6">{t(p.hook, locale)}</p>
                  <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
                    <div>
                      <p className="font-cormorant text-[2.6rem] leading-none">{t(fact.value, locale)}</p>
                      <p className="font-inter text-xs text-cream/80 mt-1">{t(fact.label, locale)}</p>
                      <p className="font-inter text-[10px] text-cream/60 mt-0.5">{t(ui.source, locale)}: {fact.source}, {num(fact.year, locale)}</p>
                    </div>
                    <Link href={`${b}/pillars/${p.slug}`} tabIndex={on ? 0 : -1} className="inline-flex items-center gap-2 font-inter text-xs uppercase tracking-label px-5 py-2.5 rounded-full bg-cream text-ink hover:bg-ink hover:text-cream transition-colors">
                      {t(S.explore, locale)} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
