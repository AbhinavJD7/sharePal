import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "outline-blue" | "solid-blue" | "warning";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "outline-blue",
  className,
  ...props
}) => {
  const variantStyles = {
    "outline-blue": "border border-[#0091ff] text-[#0091ff] bg-white",
    "solid-blue": "bg-[#0091ff] text-white",
    warning: "bg-amber-100 text-amber-800 border border-amber-300",
  }[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded tracking-wide shadow-xs",
        variantStyles,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
