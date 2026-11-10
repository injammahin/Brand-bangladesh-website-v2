import type { L } from '@/lib/i18n'

export type ThemeSlug = 'sundarban' | 'heritage' | 'tourism' | 'food' | 'economy' | 'people'

export const THEMES: Record<ThemeSlug, L> = {
  sundarban: { en: 'Sundarban', bn: 'সুন্দরবন' },
  heritage: { en: 'Archaeological Heritage', bn: 'প্রত্নতাত্ত্বিক ঐতিহ্য' },
  tourism: { en: 'Tourism', bn: 'পর্যটন' },
  food: { en: 'Traditional Food', bn: 'ঐতিহ্যবাহী খাবার' },
  economy: { en: 'Economy', bn: 'অর্থনীতি' },
  people: { en: 'People', bn: 'মানুষ' },
}

export interface Issue {
  number: number
  date: string // release date, ISO
  theme: ThemeSlug
  color: string
  cover?: string
  /** Real photo used to build a cover when no designed cover exists */
  photo?: string
  title: L
  editorsNote: L
  /** Article slugs published as standalone web pages */
  articles: string[]
  /** Extra table-of-contents entries only in the print/PDF edition */
  toc: L[]
  /** Path to full-issue PDF once uploaded through the CMS; null = not yet available */
  pdf: string | null
  printAvailable: boolean
}

const NOTE_DEFAULT: L = {
  en: 'Every month we choose one idea and follow it across the country — to the people, places and numbers that make it real. Thank you for reading, and for sharing Bangladesh with the world.',
  bn: 'প্রতি মাসে আমরা একটি ভাবনা বেছে নিই এবং দেশজুড়ে তার পিছু নিই — সেই মানুষ, স্থান ও সংখ্যার কাছে, যারা একে বাস্তব করে তোলে। পড়ার জন্য এবং বিশ্বের কাছে বাংলাদেশকে তুলে ধরার জন্য ধন্যবাদ।',
}

export const ISSUES: Issue[] = [
  {
    number: 24, date: '2026-11-01', theme: 'sundarban', color: '#016171', cover: '/assets/magazine-covers/cover-1.jpg',
    title: { en: 'The Sundarban Issue', bn: 'সুন্দরবন সংখ্যা' },
    editorsNote: {
      en: 'This month we went into the forest that protects us. The Sundarbans is a tiger reserve, a honey economy, a storm wall and a national symbol at once — and it needs all of us to keep it that way.',
      bn: 'এই মাসে আমরা গিয়েছিলাম সেই বনে, যা আমাদের রক্ষা করে। সুন্দরবন একই সঙ্গে বাঘের অভয়ারণ্য, মধুর অর্থনীতি, ঝড়ের প্রাচীর ও জাতীয় প্রতীক — আর একে এভাবে টিকিয়ে রাখতে আমাদের সবাইকে প্রয়োজন।',
    },
    articles: ['sundarbans-the-living-delta'],
    toc: [
      { en: 'Photo essay: Life on the Pashur river', bn: 'আলোকচিত্র প্রবন্ধ: পশুর নদীর জীবন' },
      { en: 'Interview: A forest guard of 30 years', bn: 'সাক্ষাৎকার: ৩০ বছরের এক বনরক্ষী' },
      { en: 'Taste: Sundarbans honey', bn: 'স্বাদ: সুন্দরবনের মধু' },
    ],
    pdf: null, printAvailable: true,
  },
  {
    number: 23, date: '2026-10-01', theme: 'economy', color: '#D9AA66', photo: 'jamdani_0',
    title: { en: 'The Fabric Issue', bn: 'বস্ত্র সংখ্যা' },
    editorsNote: NOTE_DEFAULT,
    articles: ['the-fabric-of-the-world'],
    toc: [
      { en: 'Data: Four decades of garment exports', bn: 'তথ্য: চার দশকের পোশাক রপ্তানি' },
      { en: 'Profile: The women who run the line', bn: 'প্রোফাইল: উৎপাদন লাইনের নেতৃত্বে নারীরা' },
    ],
    pdf: null, printAvailable: true,
  },
  {
    number: 22, date: '2026-09-01', theme: 'people', color: '#A5CD2F', photo: 'boishakh_2',
    title: { en: 'The Diaspora Issue', bn: 'প্রবাসী সংখ্যা' },
    editorsNote: NOTE_DEFAULT,
    articles: ['a-global-diaspora'],
    toc: [{ en: 'Letters home: readers abroad write in', bn: 'ঘরে ফেরা চিঠি: প্রবাসী পাঠকদের লেখা' }],
    pdf: null, printAvailable: true,
  },
  {
    number: 21, date: '2026-08-01', theme: 'heritage', color: '#F68421', cover: '/assets/magazine-covers/cover-2.jpg',
    title: { en: 'The Heritage Issue', bn: 'ঐতিহ্য সংখ্যা' },
    editorsNote: NOTE_DEFAULT,
    articles: ['sixty-dome-mosque'],
    toc: [
      { en: 'Paharpur: the great vihara', bn: 'পাহাড়পুর: মহাবিহার' },
      { en: 'Mahasthangarh, the oldest city', bn: 'মহাস্থানগড়, প্রাচীনতম নগর' },
    ],
    pdf: null, printAvailable: true,
  },
  {
    number: 20, date: '2026-07-01', theme: 'tourism', color: '#479E90', cover: '/assets/magazine-covers/cover-4.jpg',
    title: { en: 'The Coast Issue', bn: 'উপকূল সংখ্যা' },
    editorsNote: NOTE_DEFAULT,
    articles: ['coxs-bazar-longest-beach'],
    toc: [{ en: "Saint Martin's: protecting the coral", bn: 'সেন্টমার্টিন: প্রবাল রক্ষা' }],
    pdf: null, printAvailable: false,
  },
  {
    number: 19, date: '2026-06-01', theme: 'tourism', color: '#EF1551', photo: 'bandar_1',
    title: { en: 'The Hills Issue', bn: 'পাহাড় সংখ্যা' },
    editorsNote: NOTE_DEFAULT,
    articles: ['rangamati-lake-country'],
    toc: [{ en: 'Bandarban above the clouds', bn: 'মেঘের ওপরে বান্দরবান' }],
    pdf: null, printAvailable: false,
  },
  {
    number: 18, date: '2026-05-01', theme: 'food', color: '#F68421', cover: '/assets/magazine-covers/cover-5.jpg',
    title: { en: 'The Pitha Issue', bn: 'পিঠা সংখ্যা' },
    editorsNote: NOTE_DEFAULT, articles: [],
    toc: [{ en: 'Forty pithas, eight divisions', bn: 'চল্লিশ পিঠা, আট বিভাগ' }, { en: 'Recipe: Bhapa pitha', bn: 'রেসিপি: ভাপা পিঠা' }],
    pdf: null, printAvailable: false,
  },
  {
    number: 17, date: '2026-04-01', theme: 'food', color: '#DF1A23', photo: 'hilsa_1',
    title: { en: 'The Hilsa Issue', bn: 'ইলিশ সংখ্যা' },
    editorsNote: NOTE_DEFAULT, articles: [],
    toc: [{ en: 'Following the hilsa upriver', bn: 'ইলিশের পিছু পিছু উজানে' }],
    pdf: null, printAvailable: false,
  },
  {
    number: 16, date: '2026-03-01', theme: 'heritage', color: '#016171', cover: '/assets/magazine-covers/cover-3.jpg',
    title: { en: 'The Terracotta Issue', bn: 'টেরাকোটা সংখ্যা' },
    editorsNote: NOTE_DEFAULT, articles: [],
    toc: [{ en: 'Kantajew Temple, panel by panel', bn: 'কান্তজিউ মন্দির, ফলক ধরে ধরে' }],
    pdf: null, printAvailable: false,
  },
  {
    number: 15, date: '2026-02-01', theme: 'people', color: '#A5CD2F', photo: 'boishakh_1',
    title: { en: 'The Year in People', bn: 'মানুষের বছর' },
    editorsNote: NOTE_DEFAULT, articles: [],
    toc: [{ en: 'Fifty-two faces of 2025', bn: '২০২৫-এর বাহান্নটি মুখ' }],
    pdf: null, printAvailable: false,
  },
  {
    number: 14, date: '2026-01-01', theme: 'sundarban', color: '#479E90', photo: 'sundriv_0',
    title: { en: 'Winter in the Mangroves', bn: 'ম্যানগ্রোভে শীত' },
    editorsNote: NOTE_DEFAULT, articles: [],
    toc: [{ en: 'Birds of the Sundarbans', bn: 'সুন্দরবনের পাখি' }],
    pdf: null, printAvailable: false,
  },
]

/** Issue route key: year-number, e.g. 2026-46 (supports numbering reset each year) */
export const issueKey = (i: Issue) => `${i.date.slice(0, 4)}-${i.number}`
export const getIssue = (key: string) => ISSUES.find((i) => issueKey(i) === key)
export const latestIssue = () => [...ISSUES].sort((a, b) => b.date.localeCompare(a.date))[0]
