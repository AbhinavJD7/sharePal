"use client";

import React, { useState } from "react";
import { IProduct } from "@/types/product";
import { Sidebar } from "./Sidebar";
import { HeroBanner } from "./HeroBanner";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SearchModal } from "@/components/search/SearchModal";
import { CategoryComingSoon } from "./CategoryComingSoon";
import { useRental } from "@/context/RentalContext";

interface MainContentLayoutProps {
  initialProducts: IProduct[];
}

export const MainContentLayout: React.FC<MainContentLayoutProps> = ({
  initialProducts,
}) => {
  const { mainCategory, setMainCategory } = useRental();
  const [activeSubCategory, setActiveSubCategory] = useState<string>("all");

  const isGaming = mainCategory === "gaming";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      {/* Search Modal Overlay */}
      <SearchModal products={initialProducts} />

      {isGaming ? (
        /* Gaming Category: Two Column Layout (Sidebar + Hero + Dynamic Product Grid) */
        <div className="flex flex-col lg:flex-row gap-5 items-start animate-in fade-in duration-200">
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
      ) : (
        /* Out-of-Scope Category: Aesthetic Launching Soon Showcase */
        <div className="animate-in fade-in duration-200">
          <CategoryComingSoon
            category={mainCategory}
            onBackToGaming={() => setMainCategory("gaming")}
          />
        </div>
      )}
    </div>
  );
};
