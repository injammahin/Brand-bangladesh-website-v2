import { pageMeta } from '@/lib/meta'
import { PHOTOS, commonsUrl } from '@/content/photos'

type P = { params: { locale: string } }

export const generateMetadata = ({ params }: P) =>
  pageMeta(params.locale, 'credits', { en: 'Photo credits', bn: 'ছবির কৃতজ্ঞতা' },
    { en: 'Photography credits and licences.', bn: 'আলোকচিত্রের কৃতজ্ঞতা ও লাইসেন্স।' })

export default function Credits({ params }: P) {
  const bn = params.locale === 'bn'
  const keys = Object.keys(PHOTOS).filter((k) => !PHOTOS[k][0].startsWith('v2-site'))
  return (
    <main id="main-content" className="bg-cream pt-[64px] px-6 md:px-16 pb-24">
      <h1 className="font-cormorant text-[clamp(2.4rem,4.6vw,4rem)] text-ink mt-14 mb-4">{bn ? 'ছবির কৃতজ্ঞতা' : 'Photo credits'}</h1>
      <p className="font-inter text-sm text-ink/60 max-w-2xl mb-10">
        {bn
          ? 'এই সাইটের আলোকচিত্রগুলো উইকিমিডিয়া কমন্সের মুক্ত লাইসেন্সের (মূলত CC BY-SA) ছবি। প্রতিটি ছবির আলোকচিত্রী ও লাইসেন্সের বিবরণ নিচের লিংকে।'
          : 'Photographs on this site come from Wikimedia Commons under free licences (mostly CC BY-SA). Follow each link for the photographer and licence.'}
      </p>
      <ul className="columns-1 sm:columns-2 lg:columns-3 gap-8 font-inter text-xs">
        {keys.map((k) => (
          <li key={k} className="break-inside-avoid py-1.5 border-b border-ink/5">
            <a href={commonsUrl(k)} target="_blank" rel="noopener noreferrer" className="text-ink/60 hover:text-ink">{decodeURIComponent(PHOTOS[k][0].split('/').pop() ?? k)}</a>
          </li>
        ))}
      </ul>
    </main>
  )
}
