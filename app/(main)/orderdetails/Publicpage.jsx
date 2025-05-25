"use client";
import { Cancelorder } from "@/app/_serveractions/Getordershistory";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { LiaExclamationTriangleSolid } from "react-icons/lia";
import { IoHelpCircleOutline } from "react-icons/io5";
import React, { useState } from "react";
import {  months } from "@/app/commondata";
import { AppContextfn } from "@/app/Context";
import Link from "next/link";
import Nextimage from "@/app/_components/Nextimage";
import { selectedtenure } from "@/app/_components/_helperfunctions/selectedtenure";

export default function Historyproductcard  ({ item, product })  {
  const { setmessagefn } = AppContextfn();
  const [showconfirmation, setshowconfirmation] = useState(false);
  const [moreoptions, setmoreoptions] = useState(false);
  const [orderstatus, setorderstatus] = useState(item?.status);

  const handleCancelOrder = async () => {
    const res = await Cancelorder(item._id);
    setshowconfirmation(false);
    if (res?.status === 200) {
      setorderstatus(4);
    }
    setmessagefn(res?.message);
  };

  // Format start date if available
  const tenurestart = product?.tenureStart;
  const startDate = `${tenurestart?.date} ${months[tenurestart?.month]} ${
    tenurestart?.year
  }`;
  const tenure = selectedtenure(product, item?.location).selected;

  const order_status_bg_color = {
    0: "bg-white",
    4: "bg-red-50",
    5: "bg-yellow-50",
  };

  const order_status_tag = {
    0: "",
    4: "Canceled",
    5: "Refunded",
  };

  return (
    <div
      className={`relative flex gap-4 p-4 rounded-lg transition-colors duration-200 ${order_status_bg_color[orderstatus]}`}
    >
      <div className="flex-shrink-0">
        <Nextimage
          src={product?.image}
          alt={product?.name}
          loading="lazy"
          height={80}
          width={80}
          className="rounded-md object-cover mix-blend-multiply"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-900">{product?.name}</h3>
        <div className="text-sm  text-gray-600 mt-1 space-y-1">
          <p>
            <span className="font-medium">Order #:</span> {item.orderNumber}
          </p>
          <p>{product?.isrentalstore ? "For Rent" : "For Buy"}</p>
          {product?.isrentalstore ? (
            <>
              <p>
                <span className="font-medium">Price:</span> ₹{tenure?.price} for{" "}
                {tenure?.time} {tenure?.type} |
                <span className="font-medium"> Security:</span> ₹
                {product?.securitydeposit}
              </p>
              <p>
                <span className="font-medium">Start Date:</span> {startDate}
              </p>
            </>
          ) : (
            <p>
              <span className="font-medium">Price:</span> ₹{product?.buyprice}
            </p>
          )}
        </div>
      </div>

      {orderstatus === 0 && item.status < 3 && (
        <div className="relative">
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setmoreoptions(!moreoptions)}
            aria-label="Open Menu"
            title="Open Menu"
          >
            <BiDotsHorizontalRounded className="text-gray-600 text-xl" />
          </button>
          {moreoptions && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10 animate-fade-in">
              <button
                className="w-full text-left px-4 py-2  text-sm  text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setshowconfirmation(true)}
                aria-label="Cancel Product"
                title="Cancel Product"
              >
                Cancel Product
              </button>
            </div>
          )}
        </div>
      )}

      {orderstatus !== 0 && (
        <span className="absolute top-2 right-2 px-2 py-1 text-xs font-medium text-white bg-gray-800/75 rounded-full">
          {order_status_tag[orderstatus]}
        </span>
      )}

      {moreoptions && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setmoreoptions(false)}
        />
      )}
      {showconfirmation && (
        <Cancleorderconfirmation
          confirmfn={handleCancelOrder}
          setshowconfirmation={setshowconfirmation}
        />
      )}
    </div>
  );
};



const Cancleorderconfirmation = ({ confirmfn, setshowconfirmation }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-[600px] shadow-xl">
        <div className="flex items-center justify-center gap-3 mb-4">
          <LiaExclamationTriangleSolid className="text-2xl text-yellow-500 flex-shrink-0" />
          <p className="text-gray-800 text-sm ">
            Canceling now may incur a 5% deduction from your refund.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center whitespace-nowrap">
          <Link
            href="/Contact"
            className="flex items-center justify-center gap-2 px-4 py-2  text-gray-600 border border-gray-200 rounded-lg hover transition-colors"
          >
            <IoHelpCircleOutline className="text-lg" />
            Need Help
          </Link>
          <button
            className="flex items-center justify-center gap-2 px-4 py-2  bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            onClick={confirmfn}
            aria-label="Confirm Cancellation"
            title="Confirm Cancellation"
          >
            <LiaExclamationTriangleSolid className="text-lg" />
            Confirm Cancellation
          </button>
          <button
            className="px-4 py-2  text-gray-600 border border-gray-200 rounded-lg hover transition-colors"
            onClick={() => setshowconfirmation(false)}
            aria-label="Go Back"
            title="Go Back"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};
