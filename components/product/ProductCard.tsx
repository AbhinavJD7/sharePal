"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Info, Star, BellRing, Check, X } from "lucide-react";
import { IProduct } from "@/types/product";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { useRental } from "@/context/RentalContext";

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
  const { rentalDays } = useRental();

  // Calculated dynamic total rental price
  const totalRentalPrice = per_day_rent * rentalDays;

  // Lead capture state for "Notify Me When Available"
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactInfo.trim()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setIsNotifyModalOpen(false);
        setContactInfo("");
      }, 1800);
    }
  };

  return (
    <>
      <article className="group bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden p-3.5 sm:p-4 h-full">
        {/* Top Section: Tag Badge + Image */}
        <div>
          <div className="relative w-full aspect-square bg-[#fbfbfb] rounded-xl overflow-hidden flex items-center justify-center p-2 mb-2">
            {/* Tag Badge */}
            {tag && (
              <div className="absolute top-2 left-2 z-10">
                <Badge variant="outline-blue">{tag}</Badge>
              </div>
            )}

            {/* Product Image with smooth hover scale */}
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

        {/* Middle & Bottom Section */}
        <div className="mt-auto pt-1 space-y-3">
          {/* Status / Dynamic Price Row */}
          <div className="h-9 flex items-center">
            {out_of_stock ? (
              <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                <Info className="w-4 h-4 shrink-0 text-gray-400" />
                <span className="font-medium">Unavailable</span>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full gap-1 text-xs">
                <div>
                  <span className="text-gray-500 text-[11px]">
                    Rent for {rentalDays}d:
                  </span>
                  <div className="text-gray-900 font-bold text-sm leading-tight">
                    {formatCurrency(totalRentalPrice)}
                    <span className="text-[10px] font-normal text-gray-500 ml-1">
                      ({formatCurrency(per_day_rent)}/day)
                    </span>
                  </div>
                </div>

                {/* Rating & Social Proof Live Counter */}
                <div className="flex flex-col items-end">
                  {rating > 0 && (
                    <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 rounded text-[11px] font-semibold text-amber-800 shrink-0">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{rating}</span>
                    </div>
                  )}
                  {booked_count > 0 && (
                    <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium mt-0.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                      </span>
                      <span>{booked_count} booked</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Button: "Notify Me" vs "Check Availability" */}
          {out_of_stock ? (
            <Button
              variant="outline-dark"
              size="md"
              className="w-full text-xs font-semibold tracking-wide py-2 border-purple-800 text-purple-900 hover:bg-purple-50 flex items-center justify-center gap-1.5"
              onClick={() => setIsNotifyModalOpen(true)}
              aria-label={`Notify me when ${name} is available`}
            >
              <BellRing className="w-3.5 h-3.5" />
              Notify When Available
            </Button>
          ) : (
            <Button
              variant="outline-dark"
              size="md"
              className="w-full text-xs sm:text-sm font-semibold tracking-wide py-2 hover:bg-gray-900 hover:text-white"
              onClick={() => onCheckAvailability?.(product)}
              aria-label={`Check availability for ${name}`}
            >
              Check Availability
            </Button>
          )}
        </div>
      </article>

      {/* "Notify Me When Available" Lead Capture Modal */}
      {isNotifyModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-white text-gray-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl relative border border-gray-100">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2 text-violet-700">
                <BellRing className="w-5 h-5" />
                <h3 className="font-bold text-sm sm:text-base">Get Notified</h3>
              </div>
              <button
                onClick={() => setIsNotifyModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="py-6 text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm">You&apos;re on the priority list!</h4>
                <p className="text-xs text-gray-500">
                  We&apos;ll notify you on WhatsApp/Email as soon as slots open up.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNotifySubmit} className="pt-3 space-y-3">
                <p className="text-xs text-gray-600">
                  Leave your number or email to receive instant priority alerts when{" "}
                  <strong>{name}</strong> is in stock:
                </p>

                <input
                  type="text"
                  required
                  placeholder="Enter WhatsApp / Email"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-violet-600 text-gray-900"
                />

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsNotifyModalOpen(false)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold rounded-full bg-violet-700 hover:bg-violet-800 text-white shadow-xs cursor-pointer"
                  >
                    Set Alert
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
