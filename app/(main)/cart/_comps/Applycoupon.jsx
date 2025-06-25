"use client";
import React, { useState } from "react";
import { AppContextfn } from "@/app/Context";
import { Applycoupon } from "@/app/admin/Coupons/Add/Serveraction";

export default function ApplyCoupon({ cart, totalPrice }) {
  const { setmessagefn } = AppContextfn();
  const [coupon, setCoupon] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    // const res = await Applycoupon(coupon.trim(), totalPrice, cart);
    // setmessagefn(res?.message);

    // onApply(coupon.trim());
    // setCoupon("");
  };

  return (
    <>
      <p className="font-bold my-2 text-xl font-recline">
        Apply your coupon code
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full md:max-w-96 flex gap-1 mt-2 opacity-50"
      >
        <input
          type="text"
          value={coupon}
          required
          disabled
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Enter coupon code"
          className="w-full  p-3 rounded-md border border-gray-300 focus:outline-none focus:border-theme"
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-md border border-theme text-theme"
        >
          Apply
        </button>
      </form>
    </>
  );
}
