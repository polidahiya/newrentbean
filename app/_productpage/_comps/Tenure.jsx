import React from "react";
import { AppContextfn } from "@/app/Context";

function Tenure({ filteredProduct, cartproductid }) {
  const { cart, setcart, location } = AppContextfn();

  const locationrentprices =
    location?.location in filteredProduct?.prices
      ? filteredProduct?.prices[location?.location]
      : filteredProduct?.prices?.Default;
  const selectedtenure = cart[cartproductid]?.selectedtenure;
  const tenure = locationrentprices[selectedtenure];
  const instancerent = Math.floor(tenure?.price / tenure?.time);
  const securitydeposit = filteredProduct?.securitydeposit;

  return (
    <div className="mt-5">
      <p className="mt-2">Tenure:</p>
      <div className="flex mt-2 gap-2">
        {locationrentprices.map((item, i) => (
          <button
            key={i}
            className={`flex-1 py-3 rounded-full text-sm ${
              cart[cartproductid]?.selectedtenure == i && "text-theme "
            } shadow-[5px_5px_7px_rgba(0,0,0,0.123)_inset,-5px_-5px_7px_rgba(255,255,255)_inset]`}
            onClick={() => {
              setcart((prev) => {
                return {
                  ...prev,
                  [cartproductid]: {
                    ...prev[cartproductid],
                    selectedtenure: i,
                  },
                };
              });
            }}
          >
            {item?.time} {item?.type}
          </button>
        ))}
      </div>
      <div className="flex w-full py-3 mt-5 rounded-2xl shadow-[5px_5px_7px_rgba(0,0,0,0.123)_inset,-5px_-5px_7px_rgba(255,255,255)_inset]">
        <div className="flex-1 text-center flex flex-col items-center justify-center">
          <p>₹{parseInt(instancerent, 10).toLocaleString("en-IN")}</p>
          <p className="text-[10px]"> Monthly Rent</p>
        </div>
        <div className="min-h-8 w-px bg-slate-300" />
        <div className="flex-1 text-center flex flex-col items-center justify-center">
          <p>₹{parseInt(tenure?.price, 10).toLocaleString("en-IN")}</p>
          <p className="text-[10px]"> Total Rent</p>
        </div>
        <div className="min-h-8 w-px bg-slate-300" />
        <div className="flex-1 text-center flex flex-col items-center justify-center">
          <p>₹{parseInt(securitydeposit, 10).toLocaleString("en-IN")}</p>{" "}
          <p className="text-[10px]">Security Deposit (*Refundable)</p>
        </div>
      </div>
    </div>
  );
}

export default Tenure;
