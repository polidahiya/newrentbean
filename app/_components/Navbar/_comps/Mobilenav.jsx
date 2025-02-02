"use client";
import React, { useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { LuLayoutGrid } from "react-icons/lu";
import { AppContextfn } from "@/app/Context";
import { MdLocationPin } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import Link from "next/link";

function Mobilenav() {
  const {
    showsearch,
    setshowsearch,
    showcat,
    setshowcat,
    searchinputref,
    location,
    setlocation,
    isrentalstore,
    setisrentalstore,
    shownavbottom,
    cart,
  } = AppContextfn();

  const cartitems = Object.values(cart).filter((item) => item.added);
  const totalQuantity = cartitems.reduce(
    (total, value) => total + value.quantity,
    0
  );

  useEffect(() => {
    const hidemenu2 = () => {
      setshowcat(false);
      setshowsearch(false);
    };
    window.addEventListener("popstate", hidemenu2);
    return () => {
      window.removeEventListener("popstate", hidemenu2);
    };
  }, []);

  return (
    <div className="h-12 w-full flex items-center justify-around border-t sticky bottom-0 md:hidden bg-white z-20">
      {/* location */}
      <button
        className="h-8 px-5 border rounded-full flex items-center justify-center gap-1 text-theme"
        onClick={() => setlocation((pre) => ({ ...pre, show: true }))}
      >
        <MdLocationPin className="inline-block" />{" "}
        <span>{location.location}</span>
      </button>
      {/* search button */}
      <button
        className="h-full aspect-square  flex items-center justify-center"
        onClick={() => {
          history.pushState(null, "", "");
          setshowsearch(true);
          setTimeout(() => {
            searchinputref.current.focus();
          }, 100);
        }}
      >
        <FiSearch className="h-full text-[25px] aspect-square " />
      </button>
      <Link
        href={"/allcategories"}
        className="h-full aspect-square  flex items-center justify-center"
      >
        <LuLayoutGrid className="h-full text-[25px] aspect-square " />
      </Link>

      {/* cart */}
      <Link
        href="/cart"
        className="relative h-full aspect-square flex items-center justify-center"
      >
        <LuShoppingCart className="text-[25px]" />
        {totalQuantity > 0 && (
          <div className="absolute top-1 right-1 h-4 aspect-square bg-theme text-white text-[10px] rounded-full flex items-center justify-center ">
            {totalQuantity}
          </div>
        )}
      </Link>

      {/* rent or buy switch */}
      <button
        className={`h-8 px-5 border rounded-full flex items-center justify-center gap-1 text-theme
               ${isrentalstore ? "flex-row-reverse pl-1 pr-5" : "pl-5 pr-1"}`}
        onClick={() => setisrentalstore((pre) => !pre)}
      >
        {isrentalstore ? "Rent" : "Buy"}
        <span className="block h-5 aspect-square rounded-full bg-theme"></span>
      </button>
    </div>
  );
}

export default Mobilenav;
