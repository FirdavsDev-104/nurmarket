/**
 * PIYOZ MARKET - Rich Realistic Products Dataset (44+ products)
 * Realistic pricing in UZS, installment calculation, multilingual attributes, multiple gallery photos, specs & colors.
 */

const PIYOZ_FALLBACK_IMAGE = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%3Crect%20fill%3D%22%23F3F4F6%22%20width%3D%22400%22%20height%3D%22400%22%2F%3E%3Cpath%20fill%3D%22%237000FF%22%20opacity%3D%220.3%22%20d%3D%22M200%20120c-44.2%200-80%2035.8-80%2080s35.8%2080%2080%2080%2080-35.8%2080-80-35.8-80-80-80zm0%20120c-22.1%200-40-17.9-40-40s17.9-40%2040-40%2040%2017.9%2040%2040-17.9%2040-40%2040z%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2272%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%237000FF%22%20font-family%3D%22sans-serif%22%20font-weight%3D%22bold%22%20font-size%3D%2218%22%3EPIYOZ%20MARKET%3C%2Ftext%3E%3C%2Fsvg%3E";

const PIYOZ_PRODUCTS = [
  // --- SMARTPHONES (4) ---
  {
    id: "p101",
    category: "smartphones",
    brand: "Apple",
    name: {
      uz: "Smartfon Apple iPhone 15 Pro 128GB Natural Titanium",
      ru: "Смартфон Apple iPhone 15 Pro 128GB Natural Titanium",
      en: "Smartphone Apple iPhone 15 Pro 128GB Natural Titanium"
    },
    description: {
      uz: "Aero-kosmik toifadagi titan korpus, A17 Pro kuchli protsessori, 48 MP professional kamera tizimi va Action tugmasi bilan jihozlangan flagman smartfon.",
      ru: "Флагманский смартфон в прочном титановом корпусе с инновационным процессором A17 Pro, кнопкой действия и системой камер 48 Мп профессионального уровня.",
      en: "Flagship smartphone crafted in aerospace-grade titanium, powered by the A17 Pro chip, customizable Action button, and 48MP pro camera system."
    },
    price: 14299000,
    oldPrice: 16999000,
    discount: 16,
    rating: 4.9,
    reviewsCount: 1420,
    badge: "bestseller",
    isFlashSale: true,
    isPopular: true,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Natural Titanium", hex: "#9E978E" },
      { name: "Blue Titanium", hex: "#3B4454" },
      { name: "Black Titanium", hex: "#232426" },
      { name: "White Titanium", hex: "#E8E7E3" }
    ],
    sizes: ["128 GB", "256 GB", "512 GB", "1 TB"],
    specs: {
      "Ekran": "6.1\" Super Retina XDR OLED, 120Hz",
      "Protsessor": "Apple A17 Pro (3 nm)",
      "Asosiy kamera": "48 MP + 12 MP + 12 MP",
      "Batareya": "3274 mAh, MagSafe tezkor quvvatlash",
      "Kafolat": "1 yil rasmiy Apple kafolati"
    }
  },
  {
    id: "p102",
    category: "smartphones",
    brand: "Samsung",
    name: {
      uz: "Smartfon Samsung Galaxy S24 Ultra 12/512GB Titanium Gray",
      ru: "Смартфон Samsung Galaxy S24 Ultra 12/512GB Titanium Gray",
      en: "Smartphone Samsung Galaxy S24 Ultra 12/512GB Titanium Gray"
    },
    description: {
      uz: "Galaxy AI sun'iy intellekt xususiyatlari, o'rnatilgan S Pen ruchkasi, 200 MP ajoyib kamera va yaltiramaydigan titan ekran bilan ta'minlangan.",
      ru: "Встроенный искусственный интеллект Galaxy AI, стилус S Pen, непревзойденная камера 200 Мп и антибликовый экран с титановой рамкой.",
      en: "Powered by Galaxy AI, integrated S Pen, revolutionary 200MP camera system, and glare-free titanium display."
    },
    price: 15450000,
    oldPrice: 17800000,
    discount: 13,
    rating: 4.8,
    reviewsCount: 890,
    badge: "express",
    isFlashSale: false,
    isPopular: true,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Titanium Gray", hex: "#7E7F83" },
      { name: "Titanium Black", hex: "#2B2B2D" },
      { name: "Titanium Violet", hex: "#5C5669" }
    ],
    sizes: ["256 GB", "512 GB", "1 TB"],
    specs: {
      "Ekran": "6.8\" Dynamic LTPO AMOLED 2X, 120Hz",
      "Protsessor": "Snapdragon 8 Gen 3 for Galaxy",
      "Kamera": "200 MP + 50 MP + 12 MP + 10 MP",
      "Batareya": "5000 mAh, 45W quvvatlash"
    }
  },
  {
    id: "p103",
    category: "smartphones",
    brand: "Xiaomi",
    name: {
      uz: "Smartfon Xiaomi Redmi Note 13 Pro+ 5G 12/512GB Midnight Black",
      ru: "Смартфон Xiaomi Redmi Note 13 Pro+ 5G 12/512GB Midnight Black",
      en: "Smartphone Xiaomi Redmi Note 13 Pro+ 5G 12/512GB Midnight Black"
    },
    description: {
      uz: "200 MP optik barqarorlashtirishli kamera, 120W giper-tezkor quvvatlash va IP68 suvdan himoya bilan o'rta toifadagi eng zo'r smartfon.",
      ru: "Камера 200 Мп с оптической стабилизацией, гиперзарядка 120 Вт и влагозащита IP68. Лучший баланс цены и возможностей.",
      en: "200MP OIS camera, blistering 120W HyperCharge, IP68 water resistance, and crystal-clear curved AMOLED display."
    },
    price: 4699000,
    oldPrice: 5499000,
    discount: 15,
    rating: 4.8,
    reviewsCount: 2150,
    badge: "express",
    isFlashSale: true,
    isPopular: true,
    isRecommended: false,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02560?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Midnight Black", hex: "#1C1C1E" },
      { name: "Aurora Purple", hex: "#B8A3D8" },
      { name: "Moonlight White", hex: "#EAEAEB" }
    ],
    sizes: ["256 GB", "512 GB"],
    specs: {
      "Ekran": "6.67\" Curved CrystalRes AMOLED, 120Hz",
      "Protsessor": "MediaTek Dimensity 7200-Ultra",
      "Kamera": "200 MP (OIS) + 8 MP + 2 MP",
      "Quvvatlash": "120W (19 daqiqada 100%)"
    }
  },
  {
    id: "p104",
    category: "smartphones",
    brand: "Honor",
    name: {
      uz: "Smartfon Honor Magic 6 Pro 12/512GB Epi Green",
      ru: "Смартфон Honor Magic 6 Pro 12/512GB Epi Green",
      en: "Smartphone Honor Magic 6 Pro 12/512GB Epi Green"
    },
    description: {
      uz: "DXOMARK reytingida 1-o'rindagi kamera, 180 MP periskop telefoto, kremniy-uglerodli 5600 mAh batareya va o'ta mustahkam ekran shishasi.",
      ru: "Лидер рейтинга DXOMARK, перископический зум 180 Мп, кремний-углеродная батарея 5600 мАч и суперпрочное стекло NanoCrystal.",
      en: "Industry-leading camera with 180MP telephoto periscope lens, robust 5600mAh silicon-carbon battery, and NanoCrystal glass."
    },
    price: 11990000,
    oldPrice: 13500000,
    discount: 11,
    rating: 4.9,
    reviewsCount: 320,
    badge: "new",
    isFlashSale: false,
    isPopular: false,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Epi Green", hex: "#3A5C52" },
      { name: "Black", hex: "#181818" }
    ],
    sizes: ["512 GB"],
    specs: {
      "Ekran": "6.8\" LTPO OLED, 5000 nit eng yorqin",
      "Protsessor": "Snapdragon 8 Gen 3",
      "Kamera": "50 MP + 180 MP + 50 MP",
      "Batareya": "5600 mAh, 80W simli, 66W simsiz"
    }
  },

  // --- ELECTRONICS & AUDIO & WEARABLES (5) ---
  {
    id: "p105",
    category: "electronics",
    brand: "Apple",
    name: {
      uz: "Simsiz quloqchin Apple AirPods Pro 2 (USB-C)",
      ru: "Беспроводные наушники Apple AirPods Pro 2 (USB-C)",
      en: "Wireless Earbuds Apple AirPods Pro 2 (USB-C)"
    },
    description: {
      uz: "2 barobar samarali shovqinni bekor qilish (ANC), shaffoflik rejimi, moslashuvchan ovoz va USB-C zaryadlash qutisi bilan.",
      ru: "В два раза мощнее активное шумоподавление, режим прозрачности, адаптивное аудио и современный кейс с зарядкой USB-C.",
      en: "Pro-level Active Noise Cancellation, Adaptive Audio, Transparency mode, and USB-C MagSafe charging case."
    },
    price: 2990000,
    oldPrice: 3600000,
    discount: 17,
    rating: 4.9,
    reviewsCount: 3410,
    badge: "bestseller",
    isFlashSale: true,
    isPopular: true,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Oq / White", hex: "#F5F5F7" }
    ],
    sizes: ["Standard"],
    specs: {
      "Chipi": "Apple H2 audio chip",
      "Shovqinni bostirish": "Faol ANC + Adaptive Audio",
      "Ishlash vaqti": "Keys bilan 30 soatgacha",
      "Himoya": "IP54 chang va suvdan himoyalangan"
    }
  },
  {
    id: "p106",
    category: "electronics",
    brand: "Sony",
    name: {
      uz: "Simsiz to'liq o'lchamli quloqchin Sony WH-1000XM5 Black",
      ru: "Беспроводные полноразмерные наушники Sony WH-1000XM5 Black",
      en: "Wireless Over-Ear Headphones Sony WH-1000XM5 Black"
    },
    description: {
      uz: "Dunyoning eng mashhur shovqinni yo'qotuvchi quloqchini. 8 ta mikrofon, LDAC yuqori aniqlikdagi audio va 30 soat avtonom ishlash.",
      ru: "Флагманское шумоподавление с 8 микрофонами, поддержка Hi-Res Audio LDAC и до 30 часов кристально чистого воспроизведения.",
      en: "Industry-leading noise canceling with two processors and 8 microphones, Hi-Res Audio support, and 30-hour battery life."
    },
    price: 4450000,
    oldPrice: 5200000,
    discount: 14,
    rating: 4.9,
    reviewsCount: 640,
    badge: "express",
    isFlashSale: false,
    isPopular: true,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Black", hex: "#1E1E1E" },
      { name: "Silver", hex: "#D6D3CD" }
    ],
    sizes: ["Over-Ear"],
    specs: {
      "Drayver": "30 mm maxsus uglerod tolali",
      "Shovqin yo'qotish": "Dual Processor QN1 & V1",
      "Avtonomiya": "30 soat (ANC bilan)",
      "Tez quvvatlash": "3 daqiqada 3 soat musiqa"
    }
  },
  {
    id: "p107",
    category: "electronics",
    brand: "Samsung",
    name: {
      uz: "Aqlli soat Samsung Galaxy Watch 6 Classic 47mm Black",
      ru: "Смарт-часы Samsung Galaxy Watch 6 Classic 47mm Black",
      en: "Smartwatch Samsung Galaxy Watch 6 Classic 47mm Black"
    },
    description: {
      uz: "Aylanuvchi mexanik bezel, safir shisha, EKG, qon bosimi va uyqu sifatini chuqur tahlil qilish imkoniyatlari.",
      ru: "Фирменный вращающийся безель, сапфировое стекло, измерение ЭКГ, давления и продвинутый анализ фаз сна.",
      en: "Iconic rotating bezel, sapphire crystal display, ECG, blood pressure monitoring, and advanced sleep coaching."
    },
    price: 3650000,
    oldPrice: 4200000,
    discount: 13,
    rating: 4.7,
    reviewsCount: 480,
    badge: "express",
    isFlashSale: false,
    isPopular: true,
    isRecommended: false,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Black", hex: "#222222" },
      { name: "Silver", hex: "#C8C9CE" }
    ],
    sizes: ["43 mm", "47 mm"],
    specs: {
      "Ekran": "1.5\" Super AMOLED, Sapphire Glass",
      "Datchiklar": "BioActive (EKG, puls, BIA)",
      "OS": "Wear OS Powered by Samsung",
      "Suvdan himoya": "5ATM + IP68 + MIL-STD-810H"
    }
  },
  {
    id: "p108",
    category: "electronics",
    brand: "JBL",
    name: {
      uz: "Portativ akustika JBL Charge 5 Squad Bluetooth Kolonka",
      ru: "Портативная акустика JBL Charge 5 Squad Bluetooth Колонка",
      en: "Portable Bluetooth Speaker JBL Charge 5 Squad"
    },
    description: {
      uz: "Kuchli bas, to'liq IP67 chang va suv o'tkazmasligi, 20 soat o'ynash vaqti hamda boshqa gadjetlarni zaryadlovchi Powerbank funksiyasi.",
      ru: "Мощный фирменный звук JBL Original Pro, пыле- и водонепроницаемость IP67, до 20 часов работы и функция пауэрбанка.",
      en: "Bold JBL Original Pro Sound, IP67 waterproof and dustproof, 20 hours of playtime, and built-in powerbank."
    },
    price: 1890000,
    oldPrice: 2300000,
    discount: 18,
    rating: 4.9,
    reviewsCount: 1820,
    badge: "express",
    isFlashSale: true,
    isPopular: true,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Squad Camo", hex: "#5D6550" },
      { name: "Black", hex: "#1C1C1C" },
      { name: "Blue", hex: "#2B4C7E" },
      { name: "Red", hex: "#B82828" }
    ],
    sizes: ["Standard"],
    specs: {
      "Quvvat": "30W RMS woofer + 10W RMS tweeter",
      "Avtonomiya": "20 soat",
      "Himoya": "IP67 to'liq suvga chidamli",
      "Ulanish": "Bluetooth 5.1, PartyBoost"
    }
  },
  {
    id: "p109",
    category: "electronics",
    brand: "Apple",
    name: {
      uz: "Planshet Apple iPad Air 11\" M2 128GB Wi-Fi Space Gray",
      ru: "Планшет Apple iPad Air 11\" M2 128GB Wi-Fi Space Gray",
      en: "Tablet Apple iPad Air 11\" M2 128GB Wi-Fi Space Gray"
    },
    description: {
      uz: "Apple M2 kuchli protsessori, ajoyib Liquid Retina ekrani, Apple Pencil Pro va Magic Keyboard qo'llab-quvvatlashi bilan yangi iPad Air.",
      ru: "Мощный чип M2, потрясающий дисплей Liquid Retina, поддержка Apple Pencil Pro и клавиатуры Magic Keyboard.",
      en: "Supercharged by the M2 chip, stunning Liquid Retina display, and landscape front camera perfect for video calls."
    },
    price: 8490000,
    oldPrice: 9600000,
    discount: 12,
    rating: 4.9,
    reviewsCount: 310,
    badge: "new",
    isFlashSale: false,
    isPopular: false,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Space Gray", hex: "#4B4846" },
      { name: "Starlight", hex: "#E5E1D8" },
      { name: "Purple", hex: "#D1CDDA" },
      { name: "Blue", hex: "#C7D1D9" }
    ],
    sizes: ["128 GB", "256 GB", "512 GB"],
    specs: {
      "Ekran": "11\" Liquid Retina, True Tone, P3",
      "Protsessor": "Apple M2 (8 yadroli CPU, 10 yadroli GPU)",
      "Kamera": "12 MP old va orqa",
      "Ulanish": "Wi-Fi 6E, Bluetooth 5.3"
    }
  },

  // --- COMPUTERS & LAPTOPS (4) ---
  {
    id: "p110",
    category: "computers",
    brand: "Apple",
    name: {
      uz: "Noutbuk Apple MacBook Air 13\" M3 8/256GB Midnight",
      ru: "Ноутбук Apple MacBook Air 13\" M3 8/256GB Midnight",
      en: "Laptop Apple MacBook Air 13\" M3 8/256GB Midnight"
    },
    description: {
      uz: "O'ta yengil va ixcham alyuminiy korpus, yangi avlod M3 protsessori, 18 soatlik avtonom quvvat va sokin fensiz dizayn.",
      ru: "Невероятно тонкий алюминиевый корпус, передовой процессор M3, до 18 часов автономной работы и бесшумная работа без вентилятора.",
      en: "Strikingly thin design, blazing-fast M3 chip, up to 18 hours of battery life, and whisper-quiet fanless cooling."
    },
    price: 13990000,
    oldPrice: 15800000,
    discount: 11,
    rating: 4.9,
    reviewsCount: 780,
    badge: "bestseller",
    isFlashSale: false,
    isPopular: true,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Midnight", hex: "#1E2430" },
      { name: "Space Gray", hex: "#525459" },
      { name: "Silver", hex: "#E3E4E6" },
      { name: "Starlight", hex: "#F0E4D2" }
    ],
    sizes: ["8GB / 256GB", "16GB / 512GB"],
    specs: {
      "Ekran": "13.6\" Liquid Retina, 500 nit yorqinlik",
      "Protsessor": "Apple M3 (8-core CPU / 8-core GPU)",
      "Vazni": "1.24 kg",
      "Avtonomiya": "18 soatgacha"
    }
  },
  {
    id: "p111",
    category: "computers",
    brand: "Asus",
    name: {
      uz: "O'yin noutbuki Asus ROG Zephyrus G16 OLED Core Ultra 9 / RTX 4070",
      ru: "Игровой ноутбук Asus ROG Zephyrus G16 OLED Core Ultra 9 / RTX 4070",
      en: "Gaming Laptop Asus ROG Zephyrus G16 OLED Core Ultra 9 / RTX 4070"
    },
    description: {
      uz: "2.5K 240Hz ROG Nebula OLED ekrani, Intel Core Ultra 9 protsessori va NVIDIA GeForce RTX 4070 grafik kartasi bilan qurollangan monstr noutbuk.",
      ru: "Премиальный дисплей 2.5K 240Hz OLED, мощнейший Intel Core Ultra 9 и графика NVIDIA RTX 4070 в тонком цельнометаллическом корпусе.",
      en: "Stunning 2.5K 240Hz OLED display, Intel Core Ultra 9 powerhouse, and NVIDIA RTX 4070 inside an ultra-sleek aluminum chassis."
    },
    price: 26800000,
    oldPrice: 31000000,
    discount: 14,
    rating: 4.8,
    reviewsCount: 154,
    badge: "new",
    isFlashSale: false,
    isPopular: false,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Eclipse Gray", hex: "#434347" },
      { name: "Platinum White", hex: "#E9EAEB" }
    ],
    sizes: ["32GB / 1TB SSD"],
    specs: {
      "Ekran": "16\" 2.5K OLED 240Hz, 0.2ms, G-Sync",
      "Protsessor": "Intel Core Ultra 9 185H (16 yadroli)",
      "Videokarta": "NVIDIA GeForce RTX 4070 8GB GDDR6",
      "Xotira": "32 GB LPDDR5X + 1TB NVMe PCIe 4.0 SSD"
    }
  },
  {
    id: "p112",
    category: "computers",
    brand: "Logitech",
    name: {
      uz: "Simsiz ergonomik sichqoncha Logitech MX Master 3S Graphite",
      ru: "Беспроводная мышь Logitech MX Master 3S Graphite",
      en: "Wireless Mouse Logitech MX Master 3S Graphite"
    },
    description: {
      uz: "8000 DPI Darkfield optik sensori (hatto shishada ham ishlaydi), o'ta sokin Quiet Clicks tugmalari va MagSpeed po'lat g'ildiragi.",
      ru: "Сенсор 8000 DPI работающий даже на стекле, бесшумные клики Quiet Clicks и электромагнитное колесо MagSpeed.",
      en: "8000 DPI sensor on any glass surface, quiet clicks, and ultra-fast MagSpeed electromagnetic scrolling wheel."
    },
    price: 1350000,
    oldPrice: 1650000,
    discount: 18,
    rating: 4.9,
    reviewsCount: 1630,
    badge: "express",
    isFlashSale: true,
    isPopular: true,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Graphite", hex: "#323337" },
      { name: "Pale Gray", hex: "#E4E3E0" }
    ],
    sizes: ["Right-handed"],
    specs: {
      "Sensor": "Darkfield 8000 DPI",
      "Ulanish": "Bluetooth Low Energy + Logi Bolt USB",
      "Batareya": "70 kungacha (USB-C)",
      "Xususiyat": "Flow (bir vaqtda 3 ta kompyuter)"
    }
  },
  {
    id: "p113",
    category: "computers",
    brand: "Xiaomi",
    name: {
      uz: "Kavisli o'yin monitori Xiaomi Curved Gaming Monitor 34\" 144Hz",
      ru: "Изогнутый игровой монитор Xiaomi Curved Gaming Monitor 34\" 144Hz",
      en: "Curved Gaming Monitor Xiaomi 34\" 144Hz WQHD"
    },
    description: {
      uz: "21:9 ultra-keng format, 1500R ko'zni qamrab oluvchi egrilik, WQHD (3440x1440) aniqlik va AMD FreeSync Premium texnologiyasi.",
      ru: "Соотношение сторон 21:9, радиус изгиба 1500R, сверхчеткое разрешение WQHD и частота обновления 144 Гц с FreeSync Premium.",
      en: "Ultra-wide 21:9 aspect ratio, immersive 1500R curvature, crisp WQHD resolution, and buttery smooth 144Hz refresh rate."
    },
    price: 4390000,
    oldPrice: 5100000,
    discount: 14,
    rating: 4.8,
    reviewsCount: 420,
    badge: "express",
    isFlashSale: false,
    isPopular: false,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Black", hex: "#1A1A1A" }
    ],
    sizes: ["34 inch"],
    specs: {
      "Diagonal": "34 dyuym, 21:9",
      "Rezolyutsiya": "3440 x 1440 (WQHD)",
      "Yangilanish tezligi": "144 Hz, 4ms javob vaqti",
      "Rang qamrovi": "121% sRGB"
    }
  },

  // --- HOME APPLIANCES (4) ---
  {
    id: "p114",
    category: "appliances",
    brand: "Dyson",
    name: {
      uz: "Simsiz changyutkich Dyson V15 Detect Absolute Gold",
      ru: "Беспроводной пылесос Dyson V15 Detect Absolute Gold",
      en: "Cordless Vacuum Cleaner Dyson V15 Detect Absolute Gold"
    },
    description: {
      uz: "Yashil lazer nuri orqali ko'rinmas changlarni aniq ko'rsatuvchi ilg'or changyutgich. Piezo-datchik va 240 AW kuchli so'rish kuchi.",
      ru: "Лазерная подсветка невидимой пыли, пьезодатчик для измерения размера частиц и впечатляющая мощность всасывания 240 аВт.",
      en: "Laser reveals microscopic dust, piezo sensor scientifically proves deep clean, with 240 AW of fade-free suction power."
    },
    price: 9890000,
    oldPrice: 11500000,
    discount: 14,
    rating: 4.9,
    reviewsCount: 520,
    badge: "bestseller",
    isFlashSale: true,
    isPopular: true,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Gold / Iron", hex: "#CCA43B" }
    ],
    sizes: ["Complete Set"],
    specs: {
      "So'rish kuchi": "240 AW",
      "Filtrlash": "99.99% mikroskopik zarrachalar (0.3 mikron)",
      "Ishlash vaqti": "60 daqiqagacha",
      "Og'irligi": "3.1 kg"
    }
  },
  {
    id: "p115",
    category: "appliances",
    brand: "Xiaomi",
    name: {
      uz: "Robot changyutkich Xiaomi Robot Vacuum X10+ o'z-o'zini tozalash stansiyasi bilan",
      ru: "Робот-пылесос Xiaomi Robot Vacuum X10+ со станцией самоочистки",
      en: "Robot Vacuum Xiaomi X10+ with Auto-Empty Dock"
    },
    description: {
      uz: "To'liq avtonom stansiya: changni avtomatik so'rib olish, lentalarni issiq havo bilan yuvish va quritish, 4000 Pa so'rish kuchi va 3D to'siqlarni aylanib o'tish.",
      ru: "Полностью автоматическая станция: самоочистка мусора, мытье и сушка мопов горячим воздухом, мощность 4000 Па и 3D-навигация.",
      en: "All-in-one smart station cleans mops, auto-empties dust, refills water, and navigates with S-Cross AI 3D obstacle avoidance."
    },
    price: 6890000,
    oldPrice: 7990000,
    discount: 14,
    rating: 4.8,
    reviewsCount: 380,
    badge: "express",
    isFlashSale: false,
    isPopular: true,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "White", hex: "#FFFFFF" }
    ],
    sizes: ["Pro Station"],
    specs: {
      "So'rish quvvati": "4000 Pa",
      "Stansiya funksiyalari": "Chang yig'ish, mop yuvish va issiq quritish",
      "Navigatsiya": "LDS lazer + AI 3D to'siqlarni aniqlash"
    }
  },
  {
    id: "p116",
    category: "appliances",
    brand: "De'Longhi",
    name: {
      uz: "Avtomatik qahva mashinasi De'Longhi Magnifica S ECAM22.110.B",
      ru: "Кофемашина автоматическая De'Longhi Magnifica S ECAM22.110.B",
      en: "Automatic Coffee Machine De'Longhi Magnifica S ECAM22.110.B"
    },
    description: {
      uz: "Donador qahvani yangi maydalab, mukammal espresso va kapuchino tayyorlaydi. 13 darajali metall maydalagich va qo'lda sut ko'pirtirgich.",
      ru: "Приготовление идеального эспрессо и капучино из свежемолотых зерен. 13 степеней помола и классический капучинатор.",
      en: "Bean-to-cup automatic espresso and cappuccino maker with 13 grind settings and manual froth wand for barista coffee at home."
    },
    price: 4890000,
    oldPrice: 5750000,
    discount: 15,
    rating: 4.9,
    reviewsCount: 910,
    badge: "bestseller",
    isFlashSale: false,
    isPopular: true,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Black", hex: "#1D1D1F" },
      { name: "Silver", hex: "#C5C5C7" }
    ],
    sizes: ["1.8L Water Tank"],
    specs: {
      "Bosim": "15 bar",
      "Konteyner hajmi": "Don uchun 250 g, suv uchun 1.8 l",
      "Ichimliklar": "Espresso, Kofe, Kapuchino (qo'lda)"
    }
  },
  {
    id: "p117",
    category: "appliances",
    brand: "Philips",
    name: {
      uz: "Aerogrill Philips Airfryer XXL HD9650/90 Yog'siz pishirgich",
      ru: "Аэрогриль Philips Airfryer XXL HD9650/90 Приготовление без масла",
      en: "Airfryer Philips Premium XXL HD9650/90 Fat Removal Tech"
    },
    description: {
      uz: "Twin TurboStar texnologiyasi bilan ortiqcha yog'siz, qarsildoq qobiq va mayin go'sht pishiring. Butun tovuq yoki 1.4 kg fri sig'imi.",
      ru: "Технология Twin TurboStar удаляет лишний жир из блюд. Готовьте хрустящую курочку и картофель фри практически без масла.",
      en: "Twin TurboStar technology removes excess fat while cooking crispy chicken and fries with little to no added oil."
    },
    price: 2890000,
    oldPrice: 3450000,
    discount: 16,
    rating: 4.8,
    reviewsCount: 760,
    badge: "express",
    isFlashSale: true,
    isPopular: false,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Deep Black", hex: "#111111" }
    ],
    sizes: ["XXL 7.3L"],
    specs: {
      "Quvvat": "2225 W",
      "Sig'im": "1.4 kg / 7.3 litr",
      "Harorat oralig'i": "40°C - 200°C"
    }
  },

  // --- FASHION & CLOTHING (4) ---
  {
    id: "p118",
    category: "fashion",
    brand: "Zara",
    name: {
      uz: "Erkaklar uchun qalin paxtali Premium Oversize Xudi",
      ru: "Мужское теплое худи оверсайз из премиум-хлопка",
      en: "Men's Heavyweight Fleece Oversized Hoodie"
    },
    description: {
      uz: "100% zich tabiiy paxta (450 gsm), ichki qismi yumshoq junli. Keng va zamonaviy tushuvchi bichim, qulay kapyushon.",
      ru: "100% плотный премиум-хлопок (450 г/м²), мягкий начес внутри. Свободный модный силуэт и глубокий капюшон.",
      en: "Heavyweight 450 GSM pure cotton with soft fleece interior, contemporary relaxed drop-shoulder fit and kangaroo pocket."
    },
    price: 389000,
    oldPrice: 550000,
    discount: 29,
    rating: 4.8,
    reviewsCount: 1240,
    badge: "express",
    isFlashSale: true,
    isPopular: true,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Qora / Black", hex: "#1F1F1F" },
      { name: "Kulrang / Melange", hex: "#8A8D8F" },
      { name: "Sutrang / Beige", hex: "#E8E2D2" },
      { name: "Binafsha / Violet", hex: "#7000FF" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    specs: {
      "Tarkibi": "100% zich taralgan paxta",
      "Zichligi": "450 g/m² premium uch ipli futer",
      "Ishlab chiqarilgan": "O'zbekiston"
    }
  },
  {
    id: "p119",
    category: "fashion",
    brand: "Mango",
    name: {
      uz: "Ayollar klassik ikki bortli jun trenchi / Palto",
      ru: "Женский классический двубортный тренч / Пальто",
      en: "Women's Double-Breasted Wool Blend Classic Trench Coat"
    },
    description: {
      uz: "Klassik ingliz uslubidagi ikki bortli plash. Belbog'li, keng yoqali, shamol va yomg'irdan saqlovchi premium mato.",
      ru: "Элегантное двубортное пальто в классическом стиле. Пояс на талии, глубокие карманы, идеальная посадка.",
      en: "Timeless double-breasted trench coat with waist tie belt, wide lapels, and weather-resistant structured drape."
    },
    price: 890000,
    oldPrice: 1250000,
    discount: 28,
    rating: 4.9,
    reviewsCount: 460,
    badge: "bestseller",
    isFlashSale: false,
    isPopular: true,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Kamel / Camel", hex: "#C19A6B" },
      { name: "Qora / Black", hex: "#1B1B1B" }
    ],
    sizes: ["XS", "S", "M", "L"],
    specs: {
      "Mato": "60% jun, 40% poliester",
      "Mavsum": "Bahor / Kuz",
      "Uzunligi": "Midi (tizzadan past)"
    }
  },
  {
    id: "p120",
    category: "fashion",
    brand: "Levi's",
    name: {
      uz: "Klassik erkaklar jinsi shimi Levi's 501 Original Fit",
      ru: "Мужские классические джинсы Levi's 501 Original Fit",
      en: "Men's Classic Jeans Levi's 501 Original Fit"
    },
    description: {
      uz: "Afsonaviy to'g'ri bichimli jinsi shimi. Qattiq denim paxta matosi, mis knopkalar va mustahkam fermuar.",
      ru: "Легендарные джинсы прямого кроя из плотного 100% денима. Фирменная застежка на пуговицах и медные заклепки.",
      en: "The blueprint of all jeans: straight leg, iconic button fly, crafted from 100% durable cotton denim."
    },
    price: 750000,
    oldPrice: 990000,
    discount: 24,
    rating: 4.8,
    reviewsCount: 680,
    badge: "express",
    isFlashSale: false,
    isPopular: false,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1542272604-780c96856592?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Stonewash Blue", hex: "#4E6B8A" },
      { name: "Dark Indigo", hex: "#1C2E46" }
    ],
    sizes: ["30/32", "32/32", "34/32", "36/32"],
    specs: {
      "Mato": "100% paxta denim",
      "Bichim": "Original Straight Leg",
      "Qadag'ich": "Knopkali (Button Fly)"
    }
  },
  {
    id: "p121",
    category: "fashion",
    brand: "Tommy Hilfiger",
    name: {
      uz: "Erkaklar klassik Polo ko'ylagi Tommy Hilfiger Slim Fit",
      ru: "Мужская футболка-поло Tommy Hilfiger Slim Fit",
      en: "Men's Classic Polo Shirt Tommy Hilfiger Slim Fit"
    },
    description: {
      uz: "Pike paxta matosidan tikilgan, ko'krak qismida hoshiyali bayroqcha logotipi bo'lgan nafis polo futbolka.",
      ru: "Дышащий хлопок пике премиум-класса, фирменный вышитый логотип на груди, идеальный крой.",
      en: "Crafted in breathable cotton pique featuring embroidered signature chest logo and ribbed knit collar."
    },
    price: 490000,
    oldPrice: 650000,
    discount: 25,
    rating: 4.7,
    reviewsCount: 390,
    badge: "express",
    isFlashSale: true,
    isPopular: true,
    isRecommended: false,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1625910513413-562479e006c6?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Navy Blue", hex: "#121A30" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Burgundy", hex: "#5C1D24" }
    ],
    sizes: ["S", "M", "L", "XL"],
    specs: {
      "Tarkibi": "96% paxta, 4% elastan",
      "To'qima": "Klassik pike",
      "Yoqa": "Ribbed qovurg'ali yoqa"
    }
  },

  // --- SHOES & FOOTWEAR (4) ---
  {
    id: "p122",
    category: "shoes",
    brand: "Nike",
    name: {
      uz: "Krossovka Nike Air Force 1 '07 All White Original",
      ru: "Кроссовки Nike Air Force 1 '07 All White Оригинал",
      en: "Sneakers Nike Air Force 1 '07 Triple White Original"
    },
    description: {
      uz: "Haqiqiy charm, afsonaviy Air amortizatsiyasi va benuqson oppoq ko'rinish. Dunyoning eng xaridorgir krossovkasi.",
      ru: "Натуральная кожа, амортизация Nike Air на весь день и безупречный белый силуэт. Икона уличного стиля.",
      en: "Crisp white leather, stitched overlays, and encapsulated Nike Air cushioning deliver timeless street style."
    },
    price: 1390000,
    oldPrice: 1750000,
    discount: 21,
    rating: 4.9,
    reviewsCount: 2980,
    badge: "bestseller",
    isFlashSale: true,
    isPopular: true,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Triple White", hex: "#F8F8F8" },
      { name: "Triple Black", hex: "#111111" }
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    specs: {
      "Ustki qism": "Tabiiy silliq charm",
      "Taglik": "Nike Air yostiqchali rezina",
      "Qo'llanishi": "Kundalik kiyish uchun"
    }
  },
  {
    id: "p123",
    category: "shoes",
    brand: "Adidas",
    name: {
      uz: "Yugurish krossovkasi Adidas Ultraboost Light Core Black",
      ru: "Кроссовки для бега Adidas Ultraboost Light Core Black",
      en: "Running Shoes Adidas Ultraboost Light Core Black"
    },
    description: {
      uz: "Eng yengil Boost ko'pikli taglik, Primeknit oyoqni paypoq kabi quchuvchi mato va Continental rezinasi bilan yuqori tutashuv.",
      ru: "Самая легкая пена Light BOOST, эластичный верх Primeknit+ и цепкая резина Continental для бега и ходьбы.",
      en: "Lightest BOOST foam yet, responsive energy return, Primeknit+ upper, and Continental rubber outsole."
    },
    price: 1690000,
    oldPrice: 2100000,
    discount: 20,
    rating: 4.8,
    reviewsCount: 810,
    badge: "express",
    isFlashSale: false,
    isPopular: true,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Core Black", hex: "#151515" },
      { name: "Cloud White", hex: "#F3F3F3" }
    ],
    sizes: ["40", "41", "42", "43", "44"],
    specs: {
      "Amortizatsiya": "Light BOOST",
      "Ustki qism": "Adidas Primeknit+ to'qima",
      "Taglik": "Continental Better Rubber"
    }
  },
  {
    id: "p124",
    category: "shoes",
    brand: "New Balance",
    name: {
      uz: "Krossovka New Balance 574 Core Grey zamshli",
      ru: "Кроссовки New Balance 574 Core Grey замшевые",
      en: "Sneakers New Balance 574 Core Grey Suede"
    },
    description: {
      uz: "Tabiiy zamsh va to'r mato uyg'unligi, ENCAP mustahkam taglik amortizatsiyasi. Har qanday kiyim bilan mos tushuvchi klassika.",
      ru: "Классическое сочетание премиальной замши и дышащей сетки, подошва ENCAP для мягкости и долговечности.",
      en: "Heritage styling in soft suede and mesh with ENCAP midsole cushioning for all-day versatile comfort."
    },
    price: 1190000,
    oldPrice: 1450000,
    discount: 18,
    rating: 4.8,
    reviewsCount: 1120,
    badge: "express",
    isFlashSale: false,
    isPopular: false,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Core Grey", hex: "#87898B" },
      { name: "Navy Blue", hex: "#223048" }
    ],
    sizes: ["40", "41", "42", "43", "44"],
    specs: {
      "Material": "Tabiiy zamsh + tekstil",
      "Oraliq taglik": "ENCAP poliuretan hoshiyali EVA",
      "Ishlab chiqarish": "Vyetnam"
    }
  },
  {
    id: "p125",
    category: "shoes",
    brand: "Puma",
    name: {
      uz: "Krossovka Puma Suede Classic XXI Black/White",
      ru: "Кроссовки Puma Suede Classic XXI Черно-белые",
      en: "Sneakers Puma Suede Classic XXI Black/White"
    },
    description: {
      uz: "1968 yildan beri mashhur retro model. Qalin zamsh, oq charmdan Puma Formstrip chiziqlari va qulay ichki astar.",
      ru: "Культовая замшевая модель с 1968 года. Белая фирменная полоса Puma Formstrip и удобная резиновая подошва.",
      en: "Classic low-profile suede sneaker that has influenced street culture for over 50 years."
    },
    price: 790000,
    oldPrice: 1050000,
    discount: 25,
    rating: 4.7,
    reviewsCount: 540,
    badge: "express",
    isFlashSale: true,
    isPopular: false,
    isRecommended: false,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Puma Black", hex: "#181818" },
      { name: "Peacoat Blue", hex: "#1C2D44" }
    ],
    sizes: ["39", "40", "41", "42", "43"],
    specs: {
      "Material": "100% tabiiy mayin zamsh",
      "Taglik": "Vulkanizatsiyalangan rezina"
    }
  },

  // --- BEAUTY & HEALTH (4) ---
  {
    id: "p126",
    category: "beauty",
    brand: "Dyson",
    name: {
      uz: "Soch quritgich fen Dyson Supersonic HD08 Nikel/Mis",
      ru: "Фен для волос Dyson Supersonic HD08 Никель/Медь",
      en: "Hair Dryer Dyson Supersonic HD08 Nickel/Copper"
    },
    description: {
      uz: "Sochlarni haddan tashqari qizib ketishdan saqlaydigan aqlli harorat nazorati, kuchli V9 raqamli motori va 5 xil magnitli nasadka.",
      ru: "Интеллектуальный контроль температуры для защиты блеска волос, цифровой двигатель Dyson V9 и 5 магнитных насадок.",
      en: "Fast drying without extreme heat, engineered for different hair types with 5 magnetic styling attachments."
    },
    price: 4990000,
    oldPrice: 5900000,
    discount: 15,
    rating: 4.9,
    reviewsCount: 1840,
    badge: "bestseller",
    isFlashSale: true,
    isPopular: true,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Nickel / Copper", hex: "#8A7968" },
      { name: "Iron / Fuchsia", hex: "#C73875" }
    ],
    sizes: ["Full Gift Edition"],
    specs: {
      "Quvvat": "1600 W",
      "Havo oqimi": "41 litr/soniya",
      "Tezlik / Harorat": "3 tezlik, 4 harorat rejimi"
    }
  },
  {
    id: "p127",
    category: "beauty",
    brand: "Dior",
    name: {
      uz: "Erkaklar parfyumeriya suvi Dior Sauvage Eau de Parfum 100ml",
      ru: "Мужская парфюмерная вода Dior Sauvage Eau de Parfum 100ml",
      en: "Men's Eau de Parfum Dior Sauvage 100ml"
    },
    description: {
      uz: "Kalabriya bergamoti, xushbo'y qalampir va vanil notalari uyg'unlashgan magnit jozibador parfyum. 100% asl Fransiya.",
      ru: "Освежающий калабрийский бергамот, пряные аккорды сычуаньского перца и теплая папуасская ваниль. 100% оригинал из Франции.",
      en: "Iconic fragrance blending spicy Calabrian bergamot with a sensual Papua New Guinean vanilla absolute trail."
    },
    price: 1890000,
    oldPrice: 2350000,
    discount: 20,
    rating: 4.9,
    reviewsCount: 1420,
    badge: "express",
    isFlashSale: false,
    isPopular: true,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Midnight Glass", hex: "#161B26" }
    ],
    sizes: ["60 ml", "100 ml", "200 ml"],
    specs: {
      "Hajmi": "100 ml",
      "Turi": "Eau de Parfum (EDP)",
      "Ishlab chiqarilgan": "Fransiya"
    }
  },
  {
    id: "p128",
    category: "beauty",
    brand: "CeraVe",
    name: {
      uz: "Yuzni namlantiruvchi tozalash geli CeraVe Hydrating Cleanser 473ml",
      ru: "Увлажняющий очищающий крем-гель для лица CeraVe 473ml",
      en: "Hydrating Facial Cleanser CeraVe 473ml with Ceramides"
    },
    description: {
      uz: "3 ta muhim keramida va gialuron kislotasi bilan terining tabiiy himoya to'sig'ini tiklaydi va quritmasdan muloyim tozalaydi.",
      ru: "Мягко очищает и увлажняет нормальную и сухую кожу, восстанавливая защитный барьер благодаря 3 типам керамидов.",
      en: "Gentle lotion cleanser with 3 essential ceramides and hyaluronic acid to hydrate and protect skin barrier."
    },
    price: 215000,
    oldPrice: 280000,
    discount: 23,
    rating: 4.8,
    reviewsCount: 2350,
    badge: "express",
    isFlashSale: true,
    isPopular: true,
    isRecommended: false,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Green", hex: "#2E7D32" }
    ],
    sizes: ["236 ml", "473 ml"],
    specs: {
      "Hajm": "473 ml",
      "Turi": "Quruq va normal teri uchun",
      "Faol moddalar": "3 ta keramida, gialuron kislotasi"
    }
  },
  {
    id: "p129",
    category: "beauty",
    brand: "La Roche-Posay",
    name: {
      uz: "Quyoshdan himoyalovchi krem La Roche-Posay Anthelios UVMune 400 SPF50+ 50ml",
      ru: "Солнцезащитный флюид La Roche-Posay Anthelios UVMune 400 SPF50+ 50ml",
      en: "Sunscreen Fluid La Roche-Posay Anthelios UVMune 400 SPF50+ 50ml"
    },
    description: {
      uz: "Uzoq ultrabinafsha nurlaridan eng yuqori himoya filtri. Ko'zni achitmaydi, terida yog'li iz qoldirmaydi, suvga chidamli.",
      ru: "Максимальная защита от ультрадлинных UVA-лучей. Легкая невидимая текстура, устойчива к воде и поту.",
      en: "Ultimate broad spectrum SPF50+ sun protection with Mexoryl 400 filter. Invisible and ultra-resistant to water."
    },
    price: 245000,
    oldPrice: 310000,
    discount: 21,
    rating: 4.9,
    reviewsCount: 1670,
    badge: "express",
    isFlashSale: false,
    isPopular: false,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Invisible", hex: "#FFF8E7" }
    ],
    sizes: ["50 ml"],
    specs: {
      "Himoya omili": "SPF 50+ / UVA-PF 46",
      "Tekstura": "Yengil ko'rinmas suyuqlik (Fluid)",
      "Mamlakat": "Fransiya"
    }
  },

  // --- HOME & KITCHEN (4) ---
  {
    id: "p130",
    category: "kitchen",
    brand: "Tefal",
    name: {
      uz: "Olinuvchi dastalik qozon-tova to'plami Tefal Ingenio 13 buyum",
      ru: "Набор посуды со съемной ручкой Tefal Ingenio 13 предметов",
      en: "Cookware Set with Detachable Handle Tefal Ingenio 13-Piece"
    },
    description: {
      uz: "Bir bosishda yechiladigan baquvvat dasta, pechda pishirishga ham mos titanium qoplamali baquvvat qozon va tovalar.",
      ru: "Съемная ручка выдерживает до 10 кг, титановое антипригарное покрытие, компактное хранение по принципу матрешки.",
      en: "Versatile cookware that goes from stovetop to oven to fridge with 1-click removable handle."
    },
    price: 1890000,
    oldPrice: 2450000,
    discount: 23,
    rating: 4.9,
    reviewsCount: 880,
    badge: "bestseller",
    isFlashSale: true,
    isPopular: true,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1584990347449-a2e6f47796d1?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Black Titanium", hex: "#262626" }
    ],
    sizes: ["13 Pieces Set"],
    specs: {
      "Qoplama": "Titanium 6X tirnalishga chidamli",
      "Plitalar": "Induksion, gaz, elektr, keramik",
      "Ishlab chiqaruvchi": "Fransiya"
    }
  },
  {
    id: "p131",
    category: "kitchen",
    brand: "Xiaomi",
    name: {
      uz: "Aqlli havo tozalagich Xiaomi Smart Air Purifier 4 Pro",
      ru: "Умный очиститель воздуха Xiaomi Smart Air Purifier 4 Pro",
      en: "Smart Air Purifier Xiaomi 4 Pro with High Efficiency Filter"
    },
    description: {
      uz: "60 kv. metrgacha maydonni chang, hid va allergenlardan 99.97% tozalaydi. OLED sensorli ekran va Mi Home ilovasida boshqaruv.",
      ru: "Очистка помещений до 60 м² от пыли, бактерий и аллергенов. OLED-дисплей, датчик PM2.5 и управление со смартфона.",
      en: "Covers rooms up to 60m², captures 99.97% of 0.3μm particles, PM2.5/PM10 dual-effect sensor and OLED display."
    },
    price: 2590000,
    oldPrice: 3100000,
    discount: 16,
    rating: 4.8,
    reviewsCount: 650,
    badge: "express",
    isFlashSale: false,
    isPopular: true,
    isRecommended: false,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "White", hex: "#F7F7F7" }
    ],
    sizes: ["Pro Edition"],
    specs: {
      "Xizmat maydoni": "35-60 m²",
      "Havo unumdorligi (CADR)": "500 m³/soat",
      "Shovqin darajasi": "33.7 dB tungi rejim"
    }
  },
  {
    id: "p132",
    category: "kitchen",
    brand: "Stanley",
    name: {
      uz: "Termo krujka Stanley Quencher H2.0 FlowState 1.18L Rose Quartz",
      ru: "Термокружка Stanley Quencher H2.0 FlowState 1.18L Rose Quartz",
      en: "Tumbler Stanley Quencher H2.0 FlowState 1.18L Rose Quartz"
    },
    description: {
      uz: "90% qayta ishlangan zanglamas po'lat, qulay tutqich va 3 xil holatli qopqoq. Ichimlikni 11 soat sovuq, 2 kunga muzdek saqlaydi.",
      ru: "Хит соцсетей: вакуумная изоляция сохраняет холод до 11 часов и лед до 2 дней. Удобная ручка и трубочка.",
      en: "Double-wall vacuum insulation keeps drinks cold for 11 hours and iced for 2 days with ergonomic comfort grip."
    },
    price: 490000,
    oldPrice: 650000,
    discount: 25,
    rating: 4.9,
    reviewsCount: 1540,
    badge: "bestseller",
    isFlashSale: true,
    isPopular: true,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Rose Quartz", hex: "#E8C5C8" },
      { name: "Cream White", hex: "#F3EFE6" },
      { name: "Matte Black", hex: "#232323" }
    ],
    sizes: ["1.18 Litr (40 oz)"],
    specs: {
      "Hajm": "1180 ml",
      "Material": "18/8 oziq-ovqat zanglamas po'lati, BPA-free",
      "Sovuq saqlash": "11 soat (muz bilan 48 soat)"
    }
  },
  {
    id: "p133",
    category: "kitchen",
    brand: "Victorinox",
    name: {
      uz: "Shveysariya oshxona pichoqlari to'plami Victorinox Swiss Classic 6 dona",
      ru: "Набор кухонных швейцарских ножей Victorinox Swiss Classic 6 шт",
      en: "Swiss Kitchen Knife Set Victorinox Swiss Classic 6-Piece"
    },
    description: {
      uz: "Shveysariyada charxlangan o'tkir zanglamas po'lat tig'lar va sirg'alib ketmaydigan ergonomik rangli dastalari.",
      ru: "Оригинальная швейцарская сталь высочайшей закалки с пожизненной гарантией от производителя.",
      en: "Legendary Swiss precision blades with non-slip ergonomic handles for effortless chopping and carving."
    },
    price: 890000,
    oldPrice: 1100000,
    discount: 19,
    rating: 4.9,
    reviewsCount: 310,
    badge: "express",
    isFlashSale: false,
    isPopular: false,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Classic Black", hex: "#1C1C1E" }
    ],
    sizes: ["6 Knives Set"],
    specs: {
      "Tig' materiali": "Yuqori uglerodli Shveysariya po'lati",
      "Ishlab chiqaruvchi": "Ibach, Shveysariya",
      "Kafolat": "Umrbod rasmiy kafolat"
    }
  },

  // --- CHILDREN'S PRODUCTS (4) ---
  {
    id: "p134",
    category: "children",
    brand: "Lego",
    name: {
      uz: "Lego Technic Porsche 911 GT3 RS Konstruktori 2704 detal",
      ru: "Конструктор Lego Technic Porsche 911 GT3 RS 2704 детали",
      en: "Lego Technic Porsche 911 GT3 RS Building Set 2704 Pcs"
    },
    description: {
      uz: "Ishlaydigan uzatmalar qutisi, harakatlanuvchi porshenli 6 silindrli dvigatel va haqiqiy sport avtomobilining aniq 1:8 masshtabdagi nusxasi.",
      ru: "Точная копия легендарного спорткара в масштабе 1:8. Работающая коробка передач, подвеска и открывающиеся двери.",
      en: "Authentic 1:8 scale model featuring working steering, suspension, flat 6 engine with moving pistons, and paddle-shift gearbox."
    },
    price: 2450000,
    oldPrice: 2990000,
    discount: 18,
    rating: 4.9,
    reviewsCount: 620,
    badge: "bestseller",
    isFlashSale: true,
    isPopular: true,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Lava Orange", hex: "#FF6600" }
    ],
    sizes: ["2704 Pieces"],
    specs: {
      "Yosh toifasi": "16+ yosh",
      "Detallar soni": "2704 dona",
      "O'lchamlari": "57 x 25 x 17 sm"
    }
  },
  {
    id: "p135",
    category: "children",
    brand: "Chicco",
    name: {
      uz: "Bolalar sayr aravachasi Chicco London Up Yengil va ixcham",
      ru: "Детская прогулочная коляска-трость Chicco London Up",
      en: "Compact Lightweight Baby Stroller Chicco London Up"
    },
    description: {
      uz: "Qamish uslubida tez taxlanadi, 4 xil suyanchiq holati, 5 nuqtali xavfsizlik kamari va quyosh soyaboni bilan ta'minlangan.",
      ru: "Ультралегкая коляска-трость с регулировкой спинки в 4 положениях до горизонтального. Удобна для путешествий.",
      en: "Lightweight umbrella stroller with 4-position recline, 5-point harness, and compact fold ideal for city and travel."
    },
    price: 1390000,
    oldPrice: 1700000,
    discount: 18,
    rating: 4.8,
    reviewsCount: 410,
    badge: "express",
    isFlashSale: false,
    isPopular: true,
    isRecommended: false,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Black Matrix", hex: "#222222" },
      { name: "Blue Passion", hex: "#2A4B7C" }
    ],
    sizes: ["Up to 15 kg"],
    specs: {
      "Vazni": "7.2 kg",
      "Bolaning yoshi": "0 oylikdan 3 yoshgacha",
      "G'ildiraklar": "Old aylanuvchi qulflanadigan amortizatorli"
    }
  },
  {
    id: "p136",
    category: "children",
    brand: "Philips Avent",
    name: {
      uz: "Raqamli video enaga Philips Avent SCD843/26 3.5\" displey bilan",
      ru: "Видеоняня цифровая Philips Avent SCD843/26 с экраном 3.5\"",
      en: "Digital Video Baby Monitor Philips Avent SCD843/26 3.5\" Screen"
    },
    description: {
      uz: "Xavfsiz va xususiy A-FHSS aloqasi, tungi infraqizil ko'rish, xonadagi harorat sensori va tinchlantiruvchi allalar to'plami.",
      ru: "Надежное зашифрованное соединение без помех, ночное видение, датчик температуры и дальность связи до 300 м.",
      en: "Private secure A-FHSS connection, crystal clear 3.5\" color screen, night vision, and talk-back feature."
    },
    price: 2190000,
    oldPrice: 2600000,
    discount: 16,
    rating: 4.9,
    reviewsCount: 380,
    badge: "express",
    isFlashSale: false,
    isPopular: false,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "White / Gray", hex: "#E8E8E8" }
    ],
    sizes: ["3.5 inch Screen"],
    specs: {
      "Masofa": "Ochiq havoda 300 metrgacha",
      "Displey": "3.5\" rangli LCD",
      "Qo'shimcha": "5 ta alla kuylari, qayta ovoz berish"
    }
  },
  {
    id: "p137",
    category: "children",
    brand: "Montessori",
    name: {
      uz: "Rivojlantiruvchi yog'och Bizibord Montessori Taxtasi Bolalar uchun",
      ru: "Развивающий деревянный Бизиборд Montessori для малышей",
      en: "Educational Wooden Montessori Busy Board for Toddlers"
    },
    description: {
      uz: "Ekologik toza tabiiy qayindan yasalgan. Qulflar, tishli g'ildiraklar, poyabzal bog'ichlari orqali nozik motorikani rivojlantiradi.",
      ru: "Экологичный бизиборд из натурального дерева развивает мелкую моторику, логику и усидчивость ребенка.",
      en: "Safe natural birch wood activity center packed with latches, gears, zippers, and sensory fine-motor tools."
    },
    price: 299000,
    oldPrice: 420000,
    discount: 29,
    rating: 4.8,
    reviewsCount: 890,
    badge: "express",
    isFlashSale: true,
    isPopular: true,
    isRecommended: false,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Natural Birch", hex: "#E0C8A0" }
    ],
    sizes: ["50 x 40 cm"],
    specs: {
      "Material": "Silliqlangan ekologik toza yog'och",
      "Yosh toifasi": "1 yoshdan 5 yoshgacha",
      "Elementlar": "20 dan ortiq interaktiv detal"
    }
  },

  // --- SPORTS & OUTDOOR (3) ---
  {
    id: "p138",
    category: "sports",
    brand: "Xiaomi",
    name: {
      uz: "Elektr samokat Xiaomi Electric Scooter 4 Pro (2nd Gen)",
      ru: "Электросамокат Xiaomi Electric Scooter 4 Pro (2nd Gen)",
      en: "Electric Scooter Xiaomi Electric Scooter 4 Pro (2nd Gen)"
    },
    description: {
      uz: "1000W maksimal quvvat, 60 km yurish zaxirasi, 10 dyuymli tubeless g'ildiraklar va burilish ko'rsatkich chiroqlari bilan.",
      ru: "Пиковая мощность 1000 Вт, запас хода до 60 км, широкие бескамерные шины 10\" и встроенные указатели поворота.",
      en: "Max 1000W peak motor, up to 60km range on single charge, 10-inch puncture-resistant tubeless tires, and turn signals."
    },
    price: 6490000,
    oldPrice: 7500000,
    discount: 13,
    rating: 4.9,
    reviewsCount: 410,
    badge: "bestseller",
    isFlashSale: false,
    isPopular: true,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1597892657493-6847b9640bac?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Space Black", hex: "#1A1A1A" }
    ],
    sizes: ["Pro Edition"],
    specs: {
      "Maksimal tezlik": "25 km/soat",
      "Masofa zaxirasi": "60 km gacha",
      "G'ildiraklar": "10\" o'zini tiklovchi tubeless",
      "Maksimal yuklama": "120 kg"
    }
  },
  {
    id: "p139",
    category: "sports",
    brand: "Decathlon",
    name: {
      uz: "Sozlanuvchi kompozit gantellar to'plami 20kg (2 x 10kg) Domyos",
      ru: "Набор разборных наборных гантелей 20 кг (2 x 10 кг) Domyos",
      en: "Adjustable Dumbbell Set 20kg (2 x 10kg) Domyos with Case"
    },
    description: {
      uz: "Xromlangan po'lat griflar, xavfsiz qulflar va mustahkam saqlash chamadoni. Uyda professional mashg'ulotlar uchun a'lo tanlov.",
      ru: "Стальные хромированные грифы, надежные резьбовые замки и удобный кейс для хранения. Идеально для тренировок дома.",
      en: "Chrome-plated knurled steel bars with spinlock collars and cast iron weight plates housed in a heavy-duty carry case."
    },
    price: 650000,
    oldPrice: 850000,
    discount: 24,
    rating: 4.8,
    reviewsCount: 920,
    badge: "express",
    isFlashSale: true,
    isPopular: true,
    isRecommended: false,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Silver / Black", hex: "#757575" }
    ],
    sizes: ["20 kg (2 x 10kg)"],
    specs: {
      "Vazni": "Jami 20 kg",
      "Komplekt": "2 ta grif, 4 ta qulf, 12 ta disk",
      "Grif diametri": "28 mm"
    }
  },
  {
    id: "p140",
    category: "sports",
    brand: "Liforme",
    name: {
      uz: "Professional sirg'almas yoga gilamchasi TPE AlignMat 6mm",
      ru: "Профессиональный нескользящий коврик для йоги TPE AlignMat 6mm",
      en: "Professional Non-Slip Yoga Mat TPE AlignMat 6mm with Carry Strap"
    },
    description: {
      uz: "Ikki qatlamli ekologik TPE material, tanani to'g'ri joylashtirish chiziqlari (align-lines) va tizzalarni himoyalovchi 6 mm qalinlik.",
      ru: "Двухслойный экологичный TPE с лазерной разметкой для идеального баланса поз. Превосходное сцепление с ладонями.",
      en: "Eco-friendly dense TPE with laser-etched alignment system for balanced postures and cushioned joint protection."
    },
    price: 260000,
    oldPrice: 350000,
    discount: 26,
    rating: 4.9,
    reviewsCount: 740,
    badge: "express",
    isFlashSale: false,
    isPopular: false,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Deep Purple", hex: "#5C2D91" },
      { name: "Turquoise Blue", hex: "#008B8B" }
    ],
    sizes: ["183 x 61 x 0.6 cm"],
    specs: {
      "Qalinligi": "6 mm",
      "O'lchami": "183 x 61 sm",
      "Xususiyati": "Nam bo'lganda ham sirpanmaydi"
    }
  },

  // --- AUTOMOTIVE (2) ---
  {
    id: "p141",
    category: "automotive",
    brand: "70mai",
    name: {
      uz: "Avtomobil videoregistratori 70mai Dash Cam 4K A810 Sony Starvis 2",
      ru: "Автомобильный видеорегистратор 70mai Dash Cam 4K A810 Sony Starvis 2",
      en: "Automotive Dash Cam 70mai 4K A810 Sony Starvis 2 Sensor"
    },
    description: {
      uz: "Haqiqiy 4K UHD tiniqlik, eng yangi Sony STARVIS 2 IMX678 datchigi, HDR tungi ko'rish, ADAS xavfsizlik tizimi va o'rnatilgan GPS.",
      ru: "Настоящее разрешение 4K, флагманский сенсор Sony STARVIS 2, идеальная ночная съемка HDR, система помощи водителю ADAS и GPS.",
      en: "True 4K UHD powered by Sony STARVIS 2 sensor, super night vision with HDR, built-in GPS, and ADAS driving assistant."
    },
    price: 1590000,
    oldPrice: 1950000,
    discount: 18,
    rating: 4.9,
    reviewsCount: 1190,
    badge: "bestseller",
    isFlashSale: true,
    isPopular: true,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Black / Gunmetal", hex: "#22252A" }
    ],
    sizes: ["4K Single / Dual Ready"],
    specs: {
      "Rezolyutsiya": "3840 x 2160 (4K UHD) @ 60fps",
      "Sensor": "Sony STARVIS 2 IMX678",
      "Ko'rish burchagi": "150° ultra-keng burchak"
    }
  },
  {
    id: "p142",
    category: "automotive",
    brand: "Xiaomi",
    name: {
      uz: "Portativ elektr avtomobil kompressori Xiaomi Portable Electric Air Compressor 2",
      ru: "Портативный автомобильный компрессор Xiaomi Portable Electric Air Compressor 2",
      en: "Portable Electric Tire Inflator Xiaomi Air Compressor 2"
    },
    description: {
      uz: "Shinalarni avtomatik belgilangan bosimgacha damlaydi va to'xtaydi. Raqamli monometr, LED fonar va avtomobil, velosiped, koptoklar uchun mos.",
      ru: "Быстрое накачивание шин с автоотключением при заданном давлении. Цифровой дисплей, встроенный фонарик и аккумулятор.",
      en: "Inflates tires 25% faster with auto-stop pressure preset, high-accuracy digital display, and built-in emergency flashlight."
    },
    price: 430000,
    oldPrice: 560000,
    discount: 23,
    rating: 4.9,
    reviewsCount: 2850,
    badge: "express",
    isFlashSale: true,
    isPopular: true,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Matte Black", hex: "#1F1F1F" }
    ],
    sizes: ["Pocket Size"],
    specs: {
      "Maksimal bosim": "150 psi (10.3 bar)",
      "Akkumulyator": "2000 mAh litiy-ion (Type-C zaryad)",
      "Vazni": "490 gramm"
    }
  },

  // --- BOOKS (2) ---
  {
    id: "p143",
    category: "books",
    brand: "Asaxiy Books",
    name: {
      uz: "Atom odatlar: Kichik o'zgarishlar — ulkan natijalar (Jeyms Klir)",
      ru: "Атомные привычки: Как приобрести хорошие привычки (Джеймс Клир)",
      en: "Atomic Habits: An Easy & Proven Way to Build Good Habits (James Clear)"
    },
    description: {
      uz: "Dunyoning 50 dan ortiq tiliga tarjima qilingan №1 bestseller. Kundalik mayda odatlarni o'zgartirish orqali buyuk marralarga erishish qo'llanmasi.",
      ru: "Мировой бестселлер №1 по версии The New York Times. Практическое руководство по созданию полезных привычек и избавлению от плохих.",
      en: "The #1 New York Times bestseller with over 15 million copies sold. A proven framework for improving every day."
    },
    price: 65000,
    oldPrice: 95000,
    discount: 31,
    rating: 4.9,
    reviewsCount: 3120,
    badge: "bestseller",
    isFlashSale: true,
    isPopular: true,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Hardcover Gold", hex: "#D4AF37" }
    ],
    sizes: ["Qattiq muqova"],
    specs: {
      "Muallif": "Jeyms Klir (James Clear)",
      "Sahifalar": "320 bet",
      "Muqova": "Qattiq muqova, sifatli oq qog'oz"
    }
  },
  {
    id: "p144",
    category: "books",
    brand: "Hilol Nashr",
    name: {
      uz: "Stiv Jobs: Rasmiy biografiyasi (Uolter Ayzekson)",
      ru: "Стив Джобс: Официальная биография (Уолтер Айзексон)",
      en: "Steve Jobs: The Exclusive Biography (Walter Isaacson)"
    },
    description: {
      uz: "Apple asoschisi Stiv Jobsning shaxsiy intervyulari asosida yozilgan yagona rasmiy to'liq biografiyasi. Innovatsiyalar va yetakchilik namunasi.",
      ru: "Единственная официальная биография основателя Apple Стива Джобса, написанная автором бестселлеров Уолтером Айзексоном.",
      en: "The definitive, bestselling biography based on more than forty interviews with Steve Jobs conducted over two years."
    },
    price: 99000,
    oldPrice: 140000,
    discount: 29,
    rating: 4.9,
    reviewsCount: 1430,
    badge: "express",
    isFlashSale: false,
    isPopular: false,
    isRecommended: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "White Edition", hex: "#FFFFFF" }
    ],
    sizes: ["Qattiq muqova"],
    specs: {
      "Muallif": "Uolter Ayzekson",
      "Sahifalar": "640 bet",
      "Til": "O'zbek / Rus / Ingliz"
    }
  }
];

if (typeof window !== 'undefined') {
  window.PIYOZ_PRODUCTS = PIYOZ_PRODUCTS;
  window.PIYOZ_FALLBACK_IMAGE = PIYOZ_FALLBACK_IMAGE;
}
