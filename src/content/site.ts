import type { L } from '@/lib/i18n'

/* ── Inquiry routing (BRD 5.8.2) ── */
export const INQUIRY_CATEGORIES: { id: string; label: L; team: string }[] = [
  { id: 'general', label: { en: 'General', bn: 'সাধারণ' }, team: 'info@brandbangladesh.gov.bd' },
  { id: 'investment', label: { en: 'Investment', bn: 'বিনিয়োগ' }, team: 'invest@brandbangladesh.gov.bd' },
  { id: 'exports', label: { en: 'Exports / sourcing', bn: 'রপ্তানি / সোর্সিং' }, team: 'exports@brandbangladesh.gov.bd' },
  { id: 'tourism', label: { en: 'Tourism', bn: 'পর্যটন' }, team: 'tourism@brandbangladesh.gov.bd' },
  { id: 'media', label: { en: 'Media / press', bn: 'গণমাধ্যম / প্রেস' }, team: 'press@brandbangladesh.gov.bd' },
  { id: 'print', label: { en: 'Magazine hard copy / print subscription', bn: 'ম্যাগাজিনের মুদ্রিত কপি / সাবস্ক্রিপশন' }, team: 'print@brandbangladesh.gov.bd' },
]

/* ── Reports library (BRD 5.5.4) ── */
export type ReportType = 'report' | 'brochure' | 'press'
export const REPORT_TYPES: Record<ReportType, L> = {
  report: { en: 'Reports', bn: 'প্রতিবেদন' },
  brochure: { en: 'Brochures', bn: 'ব্রোশিওর' },
  press: { en: 'Press releases', bn: 'প্রেস বিজ্ঞপ্তি' },
}
export const REPORTS: { id: string; type: ReportType; pillar: string; date: string; size: string; title: L }[] = [
  { id: 'r1', type: 'report', pillar: 'investment', date: '2026-10-15', size: '4.2 MB', title: { en: 'Investment Landscape of Bangladesh 2026', bn: 'বাংলাদেশের বিনিয়োগ পরিস্থিতি ২০২৬' } },
  { id: 'r2', type: 'report', pillar: 'governance', date: '2026-09-02', size: '2.8 MB', title: { en: 'Digital Public Services: Case Studies', bn: 'ডিজিটাল জনসেবা: কেস স্টাডি' } },
  { id: 'r3', type: 'brochure', pillar: 'tourism', date: '2026-08-20', size: '9.6 MB', title: { en: 'Visit Bangladesh — Seasonal Travel Guide', bn: 'বাংলাদেশ ভ্রমণ — মৌসুমি ভ্রমণ নির্দেশিকা' } },
  { id: 'r4', type: 'brochure', pillar: 'exports', date: '2026-07-11', size: '6.1 MB', title: { en: 'Sourcing from Bangladesh: Sector Profiles', bn: 'বাংলাদেশ থেকে সোর্সিং: খাতভিত্তিক পরিচিতি' } },
  { id: 'r5', type: 'press', pillar: 'culture', date: '2026-11-05', size: '240 KB', title: { en: 'Brand Bangladesh monthly magazine reaches issue 24', bn: 'ব্র্যান্ড বাংলাদেশ মাসিক ম্যাগাজিনের ২৪তম সংখ্যা প্রকাশ' } },
  { id: 'r6', type: 'press', pillar: 'people', date: '2026-10-21', size: '180 KB', title: { en: 'Share Your Story campaign opens to the diaspora', bn: 'প্রবাসীদের জন্য “আপনার গল্প বলুন” ক্যাম্পেইন শুরু' } },
  { id: 'r7', type: 'report', pillar: 'exports', date: '2026-06-30', size: '3.4 MB', title: { en: 'Export Performance Review FY2024–25', bn: 'রপ্তানি কার্যক্রম পর্যালোচনা ২০২৪–২৫' } },
]

/* ── Community story wall (approved submissions) ── */
export const WALL_STORIES: { id: string; name: string; place: L; pillar: string; title: L; body: L; color: string }[] = [
  { id: 's1', name: 'Nusrat J.', place: { en: 'Toronto, Canada', bn: 'টরন্টো, কানাডা' }, pillar: 'people', color: '#A5CD2F', title: { en: 'Teaching Bangla on Saturdays', bn: 'শনিবারের বাংলা ক্লাস' }, body: { en: 'Forty children, three cities, one language. Our weekend school now runs online for families across Canada.', bn: 'চল্লিশটি শিশু, তিনটি শহর, একটি ভাষা। আমাদের সাপ্তাহিক স্কুল এখন কানাডাজুড়ে পরিবারগুলোর জন্য অনলাইনে চলে।' } },
  { id: 's2', name: 'Rafiq H.', place: { en: 'Sreemangal', bn: 'শ্রীমঙ্গল' }, pillar: 'tourism', color: '#479E90', title: { en: 'My homestay in the tea hills', bn: 'চা-পাহাড়ে আমার হোমস্টে' }, body: { en: 'Guests from 22 countries have now eaten my mother’s cooking. Tourism changed our village.', bn: '২২টি দেশের অতিথি এখন আমার মায়ের রান্না খেয়েছেন। পর্যটন আমাদের গ্রাম বদলে দিয়েছে।' } },
  { id: 's3', name: 'Shirin A.', place: { en: 'Gazipur', bn: 'গাজীপুর' }, pillar: 'exports', color: '#D9AA66', title: { en: 'From operator to floor manager', bn: 'অপারেটর থেকে ফ্লোর ম্যানেজার' }, body: { en: 'I started on a sewing line at 19. Today I lead 300 people in a LEED Platinum factory.', bn: '১৯ বছর বয়সে সেলাই লাইনে কাজ শুরু করি। আজ লিড প্লাটিনাম কারখানায় ৩০০ জনের নেতৃত্ব দিই।' } },
  { id: 's4', name: 'Arif M.', place: { en: 'London, UK', bn: 'লন্ডন, যুক্তরাজ্য' }, pillar: 'culture', color: '#F68421', title: { en: 'Pohela Boishakh on Brick Lane', bn: 'ব্রিক লেনে পহেলা বৈশাখ' }, body: { en: 'Ten thousand people, alpana on the street, and my grandmother’s songs over the speakers.', bn: 'দশ হাজার মানুষ, রাস্তায় আলপনা আর মাইকে আমার নানির গান।' } },
  { id: 's5', name: 'Tania R.', place: { en: 'Rajshahi', bn: 'রাজশাহী' }, pillar: 'people', color: '#A5CD2F', title: { en: 'Coding from the mango belt', bn: 'আমের দেশ থেকে কোডিং' }, body: { en: 'Our team of six builds apps for clients in Germany — without ever leaving Rajshahi.', bn: 'আমাদের ছয়জনের দল রাজশাহী না ছেড়েই জার্মানির ক্লায়েন্টদের জন্য অ্যাপ বানায়।' } },
  { id: 's6', name: 'Joynal K.', place: { en: 'Kuakata', bn: 'কুয়াকাটা' }, pillar: 'tourism', color: '#016171', title: { en: 'Sunrise and sunset, same beach', bn: 'একই সৈকতে সূর্যোদয় ও সূর্যাস্ত' }, body: { en: 'I have photographed 3,000 sunrises here. Every one is different.', bn: 'এখানে আমি ৩,০০০ সূর্যোদয়ের ছবি তুলেছি। প্রতিটিই আলাদা।' } },
]

export const CAMPAIGNS: { slug: string; tag: string; color: string; image: string; title: L; body: L; ends: string }[] = [
  {
    slug: 'my-bangladesh-story', tag: '#MyBangladeshStory', color: '#EF1551', image: '/assets/stories/diaspora.jpg',
    title: { en: 'My Bangladesh Story', bn: 'আমার বাংলাদেশের গল্প' },
    body: { en: 'Tell us, in one photo and 100 words, what Bangladesh means to you. Selected stories will be printed in the year-end issue.', bn: 'একটি ছবি ও ১০০ শব্দে বলুন, বাংলাদেশ আপনার কাছে কী। নির্বাচিত গল্প বর্ষশেষ সংখ্যায় ছাপা হবে।' },
    ends: '2026-12-16',
  },
  {
    slug: 'taste-of-the-delta', tag: '#TasteOfTheDelta', color: '#F68421', image: '/assets/Barishal.jpg',
    title: { en: 'Taste of the Delta', bn: 'ব-দ্বীপের স্বাদ' },
    body: { en: 'Share a family recipe from your district. We are mapping the food of all 64 districts.', bn: 'আপনার জেলার একটি পারিবারিক রেসিপি শেয়ার করুন। আমরা ৬৪ জেলার খাবারের মানচিত্র তৈরি করছি।' },
    ends: '2027-01-31',
  },
]

export const FAQ: { q: L; a: L }[] = [
  { q: { en: 'What is Brand Bangladesh?', bn: 'ব্র্যান্ড বাংলাদেশ কী?' }, a: { en: 'A national storytelling platform and monthly magazine presenting Bangladesh — its people, places, economy and culture — to the world.', bn: 'একটি জাতীয় গল্প বলার প্ল্যাটফর্ম ও মাসিক ম্যাগাজিন, যা বিশ্বের কাছে বাংলাদেশকে — এর মানুষ, স্থান, অর্থনীতি ও সংস্কৃতিকে — তুলে ধরে।' } },
  { q: { en: 'How often is the magazine published?', bn: 'ম্যাগাজিন কত দিন পরপর প্রকাশিত হয়?' }, a: { en: 'Every month, online as a flipbook and web articles, and in print.', bn: 'প্রতি মাসে — অনলাইনে ফ্লিপবুক ও ওয়েব আর্টিকেল হিসেবে এবং মুদ্রিত সংস্করণে।' } },
  { q: { en: 'How do I get the printed hard copy?', bn: 'মুদ্রিত কপি কীভাবে পাব?' }, a: { en: 'Use the “Order hard copy” button on any issue page, or choose “Magazine hard copy / print subscription” on the Contact form. Institutions and embassies can request bulk distribution.', bn: 'যেকোনো সংখ্যার পাতায় “মুদ্রিত কপি অর্ডার” বোতাম ব্যবহার করুন, অথবা যোগাযোগ ফর্মে “ম্যাগাজিনের মুদ্রিত কপি / সাবস্ক্রিপশন” নির্বাচন করুন। প্রতিষ্ঠান ও দূতাবাস একসঙ্গে একাধিক কপির অনুরোধ করতে পারে।' } },
  { q: { en: 'Can I submit my own story?', bn: 'আমি কি নিজের গল্প জমা দিতে পারি?' }, a: { en: 'Yes. Use “Share Your Story” in the Community section. Every submission is reviewed by our moderators before it appears on the Story Wall.', bn: 'হ্যাঁ। কমিউনিটি অংশে “আপনার গল্প বলুন” ব্যবহার করুন। প্রতিটি জমা স্টোরি ওয়ালে প্রকাশের আগে আমাদের মডারেটররা পর্যালোচনা করেন।' } },
  { q: { en: 'Can I use your photos and logos?', bn: 'আপনাদের ছবি ও লোগো কি ব্যবহার করতে পারি?' }, a: { en: 'Approved assets are available in the Media Kit. Please follow the Content Usage Policy and credit Brand Bangladesh.', bn: 'অনুমোদিত উপকরণ মিডিয়া কিটে পাওয়া যায়। কনটেন্ট ব্যবহার নীতি মেনে ব্র্যান্ড বাংলাদেশকে কৃতজ্ঞতা জানান।' } },
  { q: { en: 'Where do your statistics come from?', bn: 'আপনাদের পরিসংখ্যানের উৎস কী?' }, a: { en: 'Every figure on the site shows its official source and reference year — typically BBS, Bangladesh Bank, EPB, BIDA, UNESCO or other authorities.', bn: 'সাইটের প্রতিটি সংখ্যার সঙ্গে সরকারি সূত্র ও বছর উল্লেখ থাকে — সাধারণত বিবিএস, বাংলাদেশ ব্যাংক, ইপিবি, বিডা, ইউনেস্কো বা অন্যান্য কর্তৃপক্ষ।' } },
]

export const LEGAL: Record<string, { title: L; sections: { h: L; p: L }[] }> = {
  privacy: {
    title: { en: 'Privacy Policy', bn: 'গোপনীয়তা নীতি' },
    sections: [
      { h: { en: 'What we collect', bn: 'আমরা কী সংগ্রহ করি' }, p: { en: 'Only what you give us through forms — name, email, country and your message or story — plus anonymous analytics if you accept cookies.', bn: 'ফর্মের মাধ্যমে আপনি যা দেন কেবল তা — নাম, ইমেইল, দেশ এবং আপনার বার্তা বা গল্প — এবং কুকি গ্রহণ করলে বেনামি বিশ্লেষণ তথ্য।' } },
      { h: { en: 'How we use it', bn: 'আমরা কীভাবে ব্যবহার করি' }, p: { en: 'To answer your inquiry, moderate and publish stories you submit, and send newsletters you subscribe to. We never sell personal data.', bn: 'আপনার জিজ্ঞাসার উত্তর দিতে, জমা দেওয়া গল্প পর্যালোচনা ও প্রকাশ করতে এবং সাবস্ক্রাইব করা নিউজলেটার পাঠাতে। আমরা কখনো ব্যক্তিগত তথ্য বিক্রি করি না।' } },
      { h: { en: 'Your rights', bn: 'আপনার অধিকার' }, p: { en: 'You can ask to see, correct or delete your data at any time by writing to privacy@brandbangladesh.gov.bd.', bn: 'privacy@brandbangladesh.gov.bd ঠিকানায় লিখে যেকোনো সময় আপনার তথ্য দেখতে, সংশোধন বা মুছে ফেলার অনুরোধ করতে পারেন।' } },
    ],
  },
  terms: {
    title: { en: 'Terms of Use', bn: 'ব্যবহারের শর্তাবলি' },
    sections: [
      { h: { en: 'Using this site', bn: 'এই সাইট ব্যবহার' }, p: { en: 'Content is provided for information. We work hard to keep it accurate, and every statistic cites its source.', bn: 'তথ্যের জন্য কনটেন্ট সরবরাহ করা হয়। আমরা একে নির্ভুল রাখতে সচেষ্ট এবং প্রতিটি পরিসংখ্যানের সূত্র উল্লেখ করি।' } },
      { h: { en: 'Submissions', bn: 'জমা দেওয়া কনটেন্ট' }, p: { en: 'By submitting a story or photo you confirm it is yours and grant Brand Bangladesh a licence to edit and publish it with credit.', bn: 'গল্প বা ছবি জমা দিয়ে আপনি নিশ্চিত করছেন যে এটি আপনার নিজের এবং ব্র্যান্ড বাংলাদেশকে কৃতজ্ঞতাসহ সম্পাদনা ও প্রকাশের অনুমতি দিচ্ছেন।' } },
    ],
  },
  accessibility: {
    title: { en: 'Accessibility Statement', bn: 'প্রবেশযোগ্যতা বিবৃতি' },
    sections: [
      { h: { en: 'Our commitment', bn: 'আমাদের অঙ্গীকার' }, p: { en: 'We aim to meet WCAG 2.1 AA: keyboard navigation, screen-reader support, sufficient contrast, bilingual alt text and captions on video.', bn: 'আমরা WCAG ২.১ AA মান অর্জনে সচেষ্ট: কিবোর্ড নেভিগেশন, স্ক্রিন-রিডার সমর্থন, যথাযথ কনট্রাস্ট, দ্বিভাষিক বিকল্প লেখা ও ভিডিওতে ক্যাপশন।' } },
      { h: { en: 'Reduced motion', bn: 'কম অ্যানিমেশন' }, p: { en: 'If your device asks for reduced motion, animations are simplified automatically.', bn: 'আপনার ডিভাইসে কম অ্যানিমেশন চালু থাকলে অ্যানিমেশন স্বয়ংক্রিয়ভাবে সহজ হয়ে যায়।' } },
      { h: { en: 'Feedback', bn: 'মতামত' }, p: { en: 'Found a barrier? Tell us through the Contact page and we will respond within five working days.', bn: 'কোনো বাধা পেয়েছেন? যোগাযোগ পাতার মাধ্যমে জানান, আমরা পাঁচ কর্মদিবসের মধ্যে উত্তর দেব।' } },
    ],
  },
  'content-usage': {
    title: { en: 'Content Usage Policy', bn: 'কনটেন্ট ব্যবহার নীতি' },
    sections: [
      { h: { en: 'Editorial use', bn: 'সম্পাদকীয় ব্যবহার' }, p: { en: 'Media may use Media Kit photos and logos for editorial coverage of Bangladesh with the credit “Brand Bangladesh”.', bn: 'বাংলাদেশ বিষয়ক সংবাদ ও প্রতিবেদনে “ব্র্যান্ড বাংলাদেশ” কৃতজ্ঞতাসহ মিডিয়া কিটের ছবি ও লোগো ব্যবহার করা যাবে।' } },
      { h: { en: 'Logo use', bn: 'লোগো ব্যবহার' }, p: { en: 'Do not alter the colours, proportions or spacing of the logo. Follow the Brand Guidelines.', bn: 'লোগোর রং, অনুপাত বা ফাঁকা জায়গা পরিবর্তন করবেন না। ব্র্যান্ড নির্দেশিকা অনুসরণ করুন।' } },
      { h: { en: 'Commercial use', bn: 'বাণিজ্যিক ব্যবহার' }, p: { en: 'Commercial use requires written permission — contact press@brandbangladesh.gov.bd.', bn: 'বাণিজ্যিক ব্যবহারের জন্য লিখিত অনুমতি প্রয়োজন — press@brandbangladesh.gov.bd-তে যোগাযোগ করুন।' } },
    ],
  },
}
