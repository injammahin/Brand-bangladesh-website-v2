import type { L } from '@/lib/i18n'

export type PillarSlug = 'tourism' | 'exports' | 'governance' | 'investment' | 'culture' | 'people'

export interface Pillar {
  slug: PillarSlug
  color: string
  image: string
  name: L
  hook: L
  intro: L
  facts: { value: L; label: L; source: string; year: string }[]
  subtopics: { title: L; body: L }[]
  regions: string[]
  cta: { title: L; body: L; label: L; category: string }
  feature?: { title: L; items: { title: L; body: L }[] }
  links?: { label: string; href: string }[]
}

export const PILLARS: Pillar[] = [
  {
    slug: 'tourism',
    color: '#479E90',
    image: '/photos/cox_2-1920.webp',
    name: { en: 'Tourism', bn: 'পর্যটন' },
    hook: {
      en: "Cox's Bazar to the Sundarbans — the world's wonders, rooted in Bangladesh.",
      bn: 'কক্সবাজার থেকে সুন্দরবন — বিশ্বের বিস্ময়, বাংলাদেশের মাটিতে।',
    },
    intro: {
      en: 'An unbroken sea beach, the largest mangrove forest on earth, tea-carpeted hills and a thousand years of temples, mosques and monasteries. Bangladesh rewards the traveller who arrives curious and leaves changed.',
      bn: 'অবিচ্ছিন্ন সমুদ্রসৈকত, পৃথিবীর বৃহত্তম ম্যানগ্রোভ বন, চায়ে ঢাকা পাহাড় আর হাজার বছরের মন্দির, মসজিদ ও বিহার। কৌতূহল নিয়ে আসা প্রত্যেক ভ্রমণকারীকে বাংলাদেশ বদলে দিয়ে ফেরত পাঠায়।',
    },
    facts: [
      { value: { en: '120 km', bn: '১২০ কিমি' }, label: { en: "Cox's Bazar sea beach", bn: 'কক্সবাজার সমুদ্রসৈকত' }, source: 'Bangladesh Parjatan Corporation', year: '2024' },
      { value: { en: '6,017 km²', bn: '৬,০১৭ বর্গকিমি' }, label: { en: 'Sundarbans in Bangladesh', bn: 'বাংলাদেশ অংশের সুন্দরবন' }, source: 'UNESCO World Heritage Centre', year: '1997' },
      { value: { en: '3', bn: '৩' }, label: { en: 'UNESCO World Heritage Sites', bn: 'ইউনেস্কো বিশ্ব ঐতিহ্য' }, source: 'UNESCO', year: '2024' },
    ],
    subtopics: [
      { title: { en: 'Sea & islands', bn: 'সমুদ্র ও দ্বীপ' }, body: { en: "Cox's Bazar, Inani, Saint Martin's coral island and Kuakata, where sunrise and sunset share one beach.", bn: 'কক্সবাজার, ইনানী, প্রবালদ্বীপ সেন্টমার্টিন এবং কুয়াকাটা — যেখানে একই সৈকতে সূর্যোদয় ও সূর্যাস্ত।' } },
      { title: { en: 'Forests & wildlife', bn: 'বন ও বন্যপ্রাণী' }, body: { en: 'The Sundarbans, home of the Royal Bengal tiger, plus Lawachara rainforest and the Ratargul swamp forest.', bn: 'রয়েল বেঙ্গল টাইগারের আবাস সুন্দরবন, লাউয়াছড়া রেইনফরেস্ট এবং রাতারগুল জলাবন।' } },
      { title: { en: 'Hills & tea gardens', bn: 'পাহাড় ও চা-বাগান' }, body: { en: 'Sylhet and Sreemangal tea estates, Rangamati lake country and the cloud-level trails of Bandarban.', bn: 'সিলেট ও শ্রীমঙ্গলের চা-বাগান, রাঙামাটির হ্রদ আর বান্দরবানের মেঘছোঁয়া পথ।' } },
      { title: { en: 'Heritage trail', bn: 'ঐতিহ্যের পথ' }, body: { en: 'Paharpur Buddhist Vihara, the Mosque City of Bagerhat, Mahasthangarh and Kantajew Temple.', bn: 'পাহাড়পুর বৌদ্ধবিহার, বাগেরহাটের মসজিদের শহর, মহাস্থানগড় ও কান্তজিউ মন্দির।' } },
    ],
    feature: {
      title: { en: 'Best seasons & sample itineraries', bn: 'ভ্রমণের সেরা সময় ও নমুনা পরিকল্পনা' },
      items: [
        { title: { en: 'Winter · Nov–Feb', bn: 'শীত · নভেম্বর–ফেব্রুয়ারি' }, body: { en: 'Dry, cool and clear — ideal for beaches, the Sundarbans and heritage sites. Sample: 7 days Dhaka → Bagerhat → Sundarbans → Kuakata.', bn: 'শুষ্ক, শীতল ও পরিষ্কার আবহাওয়া — সৈকত, সুন্দরবন ও ঐতিহ্যস্থানের জন্য আদর্শ। নমুনা: ৭ দিন ঢাকা → বাগেরহাট → সুন্দরবন → কুয়াকাটা।' } },
        { title: { en: 'Spring · Mar–May', bn: 'বসন্ত · মার্চ–মে' }, body: { en: 'Pohela Boishakh festivities and mango season in the north. Sample: 5 days Dhaka → Rajshahi → Paharpur → Bogura.', bn: 'পহেলা বৈশাখের উৎসব আর উত্তরাঞ্চলে আমের মৌসুম। নমুনা: ৫ দিন ঢাকা → রাজশাহী → পাহাড়পুর → বগুড়া।' } },
        { title: { en: 'Monsoon · Jun–Oct', bn: 'বর্ষা · জুন–অক্টোবর' }, body: { en: 'The delta at its greenest — waterfalls, haor wetlands and tea gardens. Sample: 6 days Sylhet → Sreemangal → Tanguar Haor.', bn: 'সবচেয়ে সবুজ ব-দ্বীপ — ঝরনা, হাওর ও চা-বাগান। নমুনা: ৬ দিন সিলেট → শ্রীমঙ্গল → টাঙ্গুয়ার হাওর।' } },
      ],
    },
    regions: ['chattogram', 'khulna', 'sylhet', 'barishal'],
    cta: {
      title: { en: 'Planning a visit or a feature?', bn: 'ভ্রমণ বা প্রতিবেদনের পরিকল্পনা করছেন?' },
      body: { en: 'Travel media, tour operators and visitors can reach our tourism desk directly.', bn: 'ভ্রমণ গণমাধ্যম, ট্যুর অপারেটর ও পর্যটকরা সরাসরি আমাদের পর্যটন ডেস্কে যোগাযোগ করতে পারেন।' },
      label: { en: 'Tourism inquiry', bn: 'পর্যটন বিষয়ে জিজ্ঞাসা' },
      category: 'tourism',
    },
  },
  {
    slug: 'exports',
    color: '#D9AA66',
    image: '/photos/ctgport_1-1920.webp',
    name: { en: 'Exports', bn: 'রপ্তানি' },
    hook: {
      en: 'The garments that clothe the world, grown from Bangladeshi ingenuity.',
      bn: 'বিশ্বকে যে পোশাক পরায়, তা গড়ে ওঠে বাংলাদেশের উদ্ভাবনী শক্তিতে।',
    },
    intro: {
      en: "From the world's greenest garment factories to pharmaceuticals shipped to more than 150 countries, Bangladesh is a sourcing partner built on scale, speed and a skilled workforce.",
      bn: 'বিশ্বের সবচেয়ে পরিবেশবান্ধব পোশাক কারখানা থেকে শুরু করে ১৫০টির বেশি দেশে রপ্তানি হওয়া ওষুধ — বাংলাদেশ এমন এক সোর্সিং অংশীদার, যার ভিত্তি ব্যাপ্তি, গতি আর দক্ষ কর্মীবাহিনী।',
    },
    facts: [
      { value: { en: '#2', bn: '২য়' }, label: { en: 'Apparel exporter worldwide', bn: 'বিশ্বে পোশাক রপ্তানিকারক' }, source: 'WTO World Trade Statistical Review', year: '2024' },
      { value: { en: '230+', bn: '২৩০+' }, label: { en: 'LEED-certified green factories', bn: 'লিড-সনদপ্রাপ্ত সবুজ কারখানা' }, source: 'BGMEA / USGBC', year: '2024' },
      { value: { en: '150+', bn: '১৫০+' }, label: { en: 'Countries buying our medicines', bn: 'যত দেশে আমাদের ওষুধ যায়' }, source: 'Bangladesh Association of Pharmaceutical Industries', year: '2024' },
    ],
    subtopics: [
      { title: { en: 'Ready-made garments', bn: 'তৈরি পোশাক' }, body: { en: 'Knitwear, denim and woven apparel for the world’s leading brands, with a growing share of high-value and technical textiles.', bn: 'বিশ্বের শীর্ষ ব্র্যান্ডের জন্য নিটওয়্যার, ডেনিম ও ওভেন পোশাক; বাড়ছে উচ্চমূল্যের ও কারিগরি বস্ত্রের অংশ।' } },
      { title: { en: 'Leather & footwear', bn: 'চামড়া ও পাদুকা' }, body: { en: 'A complete value chain from tannery to finished footwear and leather goods.', bn: 'ট্যানারি থেকে তৈরি জুতা ও চামড়াপণ্য পর্যন্ত পূর্ণাঙ্গ মূল্যশৃঙ্খল।' } },
      { title: { en: 'Pharmaceuticals', bn: 'ওষুধশিল্প' }, body: { en: 'Domestic producers meet most of national demand and export generics worldwide.', bn: 'দেশীয় উৎপাদকেরা দেশের চাহিদার সিংহভাগ পূরণ করে এবং বিশ্বজুড়ে জেনেরিক ওষুধ রপ্তানি করে।' } },
      { title: { en: 'Jute & diversified jute goods', bn: 'পাট ও বহুমুখী পাটপণ্য' }, body: { en: 'The golden fibre reborn as sustainable packaging, textiles and composites.', bn: 'সোনালি আঁশের নবজন্ম — টেকসই মোড়ক, বস্ত্র ও কম্পোজিট উপকরণে।' } },
      { title: { en: 'Agro-processing', bn: 'কৃষিপ্রক্রিয়াজাত পণ্য' }, body: { en: 'Frozen fish and shrimp, tea, spices, snacks and processed foods.', bn: 'হিমায়িত মাছ ও চিংড়ি, চা, মসলা, স্ন্যাকস ও প্রক্রিয়াজাত খাদ্য।' } },
      { title: { en: 'IT & ITES', bn: 'আইটি ও আইটিইএস' }, body: { en: 'Software, BPO and one of the largest freelance workforces in the world.', bn: 'সফটওয়্যার, বিপিও এবং বিশ্বের অন্যতম বৃহৎ ফ্রিল্যান্স কর্মীবাহিনী।' } },
    ],
    regions: ['dhaka', 'chattogram', 'khulna'],
    cta: {
      title: { en: 'Sourcing from Bangladesh?', bn: 'বাংলাদেশ থেকে পণ্য সংগ্রহ করতে চান?' },
      body: { en: 'Tell us what you buy. Our Exports team will connect you with verified manufacturers and trade bodies.', bn: 'আপনি কী কিনতে চান জানান। আমাদের রপ্তানি দল আপনাকে যাচাইকৃত উৎপাদক ও বাণিজ্য সংগঠনের সঙ্গে যুক্ত করবে।' },
      label: { en: 'Buyer / sourcing contact', bn: 'ক্রেতা / সোর্সিং যোগাযোগ' },
      category: 'exports',
    },
    links: [
      { label: 'Export Promotion Bureau', href: 'https://epb.gov.bd' },
      { label: 'BGMEA', href: 'https://www.bgmea.com.bd' },
    ],
  },
  {
    slug: 'governance',
    color: '#016171',
    image: '/photos/sangsad_0-1920.webp',
    name: { en: 'Governance', bn: 'সুশাসন' },
    hook: {
      en: 'Institutions, transparency and digital public services built for citizens.',
      bn: 'নাগরিকের জন্য গড়া প্রতিষ্ঠান, স্বচ্ছতা ও ডিজিটাল জনসেবা।',
    },
    intro: {
      en: 'Public service in Bangladesh is moving closer to the citizen — through union-level digital centres, online land records, e-procurement and a steady programme of reform.',
      bn: 'ইউনিয়ন পর্যায়ের ডিজিটাল সেন্টার, অনলাইন ভূমি রেকর্ড, ই-প্রকিউরমেন্ট এবং ধারাবাহিক সংস্কারের মধ্য দিয়ে বাংলাদেশে জনসেবা নাগরিকের আরও কাছে পৌঁছাচ্ছে।',
    },
    facts: [
      { value: { en: '8,000+', bn: '৮,০০০+' }, label: { en: 'Union Digital Centres', bn: 'ইউনিয়ন ডিজিটাল সেন্টার' }, source: 'a2i Programme', year: '2024' },
      { value: { en: '64', bn: '৬৪' }, label: { en: 'Districts with e-services', bn: 'ই-সেবাযুক্ত জেলা' }, source: 'Cabinet Division', year: '2024' },
      { value: { en: '100%', bn: '১০০%' }, label: { en: 'Govt. procurement via e-GP target', bn: 'ই-জিপির মাধ্যমে সরকারি ক্রয়ের লক্ষ্য' }, source: 'BPPA', year: '2024' },
    ],
    subtopics: [
      { title: { en: 'Digital public infrastructure', bn: 'ডিজিটাল জন-অবকাঠামো' }, body: { en: 'National ID, mobile financial services and a unified service portal.', bn: 'জাতীয় পরিচয়পত্র, মোবাইল আর্থিক সেবা ও একীভূত সেবা পোর্টাল।' } },
      { title: { en: 'Public sector reform', bn: 'জনপ্রশাসন সংস্কার' }, body: { en: 'Simplified services, citizen charters and grievance redress.', bn: 'সহজীকৃত সেবা, নাগরিক সনদ ও অভিযোগ প্রতিকার ব্যবস্থা।' } },
      { title: { en: 'Transparency', bn: 'স্বচ্ছতা' }, body: { en: 'Right to Information, open data and e-procurement.', bn: 'তথ্য অধিকার, উন্মুক্ত উপাত্ত ও ই-প্রকিউরমেন্ট।' } },
    ],
    regions: ['dhaka', 'rajshahi'],
    cta: {
      title: { en: 'Read the case studies', bn: 'কেস স্টাডি পড়ুন' },
      body: { en: 'Download governance reports and reform case studies from the Reports Library.', bn: 'রিপোর্ট লাইব্রেরি থেকে সুশাসন প্রতিবেদন ও সংস্কারের কেস স্টাডি ডাউনলোড করুন।' },
      label: { en: 'Go to Reports Library', bn: 'রিপোর্ট লাইব্রেরিতে যান' },
      category: 'reports',
    },
  },
  {
    slug: 'investment',
    color: '#EF1551',
    image: '/photos/metro_2-1920.webp',
    name: { en: 'Investment & Immigration', bn: 'বিনিয়োগ ও অভিবাসন' },
    hook: {
      en: 'A rising economy, a young workforce and open doors for the world.',
      bn: 'উদীয়মান অর্থনীতি, তরুণ কর্মীবাহিনী আর বিশ্বের জন্য খোলা দরজা।',
    },
    intro: {
      en: 'A domestic market of 170 million, a strategic location between South and South-East Asia, and a network of economic zones with fiscal incentives make Bangladesh a serious destination for capital.',
      bn: '১৭ কোটি মানুষের অভ্যন্তরীণ বাজার, দক্ষিণ ও দক্ষিণ-পূর্ব এশিয়ার সংযোগস্থলে কৌশলগত অবস্থান এবং প্রণোদনাসহ অর্থনৈতিক অঞ্চলের নেটওয়ার্ক বাংলাদেশকে বিনিয়োগের গুরুত্বপূর্ণ গন্তব্যে পরিণত করেছে।',
    },
    facts: [
      { value: { en: '100', bn: '১০০' }, label: { en: 'Economic zones planned', bn: 'পরিকল্পিত অর্থনৈতিক অঞ্চল' }, source: 'BEZA', year: '2024' },
      { value: { en: '169.8M', bn: '১৬.৯৮ কোটি' }, label: { en: 'Population', bn: 'জনসংখ্যা' }, source: 'BBS Population & Housing Census', year: '2022' },
      { value: { en: '8', bn: '৮' }, label: { en: 'Export processing zones', bn: 'রপ্তানি প্রক্রিয়াকরণ অঞ্চল' }, source: 'BEPZA', year: '2024' },
    ],
    subtopics: [
      { title: { en: 'Why invest', bn: 'কেন বিনিয়োগ' }, body: { en: 'Market size, competitive costs, duty-free access to many markets and a young labour force.', bn: 'বাজারের আকার, প্রতিযোগিতামূলক ব্যয়, বহু বাজারে শুল্কমুক্ত প্রবেশাধিকার ও তরুণ শ্রমশক্তি।' } },
      { title: { en: 'Incentives', bn: 'প্রণোদনা' }, body: { en: 'Tax holidays, duty-free machinery import and full repatriation of profits in designated zones.', bn: 'নির্ধারিত অঞ্চলে কর অবকাশ, শুল্কমুক্ত যন্ত্রপাতি আমদানি এবং মুনাফা সম্পূর্ণ প্রত্যাবাসনের সুযোগ।' } },
      { title: { en: 'Economic zones', bn: 'অর্থনৈতিক অঞ্চল' }, body: { en: 'BEZA economic zones, BEPZA export processing zones and Hi-Tech Parks.', bn: 'বেজার অর্থনৈতিক অঞ্চল, বেপজার রপ্তানি প্রক্রিয়াকরণ অঞ্চল ও হাই-টেক পার্ক।' } },
      { title: { en: 'Visas & permits', bn: 'ভিসা ও অনুমতিপত্র' }, body: { en: 'Investor (PI) visas, employment (E) visas and work permits issued through BIDA’s One Stop Service.', bn: 'বিডার ওয়ান স্টপ সার্ভিসের মাধ্যমে বিনিয়োগকারী (পিআই) ভিসা, কর্মসংস্থান (ই) ভিসা ও ওয়ার্ক পারমিট।' } },
    ],
    feature: {
      title: { en: 'Setting up a business — step by step', bn: 'ব্যবসা শুরু — ধাপে ধাপে' },
      items: [
        { title: { en: '1 · Name clearance & registration', bn: '১ · নাম ছাড়পত্র ও নিবন্ধন' }, body: { en: 'Reserve your company name and incorporate with RJSC.', bn: 'আরজেএসসিতে কোম্পানির নাম সংরক্ষণ ও নিবন্ধন করুন।' } },
        { title: { en: '2 · Investment registration', bn: '২ · বিনিয়োগ নিবন্ধন' }, body: { en: 'Register the project with BIDA, BEZA, BEPZA or the Hi-Tech Park Authority.', bn: 'বিডা, বেজা, বেপজা অথবা হাই-টেক পার্ক কর্তৃপক্ষে প্রকল্প নিবন্ধন করুন।' } },
        { title: { en: '3 · Bank account & capital', bn: '৩ · ব্যাংক হিসাব ও মূলধন' }, body: { en: 'Open a bank account and bring in paid-up capital through banking channels.', bn: 'ব্যাংক হিসাব খুলুন এবং ব্যাংকিং চ্যানেলে পরিশোধিত মূলধন আনুন।' } },
        { title: { en: '4 · Licences, TIN & VAT', bn: '৪ · লাইসেন্স, টিআইএন ও ভ্যাট' }, body: { en: 'Obtain trade licence, tax ID and VAT registration via One Stop Service.', bn: 'ওয়ান স্টপ সার্ভিসের মাধ্যমে ট্রেড লাইসেন্স, কর শনাক্তকরণ নম্বর ও ভ্যাট নিবন্ধন নিন।' } },
        { title: { en: '5 · Visas & work permits', bn: '৫ · ভিসা ও ওয়ার্ক পারমিট' }, body: { en: 'Apply for investor or employment visas and work permits for foreign staff.', bn: 'বিদেশি কর্মীদের জন্য বিনিয়োগকারী বা কর্মসংস্থান ভিসা ও ওয়ার্ক পারমিটের আবেদন করুন।' } },
      ],
    },
    regions: ['dhaka', 'chattogram', 'mymensingh'],
    cta: {
      title: { en: 'Talk to our investment team', bn: 'আমাদের বিনিয়োগ দলের সঙ্গে কথা বলুন' },
      body: { en: 'Share your sector and timeline — we route every inquiry to the right authority.', bn: 'আপনার খাত ও সময়সূচি জানান — প্রতিটি জিজ্ঞাসা আমরা সঠিক কর্তৃপক্ষের কাছে পৌঁছে দিই।' },
      label: { en: 'Investor inquiry', bn: 'বিনিয়োগকারী জিজ্ঞাসা' },
      category: 'investment',
    },
    links: [
      { label: 'BIDA', href: 'https://bida.gov.bd' },
      { label: 'BEZA', href: 'https://www.beza.gov.bd' },
      { label: 'BEPZA', href: 'https://www.bepza.gov.bd' },
      { label: 'Bangladesh Hi-Tech Park Authority', href: 'https://bhtpa.gov.bd' },
    ],
  },
  {
    slug: 'culture',
    color: '#F68421',
    image: '/photos/boishakh_1-1920.webp',
    name: { en: 'Culture & Heritage', bn: 'সংস্কৃতি ও ঐতিহ্য' },
    hook: {
      en: "Tagore's homeland — cradle of music, art and the Bengali renaissance.",
      bn: 'রবীন্দ্রনাথের জন্মভূমি — সংগীত, শিল্প ও বাঙালি নবজাগরণের সূতিকাগার।',
    },
    intro: {
      en: 'A language people gave their lives for, a new year celebrated by millions in the streets, and crafts from Jamdani to nakshi kantha that UNESCO recognises as living heritage of humanity.',
      bn: 'যে ভাষার জন্য মানুষ প্রাণ দিয়েছে, লাখো মানুষের রাজপথে উদ্‌যাপিত নববর্ষ, আর জামদানি থেকে নকশিকাঁথা — যেগুলোকে ইউনেস্কো মানবজাতির জীবন্ত ঐতিহ্য হিসেবে স্বীকৃতি দিয়েছে।',
    },
    facts: [
      { value: { en: '21 Feb', bn: '২১ ফেব্রুয়ারি' }, label: { en: 'International Mother Language Day', bn: 'আন্তর্জাতিক মাতৃভাষা দিবস' }, source: 'UNESCO', year: '1999' },
      { value: { en: '5', bn: '৫' }, label: { en: 'Elements on UNESCO intangible heritage lists', bn: 'ইউনেস্কোর অধরা ঐতিহ্য তালিকায় উপাদান' }, source: 'UNESCO ICH', year: '2024' },
      { value: { en: '1,000+', bn: '১,০০০+' }, label: { en: 'Years of recorded Bengali literature', bn: 'লিখিত বাংলা সাহিত্যের বছর' }, source: 'Bangla Academy', year: '2024' },
    ],
    subtopics: [
      { title: { en: 'Festivals', bn: 'উৎসব' }, body: { en: 'Pohela Boishakh and the Mangal Shobhajatra, Eid, Durga Puja, Nabanna harvest festival.', bn: 'পহেলা বৈশাখ ও মঙ্গল শোভাযাত্রা, ঈদ, দুর্গাপূজা, নবান্ন।' } },
      { title: { en: 'Music & literature', bn: 'সংগীত ও সাহিত্য' }, body: { en: 'Baul songs, Rabindra and Nazrul sangeet, and a living literary culture.', bn: 'বাউল গান, রবীন্দ্র ও নজরুলসংগীত এবং জীবন্ত সাহিত্যচর্চা।' } },
      { title: { en: 'Crafts', bn: 'কারুশিল্প' }, body: { en: 'Jamdani weaving, nakshi kantha, shital pati, terracotta and rickshaw art.', bn: 'জামদানি বুনন, নকশিকাঁথা, শীতলপাটি, টেরাকোটা ও রিকশাচিত্র।' } },
      { title: { en: 'Cuisine', bn: 'রন্ধনশৈলী' }, body: { en: 'Hilsa, kacchi biryani, pitha, mishti doi and regional food from every division.', bn: 'ইলিশ, কাচ্চি বিরিয়ানি, পিঠা, মিষ্টি দই আর প্রতিটি বিভাগের নিজস্ব খাবার।' } },
    ],
    regions: ['dhaka', 'rajshahi', 'khulna', 'rangpur'],
    cta: {
      title: { en: 'Explore the magazine archive', bn: 'ম্যাগাজিন আর্কাইভ ঘুরে দেখুন' },
      body: { en: 'Our monthly issues go deep on heritage, food and festivals.', bn: 'আমাদের মাসিক সংখ্যাগুলোতে ঐতিহ্য, খাবার ও উৎসব নিয়ে গভীর আলোচনা।' },
      label: { en: 'Browse issues', bn: 'সংখ্যাগুলো দেখুন' },
      category: 'publication',
    },
  },
  {
    slug: 'people',
    color: '#A5CD2F',
    image: '/photos/boatrace_1-1920.webp',
    name: { en: 'People', bn: 'মানুষ' },
    hook: {
      en: '170 million dreamers driving one of the most resilient nations on earth.',
      bn: '১৭ কোটি স্বপ্নবাজ মানুষ, যারা এগিয়ে নিচ্ছে পৃথিবীর অন্যতম সহনশীল জাতিকে।',
    },
    intro: {
      en: 'Entrepreneurs, artists, athletes, young innovators and a diaspora on every continent — the people of Bangladesh are its most persuasive story.',
      bn: 'উদ্যোক্তা, শিল্পী, ক্রীড়াবিদ, তরুণ উদ্ভাবক আর প্রতিটি মহাদেশে ছড়িয়ে থাকা প্রবাসী — বাংলাদেশের মানুষই তার সবচেয়ে বিশ্বাসযোগ্য গল্প।',
    },
    facts: [
      { value: { en: '169.8M', bn: '১৬.৯৮ কোটি' }, label: { en: 'People', bn: 'জনসংখ্যা' }, source: 'BBS Census', year: '2022' },
      { value: { en: '74.7%', bn: '৭৪.৭%' }, label: { en: 'Literacy rate (7+)', bn: 'সাক্ষরতার হার (৭+)' }, source: 'BBS Census', year: '2022' },
      { value: { en: '$30.3B', bn: '৩০.৩ বিলিয়ন ডলার' }, label: { en: 'Remittances from the diaspora', bn: 'প্রবাসী আয়' }, source: 'Bangladesh Bank', year: 'FY2024–25' },
    ],
    subtopics: [
      { title: { en: 'Entrepreneurs', bn: 'উদ্যোক্তা' }, body: { en: 'Founders building fintech, logistics, health and agri-tech for a mobile-first nation.', bn: 'মোবাইলনির্ভর দেশের জন্য ফিনটেক, লজিস্টিকস, স্বাস্থ্য ও কৃষিপ্রযুক্তি গড়ছেন যাঁরা।' } },
      { title: { en: 'Artists & athletes', bn: 'শিল্পী ও ক্রীড়াবিদ' }, body: { en: 'Musicians, filmmakers, cricketers and footballers carrying the flag abroad.', bn: 'সংগীতশিল্পী, চলচ্চিত্রকার, ক্রিকেটার ও ফুটবলার — যাঁরা বিদেশে পতাকা বহন করেন।' } },
      { title: { en: 'Global diaspora', bn: 'বিশ্বজুড়ে প্রবাসী' }, body: { en: 'Doctors, engineers, academics and workers whose remittances and ideas flow home.', bn: 'চিকিৎসক, প্রকৌশলী, শিক্ষাবিদ ও শ্রমিক — যাঁদের পাঠানো অর্থ ও ভাবনা দেশে ফেরে।' } },
    ],
    regions: ['dhaka', 'sylhet', 'rangpur', 'mymensingh'],
    cta: {
      title: { en: 'Know someone remarkable?', bn: 'অসাধারণ কাউকে চেনেন?' },
      body: { en: 'Share your story or nominate someone — the best submissions feature on the Story Wall and in the magazine.', bn: 'আপনার গল্প বলুন বা কাউকে মনোনীত করুন — সেরা গল্পগুলো স্টোরি ওয়াল ও ম্যাগাজিনে প্রকাশিত হবে।' },
      label: { en: 'Share your story', bn: 'আপনার গল্প বলুন' },
      category: 'community',
    },
  },
]

export const getPillar = (slug: string) => PILLARS.find((p) => p.slug === slug)
