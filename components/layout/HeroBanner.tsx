import React from "react";
import Image from "next/image";

export const HeroBanner: React.FC = () => {
  return (
    <section
      aria-label="Gaming Consoles Hero Banner"
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#3e0b6b] via-[#5a148c] to-[#6e1899] text-white p-6 sm:p-8 lg:p-10 shadow-md min-h-[220px] flex items-center justify-between"
    >
      {/* Background Decorative Circles */}
      <div className="absolute -left-12 -top-12 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-fuchsia-400/10 rounded-full blur-2xl pointer-events-none" />

      {/* Left Visual: Xbox console thumbnail teaser */}
      <div className="hidden xl:flex items-center -ml-4 shrink-0 pointer-events-none opacity-90 select-none">
        <div className="w-36 h-36 flex items-center justify-center">
          <Image
            src="https://images.sharepal.in/categories/gaming-consoles/ps5/ps5-with-ea-play-combo-with-2-controllers/ps5-ea-play-combo-with-2-controllers-on-rent-sharepal-1.webp"
            alt="Gaming Gear Left"
            width={144}
            height={144}
            className="object-contain drop-shadow-xl"
            priority
          />
        </div>
      </div>

      {/* Center Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center justify-center space-y-3">
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

        {/* Partner / Brand Badges (Xbox, PS5, Meta) */}
        <div className="pt-2 flex items-center justify-center gap-6 sm:gap-10 text-white/90">
          {/* Xbox */}
          <div className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition">
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 2.22.724 4.27 1.947 5.928.328-.426 1.109-1.393 2.503-2.613 1.936-1.696 4.093-3.02 5.55-3.02s3.614 1.324 5.55 3.02c1.394 1.22 2.175 2.187 2.503 2.613C21.276 16.27 22 14.22 22 12c0-5.523-4.477-10-10-10zm-3.88 1.83C6.012 4.908 4.385 6.643 3.51 8.81c.71-.564 2.45-1.785 4.61-2.98zm7.76 0c2.16 1.195 3.9 2.416 4.61 2.98-.875-2.167-2.502-3.902-4.61-4.98z" />
            </svg>
            <span className="text-xs font-bold tracking-wider uppercase">Xbox</span>
          </div>

          {/* PS5 */}
          <div className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition">
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8.28 4.2c-2.3 0-3.35 1.17-3.35 2.58 0 2.76 4.14 2.8 4.14 4.54 0 .74-.63 1.2-1.5 1.2-1.14 0-2.45-.66-3.47-1.4l-.87 1.63c1.23.95 2.75 1.57 4.28 1.57 2.48 0 3.6-1.32 3.6-2.73 0-2.88-4.14-2.92-4.14-4.59 0-.61.54-1.05 1.35-1.05 1.02 0 2.13.54 3.04 1.14l.87-1.61c-1.12-.8-2.52-1.28-3.95-1.28zm8.7 5.75l-4.7 1.52v2.24l4.5-1.45c.98-.32 1.58.11 1.58.9 0 .97-.73 1.39-1.68 1.7l-4.4 1.41v2.25l4.55-1.47c2.25-.72 3.53-1.95 3.53-3.79 0-2.15-1.38-3.31-3.38-3.31z" />
            </svg>
            <span className="text-xs font-bold tracking-wider">PS5</span>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition">
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 8.35c-1.47-1.89-3.23-3.1-5.18-3.1C3.15 5.25 0 8.37 0 12.23c0 3.86 3.15 6.98 6.82 6.98 2.65 0 4.88-1.58 5.18-2.61.3 1.03 2.53 2.61 5.18 2.61 3.67 0 6.82-3.12 6.82-6.98 0-3.86-3.15-6.98-6.82-6.98-1.95 0-3.71 1.21-5.18 3.1zm-4.7-1.15c2.32 0 4.2 2.21 4.2 4.93s-1.88 4.93-4.2 4.93c-2.32 0-4.2-2.21-4.2-4.93s1.88-4.93 4.2-4.93zm9.4 0c2.32 0 4.2 2.21 4.2 4.93s-1.88 4.93-4.2 4.93c-2.32 0-4.2-2.21-4.2-4.93s1.88-4.93 4.2-4.93z" />
            </svg>
            <span className="text-xs font-bold tracking-wider">Meta</span>
          </div>
        </div>
      </div>

      {/* Right Visual: PS5 console teaser */}
      <div className="hidden xl:flex items-center -mr-4 shrink-0 pointer-events-none opacity-90 select-none">
        <div className="w-36 h-36 flex items-center justify-center">
          <Image
            src="https://images.sharepal.in/categories/gaming-consoles/ps5/ps5-with-1-controller/ps5-console-with-1-controller-on-rent-sharepal-1.webp"
            alt="Gaming Gear Right"
            width={144}
            height={144}
            className="object-contain drop-shadow-xl"
            priority
          />
        </div>
      </div>
    </section>
  );
};
