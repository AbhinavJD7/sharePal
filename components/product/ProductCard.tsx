"use client";

import React from "react";
import Image from "next/image";
import { Info, Star } from "lucide-react";
import { IProduct } from "@/types/product";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: IProduct;
  isPriority?: boolean;
  onCheckAvailability?: (product: IProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isPriority = false,
  onCheckAvailability,
}) => {
  const { name, image, rating, booked_count, tag, per_day_rent, out_of_stock } =
    product;

  return (
    <article className="group bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden p-3.5 sm:p-4 h-full">
      {/* Top Section: Tag Badge + Image */}
      <div>
        <div className="relative w-full aspect-square bg-[#fbfbfb] rounded-xl overflow-hidden flex items-center justify-center p-2 mb-2">
          {/* Badge */}
          {tag && (
            <div className="absolute top-2 left-2 z-10">
              <Badge variant="outline-blue">{tag}</Badge>
            </div>
          )}

          {/* Product Image */}
          <div className="relative w-full h-full" style={{ position: "relative" }}>
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

        {/* Unavailable Banner if out_of_stock */}
        {out_of_stock && (
          <div className="bg-gray-100 text-gray-700 text-[11px] sm:text-xs font-medium py-1.5 px-3 rounded-lg text-center mb-2.5">
            Unavailable for these dates
          </div>
        )}

        {/* Product Title - Strictly clamped to 2 lines with fixed height */}
        <h3
          className="text-gray-900 font-bold text-xs sm:text-sm leading-snug line-clamp-2 h-10 mb-2"
          title={name}
        >
          {name}
        </h3>
      </div>

      {/* Middle & Bottom Section: Status / Price & Button */}
      <div className="mt-auto pt-1 space-y-3">
        {/* Status / Price Row - Uniform height ensures buttons line up across all cards */}
        <div className="h-9 flex items-center">
          {out_of_stock ? (
            <div className="flex items-center gap-1.5 text-gray-500 text-xs">
              <Info className="w-4 h-4 shrink-0 text-gray-400" />
              <span className="font-medium">Unavailable</span>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full gap-1 text-xs">
              <div>
                <span className="text-gray-500 text-[11px]">Rent from</span>
                <div className="text-gray-900 font-bold text-sm leading-tight">
                  {formatCurrency(per_day_rent)}
                  <span className="text-[11px] font-normal text-gray-500"> / day</span>
                </div>
              </div>

              {rating > 0 && (
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 rounded text-[11px] font-semibold text-amber-800 shrink-0">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{rating}</span>
                  {booked_count > 0 && (
                    <span className="text-gray-400 font-normal">({booked_count})</span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Button */}
        <Button
          variant="outline-dark"
          size="md"
          className="w-full text-xs sm:text-sm font-semibold tracking-wide py-2"
          onClick={() => onCheckAvailability?.(product)}
          aria-label={`Check availability for ${name}`}
        >
          Check Availability
        </Button>
      </div>
    </article>
  );
};
