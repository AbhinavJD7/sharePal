# SharePal UI Clone — Software Engineer Assessment

A production-ready, highly interactive frontend clone of SharePal's **"Gaming Gadgets on Rent"** page, built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS**.

[![Next.js](https://img.shields.io/badge/Next.js-16.4.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Version](https://img.shields.io/badge/Release-v1.1.0-4e1173?style=for-the-badge)](https://github.com/AbhinavJD7/sharePal/releases/tag/v1.1.0)

---

## 📌 Overview

This repository contains a high-fidelity, pixel-perfect replication of the **SharePal** catalog interface. Beyond a standard UI clone, this project incorporates complex business logic, global state management, and interactive micro-animations to demonstrate robust software engineering capabilities.

---

## ✨ Key Features & UX Enhancements

- 🧮 **Dynamic Pricing Calculator**: Integrated a full rental duration engine. Selecting **1, 3, 5, 7, or custom days** dynamically recalculates the total rent (`per_day_rent × rentalDuration`) with transparent per-day breakdowns across all product cards in real time.
- 🛍️ **Interactive Modals & Drawers**: Fully functional global UI states:
  - **Authentication**: `LoginModal` with email/password and one-click Google login simulation.
  - **Shopping Cart**: `CartDrawer` slide-over with quantity steppers, item removal, zero-deposit badges, and simulated checkout.
  - **Global Search**: `SearchModal` with real-time keyword filtering and direct rental actions.
  - **Wishlist / Favourites**: Dedicated `FavoritesDrawer` with item counts and quick-add actions.
- 🤖 **Interactive AI Chatbot Widget**: A custom-built floating action button (FAB) featuring the authentic dual-bubble mascot with a **looping layer-swap animation** and **animated 3-dot typing indicators**. Clicking opens an instant customer support portal with preset question chips and simulated automated replies.
- 🎯 **"Vote to Launch" Lead Capture**: Out-of-stock and upcoming hardware (e.g. *PlayStation Portal Remote Player*) features an inline email capture with a 1-second simulated network submission spinner and green `🎉 You're on the list!` confirmation state.
- 🔍 **Category Filtering & Real-Time Sorting**: Left sidebar subcategory filtering (`All`, `GTA VI`, `PS5 Console`, `Xbox Console`, `VR`, `Racing Wheel`, `Big Screen Gaming`) plus multi-criteria sorting (*Most Popular*, *Price: Low to High*, *Price: High to Low*, *Highest Rated*).
- 🏷️ **Official Brand Integration**: Integrated official SVGs for **Xbox**, **PS5**, and **Meta**, plus the authentic SharePal dual-SVG hanging logo tab in the header.
- 📱 **Responsive Architecture**: Fluidly adapts across mobile, tablet, and wide desktop viewports while adhering strictly to SharePal’s signature `#4e1173` purple brand palette.

---

## 🛠 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16 (App Router)** | Modern server-driven architecture & routing |
| **React 19** | Component tree & hooks |
| **TypeScript (Strict Mode)** | End-to-end type safety & data contracts (`IProduct`, `CartItem`) |
| **Tailwind CSS v4** | Modern, flexible utility-first styling |
| **Framer Motion** | Micro-animations and smooth card entry transitions |
| **React Context API** | Centralized global state (`RentalContext`) |
| **Lucide React** | Clean, accessible iconography |

---

## 🚀 Getting Started

Follow these instructions to run the project locally on your machine.

### Prerequisites
- **Node.js** (v18.17 or higher)
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/AbhinavJD7/sharePal.git
cd sharePal

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build

```bash
# Build optimized production bundle
npm run build

# Start production server
npm start
```

---

## 📂 Project Structure

```plaintext
sharePal/
├── app/
│   ├── globals.css              # Tailwind v4 directives & custom utilities
│   ├── layout.tsx               # Root layout with RentalProvider & global drawers
│   └── page.tsx                 # Server Component streaming catalog data
├── components/
│   ├── auth/
│   │   └── LoginModal.tsx       # Auth dialog with email & Google sign-in
│   ├── cart/
│   │   └── CartDrawer.tsx       # Functional slide-over cart drawer
│   ├── chat/
│   │   └── ChatbotWidget.tsx    # Animated dual-bubble mascot & support portal
│   ├── favorites/
│   │   └── FavoritesDrawer.tsx  # Wishlist drawer with quick-add actions
│   ├── layout/
│   │   ├── CategoryComingSoon.tsx # Teaser state for non-gaming categories
│   │   ├── CategoryNav.tsx      # Top category switch bar
│   │   ├── Header.tsx           # Navigation header with date selector & logo tab
│   │   ├── HeroBanner.tsx       # Hero banner with official partner SVGs
│   │   ├── MainContentLayout.tsx# Two-column layout orchestrator
│   │   └── Sidebar.tsx          # Subcategory sidebar navigation
│   ├── product/
│   │   ├── ProductCard.tsx      # Dynamic rental card with live pricing
│   │   ├── ProductGrid.tsx      # Grid layout with sorting & duration toggles
│   │   └── VoteToLaunchCard.tsx # Crowd-waitlist card with inline email capture
│   ├── search/
│   │   └── SearchModal.tsx      # Real-time keyword search overlay
│   └── ui/
│       ├── Badge.tsx            # Reusable tag badges
│       └── Button.tsx           # Polymorphic button component
├── context/
│   └── RentalContext.tsx        # Global store for cart, dates, search & favorites
├── lib/
│   └── utils.ts                 # INR currency formatter & className merger
├── public/                      # Official brand SVGs (Xbox, PS5, Meta, Chatbot)
├── types/
│   └── product.ts               # Strict TypeScript definitions
├── product-list.json            # Seed catalog data for gaming gadgets
└── README.md
```

---

## 👨‍💻 Author

**Abhinav Rai**  
- **GitHub**: [@AbhinavJD7](https://github.com/AbhinavJD7)  
- **Repository**: [https://github.com/AbhinavJD7/sharePal](https://github.com/AbhinavJD7/sharePal)  
- **Release**: `v1.1.0`
