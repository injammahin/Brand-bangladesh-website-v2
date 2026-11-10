import { notFound } from 'next/navigation'
import { pageMeta } from '@/lib/meta'
import { ARTICLES, getArticle } from '@/content/articles'
import { ArticleView } from '@/components/views/ArticleView'

type P = { params: { locale: string; slug: string } }

export const dynamicParams = false
export const generateStaticParams = () => ARTICLES.map((a) => ({ slug: a.slug }))

export function generateMetadata({ params }: P) {
  const a = getArticle(params.slug)
  if (!a) return {}
  const m = pageMeta(params.locale, `articles/${a.slug}`, a.title, a.excerpt, a.image)
  return { ...m, openGraph: { ...m.openGraph, type: 'article', publishedTime: a.date } }
}

export default function Page({ params }: P) {
  const a = getArticle(params.slug)
  if (!a) notFound()
  const bn = params.locale === 'bn'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: bn ? a.title.bn : a.title.en,
    description: bn ? a.excerpt.bn : a.excerpt.en,
    image: [`https://brandbangladesh.gov.bd${a.image}`],
    datePublished: a.date,
    inLanguage: params.locale,
    author: { '@type': 'Organization', name: 'Brand Bangladesh' },
    publisher: { '@type': 'Organization', name: 'Brand Bangladesh', logo: { '@type': 'ImageObject', url: 'https://brandbangladesh.gov.bd/assets/brand/logo-full.png' } },
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ArticleView slug={a.slug} locale={params.locale} />
    </>
  )
}
