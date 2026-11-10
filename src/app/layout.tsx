import type { Metadata } from 'next'
import {
  Cormorant_Garamond,
  Inter,
  Hind_Siliguri,
  Noto_Serif_Bengali,
} from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600'],
  variable: '--font-hind-siliguri',
  display: 'swap',
})

const notoBengali = Noto_Serif_Bengali({
  subsets: ['bengali'],
  weight: ['300', '400', '500'],
  variable: '--font-noto-bengali',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Brand Bangladesh',
    template: '%s | Brand Bangladesh',
  },
  description: 'The official nation brand of Bangladesh — a land of heritage, nature, and aspiration.',
  metadataBase: new URL('https://brandbangladesh.gov.bd'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'bn_BD',
    siteName: 'Brand Bangladesh',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${hindSiliguri.variable} ${notoBengali.variable}`}
    >
      <body className="bg-cream text-ink antialiased">
        {children}
      </body>
    </html>
  )
}
