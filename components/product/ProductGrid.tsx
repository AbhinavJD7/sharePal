"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpDown } from "lucide-react";
import { IProduct } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { SUB_CATEGORIES } from "@/components/layout/Sidebar";
import { useRental } from "@/context/RentalContext";

interface ProductGridProps {
  products: IProduct[];
  activeSubCategory: string;
}

type SortOption = "popularity" | "price-asc" | "price-desc" | "rating-desc";

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeSubCategory,
}) => {
  const { rentalDays, setRentalDuration } = useRental();
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("popularity");
  const [displayCount, setDisplayCount] = useState<number>(8);
  const [isSimulatedLoading, setIsSimulatedLoading] = useState<boolean>(false);

  // Trigger quick skeleton animation on category change to demonstrate performance loading UX
  useEffect(() => {
    setIsSimulatedLoading(true);
    const timer = setTimeout(() => {
      setIsSimulatedLoading(false);
    }, 280);
    return () => clearTimeout(timer);
  }, [activeSubCategory]);

  // Derive active category label
  const activeSubCategoryInfo = useMemo(() => {
    return SUB_CATEGORIES.find((item) => item.id === activeSubCategory);
  }, [activeSubCategory]);

  const categoryTitle = useMemo(() => {
    if (activeSubCategory === "all") return "All Gaming Gadgets On Rent";
    if (activeSubCategory === "gta-vi") return "Gta Vi On Rent";
    if (activeSubCategoryInfo) return `${activeSubCategoryInfo.name} On Rent`;
    return "Gaming Gadgets On Rent";
  }, [activeSubCategory, activeSubCategoryInfo]);

  // 1. Filter products based on active sidebar subcategory
  const filteredProducts = useMemo(() => {
    let result = products;

    if (activeSubCategory === "all") {
      result = products;
    } else if (activeSubCategory === "gta-vi") {
      result = products.filter(
        (p) =>
          p.category === "gta-vi" ||
          p.name.toLowerCase().includes("gta")
      );
    } else if (activeSubCategory === "ps5-console") {
      result = products.filter(
        (p) =>
          p.category === "ps5-console" ||
          (p.name.toLowerCase().includes("ps5") &&
            !p.name.toLowerCase().includes("gta"))
      );
    } else if (activeSubCategory === "xbox-console") {
      result = products.filter(
        (p) =>
          p.category === "xbox-console" ||
          p.name.toLowerCase().includes("xbox")
      );
      if (result.length === 0) {
        result = products.filter((p) => p.name.toLowerCase().includes("controller"));
      }
    } else if (activeSubCategory === "vr") {
      result = products.filter(
        (p) =>
          p.category === "vr" ||
          p.name.toLowerCase().includes("vr") ||
          p.name.toLowerCase().includes("portal")
      );
    } else if (activeSubCategory === "racing-wheel") {
      result = products.filter(
        (p) =>
          p.category === "racing-wheel" ||
          p.name.toLowerCase().includes("wheel") ||
          p.name.toLowerCase().includes("racing")
      );
    } else if (activeSubCategory === "big-screen") {
      result = products.filter(
        (p) =>
          p.name.toLowerCase().includes("combo") ||
          p.name.toLowerCase().includes("4 controllers")
      );
    }

    // 2. Sort filtered array
    return [...result].sort((a, b) => {
      if (sortBy === "popularity") {
        return (b.booked_count || 0) - (a.booked_count || 0);
      }
      if (sortBy === "price-asc") {
        return a.per_day_rent - b.per_day_rent;
      }
      if (sortBy === "price-desc") {
        return b.per_day_rent - a.per_day_rent;
      }
      if (sortBy === "rating-desc") {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });
  }, [products, activeSubCategory, sortBy]);

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, displayCount);
  }, [filteredProducts, displayCount]);

  const hasMore = visibleProducts.length < filteredProducts.length;

  const durationQuickToggles = [1, 3, 5, 7];

  return (
    <section aria-labelledby="product-section-title" className="space-y-4">
      {/* Top Header: Title, Quick Rental Duration Segmented Control, Sort Dropdown */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-100 pb-3 pt-2">
        <div>
          <h2
            id="product-section-title"
            className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight"
          >
            {categoryTitle}
          </h2>
          <span className="text-xs text-gray-500 font-medium">
            Total items:{" "}
            <strong className="text-gray-900 font-semibold">
              {filteredProducts.length} items
            </strong>
          </span>
        </div>

        {/* Controls: Duration Segmented Control + Sort dropdown */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Quick Duration Segmented Toggle */}
          <div className="flex items-center bg-gray-100 p-1 rounded-full text-xs font-semibold">
            {durationQuickToggles.map((days) => (
              <button
                key={days}
                type="button"
                onClick={() => setRentalDuration(days)}
                className={`px-3 py-1 rounded-full transition cursor-pointer ${
                  rentalDays === days
                    ? "bg-[#4e1173] text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-950"
                }`}
              >
                {days} {days === 1 ? "Day" : "Days"}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="relative flex items-center">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 absolute left-3 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="pl-8 pr-7 py-1.5 text-xs font-semibold bg-white border border-gray-200 text-gray-800 rounded-full cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-violet-600 appearance-none shadow-2xs"
              aria-label="Sort products"
            >
              <option value="popularity">Sort: Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Rating: Highest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid: Animated with Framer Motion and Shimmer Skeleton States */}
      {isSimulatedLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
          <p className="text-base font-semibold text-gray-700">
            No products found for this subcategory
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Try choosing another subcategory from the sidebar.
          </p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {visibleProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <ProductCard
                  product={product}
                  isPriority={index < 4}
                  onCheckAvailability={(p) => setSelectedProduct(p)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Show More Button */}
      {hasMore && !isSimulatedLoading && (
        <div className="pt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setDisplayCount((prev) => prev + 8)}
            className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-800 text-sm font-semibold hover:bg-gray-100 transition cursor-pointer shadow-2xs"
          >
            Show More ({filteredProducts.length - visibleProducts.length} remaining)
          </button>
        </div>
      )}

      {/* Availability Booking Confirmation Modal */}
      {selectedProduct && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-white text-gray-900 rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100">
            <h3 className="text-lg font-bold mb-2">Check Availability</h3>
            <p className="text-sm text-gray-600 mb-4">
              Real-time stock for:{" "}
              <strong className="text-gray-900">
                {selectedProduct.name}
              </strong>
            </p>

            <div className="bg-purple-50 border border-purple-100 rounded-xl p-3.5 text-xs text-purple-900 mb-5">
              <div className="flex justify-between items-center mb-1">
                <span>Selected Duration:</span>
                <strong>{rentalDays} Days</strong>
              </div>
              <div className="flex justify-between items-center text-sm font-bold pt-1 border-t border-purple-200/60">
                <span>Total Estimated Rent:</span>
                <span className="text-violet-700">
                  ₹{selectedProduct.per_day_rent * rentalDays}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(
                    `Proceeding with ${selectedProduct.name} for ${rentalDays} days!`
                  );
                  setSelectedProduct(null);
                }}
                className="px-5 py-2 rounded-full bg-violet-700 hover:bg-violet-800 text-white text-xs font-semibold transition cursor-pointer shadow-xs"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
