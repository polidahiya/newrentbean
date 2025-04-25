"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";
import { AppContextfn } from "@/app/Context";
import { months } from "@/app/commondata";

export default function Products({ cartproductid, item, i, setshowtenure }) {
  const { setcart, setmessagefn, location } = AppContextfn();
  const fallbackImage = "/logo&ui/default-fallback-image.png";
  const MAX_QUANTITY = item?.maxquantity;

  const [imgSrc, setImgSrc] = useState(item?.image);
  const handleImageError = () => setImgSrc(fallbackImage);

  const handleIncrement = () => {
    if (item?.quantity < MAX_QUANTITY) {
      setcart((pre) => {
        const updatedcart = { ...pre };
        updatedcart[cartproductid] = {
          ...updatedcart[cartproductid],
          quantity: updatedcart[cartproductid]?.quantity + 1,
        };
        return updatedcart;
      });
    } else {
      setmessagefn("Maximum quantity reached");
    }
  };
  const handleDecrement = () => {
    if (item?.quantity > 1)
      setcart((pre) => {
        const updatedcart = { ...pre };
        updatedcart[cartproductid] = {
          ...updatedcart[cartproductid],
          quantity: updatedcart[cartproductid]?.quantity - 1,
        };
        return updatedcart;
      });
  };
  // add to cart button
  const handleRemoveProduct = () => {
    setcart((pre) => {
      const updatedcart = { ...pre };
      updatedcart[cartproductid] = {
        ...updatedcart[cartproductid],
        added: false,
      };
      return updatedcart;
    });
    setmessagefn("Removed from cart");
  };

  const finaltenure =
    location?.location in item?.prices
      ? item?.prices[location?.location]
      : item?.prices.Default;
  const totalprice = finaltenure[item?.selectedtenure]?.price;

  return (
    <div className="flex flex-col gap-5 w-full p-2">
      {i !== 0 && <hr />}
      <div className="flex flex-col md:flex-row gap-5 md:h-60">
        <Link
          href={item?.productlink}
          className="w-full md:w-auto aspect-[2/1] md:h-full md:aspect-square"
        >
          <Image
            src={imgSrc}
            alt={item.name}
            height={100}
            width={100}
            className="h-full w-full aspect-[2/1] md:aspect-square object-contain md:object-cover object-center"
            onError={handleImageError}
          />
        </Link>
        <div className="flex flex-col h-full w-full">
          <h2 className="font-bold text-xl font-recline tracking-wider text-ellipsis overflow-hidden ">
            {item.name}
          </h2>
          <p className="font-bold text-gray-500">
            By:{" "}
            <span className="bg-theme bg-clip-text text-transparent">
              Rentbean
            </span>
          </p>
          <p className="font-bold text-gray-500 font-recline mt-auto">
            {item?.isrentalstore ? "On Rent" : "For Buy"}
          </p>
          {item?.isrentalstore && (
            <p>
              Tenure Start Date: {item?.tenureStart?.date}{" "}
              {months[item?.tenureStart?.month]} {item?.tenureStart?.year}
            </p>
          )}
          {item?.isrentalstore ? (
            <>
              <p className="text-sm">
                Rent: ₹{(totalprice * item?.quantity).toLocaleString("en-IN")}
                {"/-"}
              </p>
              <p className="text-sm">
                Security Deposit : ₹
                {(item?.securitydeposit * item?.quantity).toLocaleString(
                  "en-IN"
                )}
                {"/-"} <span className="text-sky-500">{"(*Refundable)"}</span>
              </p>
              <p className="text-sm">
                Total : ₹
                {(
                  totalprice * item?.quantity +
                  item?.securitydeposit * item?.quantity
                ).toLocaleString("en-IN")}
                {"/-"}{" "}
                <span className="text-sky-500">
                  {"(Rent + Security Deposit)"}
                </span>
              </p>
            </>
          ) : (
            <>
              <p>
                Price: ₹
                {(item?.buyprice * item?.quantity).toLocaleString("en-IN")}
                {"/-"}
              </p>
            </>
          )}

          <div className="flex gap-5 h-[30px]  mt-5 md:mt-auto">
            <div className="flex items-center gap-1 h-full">
              <button
                className="h-full aspect-square rounded-md border border-slate-300"
                onClick={handleDecrement}
                aria-label="Descresase" title="Descrease"
              >
                -
              </button>
              <span className="h-full flex items-center justify-center px-5 border border-slate-300 rounded-md">
                {item.quantity}
              </span>
              <button
                className="h-full aspect-square rounded-md border border-slate-300"
                onClick={handleIncrement}
                aria-label="Increase" title="Increase"
              >
                +
              </button>
            </div>
            {/* change tenure */}
            {item?.isrentalstore && (
              <button
                className="h-full rounded-md px-5 border border-slate-300"
                onClick={() => {
                  setshowtenure({
                    show: true,
                    data: finaltenure,
                    cartproductid: cartproductid,
                  });
                }}
                aria-label="Select Tenure" title="Select Tenure"
              >
                {finaltenure[item?.selectedtenure]?.time}{" "}
                {finaltenure[item?.selectedtenure]?.type}
              </button>
            )}

            {/* removebutton */}
            <button
              className="h-full flex items-center gap-1 border border-slate-300 px-5 rounded-md"
              onClick={handleRemoveProduct}
              aria-label="Remove" title="Remove"
            >
              <AiOutlineDelete className="aspect-square" />
              <span className="hidden md:block">Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
