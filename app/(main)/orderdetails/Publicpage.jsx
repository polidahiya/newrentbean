"use client";
import {
  getordershistory,
  Cancelorder,
} from "@/app/_serveractions/Getordershistory";
import Productnotfound from "@/app/_components/Productnotfound";
import Productcard from "@/app/_components/Productcard";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { LiaExclamationTriangleSolid } from "react-icons/lia";
import { IoHelpCircleOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { orderstages } from "@/app/commondata";
import { AppContextfn } from "@/app/Context";
import Link from "next/link";

export default function Publicpage({ res }) {
  const { setmessagefn } = AppContextfn();
  const [ordershistory, setordershistory] = useState(
    res.result ? res.result : []
  );

  useEffect(() => {
    (async () => {
      const res = await getordershistory();
      if (res?.result) {
        setordershistory(res?.result);
      }
      if (res?.message) setmessagefn(res?.message);
    })();
  }, []);

  if (ordershistory.length == 0)
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-110px)]">
        <Productnotfound />
      </div>
    );

  return (
    <div className="w-full min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-110px)] flex flex-col  gap-[20px] p-[20px]">
      {ordershistory.map((item, i) => (
        <div
          key={i}
          className="relative shadow-md rounded-[10px] overflow-hidden bg-bg1"
        >
          <div className="w-full flex justify-center flex-wrap gap-3 p-[20px]">
            {item?.products.map((product, index) => {
              return (
                <Historyproductcard
                  key={index}
                  item={item}
                  product={product}
                  index={index}
                />
              );
            })}
          </div>
          <OrderStatus item={item} />
        </div>
      ))}
      {/* Order details note */}
      <p className="text-center text-sm text-gray-600  mb-[10px]">
        Note: The details of the orders shown are reflective of the state at the
        time of your purchase and may not represent current availability or
        prices.
      </p>
    </div>
  );
}

const Historyproductcard = ({ item, product, index }) => {
  const { setmessagefn } = AppContextfn();
  const [showconfirmation, setshowconfirmation] = useState(false);
  const [moreoptions, setmoreoptions] = useState({
    show: false,
    effect: false,
  });
  const [canceltag, setcanceltag] = useState(product.status);

  const toggleMoreOptions = () => {
    setmoreoptions((prev) => ({ ...prev, show: !prev.show }));
    setTimeout(() => {
      setmoreoptions((prev) => ({ ...prev, effect: prev.show }));
    }, 100);
  };

  const handleCancelOrder = async () => {
    const res = await Cancelorder(item._id, index);
    setshowconfirmation(false);
    if (res?.status == 200) {
      setcanceltag(1);
    }
    setmessagefn(res?.message);
  };

  return (
    <div
      className={`relative h-full w-full max-w-[350px] md:min-w-[270px] shadow-md rounded-[10px] overflow-hidden  ${
        canceltag == 0 && "bg-white"
      } ${canceltag == 1 && "bg-red-100"}
      ${canceltag == 2 && "bg-yellow-100"}`}
    >
      <Productcard
        index={index}
        id={product._id}
        category={product.category}
        subcat={product.subcat}
        name={product.name}
        price={product.price}
        discount={product.discount}
        available={true}
        colorpalets={product.colorpalets}
        image={product.colorpalets[product?.selectedcolor].images[0]}
        rating={product.rating}
      />
      {/* options */}
      {canceltag == 0 && item.status < 3 && (
        <div
          className="absolute right-[10px] top-[10px] p-[5px] aspect-square bg-white rounded-full cursor-pointer z-10 "
          onClick={toggleMoreOptions}
        >
          <BiDotsHorizontalRounded />
          <div
            className={`absolute top-[calc(100%+10px)] right-0 bg-white rounded-[10px] w-[150px] shadow-md p-[5px] duration-300 ${
              moreoptions.effect
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[20px]"
            }`}
          >
            <button
              className="w-full rounded-[5px] text-center lg:hover:bg-slate-100"
              onClick={() => setshowconfirmation(true)}
            >
              Cancel Product
            </button>
          </div>
        </div>
      )}
      {/* tags */}
      {canceltag != 0 && (
        <div className="absolute top-32 left-1/2 -translate-x-1/2  text-white bg-black bg-opacity-50 px-5 whitespace-nowrap">
          This order is {canceltag == 1 && "canceled"}
          {canceltag == 2 && "refunded"}
        </div>
      )}
      {/* black screen */}
      {moreoptions.show && (
        <div
          className="fixed h-full w-full top-0 left-0"
          onClick={toggleMoreOptions}
        ></div>
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
    <center>
      {item.status < 4 && (
        <div className="bg-white rounded-lg lg:rounded-b-none pt-3 w-full md:w-[600px] ">
          <div className="flex items-center w-full mt-[10px] px-[40px] md:px-[60px]">
            {orderstages.slice(0, 4).map((_, i) => (
              <div
                key={i}
                className={`flex items-center ${i !== 0 && "w-full"}`}
              >
                {i !== 0 && (
                  <div
                    className={`h-[2px] w-full ${
                      item.status >= i ? "bg-theme" : "bg-slate-300"
                    }`}
                  ></div>
                )}
                <div
                  className={`min-w-[10px] aspect-square rounded-full ${
                    item.status >= i ? "bg-theme" : "bg-slate-300"
                  }`}
                ></div>
              </div>
            ))}
          </div>
          {/* stage names */}
          <div className="flex items-center justify-between w-full py-[10px] px-[20px] text-[10px] md:text-[14px] gap-[10px]">
            {orderstages.slice(0, 4).map((stage, i) => (
              <span key={i} className="text-center">
                {stage}
              </span>
            ))}
          </div>
        </div>
      )}
    </center>
  );
};

const Cancleorderconfirmation = ({ confirmfn, setshowconfirmation }) => {
  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-black bg-opacity-30 z-20 flex items-center justify-center">
      <div className="w-[90%] max-w-[600px] bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-3 text-yellow-600 mb-4">
          <p className="text-lg font-semibold text-center">
            Canceling the order at this stage may result in a 5% deduction from
            your refund.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
          <Link
            href="/Contact"
            className="border border-slate-300 rounded-md px-4 py-1 text-slate-500 hover:bg-slate-50 flex items-center justify-center gap-1"
          >
            <IoHelpCircleOutline className="text-[20px]" /> Need Help
          </Link>
          <button
            className="bg-yellow-500 text-white rounded-md px-4 py-1 hover:bg-yellow-400 flex items-center justify-center gap-1"
            onClick={confirmfn}
          >
            <LiaExclamationTriangleSolid className="text-[20px] text-white " />
            Confirm Cancellation
          </button>
          <button
            className="border border-slate-300 rounded-md px-4 py-1 text-slate-500 hover:bg-slate-50"
            onClick={() => setshowconfirmation(false)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};
