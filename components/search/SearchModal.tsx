"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { Search, X, ArrowRight, Star, Clock } from "lucide-react";
import { useRental } from "@/context/RentalContext";
import { IProduct } from "@/types/product";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

interface SearchModalProps {
  products: IProduct[];
}

const POPULAR_SEARCHES = [
  "PS5",
  "GTA 6",
  "Xbox",
  "FC26",
  "Racing Wheel",
  "VR",
  "Spider-Man",
];

export const SearchModal: React.FC<SearchModalProps> = ({ products }) => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    rentalDays,
    addToCart,
  } = useRental();

  const [inputVal, setInputVal] = useState(searchQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isSearchOpen) {
      setInputVal(searchQuery);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen, searchQuery]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  // Real-time matching products
  const matchingProducts = useMemo(() => {
    if (!inputVal.trim()) return [];
    const query = inputVal.toLowerCase().trim();
    return products
      .filter((p) => {
        return (
          p.name.toLowerCase().includes(query) ||
          p.tag?.toLowerCase().includes(query) ||
          p.category?.toLowerCase().includes(query)
        );
      })
      .slice(0, 6);
  }, [inputVal, products]);

  if (!isSearchOpen) return null;

  const handleApplyToGrid = (term: string) => {
    setSearchQuery(term);
    setIsSearchOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#4e1173] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleApplyToGrid(inputVal);
              }
            }}
            placeholder="Search PS5, Xbox, GTA 6, VR, Games..."
            className="w-full text-sm sm:text-base font-medium text-gray-900 placeholder-gray-400 focus:outline-hidden bg-transparent"
          />
          {inputVal && (
            <button
              type="button"
              onClick={() => setInputVal("")}
              className="p-1 text-gray-400 hover:text-gray-700 transition rounded-full"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition shrink-0 cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Popular Tags Strip */}
        <div className="px-4 sm:px-5 py-3 bg-[#fafafa] border-b border-gray-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-semibold text-gray-500 shrink-0">
            Popular:
          </span>
          {POPULAR_SEARCHES.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setInputVal(tag);
                handleApplyToGrid(tag);
              }}
              className="px-3 py-1 text-xs font-semibold rounded-full bg-white border border-gray-200 hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50 transition shrink-0 cursor-pointer text-gray-700"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Live Search Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5">
          {!inputVal.trim() ? (
            <div className="py-8 text-center space-y-2 text-gray-400">
              <Clock className="w-8 h-8 mx-auto text-gray-300" />
              <p className="text-sm font-medium text-gray-600">
                Type to instantly search games, consoles, and accessories
              </p>
              <p className="text-xs text-gray-400">
                Over 25+ gaming bundles available for delivery in Bangalore
              </p>
            </div>
          ) : matchingProducts.length === 0 ? (
            <div className="py-8 text-center space-y-2">
              <p className="text-sm font-semibold text-gray-700">
                No gadgets found matching &ldquo;{inputVal}&rdquo;
              </p>
              <p className="text-xs text-gray-400">
                Try searching for general keywords like &ldquo;PS5&rdquo;, &ldquo;Xbox&rdquo;, or &ldquo;GTA&rdquo;.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-bold text-gray-700">
                  Matching Products ({matchingProducts.length})
                </span>
                <button
                  type="button"
                  onClick={() => handleApplyToGrid(inputVal)}
                  className="text-xs font-bold text-[#4e1173] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  View all in catalog
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {matchingProducts.map((p) => {
                const total = p.per_day_rent * rentalDays;
                return (
                  <div
                    key={p.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-2xl border border-gray-100 hover:border-violet-200 hover:bg-purple-50/30 transition group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-14 h-14 bg-white rounded-xl border border-gray-200/70 p-1 shrink-0 flex items-center justify-center overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.name}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                            {p.name}
                          </h4>
                          {p.tag && (
                            <Badge variant="outline-blue" className="text-[10px] px-1.5 py-0 shrink-0">
                              {p.tag}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500">
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(p.per_day_rent)}/day
                          </span>
                          <span>•</span>
                          <span>{rentalDays}d: {formatCurrency(total)}</span>
                          {p.rating > 0 && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-0.5 text-amber-700 font-medium">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                {p.rating}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {p.out_of_stock ? (
                        <span className="text-[11px] font-medium text-gray-400 px-2.5 py-1 bg-gray-100 rounded-full">
                          Unavailable
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            addToCart(p, rentalDays);
                            setIsSearchOpen(false);
                          }}
                          className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-violet-700 hover:bg-violet-800 text-white shadow-xs transition cursor-pointer"
                        >
                          Rent Now
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
