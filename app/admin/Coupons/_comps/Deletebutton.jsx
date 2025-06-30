"use client";
import React from "react";
import { AppContextfn } from "@/app/Context";
import { Deletecoupon } from "../Add/Serveraction";

function Deletebutton({ couponid }) {
  const { setshowdialog, setmessagefn } = AppContextfn();
  return (
    <button
      className="text-red-600 px-5 py-1 rounded-md border"
      onClick={() =>
        setshowdialog({
          show: true,
          title: "Delete this Coupon?",
          type: false,
          continue: async () => {
            const res = await Deletecoupon(couponid);
            setmessagefn(res?.message);
          },
        })
      }
    >
      Delete
    </button>
  );
}

export default Deletebutton;
