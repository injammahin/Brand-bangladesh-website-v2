import { pageMeta } from '@/lib/meta'
import { PublicationView } from '@/components/views/PublicationView'

type P = { params: { locale: string } }

export const generateMetadata = ({ params }: P) =>
  pageMeta(params.locale, 'publication',
    { en: 'Publication — the monthly magazine', bn: 'প্রকাশনা — মাসিক ম্যাগাজিন' },
    { en: 'Every monthly issue of Brand Bangladesh: online flipbook, PDF and print edition.', bn: 'ব্র্যান্ড বাংলাদেশের প্রতিটি মাসিক সংখ্যা: অনলাইন ফ্লিপবুক, পিডিএফ ও মুদ্রিত সংস্করণ।' })

export default function Page({ params }: P) {
  return <PublicationView locale={params.locale} />
}
