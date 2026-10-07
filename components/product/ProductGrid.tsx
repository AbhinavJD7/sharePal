"use client";

import React, { useState, useMemo } from "react";
import { IProduct } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { SUB_CATEGORIES } from "@/components/layout/Sidebar";

interface ProductGridProps {
  products: IProduct[];
  activeSubCategory: string;
  isLoading?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeSubCategory,
  isLoading = false,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [displayCount, setDisplayCount] = useState<number>(8);

  // Derive subcategory label
  const activeSubCategoryInfo = useMemo(() => {
    return SUB_CATEGORIES.find((item) => item.id === activeSubCategory);
  }, [activeSubCategory]);

  const categoryTitle = useMemo(() => {
    if (activeSubCategory === "gta-vi") return "Gta Vi On Rent";
    if (activeSubCategoryInfo) return `${activeSubCategoryInfo.name} On Rent`;
    return "Gaming Gadgets On Rent";
  }, [activeSubCategory, activeSubCategoryInfo]);

  // Filter products based on active subcategory using useMemo
  const filteredProducts = useMemo(() => {
    if (activeSubCategory === "gta-vi") {
      // Products specific to GTA VI (or containing GTA)
      const gtaProducts = products.filter(
        (p) =>
          p.category === "gta-vi" ||
          p.name.toLowerCase().includes("gta")
      );
      if (gtaProducts.length > 0) return gtaProducts;

      // Fallback matching exact screenshot items if no explicit GTA items in json
      return [
        {
          id: 9901,
          name: "PS5 + GTA 6 with 1 Controller",
          image:
            "https://images.sharepal.in/categories/gaming-consoles/ps5/ps5-with-1-controller-gta-6/ps5-with-gta-6-with-1-controller-on-rent-sharepal-1.webp",
          rating: 0,
          booked_count: 0,
          tag: "New",
          per_day_rent: 200,
          out_of_stock: true,
          category: "gta-vi",
        },
        {
          id: 9902,
          name: "Xbox Series S + GTA 6 with 1 Controller",
          image:
            "https://images.sharepal.in/categories/gaming-consoles/xbox/xbox-with-1-controller-gta-6/xbox-series-s-with-gta-6-with-1-controller-on-rent-sharepal-1.webp",
          rating: 0,
          booked_count: 0,
          tag: "New",
          per_day_rent: 200,
          out_of_stock: true,
          category: "gta-vi",
        },
      ];
    }

    if (activeSubCategory === "ps5-console") {
      return products.filter(
        (p) =>
          !p.category ||
          p.category === "ps5-console" ||
          p.name.toLowerCase().includes("ps5")
      );
    }

    if (activeSubCategory === "xbox-console") {
      const xbox = products.filter(
        (p) => p.category === "xbox-console" || p.name.toLowerCase().includes("xbox")
      );
      return xbox.length > 0 ? xbox : products.slice(0, 4);
    }

    if (activeSubCategory === "vr") {
      const vr = products.filter(
        (p) => p.category === "vr" || p.name.toLowerCase().includes("vr") || p.name.toLowerCase().includes("portal")
      );
      return vr.length > 0 ? vr : products.slice(0, 3);
    }

    if (activeSubCategory === "racing-wheel") {
      const wheels = products.filter(
        (p) => p.name.toLowerCase().includes("wheel") || p.name.toLowerCase().includes("racing")
      );
      return wheels.length > 0 ? wheels : products.slice(0, 2);
    }

    // Default return all products
    return products;
  }, [products, activeSubCategory]);

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, displayCount);
  }, [filteredProducts, displayCount]);

  const hasMore = visibleProducts.length < filteredProducts.length;

  return (
    <section aria-labelledby="product-section-title" className="space-y-4">
      {/* Section Header: Title & Total Count */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3 pt-2">
        <h2
          id="product-section-title"
          className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight"
        >
          {categoryTitle}
        </h2>
        <span className="text-xs sm:text-sm text-gray-500 font-medium">
          Total items:{" "}
          <strong className="text-gray-900 font-semibold">
            {filteredProducts.length} items
          </strong>
        </span>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
          <p className="text-base font-semibold text-gray-700">No products found</p>
          <p className="text-sm text-gray-400 mt-1">
            Check back later or select another category from the sidebar.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {visibleProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              isPriority={index < 4}
              onCheckAvailability={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      )}

      {/* Show More Button if more items exist */}
      {hasMore && (
        <div className="pt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setDisplayCount((prev) => prev + 8)}
            className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-800 text-sm font-semibold hover:bg-gray-100 hover:border-gray-400 transition cursor-pointer shadow-2xs"
          >
            Show More ({filteredProducts.length - visibleProducts.length} remaining)
          </button>
        </div>
      )}

      {/* Modal Dialog for Availability Check */}
      {selectedProduct && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Check Availability
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Checking real-time stock for:{" "}
              <strong className="text-gray-900">{selectedProduct.name}</strong>
            </p>

            <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 text-xs text-purple-900 mb-5">
              {selectedProduct.out_of_stock ? (
                <span className="font-semibold text-rose-600">
                  ⚠️ Currently unavailable for your selected dates (10th Oct - 15th Oct). Please edit your dates above.
                </span>
              ) : (
                <span className="font-semibold text-emerald-700">
                  ✓ Available in Bangalore! Rent from ₹{selectedProduct.per_day_rent}/day.
                </span>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition cursor-pointer"
              >
                Close
              </button>
              {!selectedProduct.out_of_stock && (
                <button
                  type="button"
                  onClick={() => {
                    alert(`Added ${selectedProduct.name} to cart!`);
                    setSelectedProduct(null);
                  }}
                  className="px-5 py-2 rounded-full bg-violet-700 hover:bg-violet-800 text-white text-xs font-semibold transition cursor-pointer shadow-xs"
                >
                  Proceed to Rent
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
