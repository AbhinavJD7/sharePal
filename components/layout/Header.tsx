"use client";

import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  ChevronDown,
  Search,
  ShoppingCart,
  Heart,
  User,
  X,
  Check,
} from "lucide-react";
import { useRental } from "@/context/RentalContext";
import { LoginModal } from "@/components/auth/LoginModal";

export const Header: React.FC = () => {
  const {
    rentalDays,
    deliveryDate,
    pickupDate,
    setRentalDuration,
    cartTotalCount,
    setIsCartOpen,
    setIsSearchOpen,
    favoritesCount,
    setIsFavoritesOpen,
  } = useRental();

  const [selectedCity, setSelectedCity] = useState("Bangalore");
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const cities = ["Bangalore", "Mumbai", "Delhi NCR", "Hyderabad", "Pune", "Chennai"];

  const durationOptions = [
    { days: 1, label: "1 Day (Quick Try)" },
    { days: 3, label: "3 Days (Weekend Pass)" },
    { days: 5, label: "5 Days (Standard)" },
    { days: 7, label: "7 Days (Best Value - Weekly)" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#4e1173] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Left: Official SharePal Logo Tab */}
        <div className="flex items-start shrink-0 h-full">
          <a
            href="/"
            aria-label="SharePal Homepage"
            className="logo flex h-11 flex-col items-center justify-end gap-1 rounded-bl-xl rounded-br-xl bg-[#1945e8] px-3 pb-1.5 pt-2 transition hover:bg-[#1437b8] focus:outline-hidden shadow-xs"
          >
            <div className="logo-container flex w-full max-w-28 items-center justify-center">
              {/* SVG 1 (White Text - "Share") */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="86"
                height="27"
                fill="#fff"
                viewBox="0 0 86 27"
                className="h-5 w-auto"
              >
                <path
                  fill="inherit"
                  fillRule="evenodd"
                  d="M2.3 18.159h5.787c.173 1.14 1.544 1.962 3.262 1.962 1.775 0 2.886-.707 2.886-1.746 0-.765-.39-1.212-2.352-1.818l-2.18-.664c-3.478-1.054-5.325-2.93-5.325-5.773 0-4.243 3.666-7.014 8.717-7.014 5.368 0 8.644 2.454 8.673 6.581h-5.585c-.043-1.241-1.212-2.064-2.944-2.064-1.602 0-2.64.722-2.64 1.703 0 .837.576 1.415 2.25 1.905l2.28.664c3.738 1.082 5.355 2.641 5.355 5.643 0 4.387-3.753 7.115-9.251 7.115-5.614 0-8.919-2.381-8.933-6.494m17.816 6.133 4.43-20.825h5.687L28.66 10.77h.115c1.184-1.732 2.973-2.728 5.181-2.728 2.916 0 4.85 1.775 4.85 4.416a9.7 9.7 0 0 1-.217 1.948l-2.078 9.886h-5.672l1.89-9.005c.073-.376.102-.679.102-.982 0-1.097-.91-1.905-2.165-1.905-1.371 0-2.555 1.04-2.872 2.54l-1.977 9.352zm28.73 0h5.714l3.392-15.933h-5.585l-.549 2.57h-.274c-.505-1.704-2.294-2.8-4.59-2.8-4.574 0-7.965 4.416-7.965 10.347 0 3.738 2.034 6.047 5.31 6.047 2.006 0 3.594-.823 4.763-2.482h.26zm1.702-8.948c0 2.57-1.587 4.835-3.406 4.835-1.342 0-2.236-1.068-2.236-2.684 0-2.7 1.53-4.878 3.434-4.878 1.342 0 2.208 1.068 2.208 2.727m5.056 8.948 3.42-15.933h5.586l-.462 2.31h.115c.722-1.487 2.136-2.54 3.854-2.54.909 0 1.558.13 2.193.418l-1.082 4.95c-.736-.346-1.429-.592-2.396-.592-1.89 0-3.261 1.054-3.738 3.248l-1.76 8.139zm13.466-6.898c0 4.589 2.973 7.288 7.533 7.288 3.037 0 5.725-1.882 7.18-4.844-6.297.382-9.34-2.32-9.34-2.32s5.225.941 10.253-.404q.123-.617.182-1.267c.47-5.161-2.502-7.892-6.774-7.892-5.426 0-9.034 3.983-9.034 9.439m5.657-2.944h5.397c.03-.073.044-.303.044-.462 0-1.213-.953-2.078-2.324-2.078-1.486 0-2.742 1.024-3.117 2.54"
                  clipRule="evenodd"
                />
              </svg>
              {/* SVG 2 (Lime Green Accent - "Pal") */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="51"
                height="27"
                viewBox="0 0 51 27"
                fill="#9EFF00"
                className="h-5 w-auto"
              >
                <path
                  fill="inherit"
                  fillRule="evenodd"
                  d="M4.786 3.106h8.14c5.075 0 7.917 2.679 7.917 6.682 0 5.477-3.84 8.93-10 8.93H7.791l-1.25 5.863H.247l1.07-5.06c6.5-1.309 10.317-6.29 10.317-6.29l2.168 1.84 1.601-8.78-8.404 3.004 2.04 1.731s-2.377 3.315-7.047 5.296zm31.4 21.475h-5.892l.49-2.322h-.267c-1.206 1.712-2.843 2.56-4.911 2.56-3.378 0-5.477-2.381-5.477-6.236 0-6.116 3.498-10.67 8.215-10.67 2.366 0 4.212 1.131 4.733 2.887h.282l.566-2.649h5.76zm-7.648-4.242c1.875 0 3.512-2.336 3.512-4.985 0-1.711-.893-2.813-2.277-2.813-1.965 0-3.542 2.248-3.542 5.03 0 1.667.923 2.768 2.307 2.768M42.825 3.106l-4.569 21.475h5.893l4.57-21.475z"
                  clipRule="evenodd"
                />
              </svg>
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
                    className={`w-full text-left px-3.5 py-1.5 text-xs hover:bg-violet-50 hover:text-violet-700 transition cursor-pointer ${
                      selectedCity === c
                        ? "font-bold text-violet-700 bg-violet-50/50"
                        : ""
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

          {/* Edit Button: Opens Interactive Date & Duration Selector */}
          <div className="pl-3">
            <button
              type="button"
              onClick={() => setIsDateModalOpen(true)}
              className="bg-[#1b1442] hover:bg-[#271d5e] text-white px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide transition shadow-xs cursor-pointer"
              aria-label="Edit booking dates and rental duration"
            >
              Edit ({rentalDays}d)
            </button>
          </div>
        </div>

        {/* Right Action Icons: Search, Cart, Profile */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search games and gadgets"
            className="p-1.5 hover:bg-white/10 rounded-full transition text-white cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Favourites / Wishlist Button */}
          <button
            type="button"
            onClick={() => setIsFavoritesOpen(true)}
            aria-label={`Favourites list with ${favoritesCount} items`}
            className="p-1.5 hover:bg-white/10 rounded-full transition relative text-white cursor-pointer"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                favoritesCount > 0 ? "fill-red-400 text-red-400" : "text-white"
              }`}
            />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in">
                {favoritesCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label={`Shopping Cart with ${cartTotalCount} items`}
            className="p-1.5 hover:bg-white/10 rounded-full transition relative text-white cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartTotalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-400 text-gray-900 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in">
                {cartTotalCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsLoginModalOpen(true)}
            aria-label="User Account Login"
            className="flex items-center gap-2 hover:bg-white/10 px-2.5 py-1.5 rounded-full transition text-white cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-white text-[#4e1173] flex items-center justify-center font-bold shadow-xs">
              <User className="w-4 h-4 fill-[#4e1173]" />
            </div>
            <span className="text-xs sm:text-sm font-medium hidden sm:inline">
              {userName ? `Hi, ${userName}` : "Hi, Login"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile search bar & date summary (visible on small screens) */}
      <div className="lg:hidden px-4 pb-3 pt-1 border-t border-purple-800/40">
        <div className="flex items-center justify-between bg-white/10 backdrop-blur-xs rounded-lg px-3 py-1.5 text-xs">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-pink-300 shrink-0" />
            <span className="font-semibold">{selectedCity}</span>
            <span className="text-purple-200">|</span>
            <span className="text-purple-100 truncate">
              {deliveryDate} - {pickupDate} ({rentalDays}d)
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsDateModalOpen(true)}
            className="bg-white text-[#4e1173] text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ml-2 cursor-pointer"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Interactive Date & Rental Duration Modal */}
      {isDateModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-white text-gray-900 rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base sm:text-lg font-bold">Select Rental Duration</h3>
              <button
                onClick={() => setIsDateModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700 transition cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-2 mb-4">
              Pricing dynamically adjusts based on the duration you select:
            </p>

            <div className="space-y-2 mb-6">
              {durationOptions.map((opt) => {
                const isSelected = rentalDays === opt.days;
                return (
                  <button
                    key={opt.days}
                    type="button"
                    onClick={() => {
                      setRentalDuration(opt.days);
                      setIsDateModalOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left text-xs sm:text-sm font-semibold transition cursor-pointer ${
                      isSelected
                        ? "border-[#4e1173] bg-purple-50 text-[#4e1173] shadow-xs"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#4e1173]" />}
                  </button>
                );
              })}
            </div>

            <div className="bg-purple-50 p-3 rounded-xl text-xs text-purple-900 flex items-center justify-between">
              <span>Current calculation:</span>
              <strong className="font-bold">{rentalDays} Days Rental</strong>
            </div>
          </div>
        </div>
      )}

      {/* Login / Auth Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(name) => setUserName(name)}
      />
    </header>
  );
};
