import React from "react";
import Image from "next/image";

export const HeroBanner: React.FC = () => {
  return (
    <section
      aria-label="Gaming Consoles Hero Banner"
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#3e0b6b] via-[#5a148c] to-[#6e1899] text-white p-6 sm:p-8 lg:p-10 shadow-md flex items-center justify-center text-center"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute -left-12 -top-12 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-fuchsia-400/10 rounded-full blur-2xl pointer-events-none" />

      {/* Center Content */}
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center justify-center space-y-3">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white drop-shadow-xs">
          Gaming Consoles
        </h1>

        <p className="text-xs sm:text-sm text-purple-100 max-w-xl font-normal leading-relaxed">
          Rent the latest gaming gadgets from{" "}
          <span className="font-bold italic text-white tracking-wide">
            SharePal
          </span>{" "}
          PS5, Xbox, Oculus VR, Racing Wheel on rent.
        </p>

        {/* Partner Brand Badges with Provided Official SVGs */}
        <div className="pt-2 flex items-center justify-center gap-6 sm:gap-10 text-white/90">
          {/* Xbox Official SVG Logo */}
          <div className="flex items-center opacity-90 hover:opacity-100 transition select-none">
            <Image
              src="/Xbox%20Logo%20-%20Black%20-%20zonalogo.com.svg"
              alt="Xbox Official Logo"
              width={90}
              height={26}
              className="h-5 sm:h-6 w-auto object-contain brightness-0 invert"
              priority
            />
          </div>

          {/* PS5 Official PlayStation SVG Logo */}
          <div className="flex items-center opacity-90 hover:opacity-100 transition select-none">
            <Image
              src="/ps5.svg"
              alt="PlayStation 5 Official Logo"
              width={140}
              height={72}
              className="h-7 sm:h-11 w-auto object-contain brightness-0 invert"
              priority
            />
          </div>

          {/* Meta Official Infinity SVG Logo */}
          <div className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition select-none">
            <Image
              src="/meta-3.svg"
              alt="Meta Official Logo"
              width={28}
              height={18}
              className="h-4 sm:h-5 w-auto object-contain brightness-0 invert"
              priority
            />
            <span className="text-xs sm:text-sm font-bold tracking-wider">Meta</span>
          </div>
        </div>
      </div>
    </section>
  );
};
