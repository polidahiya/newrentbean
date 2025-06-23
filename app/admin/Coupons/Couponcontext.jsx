"use client";
import React, { useContext, createContext, useState } from "react";
const CouponContext = createContext();

export function Couponcontextwrapper({ children }) {
  const initialstate = {
    code: "",
    discountType: "percentage", // or "fixed"
    discountValue: 20,
    validFrom: "",
    validTo: "",
    usageLimit: 1,
    applicableList: ["Cart", "Rent"],
    minAmount: 0,
    isActive: true,
  };

  const [data, setdata] = useState(initialstate);
  const [loading, setloading] = useState(false);
  const [categories, setcategories] = useState({
    category: "Health-&-Fitness",
    subcat: "Fitness-Machines",
    store: "Rent",
  });
  const [products, setproducts] = useState([]);
  return (
    <CouponContext.Provider
      value={{
        data,
        setdata,
        loading,
        setloading,
        initialstate,
        categories,
        setcategories,
        products,
        setproducts,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
}

export function useCouponContext() {
  const context = useContext(CouponContext);
  return context;
}
