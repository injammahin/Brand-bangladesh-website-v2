import type { L } from '@/lib/i18n'

/**
 * Extra facts for the division pages.
 * population: BBS Population & Housing Census 2022.
 * travel: approximate journey times from Dhaka — confirm with the client's tourism desk before launch.
 * attractionPhotos: real photo key per attraction (same order as REGIONS[slug].attractions); null = no accurate photo yet.
 * life: photo keys for the Economy / Culture / Food / People tabs.
 */
export const REGION_EXTRA: Record<string, {
  population: number
  hq: L
  rivers: L[]
  best: L
  travel: L
  attractionPhotos: (string | null)[]
  life: [string, string, string, string]
}> = {
  dhaka: {
    population: 44215107, hq: { en: 'Dhaka', bn: 'ঢাকা' },
    rivers: [{ en: 'Buriganga', bn: 'বুড়িগঙ্গা' }, { en: 'Shitalakshya', bn: 'শীতলক্ষ্যা' }, { en: 'Padma', bn: 'পদ্মা' }, { en: 'Meghna', bn: 'মেঘনা' }],
    best: { en: 'November to February — and mid-April for Pohela Boishakh', bn: 'নভেম্বর থেকে ফেব্রুয়ারি — আর পহেলা বৈশাখের জন্য এপ্রিলের মাঝামাঝি' },
    travel: { en: 'The capital and main international gateway — Hazrat Shahjalal International Airport', bn: 'রাজধানী ও প্রধান আন্তর্জাতিক প্রবেশদ্বার — হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর' },
    attractionPhotos: ['lalbagh_3', 'ahsan_2', null, 'sangsad_0'],
    life: ['garment_0', 'jamdani_0', 'food_2', 'metro_2'],
  },
  chattogram: {
    population: 33202326, hq: { en: 'Chattogram', bn: 'চট্টগ্রাম' },
    rivers: [{ en: 'Karnaphuli', bn: 'কর্ণফুলী' }, { en: 'Sangu', bn: 'সাঙ্গু' }, { en: 'Halda', bn: 'হালদা' }, { en: 'Matamuhuri', bn: 'মাতামুহুরী' }],
    best: { en: 'November to March — beaches and hills at their clearest', bn: 'নভেম্বর থেকে মার্চ — সৈকত আর পাহাড় তখন সবচেয়ে স্বচ্ছ' },
    travel: { en: 'About 1 hour by air from Dhaka · 5–6 hours by road or rail', bn: 'ঢাকা থেকে আকাশপথে প্রায় ১ ঘণ্টা · সড়ক বা রেলপথে ৫–৬ ঘণ্টা' },
    attractionPhotos: ['cox_1', 'stmartin_0', 'kaptai_2', 'bandar_1'],
    life: ['ctgport_0', 'boishakh_1', 'food_2', 'fisher_2'],
  },
  khulna: {
    population: 17416645, hq: { en: 'Khulna', bn: 'খুলনা' },
    rivers: [{ en: 'Rupsha', bn: 'রূপসা' }, { en: 'Pasur', bn: 'পশুর' }, { en: 'Bhairab', bn: 'ভৈরব' }, { en: 'Madhumati', bn: 'মধুমতী' }],
    best: { en: 'November to February — the calm season for the Sundarbans', bn: 'নভেম্বর থেকে ফেব্রুয়ারি — সুন্দরবন ভ্রমণের শান্ত মৌসুম' },
    travel: { en: 'About 45 minutes by air to Jashore · 4–5 hours by road across the Padma Bridge', bn: 'যশোর পর্যন্ত আকাশপথে প্রায় ৪৫ মিনিট · পদ্মা সেতু হয়ে সড়কপথে ৪–৫ ঘণ্টা' },
    attractionPhotos: ['sund_2', 'bagerhat_1', null, null],
    life: ['fisher_3', 'baul_1', 'hilsa_1', 'fisher_2'],
  },
  rajshahi: {
    population: 20353119, hq: { en: 'Rajshahi', bn: 'রাজশাহী' },
    rivers: [{ en: 'Padma', bn: 'পদ্মা' }, { en: 'Jamuna', bn: 'যমুনা' }, { en: 'Atrai', bn: 'আত্রাই' }, { en: 'Mahananda', bn: 'মহানন্দা' }],
    best: { en: 'May to July for mangoes · November to February for heritage sites', bn: 'আমের জন্য মে থেকে জুলাই · ঐতিহ্যস্থানের জন্য নভেম্বর থেকে ফেব্রুয়ারি' },
    travel: { en: 'About 45 minutes by air from Dhaka · 5–6 hours by road or rail', bn: 'ঢাকা থেকে আকাশপথে প্রায় ৪৫ মিনিট · সড়ক বা রেলপথে ৫–৬ ঘণ্টা' },
    attractionPhotos: ['paharpur_1', null, null, null],
    life: ['mango_2', 'boishakh_2', 'food_2', 'paddy_3'],
  },
  sylhet: {
    population: 11034863, hq: { en: 'Sylhet', bn: 'সিলেট' },
    rivers: [{ en: 'Surma', bn: 'সুরমা' }, { en: 'Kushiyara', bn: 'কুশিয়ারা' }, { en: 'Piyain', bn: 'পিয়াইন' }],
    best: { en: 'June to October for haors and waterfalls · November to February for tea trails', bn: 'হাওর আর ঝরনার জন্য জুন থেকে অক্টোবর · চা-বাগানের পথে নভেম্বর থেকে ফেব্রুয়ারি' },
    travel: { en: 'About 45 minutes by air from Dhaka · 5–6 hours by road or rail', bn: 'ঢাকা থেকে আকাশপথে প্রায় ৪৫ মিনিট · সড়ক বা রেলপথে ৫–৬ ঘণ্টা' },
    attractionPhotos: ['tea_3', 'ratar_1', null, null],
    life: ['tealeaf_0', 'baul_3', 'food_2', 'tea_3'],
  },
  barishal: {
    population: 9100102, hq: { en: 'Barishal', bn: 'বরিশাল' },
    rivers: [{ en: 'Kirtankhola', bn: 'কীর্তনখোলা' }, { en: 'Meghna', bn: 'মেঘনা' }, { en: 'Tentulia', bn: 'তেঁতুলিয়া' }, { en: 'Bishkhali', bn: 'বিষখালী' }],
    best: { en: 'July to September for the floating markets · November to February for Kuakata', bn: 'ভাসমান বাজারের জন্য জুলাই থেকে সেপ্টেম্বর · কুয়াকাটার জন্য নভেম্বর থেকে ফেব্রুয়ারি' },
    travel: { en: 'About 45 minutes by air · 3–4 hours by road across the Padma Bridge · or an overnight river launch', bn: 'আকাশপথে প্রায় ৪৫ মিনিট · পদ্মা সেতু হয়ে সড়কপথে ৩–৪ ঘণ্টা · অথবা রাতের লঞ্চে নদীপথে' },
    attractionPhotos: [null, 'guava_2', null, null],
    life: ['hilsa_0', 'boatrace_1', 'guava_2', 'fisher_3'],
  },
  rangpur: {
    population: 17610956, hq: { en: 'Rangpur', bn: 'রংপুর' },
    rivers: [{ en: 'Teesta', bn: 'তিস্তা' }, { en: 'Dharla', bn: 'ধরলা' }, { en: 'Brahmaputra', bn: 'ব্রহ্মপুত্র' }, { en: 'Karatoya', bn: 'করতোয়া' }],
    best: { en: 'October and November — clear skies and Kanchenjunga views from Tetulia', bn: 'অক্টোবর ও নভেম্বর — পরিষ্কার আকাশ আর তেঁতুলিয়া থেকে কাঞ্চনজঙ্ঘার দেখা' },
    travel: { en: 'About 1 hour by air to Saidpur · 7–8 hours by road', bn: 'সৈয়দপুর পর্যন্ত আকাশপথে প্রায় ১ ঘণ্টা · সড়কপথে ৭–৮ ঘণ্টা' },
    attractionPhotos: ['kantajew_3', 'tajhat_2', null, null],
    life: ['paddy_0', 'kantajew_1', 'mango_2', 'kids_0'],
  },
  mymensingh: {
    population: 12225498, hq: { en: 'Mymensingh', bn: 'ময়মনসিংহ' },
    rivers: [{ en: 'Old Brahmaputra', bn: 'পুরাতন ব্রহ্মপুত্র' }, { en: 'Kangsha', bn: 'কংস' }, { en: 'Someshwari', bn: 'সোমেশ্বরী' }],
    best: { en: 'November to February', bn: 'নভেম্বর থেকে ফেব্রুয়ারি' },
    travel: { en: 'About 3 hours from Dhaka by road or rail', bn: 'ঢাকা থেকে সড়ক বা রেলপথে প্রায় ৩ ঘণ্টা' },
    attractionPhotos: [null, null, null, null],
    life: ['paddy_3', 'nakshi_0', 'food_2', 'student_3'],
  },
}
