"use client";
import React from "react";
import { Usecartcontext } from "../../../Cartcontext";

function Paymentmethodtoggler({ totalPrice, maxcashpaymentavailable }) {
  const { paymentMethod, setpaymentMethod } = Usecartcontext();
  return (
    <>
      {["online", "cod"].map((item, i) => (
        <label
          key={i}
          className={`w-full flex items-center gap-4 p-4 border rounded-md cursor-pointer lg:hover:shadow transition-all`}
        >
          <div className="relative">
            <div
              className={`flex items-center justify-center absolute w-5 aspect-square rounded-full  ${
                paymentMethod === item ? "bg-theme" : "bg-gray-200"
              }`}
            >
              <div
                className={`absolute w-3 aspect-square rounded-full border-[2px] border-white ${
                  paymentMethod === item ? "bg-theme " : "bg-gray-200"
                }`}
              ></div>
            </div>
            {/*  */}
            <input
              type="radio"
              name="payment"
              value={item}
              checked={paymentMethod === item}
              disabled={item == "cod" && totalPrice >= maxcashpaymentavailable}
              onChange={() => setpaymentMethod(item)}
              className="opacity-0"
            />
          </div>
          <span className="text-gray-700 font-medium">
            {item == "online" ? "Pay Online" : "Cash on Delivery (COD)"}
          </span>
        </label>
      ))}
    </>
  );
}

export default Paymentmethodtoggler;
