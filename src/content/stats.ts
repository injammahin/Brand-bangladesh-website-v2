import type { L } from '@/lib/i18n'
import type { PillarSlug } from './pillars'

export interface Stat {
  id: string
  value: number
  decimals?: number
  prefix?: string
  suffix: L
  label: L
  context: L
  source: string
  year: string
  pillar: PillarSlug
  region?: string // division slug, or undefined for national
  story?: string // article slug
}

/**
 * NOTE for editors: every figure carries its source + reference year (BRD 5.6.2).
 * Verify against the latest official release before publishing.
 */
export const STATS: Stat[] = [
  {
    id: 'population', value: 169.8, decimals: 1, suffix: { en: 'M', bn: ' মিলিয়ন' },
    label: { en: 'People', bn: 'জনসংখ্যা' },
    context: { en: 'One of the most densely populated large countries — and one of the youngest.', bn: 'বড় দেশগুলোর মধ্যে অন্যতম ঘনবসতিপূর্ণ — এবং অন্যতম তরুণ।' },
    source: 'BBS Population & Housing Census', year: '2022', pillar: 'people', story: 'a-global-diaspora',
  },
  {
    id: 'literacy', value: 74.7, decimals: 1, suffix: { en: '%', bn: '%' },
    label: { en: 'Literacy rate (age 7+)', bn: 'সাক্ষরতার হার (৭+ বছর)' },
    context: { en: 'Up from under 50% at the turn of the century.', bn: 'শতাব্দীর শুরুতে যা ছিল ৫০ শতাংশের নিচে।' },
    source: 'BBS Population & Housing Census', year: '2022', pillar: 'people',
  },
  {
    id: 'remittance', value: 30.3, decimals: 1, prefix: '$', suffix: { en: 'B', bn: ' বিলিয়ন' },
    label: { en: 'Remittance inflow', bn: 'রেমিট্যান্স প্রবাহ' },
    context: { en: 'A record year for money sent home by Bangladeshis abroad.', bn: 'প্রবাসী বাংলাদেশিদের পাঠানো অর্থে রেকর্ড বছর।' },
    source: 'Bangladesh Bank', year: 'FY2024–25', pillar: 'people', story: 'a-global-diaspora',
  },
  {
    id: 'exports', value: 48.3, decimals: 1, prefix: '$', suffix: { en: 'B', bn: ' বিলিয়ন' },
    label: { en: 'Merchandise exports', bn: 'পণ্য রপ্তানি' },
    context: { en: 'Led by ready-made garments, followed by leather, jute and agro-products.', bn: 'নেতৃত্বে তৈরি পোশাক, এরপর চামড়া, পাট ও কৃষিপণ্য।' },
    source: 'Export Promotion Bureau', year: 'FY2024–25', pillar: 'exports', region: 'dhaka', story: 'the-fabric-of-the-world',
  },
  {
    id: 'green-factories', value: 230, suffix: { en: '+', bn: '+' },
    label: { en: 'LEED-certified green garment factories', bn: 'লিড-সনদপ্রাপ্ত সবুজ পোশাক কারখানা' },
    context: { en: 'More than any other country in the world.', bn: 'বিশ্বের যেকোনো দেশের চেয়ে বেশি।' },
    source: 'BGMEA / USGBC', year: '2024', pillar: 'exports', region: 'dhaka', story: 'the-fabric-of-the-world',
  },
  {
    id: 'sundarbans', value: 6017, suffix: { en: ' km²', bn: ' বর্গকিমি' },
    label: { en: 'Sundarbans mangrove in Bangladesh', bn: 'বাংলাদেশ অংশের সুন্দরবন' },
    context: { en: 'Part of the largest mangrove forest on earth, a UNESCO World Heritage Site.', bn: 'পৃথিবীর বৃহত্তম ম্যানগ্রোভ বনের অংশ, ইউনেস্কো বিশ্ব ঐতিহ্য।' },
    source: 'UNESCO World Heritage Centre', year: '1997', pillar: 'tourism', region: 'khulna', story: 'sundarbans-the-living-delta',
  },
  {
    id: 'beach', value: 120, suffix: { en: ' km', bn: ' কিমি' },
    label: { en: "Cox's Bazar sea beach", bn: 'কক্সবাজার সমুদ্রসৈকত' },
    context: { en: 'The longest natural unbroken sandy beach in the world.', bn: 'পৃথিবীর দীর্ঘতম প্রাকৃতিক অবিচ্ছিন্ন বালুকাময় সৈকত।' },
    source: 'Bangladesh Parjatan Corporation', year: '2024', pillar: 'tourism', region: 'chattogram', story: 'coxs-bazar-longest-beach',
  },
  {
    id: 'heritage', value: 3, suffix: { en: '', bn: '' },
    label: { en: 'UNESCO World Heritage Sites', bn: 'ইউনেস্কো বিশ্ব ঐতিহ্যস্থান' },
    context: { en: 'The Sundarbans, the Mosque City of Bagerhat and Paharpur Vihara.', bn: 'সুন্দরবন, বাগেরহাটের মসজিদের শহর ও পাহাড়পুর বিহার।' },
    source: 'UNESCO', year: '2024', pillar: 'culture', region: 'khulna', story: 'sixty-dome-mosque',
  },
  {
    id: 'udc', value: 8000, suffix: { en: '+', bn: '+' },
    label: { en: 'Union Digital Centres', bn: 'ইউনিয়ন ডিজিটাল সেন্টার' },
    context: { en: 'Public services delivered within walking distance of rural citizens.', bn: 'গ্রামের নাগরিকদের হাঁটাপথের দূরত্বে সরকারি সেবা।' },
    source: 'a2i Programme', year: '2024', pillar: 'governance',
  },
  {
    id: 'ez', value: 100, suffix: { en: '', bn: '' },
    label: { en: 'Economic zones planned', bn: 'পরিকল্পিত অর্থনৈতিক অঞ্চল' },
    context: { en: 'A nationwide network offering land, utilities and incentives to investors.', bn: 'বিনিয়োগকারীদের জন্য জমি, সেবা ও প্রণোদনাসহ দেশজুড়ে নেটওয়ার্ক।' },
    source: 'BEZA', year: '2024', pillar: 'investment', region: 'chattogram',
  },
  {
    id: 'districts', value: 64, suffix: { en: '', bn: '' },
    label: { en: 'Districts in 8 divisions', bn: '৮ বিভাগে জেলা' },
    context: { en: 'Every one with its own food, dialect and festivals.', bn: 'প্রত্যেকটির নিজস্ব খাবার, উপভাষা ও উৎসব।' },
    source: 'Bangladesh National Portal', year: '2024', pillar: 'culture',
  },
  {
    id: 'tea', value: 167, suffix: { en: '', bn: '' },
    label: { en: 'Tea estates', bn: 'চা-বাগান' },
    context: { en: 'Most of them in the rolling hills of greater Sylhet.', bn: 'যার বেশিরভাগ বৃহত্তর সিলেটের ঢেউখেলানো পাহাড়ে।' },
    source: 'Bangladesh Tea Board', year: '2024', pillar: 'exports', region: 'sylhet',
  },
]
