import React from "react";
import { Showcoupon } from "./Add/Serveraction";
import Link from "next/link";
import Refresher from "../_comps/refresher/Refresher";
import Deletebutton from "./_comps/Deletebutton";
import Editcouponbutton from "./_comps/Editcouponbutton";

async function page() {
  const res = await Showcoupon();
  if (res.status != 200) {
    return (
      <div className="h-screen flex items-center justify-center">
        {res.message}
      </div>
    );
  }

  const coupons = res?.coupon;

  return (
    <div className="relative flex flex-col h-[calc(100vh-50px)]">
      <div className="bg-white flex items-center justify-end py-1 z-10 px-[10px] md:px-10">
        <Link
          href="/admin/Coupons/Add"
          className="h-full bg-theme text-white rounded-md px-5 py-1"
        >
          Add a Coupon
        </Link>
        <div className="ml-5">
          <Refresher />
        </div>
      </div>
      <div className="relative h-full overflow-y-scroll px-[10px] md:px-10">
        <table className="table-auto min-w-full border border-gray-200  text-center">
          <thead className="sticky top-0 bg-gray-100 text-sm text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Code</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Value</th>
              <th className="px-4 py-2 text-left">Valid From</th>
              <th className="px-4 py-2 text-left">Valid To</th>
              <th className="px-4 py-2 text-left">Usage Limit</th>
              <th className="px-4 py-2 text-left">Usage Limit / User</th>
              <th className="px-4 py-2 text-left">Min Amount</th>
              <th className="px-4 py-2 text-left">Applies To</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {coupons &&
              coupons.map((coupon, i) => {
                const isExpired = new Date(coupon?.validTo) < new Date();
                return (
                  <tr
                    key={i}
                    className={`border-t cursor-pointer ${
                      i % 2 != 0 && "bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-2">{coupon?.code}</td>
                    <td className="px-4 py-2 capitalize">
                      {coupon?.discountType}
                    </td>
                    <td className="px-4 py-2">
                      {coupon?.discountType === "fixed"
                        ? `₹${coupon?.discountValue}`
                        : `${coupon?.discountValue}%`}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(coupon?.validFrom).toLocaleDateString()}
                    </td>
                    <td className={`px-4 py-2 ${isExpired && "text-red-600"}`}>
                      {new Date(coupon?.validTo).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      {coupon?.usageLimit == -1
                        ? "Unlimited"
                        : coupon?.usageLimit}
                    </td>
                    <td className="px-4 py-2">
                      {coupon?.usageLimitperuser == -1
                        ? "Unlimited"
                        : coupon?.usageLimitperuser}
                    </td>
                    <td className="px-4 py-2">{coupon?.minAmount}</td>
                    <td className="px-4 py-2">
                      {coupon?.applicableList.join(", ")}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          coupon?.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {coupon?.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <Editcouponbutton coupon={coupon} />
                        <Deletebutton couponid={coupon?._id} />
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default page;
