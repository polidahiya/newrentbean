import React, { useEffect, useState } from "react";
import { AppContextfn } from "@/app/Context";

function Tenure({ filteredProduct, cartproductid }) {
  const { cart, setcart, location } = AppContextfn();
  const [inputvalue, setinputvalue] = useState(
    cart[cartproductid]?.selectedtenure || 0
  );

  useEffect(() => {
    selecttenure(Math.round(inputvalue || 0));
  }, [inputvalue]);

  const locationrentprices =
    location?.location in filteredProduct?.prices
      ? filteredProduct?.prices[location?.location]
      : filteredProduct?.prices?.Default;
  const selectedtenure = cart[cartproductid]?.selectedtenure;

  const tenure = locationrentprices[selectedtenure];
  const instancerent = Math.floor(tenure?.price / tenure?.time);
  const securitydeposit = filteredProduct?.securitydeposit;
  const alltypes = {
    day: "Daily",
    days: "Daily",
    week: "Weekly",
    weeks: "Weekly",
    month: "Monthly",
    months: "Monthly",
    season: "Seasonal",
    seasons: "Seasonal",
  };

  const inputwidth = {
    0: "",
    1: "w-0",
    2: "w-[50%]",
    3: "w-[70%]",
    4: "w-[80%]",
    5: "w-[90%]",
    6: "w-[90%]",
  };

  const selecttenure = (value) => {
    setcart((prev) => {
      return {
        ...prev,
        [cartproductid]: {
          ...prev[cartproductid],
          selectedtenure: value,
        },
      };
    });
  };

  return (
    <div className="mt-5">
      <p className="mt-2 text-center">Choose Tenure</p>

      <div className="flex mt-2 gap-2 ">
        {locationrentprices.map((item, i) => (
          <button
            key={i}
            className={`relative flex-1 py-3 text-sm  before:absolute before:left-1/2 before:bottom-0  before:h-2 before:w-0.5 before:rounded-full before:bg-theme ${
              cart[cartproductid]?.selectedtenure == i && "text-theme "
            }`}
            onClick={() => setinputvalue(i)}
            aria-label="Tenure" title="Tenure"
          >
            {item?.time} {item?.type}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <input
          className={`mt-1 ${inputwidth[locationrentprices.length] || "100%"}`}
          type="range"
          value={inputvalue}
          onChange={(e) => setinputvalue(parseFloat(e.target.value))}
          onMouseUp={(e) => setinputvalue(Math.round(e.target.value || 0))}
          onTouchEnd={(e) => setinputvalue(Math.round(e.target.value || 0))}
          min={0}
          max={locationrentprices.length - 1}
          step={0.01}
        />
      </div>
      <div className="flex w-full py-3 mt-10 rounded-2xl shadow-[5px_5px_7px_rgba(0,0,0,0.123)_inset,-5px_-5px_7px_rgba(255,255,255)_inset]">
        <div className="flex-1 text-center flex flex-col items-center justify-center">
          <p>₹{parseInt(instancerent, 10).toLocaleString("en-IN")}</p>
          <p className="text-[10px]"> {alltypes[tenure?.type]} Rent</p>
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
