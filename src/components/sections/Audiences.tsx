'use client'
/**
 * Audiences — "Find your way in" (BRD §2: every persona reaches its CTA within two clicks).
 * Five photo cards: investors, buyers, travellers, diaspora, press.
 */
import Link from 'next/link'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { ParallaxImg } from '@/components/motion/ParallaxImg'
import { Stagger } from '@/components/motion/Stagger'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { t, type L } from '@/lib/i18n'

const S = {
  label: { en: 'Start here', bn: 'এখান থেকে শুরু' },
  title: { en: 'Find your way into Bangladesh', bn: 'আপনার পথে বাংলাদেশকে খুঁজুন' },
}

const ITEMS: { who: L; line: L; href: string; image: string; color: string }[] = [
  { who: { en: 'Investors', bn: 'বিনিয়োগকারী' }, line: { en: 'Incentives, economic zones, setup steps', bn: 'প্রণোদনা, অর্থনৈতিক অঞ্চল, ব্যবসা শুরুর ধাপ' }, href: 'pillars/investment', image: '/assets/Chittagong.jpg', color: '#EF1551' },
  { who: { en: 'Global buyers', bn: 'বৈশ্বিক ক্রেতা' }, line: { en: 'Garments, leather, pharma, jute, IT', bn: 'পোশাক, চামড়া, ওষুধ, পাট, আইটি' }, href: 'pillars/exports', image: '/assets/stories/febric.jpg', color: '#D9AA66' },
  { who: { en: 'Travellers', bn: 'পর্যটক' }, line: { en: 'Beaches, mangroves, hills, heritage', bn: 'সৈকত, ম্যানগ্রোভ, পাহাড়, ঐতিহ্য' }, href: 'pillars/tourism', image: '/assets/Tourism/saint-martin.png', color: '#479E90' },
  { who: { en: 'Diaspora', bn: 'প্রবাসী' }, line: { en: 'Share your story, get the magazine', bn: 'গল্প বলুন, ম্যাগাজিন সংগ্রহ করুন' }, href: 'community', image: '/assets/stories/diaspora.jpg', color: '#A5CD2F' },
  { who: { en: 'Press & researchers', bn: 'গণমাধ্যম ও গবেষক' }, line: { en: 'Verified data, reports, media kit', bn: 'যাচাইকৃত তথ্য, প্রতিবেদন, মিডিয়া কিট' }, href: 'publication/press', image: '/assets/Dhaka.jpg', color: '#016171' },
]

export function Audiences({ locale = 'en' }: { locale?: string }) {
  return (
    <section className="px-6 md:px-10 lg:px-16 py-20 md:py-24" style={{ backgroundColor: '#F5EFE5' }} aria-label={t(S.label, locale)}>
      <div data-slide="left" className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-gold" />
            <p className="micro-label">{t(S.label, locale)}</p>
          </div>
          <SplitHeading as="h2" className="font-cormorant text-ink leading-[1.05] tracking-tight text-[clamp(2rem,3.6vw,3.2rem)] max-w-2xl">
            {t(S.title, locale)}
          </SplitHeading>
        </div>
      </div>

      <Stagger drift={36} className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {ITEMS.map((it, i) => (
          <Link key={it.href} href={`/${locale}/${it.href}`} className={`group block ${i === 4 ? 'col-span-2 lg:col-span-1' : ''}`} data-cursor="view">
            <ImageReveal delay={i * 0.06} className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-[0_20px_40px_-26px_rgba(16,20,20,.55)]">
              <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110"><ParallaxImg src={it.image} amount={18} /></div>
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${it.color}e6 0%, ${it.color}55 35%, transparent 65%)` }} />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="block h-[3px] w-8 rounded-full bg-cream/90 mb-3 transition-all duration-500 group-hover:w-14" />
                <p className="font-cormorant text-2xl md:text-[1.7rem] text-cream leading-tight mb-1">{t(it.who, locale)}</p>
                <p className="font-inter text-xs text-cream/85 leading-snug">{t(it.line, locale)}</p>
              </div>
              <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream/90 flex items-center justify-center text-ink text-sm transition-transform duration-500 group-hover:rotate-[-45deg]" aria-hidden="true">→</span>
            </ImageReveal>
          </Link>
        ))}
      </Stagger>
    </section>
  )
}
