import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-3.5 sm:p-4 flex flex-col justify-between h-full space-y-3">
      <div className="space-y-3">
        {/* Image Placeholder */}
        <Skeleton className="w-full aspect-square rounded-xl" />

        {/* Unavailable banner or subtitle placeholder */}
        <Skeleton className="w-3/4 h-4 rounded" />

        {/* Title placeholder */}
        <div className="space-y-1.5 pt-1">
          <Skeleton className="w-full h-4 rounded" />
          <Skeleton className="w-2/3 h-4 rounded" />
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <Skeleton className="w-1/3 h-4 rounded" />
        <Skeleton className="w-full h-9 rounded-full" />
      </div>
    </div>
  );
};
