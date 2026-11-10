import { pageMeta } from '@/lib/meta'
import { CommunityView } from '@/components/views/CommunityView'

type P = { params: { locale: string } }

export const generateMetadata = ({ params }: P) =>
  pageMeta(params.locale, 'community',
    { en: 'Community — Share Your Story', bn: 'কমিউনিটি — আপনার গল্প বলুন' },
    { en: 'Share your Bangladesh story, read the Story Wall, join campaigns and become an ambassador.', bn: 'আপনার বাংলাদেশের গল্প বলুন, স্টোরি ওয়াল পড়ুন, ক্যাম্পেইনে যোগ দিন ও অ্যাম্বাসেডর হোন।' })

export default function Page({ params }: P) {
  return <CommunityView locale={params.locale} />
}
