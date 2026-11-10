import type { L } from '@/lib/i18n'

export const CHAPTERS: { id: string; image: string; kicker: L; title: L; body: L; quote?: L; fact?: { value: L; label: L } }[] = [
  {
    id: 'delta', image: '/photos/padma_1-1920.webp',
    fact: { value: { en: '#1', bn: '১ নম্বর' }, label: { en: 'Largest river delta on earth', bn: 'পৃথিবীর বৃহত্তম নদী ব-দ্বীপ' } },
    kicker: { en: 'Chapter one', bn: 'প্রথম অধ্যায়' },
    title: { en: 'The Land and the Delta', bn: 'মাটি ও ব-দ্বীপ' },
    body: {
      en: 'Three of Asia’s great rivers — the Ganges, the Brahmaputra and the Meghna — meet here to form the largest delta on earth. Every year they lay down new land, and every year the people of Bangladesh learn to live with water rather than against it.',
      bn: 'এশিয়ার তিন মহানদী — গঙ্গা, ব্রহ্মপুত্র ও মেঘনা — এখানে মিলে গড়েছে পৃথিবীর বৃহত্তম ব-দ্বীপ। প্রতি বছর তারা নতুন মাটি জমায়, আর প্রতি বছর বাংলাদেশের মানুষ পানির বিরুদ্ধে নয়, পানির সঙ্গে বাঁচতে শেখে।',
    },
  },
  {
    id: 'history', image: '/photos/shaheed_1-1920.webp',
    fact: { value: { en: '1971', bn: '১৯৭১' }, label: { en: 'Year of independence', bn: 'স্বাধীনতার বছর' } },
    kicker: { en: 'Chapter two', bn: 'দ্বিতীয় অধ্যায়' },
    title: { en: 'History and the Liberation War', bn: 'ইতিহাস ও মুক্তিযুদ্ধ' },
    body: {
      en: 'From the ancient cities of Pundranagar and Wari-Bateshwar to the Bengal Sultanate and Mughal Dhaka, this land has long been a crossroads of trade and ideas. In 1952 its people stood up for their language; in 1971 they won their independence through a War of Liberation.',
      bn: 'প্রাচীন পুণ্ড্রনগর ও উয়ারী-বটেশ্বর থেকে বাংলার সালতানাত ও মোগল ঢাকা — এই ভূমি বহুকাল ধরে বাণিজ্য ও ভাবনার মিলনস্থল। ১৯৫২ সালে এর মানুষ ভাষার জন্য রুখে দাঁড়িয়েছিল; ১৯৭১ সালে মুক্তিযুদ্ধের মধ্য দিয়ে অর্জন করেছিল স্বাধীনতা।',
    },
    quote: { en: '“A language, a land, a people — and the courage to claim all three.”', bn: '“একটি ভাষা, একটি ভূমি, একটি জাতি — আর তিনটিকেই আপন করে নেওয়ার সাহস।”' },
  },
  {
    id: 'people', image: '/photos/fisher_2-1920.webp',
    fact: { value: { en: '169.8M', bn: '১৬.৯৮ কোটি' }, label: { en: 'People (BBS Census 2022)', bn: 'জনসংখ্যা (বিবিএস শুমারি ২০২২)' } },
    kicker: { en: 'Chapter three', bn: 'তৃতীয় অধ্যায়' },
    title: { en: 'The Resilience of its People', bn: 'মানুষের অদম্য সহনশীলতা' },
    body: {
      en: 'Cyclone shelters built by communities, microfinance pioneered in villages, women who transformed an industry — Bangladeshi resilience is not endurance alone, but invention under pressure.',
      bn: 'সমাজের হাতে গড়া ঘূর্ণিঝড় আশ্রয়কেন্দ্র, গ্রামে শুরু হওয়া ক্ষুদ্রঋণ, একটি শিল্পকে বদলে দেওয়া নারীরা — বাংলাদেশের সহনশীলতা কেবল টিকে থাকা নয়, চাপের মুখে উদ্ভাবন।',
    },
  },
  {
    id: 'economy', image: '/photos/garment_0-1920.webp',
    fact: { value: { en: '#2', bn: '২য়' }, label: { en: 'Apparel exporter worldwide (WTO 2024)', bn: 'বিশ্বে পোশাক রপ্তানিকারক (WTO ২০২৪)' } },
    kicker: { en: 'Chapter four', bn: 'চতুর্থ অধ্যায়' },
    title: { en: 'The Rise of its Economy', bn: 'অর্থনীতির উত্থান' },
    body: {
      en: 'Once written off by sceptics, Bangladesh became one of the fastest-growing economies of the past two decades — powered by garments, remittances, agriculture and a rising digital sector.',
      bn: 'একসময় যাকে সংশয়বাদীরা খারিজ করে দিয়েছিল, সেই বাংলাদেশ গত দুই দশকে বিশ্বের দ্রুততম বর্ধনশীল অর্থনীতিগুলোর একটি হয়ে উঠেছে — পোশাকশিল্প, প্রবাসী আয়, কৃষি ও বিকাশমান ডিজিটাল খাতের শক্তিতে।',
    },
  },
  {
    id: 'future', image: '/photos/solar_0-1920.webp',
    fact: { value: { en: '700+', bn: '৭০০+' }, label: { en: 'Rivers shaping a climate-smart delta', bn: 'জলবায়ু-সহনশীল ব-দ্বীপ গড়া নদী' } },
    kicker: { en: 'Chapter five', bn: 'পঞ্চম অধ্যায়' },
    title: { en: 'Vision for the Future', bn: 'ভবিষ্যতের স্বপ্ন' },
    body: {
      en: 'A climate-smart delta, a knowledge economy and a country confident in telling its own story — the next chapter is being written by a generation that has never known Bangladesh as anything but rising.',
      bn: 'জলবায়ু-সহনশীল ব-দ্বীপ, জ্ঞানভিত্তিক অর্থনীতি আর নিজের গল্প নিজে বলতে আত্মবিশ্বাসী এক দেশ — পরের অধ্যায়টি লিখছে এমন এক প্রজন্ম, যারা বাংলাদেশকে কেবল এগিয়ে যেতেই দেখেছে।',
    },
  },
]

export const TIMELINE: { year: string; title: L }[] = [
  { year: '300 BCE', title: { en: 'Pundranagar (Mahasthangarh) flourishes as an urban centre', bn: 'পুণ্ড্রনগর (মহাস্থানগড়) নগরকেন্দ্র হিসেবে বিকশিত হয়' } },
  { year: '8th c.', title: { en: 'Somapura Mahavihara built at Paharpur', bn: 'পাহাড়পুরে সোমপুর মহাবিহার নির্মিত হয়' } },
  { year: '15th c.', title: { en: 'Khan Jahan Ali founds the Mosque City of Bagerhat', bn: 'খান জাহান আলী বাগেরহাটে মসজিদের শহর প্রতিষ্ঠা করেন' } },
  { year: '1608', title: { en: 'Dhaka becomes the Mughal capital of Bengal', bn: 'ঢাকা মোগল বাংলার রাজধানী হয়' } },
  { year: '1952', title: { en: 'The Language Movement — 21 February', bn: 'ভাষা আন্দোলন — ২১ ফেব্রুয়ারি' } },
  { year: '1971', title: { en: 'Independence through the Liberation War', bn: 'মুক্তিযুদ্ধের মধ্য দিয়ে স্বাধীনতা' } },
  { year: '1974', title: { en: 'Bangladesh joins the United Nations', bn: 'বাংলাদেশ জাতিসংঘের সদস্য হয়' } },
  { year: '1999', title: { en: '21 February declared International Mother Language Day', bn: '২১ ফেব্রুয়ারি আন্তর্জাতিক মাতৃভাষা দিবস ঘোষিত' } },
  { year: '2015', title: { en: 'Bangladesh reaches lower-middle-income status', bn: 'বাংলাদেশ নিম্ন-মধ্যম আয়ের দেশে উন্নীত' } },
  { year: '2022', title: { en: 'Padma Bridge opens, linking the south-west', bn: 'পদ্মা সেতু চালু, দক্ষিণ-পশ্চিমের সঙ্গে সংযোগ' } },
  { year: '2026', title: { en: 'Brand Bangladesh monthly magazine launches online', bn: 'ব্র্যান্ড বাংলাদেশ মাসিক ম্যাগাজিনের অনলাইন যাত্রা' } },
]

export const VALUES: { title: L; body: L; color: string }[] = [
  { color: '#479E90', title: { en: 'Resilient', bn: 'অদম্য' }, body: { en: 'We adapt, rebuild and rise — whatever the river brings.', bn: 'নদী যা-ই আনুক, আমরা মানিয়ে নিই, গড়ি, এগিয়ে যাই।' } },
  { color: '#D9AA66', title: { en: 'Enterprising', bn: 'উদ্যমী' }, body: { en: 'From the village market to the global supply chain.', bn: 'গ্রামের হাট থেকে বৈশ্বিক সরবরাহ শৃঙ্খল পর্যন্ত।' } },
  { color: '#EF1551', title: { en: 'Warm', bn: 'আন্তরিক' }, body: { en: 'Hospitality is not an industry here; it is a habit.', bn: 'এখানে আতিথেয়তা শিল্প নয়; অভ্যাস।' } },
  { color: '#F68421', title: { en: 'Creative', bn: 'সৃজনশীল' }, body: { en: 'A thousand years of poetry, music, craft and invention.', bn: 'হাজার বছরের কবিতা, সংগীত, কারুশিল্প ও উদ্ভাবন।' } },
]

export const BRAND_PROMISE: L = {
  en: 'Bangladesh: a nation of rivers and resilience, open to the world and ready to grow with it.',
  bn: 'বাংলাদেশ: নদী ও সহনশীলতার দেশ — বিশ্বের জন্য উন্মুক্ত, বিশ্বের সঙ্গে এগিয়ে যেতে প্রস্তুত।',
}
