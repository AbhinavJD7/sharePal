"use client";

import React, { useState } from "react";
import { IProduct } from "@/types/product";
import { Sidebar } from "./Sidebar";
import { HeroBanner } from "./HeroBanner";
import { ProductGrid } from "@/components/product/ProductGrid";
import { MessageCircle } from "lucide-react";

interface MainContentLayoutProps {
  initialProducts: IProduct[];
}

export const MainContentLayout: React.FC<MainContentLayoutProps> = ({
  initialProducts,
}) => {
  const [activeSubCategory, setActiveSubCategory] = useState<string>("gta-vi");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      {/* Two Column Layout on Desktop: Narrow Sidebar + Wide Content Area */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Left Sub-categories Sidebar */}
        <Sidebar
          activeId={activeSubCategory}
          onSelect={(id) => setActiveSubCategory(id)}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full min-w-0 space-y-6">
          {/* Hero Banner */}
          <HeroBanner />

          {/* Product Section Grid */}
          <ProductGrid
            products={initialProducts}
            activeSubCategory={activeSubCategory}
          />
        </main>
      </div>

      {/* WhatsApp / Live Support Floating Button (Bottom Right as in screenshot) */}
      <aside
        aria-label="Customer Support Chat"
        className="fixed bottom-6 right-6 z-40"
      >
        <button
          type="button"
          onClick={() =>
            window.open(
              "https://api.whatsapp.com/send?phone=918618471138&text=Hi%20SharePal,%20I%20need%20help%20with%20gaming%20rentals",
              "_blank"
            )
          }
          className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="Chat with SharePal Support on WhatsApp"
        >
          <MessageCircle className="w-8 h-8 fill-white text-[#25D366]" />
        </button>
      </aside>
    </div>
  );
};
