"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { IProduct } from "@/types/product";

export interface CartItem {
  id: string;
  product: IProduct;
  days: number;
  quantity: number;
}

interface RentalContextType {
  rentalDays: number;
  deliveryDate: string;
  pickupDate: string;
  setRentalDuration: (days: number, delivery?: string, pickup?: string) => void;
  // Category Navigation
  mainCategory: string;
  setMainCategory: (category: string) => void;
  // Cart State & Actions
  cart: CartItem[];
  addToCart: (product: IProduct, days?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartTotalCount: number;
  cartTotalAmount: number;
  // Search State
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  // Favorites State
  favorites: IProduct[];
  toggleFavorite: (product: IProduct) => void;
  isFavorite: (productId: number) => boolean;
  favoritesCount: number;
  isFavoritesOpen: boolean;
  setIsFavoritesOpen: (open: boolean) => void;
}

const RentalContext = createContext<RentalContextType | undefined>(undefined);

export const RentalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [rentalDays, setRentalDays] = useState<number>(5); // default 5 days (10th-15th Oct)
  const [deliveryDate, setDeliveryDate] = useState<string>("10th Oct");
  const [pickupDate, setPickupDate] = useState<string>("15th Oct");

  // Main Category state (Photography, Gaming, Outdoor, Entertainment)
  const [mainCategory, setMainCategory] = useState<string>("gaming");

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Favorites State
  const [favorites, setFavorites] = useState<IProduct[]>([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState<boolean>(false);

  const toggleFavorite = (product: IProduct) => {
    setFavorites((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isFavorite = (productId: number) => {
    return favorites.some((p) => p.id === productId);
  };

  const favoritesCount = favorites.length;

  const setRentalDuration = (
    days: number,
    delivery: string = "10th Oct",
    pickup?: string
  ) => {
    setRentalDays(days);
    setDeliveryDate(delivery);
    if (pickup) {
      setPickupDate(pickup);
    } else {
      const endDay = 10 + days;
      setPickupDate(`${endDay}th Oct`);
    }
  };

  const addToCart = (product: IProduct, days: number = rentalDays) => {
    setCart((prev) => {
      const itemKey = `${product.id}-${days}`;
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          product,
          days,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const cartTotalAmount = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.product.per_day_rent * item.days * item.quantity,
      0
    );
  }, [cart]);

  return (
    <RentalContext.Provider
      value={{
        rentalDays,
        deliveryDate,
        pickupDate,
        setRentalDuration,
        mainCategory,
        setMainCategory,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartTotalCount,
        cartTotalAmount,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        favorites,
        toggleFavorite,
        isFavorite,
        favoritesCount,
        isFavoritesOpen,
        setIsFavoritesOpen,
      }}
    >
      {children}
    </RentalContext.Provider>
  );
};

export const useRental = (): RentalContextType => {
  const context = useContext(RentalContext);
  if (!context) {
    throw new Error("useRental must be used within a RentalProvider");
  }
  return context;
};
