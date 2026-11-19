# 🧅 PIYOZ MARKET — Premium Multilingual E-Commerce Marketplace

**PIYOZ MARKET** is a modern, high-performance, fully responsive e-commerce marketplace built exclusively with **Vanilla HTML5, CSS3, and JavaScript (ES6+)**. The design and user experience are inspired by the visual language, layout, functionality, and shopping patterns of Uzbekistan's leading marketplace platform, Uzum Market.

---

## 🚀 Key Features

### 1. 🌐 Complete Trilingual Support
- **Uzbek (UZ — Default)**
- **Russian (RU)**
- **English (EN)**
- Persistent language selection using `localStorage`.
- Comprehensive dictionary in `js/translations.js` covering every navigation link, product category, product descriptions, cart & checkout forms, error messages, notifications, toasts, and footer content.

### 2. 🎨 Brand Identity & Design System
- **Brand Name**: PIYOZ MARKET
- **Colors**:
  - Primary: `#7000FF` (Electric marketplace purple)
  - Secondary: `#8B3DFF`
  - Background: `#FFFFFF`
  - Surface: `#F5F5F7`
  - Text: `#1F2026` & `#767986`
  - Success: `#16A34A`
  - Sale / Discount: `#FF4D4F`
  - Installment Highlight: `#FFE600` (Classic yellow badge)
  - Express Delivery: `#00B533`
- Custom SVG onion brand symbol and clean vector icon system.

### 3. 🔍 Search & Discovery
- Real-time search autocomplete with live product thumbnail suggestions.
- Recent search history saved to `localStorage` with one-click clear.
- Popular quick-search tags (`iPhone 15`, `AirPods Pro`, `MacBook`, `Dyson`, `Krossovka`).
- Mega Catalog flyout with category tabs, subcategories, and popular brand links.

### 4. 🎠 Promotional Hero Carousel
- Smooth auto-sliding (5-second intervals with visual progress bar).
- Hover-pause functionality and touch/swipe gestures on mobile screens.
- Previous / Next arrow controls and clickable pagination dots.
- Distinct promotional campaigns (Tech discounts, Piyoz Express logistics, 0% installments, Beauty & care).

### 5. ⚡ Flash Sales & Live Countdown
- Real-time countdown timer (`Hours : Minutes : Seconds`) updating every second.
- High-discount badges (`-25%`, `-40%`, etc.), crossed-out old prices, and instant add-to-cart.

### 6. 📦 44+ Realistic Products Dataset
- Distributed across 12 categories:
  - Smartphones (Apple, Samsung, Xiaomi, Honor)
  - Electronics & Audio (Apple, Sony, Samsung, JBL)
  - Computers & Laptops (MacBook Air, Asus ROG, Logitech, Xiaomi)
  - Home Appliances (Dyson, Xiaomi Robot, De'Longhi, Philips)
  - Clothing & Fashion (Zara, Mango, Levi's, Tommy Hilfiger)
  - Footwear (Nike Air Force 1, Adidas Ultraboost, New Balance 574, Puma)
  - Beauty & Health (Dyson Supersonic, Dior Sauvage, CeraVe, La Roche-Posay)
  - Home & Kitchen (Tefal, Xiaomi Air Purifier, Stanley Tumbler, Victorinox)
  - Children's Products (Lego Technic, Chicco, Philips Avent, Montessori)
  - Sports & Outdoors (Xiaomi Electric Scooter, Decathlon, Liforme)
  - Automotive Tech (70mai 4K Dashcam, Xiaomi Tire Inflator)
  - Books & Literature (Atomic Habits, Steve Jobs biography)
- High-resolution curated product photography with inline SVG fallbacks.
- Realistic pricing in Uzbekistani soums (UZS) and 12-month installment calculations (`so'm/oy`).

### 7. 🛍️ Interactive Product Detail View
- Multi-photo gallery with clickable thumbnail strip and hover zoom.
- Interactive monthly installment calculator (3, 6, 12, 24 months).
- Color swatches and size/storage variant selectors.
- Quantity stepper with stock limits.
- "Add to Cart" and "1-Click Buy Now" instant checkout triggers.
- Product specifications table and customer reviews.
- Tracks recently viewed products automatically in `localStorage`.

### 8. 🛒 Shopping Cart & Wishlist
- **Cart**: Add/remove items, quantity steppers, itemized subtotal, promo code engine (`PIYOZ10` for -10%, `BAHOR2026` for -15%, `EXPRESS`), free delivery calculation over 100 000 UZS. Available as slide-out drawer or full dedicated page.
- **Wishlist**: Toggle favorites with heart micro-animation, dedicated favorites view, and real-time counter badges in the header and mobile bottom nav.

### 9. 🏷️ Catalog Filtering & Sorting
- Category selection.
- Minimum and maximum price range inputs.
- Brand checkboxes.
- Discount-only and 1-day express delivery toggles.
- Sorting options: Popularity, Price (Low to High), Price (High to Low), Rating, and Newest.

### 10. 💳 Checkout & Order Processing
- Recipient information with Uzbekistan phone mask (`+998 XX XXX-XX-XX`).
- Delivery methods: Free 1-day Pickup Point selector (Tashkent, Samarkand, Bukhara, etc.) vs Doorstep Courier address form.
- Payment methods: Cash on receipt demo vs Online card demo (Uzcard / Humo / Visa).
- Interactive order placement generating unique `#PZ-XXXXXX` order receipts saved to order history.

### 11. 👤 Demo User Profile & Orders
- Auth modal (Sign in & Registration tabs) with demo quick-login.
- Profile dashboard: Personal details, Order history with delivery status pills (`Yetkazilmoqda`, `Topshirildi`), and saved addresses.

### 12. 📱 Mobile Responsiveness & Bottom Navigation
- Tested across 320px, 375px, 414px, 768px, 1024px, 1440px, and 1920px+.
- Mobile bottom app bar (Home, Catalog, Wishlist with badge, Cart with badge, Profile).
- Two-column card grid optimized for mobile shopping.

---

## 📁 Project Structure

```text
/piyoz-market
├── index.html              # Main application entry point
├── css/
│   ├── style.css           # Core styling, layout, variables, UI components
│   ├── responsive.css      # Mobile, tablet, desktop breakpoints & bottom nav
│   └── animations.css      # Smooth micro-interactions, keyframes & reduced-motion
├── js/
│   ├── translations.js     # Trilingual dictionary (UZ, RU, EN)
│   ├── products.js         # 44+ realistic products with UZS pricing & specs
│   ├── carousel.js         # Hero carousel with autoplay, touch & progress bar
│   ├── wishlist.js         # Wishlist management with localStorage persistence
│   ├── cart.js             # Cart state, promo codes & calculation logic
│   └── app.js              # Routing, search autocomplete, catalog & checkout
└── assets/
    ├── icons/              # Vector SVG icons and brand marks
    └── images/             # Vector fallbacks and placeholders
```

---

## 🛠️ How to Run

Since the application uses pure Vanilla HTML, CSS, and JavaScript, no build step or package manager is required.

1. Open `index.html` in any modern web browser directly, or
2. Serve with any static web server:
   ```bash
   # Using Python:
   python -m http.server 8080

   # Or using Node:
   npx serve .
   ```
3. Open `http://localhost:8080` in your browser.
