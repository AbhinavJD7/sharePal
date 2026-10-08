"use client";

import React from "react";
import { useRental } from "@/context/RentalContext";

const CATEGORIES = [
  { id: "photography", label: "Photography" },
  { id: "gaming", label: "Gaming" },
  { id: "outdoor", label: "Outdoor" },
  { id: "entertainment", label: "Entertainment" },
];

export const CategoryNav: React.FC = () => {
  const { mainCategory, setMainCategory } = useRental();

  return (
    <nav
      aria-label="Product Categories Navigation"
      className="bg-white border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center justify-center sm:justify-start gap-8 sm:gap-14 overflow-x-auto no-scrollbar text-sm font-semibold">
          {CATEGORIES.map((cat) => {
            const isActive = mainCategory === cat.id;
            return (
              <li key={cat.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setMainCategory(cat.id)}
                  className={`py-3.5 relative transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? "text-[#4e1173]"
                      : "text-gray-600 hover:text-gray-950"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {cat.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#4e1173] rounded-full" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
