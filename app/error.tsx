"use client";

import React, { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime UI error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Something went wrong while loading gaming products!
      </h2>
      <p className="text-sm text-gray-600 max-w-md mb-6">
        {error.message ||
          "An unexpected error occurred while rendering the catalog. Please try refreshing."}
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center gap-2 bg-[#4e1173] hover:bg-[#3d0d5b] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition shadow-xs cursor-pointer"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
}
