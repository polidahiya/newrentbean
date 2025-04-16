"use client";
import React, { useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { LuLayoutGrid } from "react-icons/lu";
import { AppContextfn } from "@/app/Context";
import { HiOutlineHome } from "react-icons/hi";
import { LuShoppingCart } from "react-icons/lu";
import Link from "next/link";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { usePathname } from "next/navigation";
import { MdTimer } from "react-icons/md";
import { IoBagCheck } from "react-icons/io5";
import Switchstore from "./Switchstore";

function Mobilenav() {
  const path = usePathname();
  const {
    showsearch,
    setshowsearch,
    searchinputref,
    isrentalstore,
    cart,
    isopenstoremenu,
    openstoremenu,
    location,
  } = AppContextfn();

  const cartitems = Object.values(cart).filter((item) => item.added);
  const totalQuantity = cartitems.reduce(
    (total, value) => total + value.quantity,
    0
  );

  return (
    <>
      {isopenstoremenu?.show && <Storemenu />}
      <div className="h-16 w-full flex items-center justify-around px-2 border-t sticky bottom-0 lg:hidden bg-white rounded-t-3xl z-20">
        <Link
          href={`/${location?.location}/${isrentalstore ? "Rent" : "Buy"}`}
          prefetch={false}
          className={`flex-1 flex flex-col items-center gap-1 text-xl opacity-80 ${
            (path == "/" ||
              path == "/Gurgaon" ||
              path == "/Delhi" ||
              path == "/Faridabad" ||
              path == "/Noida" ||
              path == "/Ghaziabad") &&
            "text-theme"
          }`}
        >
          <HiOutlineHome />
          <span className="text-xs font-semibold">Home</span>
        </Link>

        {/* search button */}
        <button
          onClick={() => {
            history.pushState(null, "", "");
            setshowsearch(true);
            setTimeout(() => {
              searchinputref.current.focus();
            }, 100);
          }}
          className={`flex-1 flex flex-col items-center gap-1 text-xl opacity-80 ${
            showsearch && "text-theme"
          }`}
        >
          <FiSearch />
          <span className="text-xs font-semibold">Search</span>
        </button>

        <Link
          href={`/allcategories?location=${location?.location}&store=${
            isrentalstore ? "Rent" : "Buy"
          }`}
          prefetch={false}
          className={`flex-1 flex flex-col items-center gap-1 text-xl opacity-80 ${
            path.includes("/allcategories") && "text-theme"
          }`}
        >
          <LuLayoutGrid />
          <span className="text-xs font-semibold">Menu</span>
        </Link>

        {/* cart */}
        <Link
          href="/cart"
          prefetch={false}
          className={`flex-1 flex flex-col items-center gap-1 text-xl opacity-80 relative ${
            path.includes("/cart") && "text-theme"
          }`}
        >
          <LuShoppingCart />
          <span className="text-xs font-semibold">Cart</span>
          {totalQuantity > 0 && (
            <div className="absolute -top-2 left-1/2 translate-x-1 h-4 aspect-square bg-theme text-white text-[10px] rounded-full flex items-center justify-center ">
              {totalQuantity}
            </div>
          )}
        </Link>

        {/* rent or buy switch */}
        <button
          onClick={() => {
            if (isopenstoremenu?.show) {
              window.history.back();
            } else {
              history.pushState(null, "", "");
              openstoremenu();
            }
          }}
          className={`flex-1 flex flex-col items-center gap-1 text-xl opacity-80 ${
            isopenstoremenu?.show && "text-theme"
          }`}
          aria-label={isrentalstore ? "Rent" : "Buy"}
          title={isrentalstore ? "Rent" : "Buy"}
        >
          <MdOutlineStoreMallDirectory />
          <span className="text-xs font-semibold">
            Store{"("}
            {isrentalstore ? "Rent" : "Buy"}
            {")"}
          </span>
        </button>
      </div>
    </>
  );
}

const Storemenu = () => {
  const {
    location,
    setlocation,
    isrentalstore,
    setisrentalstore,
    isopenstoremenu,
  } = AppContextfn();
  return (
    <div
      className={`fixed bottom-16 border left-1/2 -translate-x-1/2 w-80 mx-2 bg-white rounded-2xl shadow-md p-5 lg:hidden duration-300 overflow-hidden ${
        isopenstoremenu.effect
          ? "opacity-100 -translate-y-5 z-50"
          : "opacity-0 -translate-y-0 z-0"
      }`}
    >
      <button
        aria-label="Close Store Menu"
        className="absolute top-3 right-3 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
        onClick={() => {
          window.history.back();
        }}
      >
        ✕
      </button>
      <h3 className="flex items-center justify-center gap-1 text-xl font-semibold">
        <MdOutlineStoreMallDirectory />
        Store
      </h3>
      <div className="mt-7">
        <Switchstore />
      </div>
      <div
        className="w-full flex items-center justify-center gap-1 mt-4 border py-2 rounded-lg text-theme font-semibold"
        onClick={() => {
          setlocation((pre) => ({ ...pre, show: true }));
          window.history.back();
        }}
      >
        {location?.location}
      </div>
    </div>
  );
};

export default Mobilenav;
