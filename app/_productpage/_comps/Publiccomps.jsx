"use client";
import React from "react";
import { AppContextfn } from "@/app/Context";
import { useRouter } from "next/navigation";
import { event } from "nextjs-google-analytics";

export function Addtocartbuttons({ filteredproducts, cartproductid }) {
  const router = useRouter();
  const { cart, setcart, setmessagefn } = AppContextfn();
  const MAX_QUANTITY = filteredproducts?.maxquantity; // Define the maximum quantity

  const handleIncrement = () => {
    if (cart[cartproductid]?.quantity < MAX_QUANTITY)
      setcart((pre) => {
        const updatedcart = { ...pre };
        updatedcart[cartproductid] = {
          ...updatedcart[cartproductid],
          quantity: updatedcart[cartproductid].quantity + 1,
        };
        return updatedcart;
      });
  };
  const handleDecrement = () => {
    if (cart[cartproductid]?.quantity > 1)
      setcart((pre) => {
        const updatedcart = { ...pre };
        updatedcart[cartproductid] = {
          ...updatedcart[cartproductid],
          quantity: updatedcart[cartproductid].quantity - 1,
        };
        return updatedcart;
      });
  };
  // add to cart button
  const handleAddToCart = () => {
    if (cart[cartproductid]?.added) {
      router.push("/cart");
      return;
    }
    setcart((pre) => {
      const updatedcart = { ...pre };
      updatedcart[cartproductid] = {
        ...updatedcart[cartproductid],
        added: true,
      };
      return updatedcart;
    });
    setmessagefn("Added to cart");
    event("button_click", {
      category: "User Interaction",
      label: "Product added to cart",
      value: 1,
    });
  };

  return (
    <div className="flex gap-4 h-12 mt-5">
      <div className="flex items-stretch h-full w-fit rounded-full shadow-[5px_5px_7px_rgba(0,0,0,0.123)_inset,-5px_-5px_7px_rgba(255,255,255)_inset]">
        {/* Decrement Button */}
        <button
          onClick={handleDecrement}
          disabled={cart[cartproductid]?.quantity <= 1}
          className={`flex items-center justify-center h-full aspect-square text-xl ${
            cart[cartproductid]?.quantity <= 1 && "opacity-50"
          }`}
        >
          -
        </button>
        {/* display quantity */}
        <p className="flex items-center justify-center h-full w-5">
          {cart[cartproductid]?.quantity}
        </p>
        {/* Increment Button */}
        <button
          onClick={handleIncrement}
          disabled={cart[cartproductid]?.quantity >= MAX_QUANTITY}
          className={`flex items-center justify-center h-full aspect-square text-xl ${
            cart[cartproductid]?.quantity >= MAX_QUANTITY && "opacity-50"
          }`}
        >
          +
        </button>
      </div>
      {/* add to cart button */}
      <button
        className="w-full h-full text-theme border border-theme text-sm rounded-full"
        onClick={handleAddToCart}
      >
        {cart[cartproductid]?.added ? "VIEW CART" : "ADD TO CART"}
      </button>
    </div>
  );
}
