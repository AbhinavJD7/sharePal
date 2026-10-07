# SharePal — Gaming Gadgets on Rent Clone

A high-fidelity, pixel-perfect clone of the [SharePal](https://sharepal.in/bangalore/gaming-gadgets-on-rent) Gaming Consoles landing page built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## 🚀 Key Architectural Highlights

- **Server-Driven Data Ingestion**: Clean separation of concerns with Next.js App Router Server Component (`app/page.tsx`) ingesting local catalog data (`product-list.json`) and streaming props to optimized Client Components.
- **Strict Type Safety**: Fully typed data models (`IProduct`, `SubCategory`) preventing runtime rendering bugs.
- **Image Optimization & Core Web Vitals**: Utilizes `next/image` with whitelisted CloudFront CDNs, priority preloading on above-the-fold cards (LCP optimization), and lazy loading.
- **Smooth Layout Animations**: Integrates `framer-motion` for fluid card shuffling, layout transitions, and interactive dialogs.
- **Resilient Error Boundaries**: App Router error boundary (`app/error.tsx`) catching runtime UI crashes gracefully.

---

## 💡 What I Improved (Product & Engineering Choices)

> *"While matching the SharePal design system, I implemented a few UX enhancements aimed at conversion: I added dynamic price calculation based on day-selections, a 'Notify Me' state for out-of-stock items, and a sorting feature to help users find the best deals faster."*

### 1. The Pricing Calculator & Duration Toggles
- **The Problem**: Rental services depend heavily on dates. Showing a single day rate forces users to do mental math.
- **The Solution**: Added global rental duration state (`RentalContext`) with quick duration toggles (`1 Day | 3 Days | 5 Days | 7 Days`) and an interactive header date modal. Product cards dynamically recalculate total rent (`per_day_rent × rentalDuration`) with transparent daily breakdowns.

### 2. Gamers Dark Mode Toggle 🌙
- Seamless theme toggle in the header allowing gamers to switch between SharePal's signature clean light theme and a sleek dark mode built with Tailwind CSS.

### 3. Business-Driven Out-of-Stock Handling (Lead Capture)
- Instead of dead-end buttons, items with `out_of_stock: true` feature a **"Notify When Available"** action with an interactive modal that captures customer WhatsApp/Email leads to recover prospective sales.

### 4. Advanced Sorting & Filtering
- Added real-time sorting by:
  - **Most Popular** (by `booked_count`)
  - **Price: Low to High**
  - **Price: High to Low**
  - **Highest Rated**
- Functional subcategory sidebar switching (`GTA VI`, `PS5 Console`, `Xbox Console`, `VR`, `Racing Wheel`, `Big Screen Gaming`).

### 5. Social Proof Micro-Interactions
- Live pulsing urgency indicators (`🟢 649 booked this month`) and smooth hover lift/zoom effects (`hover:scale-105`) creating a responsive, premium storefront feel.

---

## 🛠️ Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
