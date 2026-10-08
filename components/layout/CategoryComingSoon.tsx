"use client";

import React, { useState } from "react";
import {
  Camera,
  Tent,
  Film,
  ArrowLeft,
  CheckCircle2,
  BellRing,
  Sparkles,
} from "lucide-react";

interface CategoryComingSoonProps {
  category: string;
  onBackToGaming: () => void;
}

interface CategoryInfo {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  gear: string[];
}

const CATEGORY_MAP: Record<string, CategoryInfo> = {
  photography: {
    title: "Photography & Vlogging Gear on Rent",
    subtitle:
      "Rent premium DSLR, Mirrorless Cameras, GoPros, Gimbals & Telephoto Lenses with zero security deposit in Bangalore.",
    icon: Camera,
    gear: [
      "Sony Alpha A7 IV",
      "GoPro Hero 12 Black",
      "DJI RS 3 Mini Gimbal",
      "Canon EOS R6 Mark II",
      "Sony 24-70mm f/2.8 GM",
      "Insta360 X3 Action Cam",
    ],
  },
  outdoor: {
    title: "Outdoor & Trekking Gear on Rent",
    subtitle:
      "High-altitude waterproof tents, rucksacks, sub-zero sleeping bags, and trek jackets arriving soon for your next adventure.",
    icon: Tent,
    gear: [
      "Quechua 4-Person Waterproof Tent",
      "Forclaz 60L Trekking Backpack",
      "Sub-Zero (-5°C) Sleeping Bag",
      "Carbon Fiber Trekking Poles",
      "Gore-Tex Windproof Jacket",
      "Camping Headlamp & Lantern Set",
    ],
  },
  entertainment: {
    title: "Party & Entertainment Gear on Rent",
    subtitle:
      "Cinema-grade 4K smart projectors, high-bass party speakers, and wireless karaoke setups for weekend gatherings.",
    icon: Film,
    gear: [
      "Anker Nebula 4K Smart Projector",
      "JBL PartyBox 310 (240W)",
      "120-inch Portable Tripod Screen",
      "Dual UHF Wireless Karaoke Mic",
      "Marshall Woburn III Speaker",
      "Sony Bravia Big Screen Setup",
    ],
  },
};

export const CategoryComingSoon: React.FC<CategoryComingSoonProps> = ({
  category,
  onBackToGaming,
}) => {
  const details = CATEGORY_MAP[category] || CATEGORY_MAP.photography;
  const Icon = details.icon;
  const [contactInfo, setContactInfo] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactInfo.trim()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setContactInfo("");
      }, 3000);
    }
  };

  return (
    <div className="w-full py-8 sm:py-14 px-4 flex flex-col items-center justify-center">
      <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 text-center max-w-3xl w-full space-y-6 shadow-sm">
        {/* Category Icon Badge */}
        <div className="w-20 h-20 rounded-3xl bg-[#f5effb] text-[#4e1173] flex items-center justify-center mx-auto shadow-xs">
          <Icon className="w-10 h-10" />
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 border border-amber-200/80 text-amber-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Launching Soon in Bangalore</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            {details.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
            {details.subtitle}
          </p>
        </div>

        {/* Expected Inventory Chips */}
        <div className="pt-2">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2.5">
            Planned Inventory in This Category:
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {details.gear.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 bg-[#fafafa] border border-gray-200/80 rounded-xl text-xs font-semibold text-gray-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Lead Capture Form */}
        <div className="pt-2 max-w-md mx-auto">
          {isSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-center gap-2 text-emerald-800 text-xs font-semibold animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>You&apos;ll be the first to know when slots open in Bangalore!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              <span className="text-xs text-gray-500 font-medium block">
                Get notified on WhatsApp when rentals go live:
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="Enter Phone or Email"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="flex-1 px-4 py-2 text-xs rounded-full border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-violet-600 text-gray-900"
                />
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold rounded-full bg-violet-700 hover:bg-violet-800 text-white shadow-xs transition flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <BellRing className="w-3.5 h-3.5" />
                  Notify Me
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Primary Return Loop CTA */}
        <div className="pt-4 border-t border-gray-100 flex justify-center">
          <button
            type="button"
            onClick={onBackToGaming}
            className="px-6 py-3 rounded-full bg-[#1e1444] hover:bg-[#2c1d63] text-white text-xs font-bold transition shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Live Gaming Consoles</span>
          </button>
        </div>
      </div>
    </div>
  );
};
