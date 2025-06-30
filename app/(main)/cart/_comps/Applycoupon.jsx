"use client";
import React, { useState } from "react";
import { AppContextfn } from "@/app/Context";
import {
  Applycoupon,
  Removecoupon,
} from "@/app/admin/Coupons/Add/Serveraction";

export default function ApplyCoupon({ cartitems, totalPrice, coupon }) {
  const { setmessagefn } = AppContextfn();
  const [couponvalue, setCouponvalue] = useState(coupon || "");
  const [couponres, setcouponres] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    const res = coupon
      ? await Removecoupon()
      : await Applycoupon(couponvalue.trim(), totalPrice, cartitems);
    setcouponres(res);
    setmessagefn(res?.message);
  };

  return (
    <div>
      <p className="font-bold my-2 text-xl font-recline">
        Apply your coupon code
      </p>
      <form onSubmit={handleSubmit} className="w-full flex gap-1 mt-2">
        <input
          type="text"
          value={couponvalue}
          required
          disabled={coupon}
          onChange={(e) => setCouponvalue(e.target.value)}
          placeholder="Enter coupon code"
          className={`w-full  p-3 rounded-md border border-gray-300 focus:outline-none focus:border-theme ${
            coupon && "opacity-50"
          }`}
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-md border border-theme text-theme"
        >
          {coupon ? "Remove" : "Apply"}
        </button>
      </form>
      {!couponres && coupon && (
        <p className="text-xs mt-1 text-green-500">
          Coupon applied successfully
        </p>
      )}
      {couponres && (
        <p
          className={`text-xs mt-1 ${
            couponres?.status == 200 ? "text-green-500" : "text-red-500"
          }`}
        >
          {couponres?.message}
        </p>
      )}
    </div>
  );
}
