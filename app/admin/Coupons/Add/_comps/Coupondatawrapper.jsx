"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCouponContext } from "../../Couponcontext";

function Coupondatawrapper({ coupon, index, children }) {
  const router = useRouter();
  const { setdata } = useCouponContext();
  return (
    <tr
      className={`border-t cursor-pointer ${
        index % 2 != 0 && "bg-gray-50"
      }`}
      onClick={() => {
        setdata(coupon);
        router.push("/admin/Coupons/Add");
      }}
    >
      {children}
    </tr>
  );
}

export default Coupondatawrapper;
