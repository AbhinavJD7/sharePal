"use client";

import React from "react";
import Image from "next/image";
import { Heart, X, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { useRental } from "@/context/RentalContext";
import { formatCurrency } from "@/lib/utils";

export const FavoritesDrawer: React.FC = () => {
  const {
    favorites,
    isFavoritesOpen,
    setIsFavoritesOpen,
    toggleFavorite,
    addToCart,
    rentalDays,
  } = useRental();

  if (!isFavoritesOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsFavoritesOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white text-gray-900 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                <Heart className="w-5 h-5 fill-red-500 text-red-500" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900">My Favourites</h2>
                <p className="text-xs text-gray-500">
                  {favorites.length} {favorites.length === 1 ? "item" : "items"} saved
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsFavoritesOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition cursor-pointer"
              aria-label="Close favourites"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5">
            {favorites.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-red-50 text-red-400 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-red-400" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-gray-900">
                    No favourites saved yet
                  </h3>
                  <p className="text-xs text-gray-500 max-w-xs">
                    Tap the heart icon on any gaming console or accessory to save it to your wishlist!
                  </p>
                </div>
                <button
                  onClick={() => setIsFavoritesOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#4e1173] hover:bg-[#3d0d5b] text-white text-xs font-bold transition shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <span>Explore Gaming Gear</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {favorites.map((product) => {
                  const isVote = product.tag === "Vote to Launch";
                  const totalPrice = product.per_day_rent * rentalDays;

                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl border border-gray-100 p-3.5 shadow-xs hover:border-gray-200 transition flex gap-3 relative group"
                    >
                      {/* Product Thumbnail */}
                      <div className="relative w-20 h-20 bg-gray-50 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="80px"
                          className="object-contain p-1.5"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="pr-6">
                          <h4 className="text-xs font-bold text-gray-900 line-clamp-1">
                            {product.name}
                          </h4>
                          {isVote ? (
                            <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold text-[#2d5800] bg-[#f2fde0] border border-[#a3e635] rounded-full">
                              Vote to Launch
                            </span>
                          ) : (
                            <p className="text-xs text-gray-600 mt-1">
                              <span className="font-bold text-gray-900">
                                {formatCurrency(totalPrice)}
                              </span>{" "}
                              <span className="text-[10px] text-gray-400">
                                ({formatCurrency(product.per_day_rent)}/d)
                              </span>
                            </p>
                          )}
                        </div>

                        {/* Action Row */}
                        <div className="flex items-center justify-between pt-2 mt-1 border-t border-gray-50">
                          {isVote ? (
                            <span className="text-[11px] font-semibold text-emerald-700">
                              Upcoming Gear
                            </span>
                          ) : (
                            <button
                              onClick={() => {
                                addToCart(product, rentalDays);
                                setIsFavoritesOpen(false);
                              }}
                              className="px-3 py-1 rounded-full bg-[#4e1173] hover:bg-[#3d0d5b] text-white text-[11px] font-semibold flex items-center gap-1 transition cursor-pointer"
                            >
                              <ShoppingCart className="w-3 h-3" />
                              <span>Rent ({rentalDays}d)</span>
                            </button>
                          )}

                          {/* Remove from Favorites Button */}
                          <button
                            onClick={() => toggleFavorite(product)}
                            className="p-1 text-gray-400 hover:text-red-500 transition cursor-pointer"
                            title="Remove from favourites"
                            aria-label={`Remove ${product.name} from favourites`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {favorites.length > 0 && (
            <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between text-xs text-gray-500">
              <span>{favorites.length} saved for later</span>
              <button
                onClick={() => setIsFavoritesOpen(false)}
                className="font-semibold text-[#4e1173] hover:underline cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
