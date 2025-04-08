"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa6";
import { AppContextfn } from "@/app/Context";

function Allproducts({ products }) {
  let scrollref = useRef(null);
  let scrollvalue = 400;
  const handleScroll = (amount) => {
    if (scrollref.current) {
      scrollref.current.scrollLeft += amount;
    }
  };
  return (
    <div className="px-2 py-10 md:p-10 bg-gray-100">
      <div className="flex justify-between items-end p-2 md:p-0">
        <div className=" text-[25px] font-recline">
          You&apos;ll love to
          <br />
          <div className="opacity-90 font-recline">
            {" "}
            take these home
            <div className="h-0.5 w-[100px] bg-theme"></div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleScroll(-scrollvalue)}
            className="flex items-center justify-center h-9 w-9 opacity-50 border border-gray-400 rounded-full hover:opacity-70"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={() => handleScroll(scrollvalue)}
            className="flex items-center justify-center h-9 w-9 opacity-50 border border-gray-400 rounded-full hover:opacity-70 rotate-180"
          >
            <FaAngleLeft />
          </button>
        </div>
      </div>
      {/* all posts */}
      <div
        ref={scrollref}
        className="overflow-x-scroll snap-x scroll-smooth snap-mandatory flex gap-2 mt-8"
      >
        {products.map((product, i) => (
          <Imagecard key={i} product={product} i={i} />
        ))}
      </div>
    </div>
  );
}

function Imagecard({ product, i }) {
  const { isrentalstore, location } = AppContextfn();
  const {
    _id,
    category,
    subcat,
    name,
    images,
    prices,
    buyprice,
    availablefor,
  } = product;

  const locationrentprices =
    location?.location in prices ? prices[location?.location] : prices?.Default;
  const lastprice = locationrentprices[locationrentprices.length - 1];
  const rentprice = Math.floor(lastprice.price / lastprice.time);

  return (
    <div
      className={`min-w-64 w-full md:max-w-64 p-2 flex flex-col justify-between gap-2 bg-white snap-always snap-center md:snap-start ${
        isrentalstore
          ? availablefor == "Buy" && "hidden"
          : availablefor == "Rent" && "hidden"
      }`}
    >
      <Link
        href={`/${location?.location || "Delhi"}/${category}/${subcat}/${_id}`}
        prefetch={false}
      >
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            src={images[0]}
            alt={name}
            width={230}
            height={230}
            loading="lazy"
            className="absolute h-full w-full object-contain"
          />
        </div>
        <h2 className="text-center text-sm md:text-base mt-5 truncate">
          {name}
        </h2>
      </Link>
      <div className="flex justify-between items-center w-full px-2 mt-2">
        <div>
          <div className="text-xs text-gray-400">
            {isrentalstore ? "rent" : "price"}
          </div>
          <div className="text-sm">
            {isrentalstore ? (
              <>
                {parseInt(rentprice, 10).toLocaleString("en-IN")} /{" "}
                {locationrentprices[0]?.type.replace(/s$/, "")}
              </>
            ) : (
              <>₹{parseInt(buyprice, 10).toLocaleString("en-IN")}</>
            )}
          </div>
        </div>
        <Link
          href={`/${location?.location || "Delhi"}/${category}`}
          prefetch={false}
          className="border border-theme text-theme text-sm md:text-base px-3 md:px-5 py-2 flex items-center justify-center lg:hover:bg-theme lg:hover:text-white duration-300"
        >
          See more
        </Link>
      </div>
    </div>
  );
}

export default Allproducts;
