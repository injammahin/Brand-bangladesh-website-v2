import type { L } from '@/lib/i18n'
import type { PillarSlug } from './pillars'

export interface RegionContent {
  slug: string
  photo: string
  /** Divisional HQ coordinates — used to place the division on the interactive map */
  lat: number
  lng: number
  intro: L
  landscape: L
  attractions: L[]
  economy: L
  culture: L
  food: L[]
  people: L[]
  pillars: PillarSlug[]
}

export const REGIONS: Record<string, RegionContent> = {
  dhaka: {
    slug: 'dhaka', photo: '/assets/divisions/dhaka.webp', lat: 23.81, lng: 90.41,
    intro: { en: 'The capital division: a megacity of energy, commerce and creativity, ringed by river towns and old Mughal Dhaka.', bn: 'রাজধানী বিভাগ: শক্তি, বাণিজ্য ও সৃজনশীলতার মহানগর, চারপাশে নদীবন্দর আর মোগল আমলের পুরান ঢাকা।' },
    landscape: { en: 'Flat, fertile floodplain laced by the Buriganga, Shitalakshya and Padma.', bn: 'বুড়িগঙ্গা, শীতলক্ষ্যা ও পদ্মা-বিধৌত সমতল উর্বর প্লাবনভূমি।' },
    attractions: [
      { en: 'Lalbagh Fort', bn: 'লালবাগ কেল্লা' },
      { en: 'Ahsan Manzil', bn: 'আহসান মঞ্জিল' },
      { en: 'Panam Nagar, Sonargaon', bn: 'পানাম নগর, সোনারগাঁও' },
      { en: 'National Parliament House', bn: 'জাতীয় সংসদ ভবন' },
    ],
    economy: { en: 'Garments, services, finance, IT and the country’s largest consumer market.', bn: 'পোশাকশিল্প, সেবা, অর্থ, আইটি এবং দেশের বৃহত্তম ভোক্তাবাজার।' },
    culture: { en: 'Pohela Boishakh at Ramna, Ekushey Book Fair, Jamdani weavers of Rupganj.', bn: 'রমনার পহেলা বৈশাখ, একুশে বইমেলা, রূপগঞ্জের জামদানি তাঁতি।' },
    food: [{ en: 'Kacchi biryani', bn: 'কাচ্চি বিরিয়ানি' }, { en: 'Bakarkhani', bn: 'বাকরখানি' }, { en: 'Morog polao', bn: 'মোরগ পোলাও' }],
    people: [{ en: 'Garment entrepreneurs and start-up founders', bn: 'পোশাক উদ্যোক্তা ও স্টার্টআপ প্রতিষ্ঠাতা' }, { en: 'Artists of Charukala', bn: 'চারুকলার শিল্পীরা' }],
    pillars: ['exports', 'governance', 'investment', 'culture'],
  },
  chattogram: {
    slug: 'chattogram', photo: '/assets/divisions/chattogram.webp', lat: 22.36, lng: 91.78,
    intro: { en: 'Port city, hill tracts and the longest sea beach on earth — the gateway of Bangladesh to the sea.', bn: 'বন্দরনগরী, পার্বত্য অঞ্চল আর পৃথিবীর দীর্ঘতম সমুদ্রসৈকত — সমুদ্রপথে বাংলাদেশের প্রবেশদ্বার।' },
    landscape: { en: 'Coastline, offshore islands and the forested hills of Rangamati, Khagrachhari and Bandarban.', bn: 'উপকূল, দ্বীপ আর রাঙামাটি, খাগড়াছড়ি ও বান্দরবানের বনাচ্ছাদিত পাহাড়।' },
    attractions: [
      { en: "Cox's Bazar sea beach", bn: 'কক্সবাজার সমুদ্রসৈকত' },
      { en: "Saint Martin's Island", bn: 'সেন্টমার্টিন দ্বীপ' },
      { en: 'Kaptai Lake, Rangamati', bn: 'কাপ্তাই হ্রদ, রাঙামাটি' },
      { en: 'Nilgiri, Bandarban', bn: 'নীলগিরি, বান্দরবান' },
    ],
    economy: { en: 'Chattogram Port, shipbuilding, steel, economic zones and tourism.', bn: 'চট্টগ্রাম বন্দর, জাহাজ নির্মাণ, ইস্পাত, অর্থনৈতিক অঞ্চল ও পর্যটন।' },
    culture: { en: 'Mezban feasts, hill community festivals like Boisabi, Maijbhandari music.', bn: 'মেজবান, বৈসাবির মতো পাহাড়ি উৎসব, মাইজভান্ডারী গান।' },
    food: [{ en: 'Mezbani beef', bn: 'মেজবানি মাংস' }, { en: 'Kala bhuna', bn: 'কালা ভুনা' }, { en: 'Bamboo chicken', bn: 'ব্যাম্বু চিকেন' }],
    people: [{ en: 'Seafarers and port workers', bn: 'নাবিক ও বন্দরশ্রমিক' }, { en: 'Hill community artisans', bn: 'পাহাড়ি কারুশিল্পী' }],
    pillars: ['tourism', 'investment', 'exports', 'culture'],
  },
  khulna: {
    slug: 'khulna', photo: '/assets/divisions/khulna.webp', lat: 22.82, lng: 89.55,
    intro: { en: 'Gateway to the Sundarbans and home of the Mosque City of Bagerhat — where the delta meets the sea.', bn: 'সুন্দরবনের প্রবেশদ্বার এবং বাগেরহাটের মসজিদের শহরের আবাস — যেখানে ব-দ্বীপ মেশে সমুদ্রে।' },
    landscape: { en: 'Tidal rivers, mangrove forest and shrimp ponds of the south-west coast.', bn: 'দক্ষিণ-পশ্চিম উপকূলের জোয়ারভাটার নদী, ম্যানগ্রোভ বন ও চিংড়িঘের।' },
    attractions: [
      { en: 'The Sundarbans', bn: 'সুন্দরবন' },
      { en: 'Sixty Dome Mosque, Bagerhat', bn: 'ষাট গম্বুজ মসজিদ, বাগেরহাট' },
      { en: 'Lalon Shah shrine, Kushtia', bn: 'লালন শাহের মাজার, কুষ্টিয়া' },
      { en: 'Shilaidaha Kuthibari', bn: 'শিলাইদহ কুঠিবাড়ি' },
    ],
    economy: { en: 'Mongla Port, shrimp and frozen fish exports, jute mills.', bn: 'মোংলা বন্দর, চিংড়ি ও হিমায়িত মাছ রপ্তানি, পাটকল।' },
    culture: { en: 'Baul music of Lalon, Tagore’s Shilaidaha, Jashore’s nakshi kantha.', bn: 'লালনের বাউল গান, রবীন্দ্রনাথের শিলাইদহ, যশোরের নকশিকাঁথা।' },
    food: [{ en: 'Chui jhal mutton', bn: 'চুইঝাল মাংস' }, { en: 'Golda chingri', bn: 'গলদা চিংড়ি' }, { en: 'Jashore date molasses', bn: 'যশোরের খেজুরের গুড়' }],
    people: [{ en: 'Mouals — Sundarbans honey collectors', bn: 'মৌয়াল — সুন্দরবনের মধু সংগ্রাহক' }, { en: 'Baul musicians of Kushtia', bn: 'কুষ্টিয়ার বাউলশিল্পী' }],
    pillars: ['tourism', 'culture', 'exports'],
  },
  rajshahi: {
    slug: 'rajshahi', photo: '/assets/divisions/rajshahi.webp', lat: 24.37, lng: 88.6,
    intro: { en: 'Silk, mangoes and the ruins of ancient Pundranagar — the heritage heartland of the north-west.', bn: 'রেশম, আম আর প্রাচীন পুণ্ড্রনগরের ধ্বংসাবশেষ — উত্তর-পশ্চিমের ঐতিহ্যের কেন্দ্র।' },
    landscape: { en: 'The Barind tract’s red soil and the wide Padma river.', bn: 'বরেন্দ্র অঞ্চলের লাল মাটি আর প্রশস্ত পদ্মা।' },
    attractions: [
      { en: 'Paharpur Buddhist Vihara', bn: 'পাহাড়পুর বৌদ্ধবিহার' },
      { en: 'Mahasthangarh', bn: 'মহাস্থানগড়' },
      { en: 'Puthia Temple Complex', bn: 'পুঠিয়া মন্দির কমপ্লেক্স' },
      { en: 'Varendra Research Museum', bn: 'বরেন্দ্র গবেষণা জাদুঘর' },
    ],
    economy: { en: 'Mangoes, silk, agriculture and a growing education hub.', bn: 'আম, রেশম, কৃষি এবং বিকাশমান শিক্ষাকেন্দ্র।' },
    culture: { en: 'Gombhira folk performance, Rajshahi silk weaving.', bn: 'গম্ভীরা লোকনাট্য, রাজশাহী সিল্ক বুনন।' },
    food: [{ en: 'Himsagar & Fazli mangoes', bn: 'হিমসাগর ও ফজলি আম' }, { en: 'Bogura doi', bn: 'বগুড়ার দই' }, { en: 'Kalai roti', bn: 'কালাই রুটি' }],
    people: [{ en: 'Silk weavers', bn: 'রেশম তাঁতি' }, { en: 'Mango growers of Chapainawabganj', bn: 'চাঁপাইনবাবগঞ্জের আমচাষি' }],
    pillars: ['culture', 'tourism', 'governance'],
  },
  sylhet: {
    slug: 'sylhet', photo: '/assets/divisions/sylhet.webp', lat: 24.9, lng: 91.87,
    intro: { en: 'Tea gardens, haor wetlands and hills on the edge of Meghalaya — the green north-east.', bn: 'চা-বাগান, হাওর আর মেঘালয়ের কোলঘেঁষা পাহাড় — সবুজ উত্তর-পূর্ব।' },
    landscape: { en: 'Rolling tea hills, swamp forest and vast seasonal wetlands.', bn: 'ঢেউখেলানো চা-পাহাড়, জলাবন ও বিস্তীর্ণ মৌসুমি হাওর।' },
    attractions: [
      { en: 'Sreemangal tea estates', bn: 'শ্রীমঙ্গলের চা-বাগান' },
      { en: 'Ratargul swamp forest', bn: 'রাতারগুল জলাবন' },
      { en: 'Tanguar Haor', bn: 'টাঙ্গুয়ার হাওর' },
      { en: 'Lawachara National Park', bn: 'লাউয়াছড়া জাতীয় উদ্যান' },
    ],
    economy: { en: 'Tea, natural gas, tourism and diaspora investment.', bn: 'চা, প্রাকৃতিক গ্যাস, পর্যটন ও প্রবাসী বিনিয়োগ।' },
    culture: { en: 'Shrines of Hazrat Shah Jalal, Hason Raja’s songs, Manipuri dance.', bn: 'হযরত শাহজালালের মাজার, হাসন রাজার গান, মণিপুরি নৃত্য।' },
    food: [{ en: 'Seven-layer tea', bn: 'সাত রঙের চা' }, { en: 'Shatkora beef', bn: 'সাতকরা দিয়ে গরুর মাংস' }, { en: 'Haor fish', bn: 'হাওরের মাছ' }],
    people: [{ en: 'Tea garden workers', bn: 'চা-শ্রমিক' }, { en: 'The Londoni diaspora', bn: 'লন্ডনী প্রবাসী' }],
    pillars: ['tourism', 'people', 'exports'],
  },
  barishal: {
    slug: 'barishal', photo: '/assets/divisions/barishal.webp', lat: 22.7, lng: 90.37,
    intro: { en: 'The Venice of Bengal — floating markets, river launches and the twin sunrise-sunset beach of Kuakata.', bn: 'বাংলার ভেনিস — ভাসমান বাজার, নদীর লঞ্চ আর সূর্যোদয়-সূর্যাস্তের সৈকত কুয়াকাটা।' },
    landscape: { en: 'A labyrinth of rivers, canals and coastal islands.', bn: 'নদী, খাল ও উপকূলীয় দ্বীপের গোলকধাঁধা।' },
    attractions: [
      { en: 'Kuakata beach', bn: 'কুয়াকাটা সৈকত' },
      { en: 'Bhimruli floating guava market', bn: 'ভীমরুলি ভাসমান পেয়ারা বাজার' },
      { en: 'Durga Sagar', bn: 'দুর্গাসাগর' },
      { en: 'Guthia Mosque', bn: 'গুঠিয়া মসজিদ' },
    ],
    economy: { en: 'Hilsa fisheries, rice, river transport and the Payra port.', bn: 'ইলিশ আহরণ, ধান, নৌপরিবহন ও পায়রা বন্দর।' },
    culture: { en: 'Poet Jibanananda Das’s homeland, boat races and river songs.', bn: 'কবি জীবনানন্দ দাশের জন্মভূমি, নৌকাবাইচ ও ভাটিয়ালি গান।' },
    food: [{ en: 'Hilsa', bn: 'ইলিশ' }, { en: 'Amra', bn: 'আমড়া' }, { en: 'Buffalo-milk curd of Bhola', bn: 'ভোলার মহিষের দই' }],
    people: [{ en: 'Hilsa fishers', bn: 'ইলিশ জেলে' }, { en: 'Boat builders', bn: 'নৌকা নির্মাতা' }],
    pillars: ['tourism', 'culture', 'exports'],
  },
  rangpur: {
    slug: 'rangpur', photo: '/assets/divisions/rangpur.webp', lat: 25.74, lng: 89.25,
    intro: { en: 'The northern frontier of terracotta temples, tobacco fields and the Teesta river.', bn: 'টেরাকোটা মন্দির, শস্যক্ষেত ও তিস্তা নদীর উত্তর সীমান্ত।' },
    landscape: { en: 'Fertile plains running up to the Himalayan foothills — Kanchenjunga is visible from Panchagarh.', bn: 'হিমালয়ের পাদদেশ পর্যন্ত বিস্তৃত উর্বর সমভূমি — পঞ্চগড় থেকে দেখা যায় কাঞ্চনজঙ্ঘা।' },
    attractions: [
      { en: 'Kantajew Temple, Dinajpur', bn: 'কান্তজিউ মন্দির, দিনাজপুর' },
      { en: 'Tajhat Palace', bn: 'তাজহাট জমিদারবাড়ি' },
      { en: 'Tetulia, Panchagarh', bn: 'তেঁতুলিয়া, পঞ্চগড়' },
      { en: 'Begum Rokeya Memorial', bn: 'বেগম রোকেয়া স্মৃতিকেন্দ্র' },
    ],
    economy: { en: 'Rice, potatoes, tea in Panchagarh and the Shataranji weaving cluster.', bn: 'ধান, আলু, পঞ্চগড়ের চা এবং শতরঞ্জি বুনন।' },
    culture: { en: 'Bhawaiya songs and the legacy of Begum Rokeya.', bn: 'ভাওয়াইয়া গান ও বেগম রোকেয়ার উত্তরাধিকার।' },
    food: [{ en: 'Shidol bhorta', bn: 'সিদল ভর্তা' }, { en: 'Haribhanga mango', bn: 'হাঁড়িভাঙা আম' }, { en: 'Kataribhog rice', bn: 'কাটারিভোগ চাল' }],
    people: [{ en: 'Shataranji weavers', bn: 'শতরঞ্জি তাঁতি' }, { en: 'Bhawaiya singers', bn: 'ভাওয়াইয়া শিল্পী' }],
    pillars: ['culture', 'people', 'exports'],
  },
  mymensingh: {
    slug: 'mymensingh', photo: '/assets/divisions/mymensingh.webp', lat: 24.75, lng: 90.41,
    intro: { en: 'The land of ballads — the Brahmaputra’s old course, Garo hills and a centre of agricultural science.', bn: 'গীতিকার দেশ — পুরাতন ব্রহ্মপুত্র, গারো পাহাড় আর কৃষিবিজ্ঞানের কেন্দ্র।' },
    landscape: { en: 'River plains rising to the Garo hills along the northern border.', bn: 'নদীবিধৌত সমভূমি, যা উত্তর সীমান্তে গারো পাহাড়ে উঠেছে।' },
    attractions: [
      { en: 'Shilpacharya Zainul Abedin Museum', bn: 'শিল্পাচার্য জয়নুল আবেদিন সংগ্রহশালা' },
      { en: 'Birishiri & Bijoypur', bn: 'বিরিশিরি ও বিজয়পুর' },
      { en: 'Muktagachha Zamindar Bari', bn: 'মুক্তাগাছা জমিদারবাড়ি' },
      { en: 'Gajni, Sherpur', bn: 'গজনী, শেরপুর' },
    ],
    economy: { en: 'Agriculture, fisheries and Bangladesh Agricultural University research.', bn: 'কৃষি, মৎস্য এবং বাংলাদেশ কৃষি বিশ্ববিদ্যালয়ের গবেষণা।' },
    culture: { en: 'Mymensingh Gitika ballads and Garo Wangala festival.', bn: 'মৈমনসিংহ গীতিকা ও গারোদের ওয়ানগালা উৎসব।' },
    food: [{ en: 'Muktagachha monda', bn: 'মুক্তাগাছার মণ্ডা' }, { en: 'Chhana', bn: 'ছানা' }, { en: 'Netrokona balish mishti', bn: 'নেত্রকোনার বালিশ মিষ্টি' }],
    people: [{ en: 'Agricultural scientists', bn: 'কৃষিবিজ্ঞানী' }, { en: 'Garo community artists', bn: 'গারো শিল্পী' }],
    pillars: ['people', 'culture', 'investment'],
  },
}

/** Bangla names for all 64 districts */
export const DISTRICT_BN: Record<string, string> = {
  Dinajpur: 'দিনাজপুর', Gaibandha: 'গাইবান্ধা', Kurigram: 'কুড়িগ্রাম', Lalmonirhat: 'লালমনিরহাট', Nilphamari: 'নীলফামারী', Panchagarh: 'পঞ্চগড়', Rangpur: 'রংপুর', Thakurgaon: 'ঠাকুরগাঁও',
  Bogura: 'বগুড়া', Joypurhat: 'জয়পুরহাট', Naogaon: 'নওগাঁ', Natore: 'নাটোর', Chapainawabganj: 'চাঁপাইনবাবগঞ্জ', Pabna: 'পাবনা', Rajshahi: 'রাজশাহী', Sirajganj: 'সিরাজগঞ্জ',
  Jamalpur: 'জামালপুর', Mymensingh: 'ময়মনসিংহ', Netrokona: 'নেত্রকোনা', Sherpur: 'শেরপুর',
  Habiganj: 'হবিগঞ্জ', Moulvibazar: 'মৌলভীবাজার', Sunamganj: 'সুনামগঞ্জ', Sylhet: 'সিলেট',
  Bagerhat: 'বাগেরহাট', Chuadanga: 'চুয়াডাঙ্গা', Jashore: 'যশোর', Jhenaidah: 'ঝিনাইদহ', Khulna: 'খুলনা', Kushtia: 'কুষ্টিয়া', Magura: 'মাগুরা', Meherpur: 'মেহেরপুর', Narail: 'নড়াইল', Satkhira: 'সাতক্ষীরা',
  Dhaka: 'ঢাকা', Faridpur: 'ফরিদপুর', Gazipur: 'গাজীপুর', Gopalganj: 'গোপালগঞ্জ', Kishoreganj: 'কিশোরগঞ্জ', Madaripur: 'মাদারীপুর', Manikganj: 'মানিকগঞ্জ', Munshiganj: 'মুন্সীগঞ্জ', Narayanganj: 'নারায়ণগঞ্জ', Narsingdi: 'নরসিংদী', Rajbari: 'রাজবাড়ী', Shariatpur: 'শরীয়তপুর', Tangail: 'টাঙ্গাইল',
  Barguna: 'বরগুনা', Barishal: 'বরিশাল', Bhola: 'ভোলা', Jhalokati: 'ঝালকাঠি', Patuakhali: 'পটুয়াখালী', Pirojpur: 'পিরোজপুর',
  Bandarban: 'বান্দরবান', Brahmanbaria: 'ব্রাহ্মণবাড়িয়া', Chandpur: 'চাঁদপুর', Chattogram: 'চট্টগ্রাম', "Cox's Bazar": 'কক্সবাজার', Cumilla: 'কুমিল্লা', Feni: 'ফেনী', Khagrachhari: 'খাগড়াছড়ি', Lakshmipur: 'লক্ষ্মীপুর', Noakhali: 'নোয়াখালী', Rangamati: 'রাঙামাটি',
}

export const districtSlug = (name: string) => name.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '')
