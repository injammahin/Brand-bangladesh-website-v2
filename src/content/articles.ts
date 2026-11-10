import type { L } from '@/lib/i18n'
import type { PillarSlug } from './pillars'

export interface Article {
  slug: string
  issue: number
  pillar: PillarSlug
  region: string
  image: string
  date: string
  readMin: number
  author: L
  title: L
  excerpt: L
  body: L[]
  quote?: L
}

export const ARTICLES: Article[] = [
  {
    slug: 'sundarbans-the-living-delta',
    issue: 24,
    pillar: 'tourism',
    region: 'khulna',
    image: '/photos/sund_2-1920.webp',
    date: '2026-11-01',
    readMin: 6,
    author: { en: 'Brand Bangladesh Editorial', bn: 'ব্র্যান্ড বাংলাদেশ সম্পাদকীয়' },
    title: { en: 'The Sundarbans: a forest that breathes with the tide', bn: 'সুন্দরবন: জোয়ারের সঙ্গে শ্বাস নেয় যে বন' },
    excerpt: {
      en: 'Twice a day the sea walks into the forest. We travelled with the honey collectors and forest guards who know its rhythm.',
      bn: 'দিনে দুবার সমুদ্র ঢুকে পড়ে বনের ভেতরে। আমরা ঘুরেছি সেই মৌয়াল আর বনরক্ষীদের সঙ্গে, যাঁরা এর ছন্দ চেনেন।',
    },
    quote: { en: '“The forest is our mother. She feeds us, and she shields us from the storm.”', bn: '“বন আমাদের মা। সে আমাদের খাওয়ায়, ঝড় থেকে আগলে রাখে।”' },
    body: [
      { en: 'The Sundarbans is the largest single block of tidal mangrove forest in the world. Its Bangladeshi part covers roughly six thousand square kilometres of islands, creeks and mudflats where the Ganges, Brahmaputra and Meghna finally meet the Bay of Bengal.', bn: 'সুন্দরবন পৃথিবীর বৃহত্তম একক জোয়ারভাটার ম্যানগ্রোভ বন। এর বাংলাদেশ অংশ প্রায় ছয় হাজার বর্গকিলোমিটার জুড়ে দ্বীপ, খাল ও কাদাচরে বিস্তৃত — যেখানে গঙ্গা, ব্রহ্মপুত্র ও মেঘনা অবশেষে বঙ্গোপসাগরে মেশে।' },
      { en: 'For the mouals — the honey collectors of Shyamnagar — the season begins in April. Teams of seven or eight spend two weeks deep in the forest, reading the flight of bees and the marks of tigers in equal measure.', bn: 'শ্যামনগরের মৌয়ালদের মৌসুম শুরু হয় এপ্রিলে। সাত-আটজনের দল দুই সপ্তাহ বনের গভীরে কাটায় — মৌমাছির ওড়া আর বাঘের পায়ের ছাপ সমান মনোযোগে পড়ে।' },
      { en: 'The forest is also a shield. When cyclones roll in from the Bay, the mangrove belt absorbs storm surge that would otherwise reach millions of homes inland. Protecting it is not only conservation; it is national security.', bn: 'বনটি একটি ঢালও বটে। উপসাগর থেকে ঘূর্ণিঝড় এলে ম্যানগ্রোভ বেষ্টনী জলোচ্ছ্বাস শুষে নেয়, যা না হলে ভেতরের লাখো ঘরে পৌঁছাত। একে রক্ষা করা কেবল সংরক্ষণ নয়; এটি জাতীয় নিরাপত্তাও।' },
      { en: 'Visitors can enter through licensed operators from Khulna and Mongla between November and March, when the weather is calm and the light over the rivers is unforgettable.', bn: 'নভেম্বর থেকে মার্চ পর্যন্ত, যখন আবহাওয়া শান্ত আর নদীর ওপর আলো অবিস্মরণীয়, তখন খুলনা ও মোংলা থেকে লাইসেন্সপ্রাপ্ত অপারেটরের মাধ্যমে পর্যটকেরা বনে প্রবেশ করতে পারেন।' },
    ],
  },
  {
    slug: 'the-fabric-of-the-world',
    issue: 23,
    pillar: 'exports',
    region: 'dhaka',
    image: '/photos/garment_0-1920.webp',
    date: '2026-10-01',
    readMin: 5,
    author: { en: 'Brand Bangladesh Editorial', bn: 'ব্র্যান্ড বাংলাদেশ সম্পাদকীয়' },
    title: { en: 'The fabric of the world', bn: 'বিশ্বের বুনন' },
    excerpt: {
      en: "Inside the green factories that made Bangladesh the world's second-largest apparel exporter — and the workers who run them.",
      bn: 'যে সবুজ কারখানাগুলো বাংলাদেশকে বিশ্বের দ্বিতীয় বৃহত্তম পোশাক রপ্তানিকারক বানিয়েছে, তার ভেতরের গল্প — আর সেখানে কাজ করা মানুষেরা।',
    },
    body: [
      { en: 'Four decades ago a handful of factories in Chattogram shipped their first consignments of shirts. Today the garment sector employs millions, most of them women, and accounts for the large majority of national export earnings.', bn: 'চার দশক আগে চট্টগ্রামের হাতে গোনা কয়েকটি কারখানা প্রথম শার্টের চালান পাঠিয়েছিল। আজ পোশাকশিল্পে লাখো মানুষ কাজ করেন, যাঁদের বেশিরভাগই নারী, আর জাতীয় রপ্তানি আয়ের সিংহভাগ আসে এই খাত থেকে।' },
      { en: 'The newest chapter is green. Bangladesh now has more LEED-certified garment factories than any other country, with rainwater harvesting, solar rooftops and water-recycling dye houses.', bn: 'নতুন অধ্যায়টি সবুজ। লিড-সনদপ্রাপ্ত পোশাক কারখানার সংখ্যায় বাংলাদেশ এখন বিশ্বে শীর্ষে — বৃষ্টির পানি সংরক্ষণ, ছাদে সৌরবিদ্যুৎ আর পানি পুনর্ব্যবহারকারী রং-কারখানা নিয়ে।' },
      { en: 'Buyers increasingly come for more than price: speed, traceability and technical fabrics are where the next growth lies.', bn: 'ক্রেতারা এখন কেবল দামের জন্য আসেন না: গতি, উৎস-শনাক্তযোগ্যতা ও কারিগরি কাপড়েই আগামীর প্রবৃদ্ধি।' },
    ],
  },
  {
    slug: 'a-global-diaspora',
    issue: 22,
    pillar: 'people',
    region: 'sylhet',
    image: '/photos/boishakh_2-1920.webp',
    date: '2026-09-01',
    readMin: 4,
    author: { en: 'Brand Bangladesh Editorial', bn: 'ব্র্যান্ড বাংলাদেশ সম্পাদকীয়' },
    title: { en: 'A nation that lives on every continent', bn: 'প্রতিটি মহাদেশে বাস করে যে জাতি' },
    excerpt: {
      en: 'From London’s Brick Lane to Silicon Valley, the Bangladeshi diaspora is redrawing what “home” means.',
      bn: 'লন্ডনের ব্রিক লেন থেকে সিলিকন ভ্যালি — বাংলাদেশি প্রবাসীরা নতুন করে আঁকছেন “ঘর”-এর মানে।',
    },
    body: [
      { en: 'More than ten million Bangladeshis live and work abroad. Their remittances are one of the country’s largest sources of foreign exchange, but their influence runs deeper than money.', bn: 'এক কোটিরও বেশি বাংলাদেশি বিদেশে বসবাস ও কাজ করেন। তাঁদের পাঠানো অর্থ দেশের বৈদেশিক মুদ্রার অন্যতম বড় উৎস, তবে তাঁদের প্রভাব অর্থের চেয়েও গভীরে।' },
      { en: 'Sylhet’s Londoni villages, Dhaka start-ups funded by returning engineers, and Bangladeshi restaurants on high streets worldwide are all part of one story: a confident, connected nation.', bn: 'সিলেটের লন্ডনী গ্রাম, দেশে ফেরা প্রকৌশলীদের অর্থায়নে ঢাকার স্টার্টআপ আর বিশ্বের শহরে শহরে বাংলাদেশি রেস্তোরাঁ — সবই একটি গল্পের অংশ: আত্মবিশ্বাসী, সংযুক্ত এক জাতি।' },
    ],
  },
  {
    slug: 'sixty-dome-mosque',
    issue: 21,
    pillar: 'culture',
    region: 'khulna',
    image: '/photos/bagerhat_1-1920.webp',
    date: '2026-08-01',
    readMin: 5,
    author: { en: 'Brand Bangladesh Editorial', bn: 'ব্র্যান্ড বাংলাদেশ সম্পাদকীয়' },
    title: { en: 'Bagerhat: the mosque city in the mangroves', bn: 'বাগেরহাট: ম্যানগ্রোভের কোলে মসজিদের শহর' },
    excerpt: {
      en: 'Six centuries ago Khan Jahan Ali built a city of brick at the edge of the Sundarbans. Its Sixty Dome Mosque still stands.',
      bn: 'ছয় শতাব্দী আগে খান জাহান আলী সুন্দরবনের প্রান্তে ইটের শহর গড়েছিলেন। তাঁর ষাট গম্বুজ মসজিদ আজও দাঁড়িয়ে।',
    },
    body: [
      { en: 'The Mosque City of Bagerhat was inscribed as a UNESCO World Heritage Site in 1985. Its centrepiece, the Shait Gumbad Mosque, is among the largest historic brick mosques in South Asia.', bn: 'বাগেরহাটের মসজিদের শহর ১৯৮৫ সালে ইউনেস্কো বিশ্ব ঐতিহ্যের তালিকাভুক্ত হয়। এর কেন্দ্রবিন্দু ষাট গম্বুজ মসজিদ দক্ষিণ এশিয়ার বৃহত্তম ঐতিহাসিক ইটের মসজিদগুলোর একটি।' },
      { en: 'Walk at dawn and you will share the grounds with worshippers, schoolchildren and fishermen — a monument that has never stopped being used.', bn: 'ভোরে হাঁটলে দেখবেন মুসল্লি, স্কুলশিক্ষার্থী আর জেলেরা একসঙ্গে প্রাঙ্গণে — এমন এক স্থাপনা, যার ব্যবহার কখনো থামেনি।' },
    ],
  },
  {
    slug: 'coxs-bazar-longest-beach',
    issue: 20,
    pillar: 'tourism',
    region: 'chattogram',
    image: '/photos/cox_1-1920.webp',
    date: '2026-07-01',
    readMin: 4,
    author: { en: 'Brand Bangladesh Editorial', bn: 'ব্র্যান্ড বাংলাদেশ সম্পাদকীয়' },
    title: { en: "Cox's Bazar: 120 kilometres of shoreline", bn: 'কক্সবাজার: ১২০ কিলোমিটারের তটরেখা' },
    excerpt: {
      en: 'The longest natural sandy beach in the world is becoming a year-round destination.',
      bn: 'পৃথিবীর দীর্ঘতম প্রাকৃতিক বালুকাময় সৈকত হয়ে উঠছে সারা বছরের গন্তব্য।',
    },
    body: [
      { en: "Stretching from Cox's Bazar town to Teknaf, the beach is backed by hills and fringed by fishing villages. A marine drive now runs along much of its length.", bn: 'কক্সবাজার শহর থেকে টেকনাফ পর্যন্ত বিস্তৃত এই সৈকতের পেছনে পাহাড়, পাশে জেলেপল্লি। এর বড় অংশজুড়ে এখন মেরিন ড্রাইভ।' },
      { en: "Beyond it lie Inani's rock pools and Saint Martin's, the country's only coral island.", bn: 'এর পরে ইনানীর পাথুরে সৈকত আর দেশের একমাত্র প্রবালদ্বীপ সেন্টমার্টিন।' },
    ],
  },
  {
    slug: 'rangamati-lake-country',
    issue: 19,
    pillar: 'culture',
    region: 'chattogram',
    image: '/photos/kaptai_0-1920.webp',
    date: '2026-06-01',
    readMin: 4,
    author: { en: 'Brand Bangladesh Editorial', bn: 'ব্র্যান্ড বাংলাদেশ সম্পাদকীয়' },
    title: { en: 'Rangamati: hills, lakes and many cultures', bn: 'রাঙামাটি: পাহাড়, হ্রদ ও বহু সংস্কৃতি' },
    excerpt: {
      en: 'In the Chittagong Hill Tracts, more than a dozen communities keep their own languages, weaving and festivals alive.',
      bn: 'পার্বত্য চট্টগ্রামে এক ডজনেরও বেশি জনগোষ্ঠী নিজেদের ভাষা, বুনন ও উৎসব বাঁচিয়ে রেখেছে।',
    },
    body: [
      { en: 'Kaptai Lake winds between green hills, connecting villages that are best reached by boat. Chakma, Marma, Tripura and other communities give the region its distinct textiles, food and music.', bn: 'সবুজ পাহাড়ের ফাঁকে এঁকেবেঁকে চলা কাপ্তাই হ্রদ এমন সব গ্রামকে জুড়েছে, যেখানে নৌকায় যাওয়াই সবচেয়ে সহজ। চাকমা, মারমা, ত্রিপুরাসহ বিভিন্ন জনগোষ্ঠী এ অঞ্চলকে দিয়েছে স্বতন্ত্র বস্ত্র, খাবার ও সংগীত।' },
    ],
  },
]

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug)
