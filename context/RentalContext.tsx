"use client";

import React, { createContext, useContext, useState } from "react";

interface RentalContextType {
  rentalDays: number;
  deliveryDate: string;
  pickupDate: string;
  setRentalDuration: (days: number, delivery?: string, pickup?: string) => void;
}

const RentalContext = createContext<RentalContextType | undefined>(undefined);

export const RentalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [rentalDays, setRentalDays] = useState<number>(5); // default 5 days (10th-15th Oct)
  const [deliveryDate, setDeliveryDate] = useState<string>("10th Oct");
  const [pickupDate, setPickupDate] = useState<string>("15th Oct");

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

  return (
    <RentalContext.Provider
      value={{
        rentalDays,
        deliveryDate,
        pickupDate,
        setRentalDuration,
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
