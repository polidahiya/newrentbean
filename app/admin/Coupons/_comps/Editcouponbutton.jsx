"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCouponContext } from "../Couponcontext";

function Editcouponbutton({ coupon }) {
  const router = useRouter();
  const { setdata } = useCouponContext();
  return (
    <button
      className="text-blue-500 px-5 py-1 rounded-md border"
      onClick={() => {
        setdata((pre) => ({ ...pre, ...coupon }));
        router.push("/admin/Coupons/Add");
      }}
    >
      Edit
    </button>
  );
}

export default Editcouponbutton;
