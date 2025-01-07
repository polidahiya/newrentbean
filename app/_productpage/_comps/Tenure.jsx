import React from "react";
import { AppContextfn } from "@/app/Context";

function Tenure({ prices, cartproductid }) {
  const { cart, setcart, location } = AppContextfn();

  const locationrentprices =
    location?.location in prices ? prices[location?.location] : prices?.Default;
  const tenure = locationrentprices[cart[cartproductid]?.tenurerange];
  const instancerent = Math.floor(tenure?.price / tenure?.time);
  const securitydeposit = cart[cartproductid]?.securitydeposit;

  return (
    <div className="mt-5">
      <p className="mt-2">Tenure:</p>
      <div className="flex mt-2 gap-2">
        {locationrentprices.map((item, i) => (
          <button
            key={i}
            className={`flex-1 py-3 rounded-full text-sm ${
              cart[cartproductid]?.tenurerange == i && "text-theme "
            } shadow-[5px_5px_7px_rgba(0,0,0,0.123)_inset,-5px_-5px_7px_rgba(255,255,255)_inset]`}
            onClick={() => {
              setcart((prev) => {
                return {
                  ...prev,
                  [cartproductid]: {
                    ...prev[cartproductid],
                    tenurerange: i,
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

{
  /* <div className="flex items-center gap-[10px]">
<span>Choose Tenure</span>{" "}
<span
  className="h-[15px] aspect-square border border-cyan-500 text-cyan-500 text-[12px] rounded-full  flex items-center justify-center cursor-pointer"
  title="Higher the tenure lower the monthly and daily price"
>
  i
</span>
</div>
<div className="mt-[10px] flex justify-between items-center">
{typeofprices[product.pricetype - 1].time.map((item, i) => {
  return (
    <span
      className={`w-full grid place-content-center ${
        productdata.time == i ? "text-theme" : ""
      }`}
      key={i}
    >
      {item}
      {typeofprices[product.pricetype - 1].suffix}
    </span>
  );
})}
</div>
<center>
          <input
            className="w-[80%] mt-[5px]"
            type="range"
            value={cart[cartproductid]?.tenurerange}
            onChange={(e) => {
              setcart((prev) => {
                return {
                  ...prev,
                  [cartproductid]: {
                    ...prev[cartproductid],
                    tenurerange: e.target.value,
                  },
                };
              });
            }}
            min={0}
            max={locationrentprices.length - 1}
          />
        </center> */
}
