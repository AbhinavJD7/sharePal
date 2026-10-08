"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, Sparkles, Check } from "lucide-react";
import { IProduct } from "@/types/product";
import { useRental } from "@/context/RentalContext";

interface VoteToLaunchCardProps {
  product: IProduct;
  isPriority?: boolean;
  targetCount?: number;
}

export const VoteToLaunchCard: React.FC<VoteToLaunchCardProps> = ({
  product,
  isPriority = false,
  targetCount = 1000,
}) => {
  const { name, image } = product;
  const { toggleFavorite, isFavorite } = useRental();
  const isLiked = isFavorite(product.id);

  const [count, setCount] = useState(24);
  const [isEnteringEmail, setIsEnteringEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const percentage = Math.min(Math.max((count / targetCount) * 100, 3), 100);

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isSubmitting) return;

    setIsSubmitting(true);
    // Simulate 1 second network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setCount((prev) => prev + 1);
    }, 1000);
  };

  return (
    <article className="group bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden p-3.5 sm:p-4 h-full">
      {/* Top Section: Tag Badge + Image + Wishlist Heart */}
      <div>
        <div className="relative w-full aspect-square bg-[#fbfbfb] rounded-xl overflow-hidden flex items-center justify-center p-2 mb-2">
          {/* Vote to Launch Tag Badge */}
          <div className="absolute top-2 left-2 z-10">
            <span className="px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold text-[#2d5800] bg-[#f2fde0] border border-[#a3e635] rounded-full select-none">
              Vote to Launch
            </span>
          </div>

          {/* Heart Button (Reveals on Hover) */}
          <button
            type="button"
            onClick={() => toggleFavorite(product)}
            className={`absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/90 backdrop-blur-xs text-gray-400 hover:text-red-500 transition-all duration-200 cursor-pointer shadow-xs ${
              isLiked
                ? "opacity-100 text-red-500"
                : "opacity-0 group-hover:opacity-100"
            }`}
            aria-label="Save to favourites"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </button>

          {/* Product Image */}
          <div className="relative w-full h-full">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={isPriority}
              loading={isPriority ? "eager" : "lazy"}
              className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Product Title - Fixed height matching neighboring cards */}
        <h3
          className="text-gray-900 font-bold text-xs sm:text-sm leading-snug line-clamp-2 h-10 mb-2"
          title={name}
        >
          {name}
        </h3>
      </div>

      {/* Middle & Bottom Section */}
      <div className="mt-auto pt-1 space-y-3">
        {/* Middle Row (h-9): Progress Bar */}
        <div className="h-9 flex flex-col justify-center">
          <div className="flex items-center justify-between text-[11px] font-medium mb-1">
            <span className="text-gray-500">Waitlist Goal</span>
            <span className="text-[#4e1173] font-bold">
              {count}/{targetCount} Joined
            </span>
          </div>
          {/* Progress Track */}
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4e1173] rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Action Button / Inline Email Form / Success State */}
        <div className="relative min-h-[38px] flex items-center">
          {isSubmitted ? (
            /* Green Success Message */
            <div className="w-full py-2 px-3 text-xs sm:text-sm font-bold rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-center flex items-center justify-center gap-1.5 animate-in fade-in duration-300">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>🎉 You&apos;re on the list!</span>
            </div>
          ) : isEnteringEmail ? (
            /* Inline Email Input + Submit Button */
            <form
              onSubmit={handleInlineSubmit}
              className="flex items-center gap-1.5 w-full animate-in fade-in duration-200"
            >
              <input
                type="email"
                required
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 px-2.5 py-2 text-xs rounded-lg border border-gray-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#82f600] text-gray-900 placeholder:text-gray-400"
                autoFocus
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-3.5 py-2 text-xs font-bold rounded-lg bg-[#82f600] hover:bg-[#74dc00] text-black shrink-0 transition flex items-center justify-center min-w-[64px] cursor-pointer disabled:opacity-80 shadow-xs"
              >
                {isSubmitting ? (
                  <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          ) : (
            /* Join Waitlist Primary Button with Hover Tooltip */
            <div className="relative group/btn w-full">
              {/* Hover Tooltip */}
              <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 opacity-0 group-hover/btn:opacity-100 transition-all duration-200 z-30 w-64 p-2.5 bg-gray-900/95 backdrop-blur-xs text-white text-[11px] rounded-xl shadow-xl flex items-start gap-2 leading-relaxed">
                <Sparkles className="w-3.5 h-3.5 text-[#82f600] shrink-0 mt-0.5" />
                <span>We launch if 1k people join the waitlist. Get notified first!</span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900/95" />
              </div>

              <button
                type="button"
                onClick={() => setIsEnteringEmail(true)}
                className="w-full py-2 text-xs sm:text-sm font-bold rounded-lg bg-[#82f600] hover:bg-[#74dc00] active:scale-[0.98] text-black shadow-xs transition-all flex items-center justify-center cursor-pointer"
              >
                Join Waitlist
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
