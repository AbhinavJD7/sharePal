"use client";

import React from "react";
import Image from "next/image";
import { LayoutGrid } from "lucide-react";

export interface SubCategoryItem {
  id: string;
  name: string;
  icon?: string;
}

export const SUB_CATEGORIES: SubCategoryItem[] = [
  {
    id: "all",
    name: "ALL",
  },
  {
    id: "gta-vi",
    name: "GTA VI",
    icon: "https://images.sharepal.in/categories/gaming-consoles/ps5/ps5-with-fc25/ps5-with-fc25-with-100-games-with-2-controllerS-on-rent-sharepal-1.webp",
  },
  {
    id: "ps5-console",
    name: "PS5 Console",
    icon: "https://images.sharepal.in/categories/gaming-consoles/ps5/ps5-with-1-controller/ps5-console-with-1-controller-on-rent-sharepal-1.webp",
  },
  {
    id: "xbox-console",
    name: "Xbox Console",
    icon: "https://images.sharepal.in/categories/gaming-consoles/ps5/ps5-with-ea-play-combo-with-2-controllers/ps5-ea-play-combo-with-2-controllers-on-rent-sharepal-1.webp",
  },
  {
    id: "vr",
    name: "VR",
    icon: "https://images.sharepal.in/categories/gaming-consoles/ps5/ps-portal-remote-player/ps-portal-on-rent-1.webp",
  },
  {
    id: "racing-wheel",
    name: "Racing Wheel",
    icon: "https://images.sharepal.in/categories/gaming-consoles/ps5/ps5-with-100-games-with-1-controller/ps5-with-100-games-with-1-controller-on-rent-sharepal-1.webp",
  },
  {
    id: "big-screen",
    name: "Big Screen Gaming",
    icon: "https://images.sharepal.in/categories/gaming-consoles/ps5/ps5-fifa26-4-controllers/ps5-with-fifa-26-with-4-controllers-on-rent-sharepal-1.webp",
  },
];

interface SidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeId, onSelect }) => {
  return (
    <aside
      aria-label="Gaming Sub-categories"
      className="w-full lg:w-[100px] shrink-0"
    >
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 no-scrollbar">
        {SUB_CATEGORIES.map((item) => {
          const isSelected = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-150 cursor-pointer text-center min-w-[85px] lg:min-w-0 bg-white ${
                isSelected
                  ? "border-2 border-[#0091ff] shadow-sm text-[#0091ff] font-bold"
                  : "border border-gray-200 hover:border-gray-300 text-gray-800 font-medium hover:bg-gray-50/80"
              }`}
              aria-pressed={isSelected}
            >
              {item.id === "all" ? (
                <div
                  className={`w-11 h-11 mb-1.5 flex items-center justify-center rounded-lg ${
                    isSelected
                      ? "bg-sky-100/60 text-[#0091ff]"
                      : "bg-purple-50 text-purple-700"
                  }`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-11 h-11 mb-1.5 flex items-center justify-center shrink-0">
                  {item.icon && (
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={44}
                      height={44}
                      className="object-contain p-0.5 h-11 w-11"
                    />
                  )}
                </div>
              )}
              <span className="text-[11px] leading-tight line-clamp-2 max-w-[80px]">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
