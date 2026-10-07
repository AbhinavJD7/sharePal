"use client";

import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  ChevronDown,
  Search,
  ShoppingCart,
  User,
  SlidersHorizontal,
} from "lucide-react";

interface HeaderProps {
  city?: string;
  deliveryDate?: string;
  pickupDate?: string;
  onEditDates?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  city = "Bangalore",
  deliveryDate = "10th Oct",
  pickupDate = "15th Oct",
  onEditDates,
}) => {
  const [selectedCity, setSelectedCity] = useState(city);
  const [isCityOpen, setIsCityOpen] = useState(false);

  const cities = ["Bangalore", "Mumbai", "Delhi NCR", "Hyderabad", "Pune", "Chennai"];

  return (
    <header className="sticky top-0 z-50 bg-[#4e1173] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <div className="flex items-center shrink-0">
          <a
            href="/"
            aria-label="SharePal Homepage"
            className="group flex items-center gap-1.5 focus:outline-hidden"
          >
            <div className="bg-[#1864f7] px-3.5 py-1 rounded-lg flex items-center justify-center shadow-xs transition group-hover:brightness-110">
              <span className="text-xl sm:text-2xl font-black italic tracking-tighter text-white">
                Share<span className="font-light">Pal</span>
              </span>
            </div>
          </a>
        </div>

        {/* Center: Search & Booking details Pill */}
        <div className="hidden lg:flex items-center bg-white text-gray-800 rounded-full py-1.5 px-4 shadow-sm border border-gray-100 text-xs sm:text-sm font-medium divide-x divide-gray-200">
          {/* Location Dropdown */}
          <div className="relative pr-3">
            <button
              type="button"
              onClick={() => setIsCityOpen(!isCityOpen)}
              className="flex items-center gap-1.5 hover:text-[#4e1173] transition text-gray-800 font-semibold cursor-pointer"
              aria-label="Select City"
              aria-expanded={isCityOpen}
            >
              <MapPin className="w-4 h-4 text-[#4e1173] shrink-0" />
              <span>{selectedCity}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>

            {isCityOpen && (
              <div className="absolute left-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 text-gray-700 animate-in fade-in slide-in-from-top-1">
                {cities.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setSelectedCity(c);
                      setIsCityOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs hover:bg-violet-50 hover:text-violet-700 transition ${
                      selectedCity === c ? "font-bold text-violet-700 bg-violet-50/50" : ""
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Delivery Date */}
          <div className="flex items-center gap-1.5 px-3.5">
            <Calendar className="w-3.5 h-3.5 text-gray-500 shrink-0" />
            <span className="text-gray-500 text-xs">Delivery Date:</span>
            <span className="font-semibold text-gray-900 text-xs">{deliveryDate}</span>
          </div>

          {/* Pickup Date */}
          <div className="flex items-center gap-1.5 px-3.5">
            <Calendar className="w-3.5 h-3.5 text-gray-500 shrink-0" />
            <span className="text-gray-500 text-xs">Pickup Date:</span>
            <span className="font-semibold text-gray-900 text-xs">{pickupDate}</span>
          </div>

          {/* Edit Button */}
          <div className="pl-3">
            <button
              type="button"
              onClick={onEditDates}
              className="bg-[#1b1442] hover:bg-[#271d5e] text-white px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide transition shadow-xs cursor-pointer"
              aria-label="Edit booking dates"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            aria-label="Search games and gadgets"
            className="p-1.5 hover:bg-white/10 rounded-full transition text-white"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            type="button"
            aria-label="Shopping Cart with 0 items"
            className="p-1.5 hover:bg-white/10 rounded-full transition relative text-white"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>

          <button
            type="button"
            aria-label="User Account"
            className="flex items-center gap-2 hover:bg-white/10 px-2 py-1.5 rounded-full transition text-white"
          >
            <div className="w-7 h-7 rounded-full bg-white text-[#4e1173] flex items-center justify-center font-bold shadow-xs">
              <User className="w-4 h-4 fill-[#4e1173]" />
            </div>
            <span className="text-xs sm:text-sm font-medium hidden sm:inline">
              Hi, Login
            </span>
          </button>
        </div>
      </div>

      {/* Mobile search bar & date summary (visible only on small screens) */}
      <div className="lg:hidden px-4 pb-3 pt-1 border-t border-purple-800/40">
        <div className="flex items-center justify-between bg-white/10 backdrop-blur-xs rounded-lg px-3 py-1.5 text-xs">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-pink-300 shrink-0" />
            <span className="font-semibold">{selectedCity}</span>
            <span className="text-purple-200">|</span>
            <span className="text-purple-100 truncate">{deliveryDate} - {pickupDate}</span>
          </div>
          <button
            type="button"
            onClick={onEditDates}
            className="bg-white text-[#4e1173] text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ml-2"
          >
            Edit
          </button>
        </div>
      </div>
    </header>
  );
};
