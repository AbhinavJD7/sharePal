import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline-dark" | "solid-dark" | "ghost" | "primary";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "outline-dark", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variantStyles = {
      "outline-dark":
        "border border-gray-800 text-gray-900 bg-transparent hover:bg-gray-900 hover:text-white focus:ring-gray-900",
      "solid-dark":
        "bg-[#1c1445] text-white hover:bg-[#281d5f] focus:ring-indigo-950 shadow-xs",
      primary:
        "bg-violet-700 text-white hover:bg-violet-800 focus:ring-violet-600 shadow-xs",
      ghost:
        "text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-300",
    }[variant];

    const sizeStyles = {
      sm: "px-3.5 py-1 text-xs",
      md: "px-5 py-2 text-sm",
      lg: "px-7 py-2.5 text-base",
    }[size];

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles, sizeStyles, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
