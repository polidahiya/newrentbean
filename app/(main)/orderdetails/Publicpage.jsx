"use client";
import { Cancelorder } from "@/app/_serveractions/Getordershistory";
import Productnotfound from "@/app/_components/Productnotfound";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { LiaExclamationTriangleSolid } from "react-icons/lia";
import { IoHelpCircleOutline } from "react-icons/io5";
import React, { useState } from "react";
import { orderstages } from "@/app/commondata";
import { AppContextfn } from "@/app/Context";
import Link from "next/link";
import Nextimage from "@/app/_components/Nextimage";
import { selectedtenure } from "@/app/_components/_helperfunctions/selectedtenure";

export default function Publicpage({ res }) {
  const { setmessagefn } = AppContextfn();
  const [ordershistory, setordershistory] = useState(res?.result || []);

  if (ordershistory.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-110px)] bg-gray-50">
        <Productnotfound />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-110px)] py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {ordershistory.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex flex-col gap-6">
                {item?.products.map((product, index) => (
                  <Historyproductcard
                    key={index}
                    item={item}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
              <OrderStatus item={item} />
            </div>
          </div>
        ))}
        <p className="text-center text-sm  text-gray-500 mt-6 italic">
          Note: Order details reflect the state at purchase time and may not
          show current availability or prices.
        </p>
      </div>
    </div>
  );
}

const Historyproductcard = ({ item, product, index }) => {
  const { setmessagefn } = AppContextfn();
  const [showconfirmation, setshowconfirmation] = useState(false);
  const [moreoptions, setmoreoptions] = useState(false);
  const [canceltag, setcanceltag] = useState(product?.status);

  const handleCancelOrder = async () => {
    const res = await Cancelorder(item._id, index);
    setshowconfirmation(false);
    if (res?.status === 200) {
      setcanceltag(1);
    }
    setmessagefn(res?.message);
  };

  // Format start date if available
  const startDate = product?.tenureStart
    ? `${product.tenureStart.date}/${product.tenureStart.month}/${product.tenureStart.year}`
    : new Date(item.createdAt).toLocaleDateString();

  const tenure = selectedtenure(product, item?.location).selected;

  return (
    <div
      className={`relative flex gap-4 p-4 rounded-lg transition-colors duration-200 ${
        canceltag === 0
          ? "bg-white"
          : canceltag === 1
          ? "bg-red-50"
          : "bg-yellow-50"
      }`}
    >
      <div className="flex-shrink-0">
        <Nextimage
          src={product?.image}
          alt={product?.name}
          loading="lazy"
          height={80}
          width={80}
          className="rounded-md object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-900">{product?.name}</h3>
        <div className="text-sm  text-gray-600 mt-1 space-y-1">
          <p>
            <span className="font-medium">Order #:</span> {item.orderNumber}
          </p>
          <p>
            <span className="font-medium">Price:</span> ₹{tenure?.price} for{" "}
            {tenure?.time} {tenure?.type} |
            <span className="font-medium"> Security:</span> ₹
            {product?.securitydeposit}
          </p>
          <p>
            <span className="font-medium">Start Date:</span> {startDate}
          </p>
        </div>
      </div>

      {canceltag === 0 && item.status < 3 && (
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

      {canceltag !== 0 && (
        <span className="absolute top-2 right-2 px-2 py-1 text-xs font-medium text-white bg-gray-800/75 rounded-full">
          {canceltag === 1 ? "Canceled" : "Refunded"}
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

const OrderStatus = ({ item }) => {
  return (
    <div className="flex justify-center mt-6">
      {![4, 5].includes(item.status) && (
        <div className="bg-white rounded-lg lg:rounded-b-none pt-3 w-full md:w-[600px]">
          <div className="flex items-center w-full mt-2 px-10 md:px-[60px]">
            {orderstages.slice(0, 4).map((_, i) => (
              <div
                key={i}
                className={`flex items-center ${i !== 0 && "w-full"}`}
              >
                {i !== 0 && (
                  <div
                    className={`h-0.5 w-full ${
                      item.status >= i ? "bg-blue-500" : "bg-slate-300"
                    }`}
                  />
                )}
                <div
                  className={`min-w-[10px] aspect-square rounded-full ${
                    item.status >= i ? "bg-blue-500" : "bg-slate-300"
                  }`}
                />
              </div>
            ))}
            <div className={`flex items-center w-full`}>
              <div
                className={`h-0.5 w-full border-2 border-dashed ${
                  item.status == 6 ? "border-blue-500" : "border-slate-300"
                }`}
              />
              <div
                className={`min-w-[10px] aspect-square rounded-full ${
                  item.status == 6 ? "bg-blue-500" : "bg-slate-300"
                }`}
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-full py-2 px-5 text-[10px] md:text-sm gap-2">
            {orderstages.slice(0, 4).map((stage, i) => (
              <span key={i} className="text-center">
                {stage}
              </span>
            ))}
            <span className="text-center">Completed</span>
          </div>
        </div>
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
