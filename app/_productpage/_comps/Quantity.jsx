"use client";
import React, { useState, useEffect, useMemo } from "react";
import { AppContextfn } from "@/app/Context";
import Cookies from "js-cookie";

function Quantity({ filteredproducts, color }) {
  const { cart, setcart, quantity, setquantity } = AppContextfn();
  const [availableincart, setavailableincart] = useState(false);

  const itemKey = useMemo(
    () => `${filteredproducts._id},${color}`,
    [filteredproducts._id, color]
  );

  useEffect(() => {
    const itemInCart = !!cart[itemKey];
    setavailableincart(itemInCart);

    if (!itemInCart) {
      setquantity(1);
    }
  }, [cart, itemKey]);

  const updateCartQuantity = (increment) => {
    if (availableincart) {
      setcart((prevCart) => {
        const currentProduct = prevCart[itemKey];
        if (!currentProduct) return prevCart;

        const newQuantity = Math.max(
          1,
          Math.min(10, currentProduct.quantity + increment)
        );
        const updatedCart = {
          ...prevCart,
          [itemKey]: {
            ...currentProduct,
            quantity: newQuantity,
          },
        };

        Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 }); // Update cart in cookies
        return updatedCart;
      });
    } else {
      const newQuantity = Math.max(1, Math.min(10, quantity + increment)); // Local quantity management
      setquantity(newQuantity);
    }
  };

  return (
    <div className="flex items-center gap-[10px] mt-8 font-semibold">
      <span className="text-slate-400 whitespace-nowrap min-w-28">Quantity:</span>
      <div className="flex items-center gap-[5px] h-8">
        <button
          className="h-full aspect-square rounded-[5px] border border-slate-300"
          onClick={() => updateCartQuantity(-1)}
        >
          -
        </button>
        <span className="h-full flex items-center justify-center px-[20px] border border-slate-300 rounded-[5px]">
          {availableincart ? cart[itemKey]?.quantity : quantity}
        </span>
        <button
          className="h-full aspect-square rounded-[5px] border border-slate-300"
          onClick={() => updateCartQuantity(1)}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Quantity;
