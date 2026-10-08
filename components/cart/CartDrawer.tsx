"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useRental } from "@/context/RentalContext";
import { formatCurrency } from "@/lib/utils";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotalAmount,
    cartTotalCount,
    deliveryDate,
    pickupDate,
  } = useRental();

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsSuccessModalOpen(true);
  };

  const handleFinishOrder = () => {
    setIsSuccessModalOpen(false);
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white text-gray-900 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* 1. Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  Your Rental Cart
                </h2>
                <span className="text-xs text-gray-500 font-medium">
                  {cartTotalCount} {cartTotalCount === 1 ? "item" : "items"} selected
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Value Proposition Strip */}
          <div className="bg-[#f6f2fb] px-4 py-2.5 border-b border-purple-100/60 flex items-center justify-around text-[11px] text-[#4e1173] font-semibold">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-violet-700" />
              <span>Zero Security Deposit</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-violet-700" />
              <span>Free Doorstep Delivery</span>
            </div>
          </div>

          {/* 2. Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 my-auto">
                <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-gray-800">
                    Your cart is currently empty
                  </h3>
                  <p className="text-xs text-gray-500 max-w-xs">
                    Choose a gaming console, controller, or VR headset to start your rental.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2 rounded-full bg-violet-700 hover:bg-violet-800 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
                >
                  Explore Gaming Gadgets
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemTotal = item.product.per_day_rent * item.days * item.quantity;
                return (
                  <div
                    key={item.id}
                    className="flex gap-3.5 p-3.5 rounded-2xl border border-gray-100 bg-[#fafafa] hover:border-gray-200 transition"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-18 h-18 bg-white rounded-xl border border-gray-200/60 shrink-0 overflow-hidden p-1 flex items-center justify-center">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4
                            className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-1"
                            title={item.product.name}
                          >
                            {item.product.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-rose-600 transition p-1"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Rental Meta */}
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-gray-500 font-medium">
                          <span className="bg-purple-100 text-[#4e1173] px-1.5 py-0.5 rounded font-semibold text-[10px]">
                            {item.days} Days
                          </span>
                          <span>•</span>
                          <span>{formatCurrency(item.product.per_day_rent)}/day</span>
                        </div>
                      </div>

                      {/* Quantity & Total Row */}
                      <div className="flex items-center justify-between pt-2 mt-1 border-t border-gray-200/50">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-gray-200 rounded-full bg-white px-2 py-0.5 text-xs font-semibold">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-gray-500 hover:text-gray-900 p-0.5 cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-gray-900">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-gray-500 hover:text-gray-900 p-0.5 cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Total per Item */}
                        <span className="text-sm font-bold text-gray-900">
                          {formatCurrency(itemTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* 3. Footer / Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-gray-100 bg-white space-y-3.5">
              {/* Rental Dates Summary */}
              <div className="bg-gray-50 p-2.5 rounded-xl text-[11px] flex items-center justify-between text-gray-600">
                <span>Rental Slot:</span>
                <span className="font-semibold text-gray-900">
                  {deliveryDate} to {pickupDate}
                </span>
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Rental Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(cartTotalAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Refundable Security Deposit</span>
                  <span className="font-semibold text-emerald-600">₹0 (ZERO)</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery & Pickup</span>
                  <span className="font-semibold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-100">
                  <span>Total Amount</span>
                  <span className="text-[#4e1173] text-base">
                    {formatCurrency(cartTotalAmount)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full py-3 px-5 rounded-full bg-violet-700 hover:bg-violet-800 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Pay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Simulated Booking Confirmation Modal */}
      {isSuccessModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl relative border border-gray-100">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-gray-900">
                Order Placed Successfully!
              </h3>
              <p className="text-xs text-gray-500">
                Your console reservation for Bangalore has been confirmed. Our courier will arrive on{" "}
                <strong>{deliveryDate}</strong>.
              </p>
            </div>

            <div className="bg-purple-50 p-3 rounded-2xl text-xs text-purple-900 font-medium">
              Total Amount: <strong>{formatCurrency(cartTotalAmount)}</strong>
              <div className="text-[11px] text-gray-500 mt-0.5">Pay on Delivery Available</div>
            </div>

            <button
              type="button"
              onClick={handleFinishOrder}
              className="w-full py-2.5 rounded-full bg-violet-700 hover:bg-violet-800 text-white font-semibold text-xs transition cursor-pointer shadow-xs"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
