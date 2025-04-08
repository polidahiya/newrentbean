"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiClock } from "react-icons/fi";
import { AppContextfn } from "../Context";

function Productcard({
  index,
  id,
  category,
  subcat,
  name,
  prices,
  buyprice,
  availablefor,
  available,
  sku,
  image,
  link,
  tags,
  maxwidth = true,
}) {
  const { isrentalstore, location } = AppContextfn();
  const [showproduct, setshowproduct] = useState(false);
  const [loading, setloading] = useState({
    effect: true,
    show: true,
  });
  const [imgSrc, setImgSrc] = useState(image);

  // Fallback image URL
  const fallbackImage = "/default-fallback-image.png";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setshowproduct(true);
    }, index * 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [index]);

  const handleImageError = () => {
    setImgSrc(fallbackImage);
  };

  const locationrentprices =
    location?.location in prices ? prices[location?.location] : prices?.Default;
  const lastprice = locationrentprices[locationrentprices.length - 1];
  const rentprice = Math.floor(lastprice.price / lastprice.time);

  return (
    <Link
      href={link ? link : `/${location?.location}/${category}/${subcat}/${id}`}
      className={`group relative w-full shadow-md min-w-44 md:min-w-60 bg-white rounded-3xl overflow-hidden duration-300 ${
        isrentalstore
          ? availablefor == "Buy" && "hidden"
          : availablefor == "Rent" && "hidden"
      } ${showproduct ? "opacity-100 scale-100" : "opacity-0 scale-75"} 
      ${maxwidth && "max-w-72 md:max-w-80"}`}
      prefetch={false}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={imgSrc}
          alt={name}
          width={300}
          height={300}
          className="min-w-full min-h-full  object-cover object-center  scale-100 lg:group-hover:scale-105 lg:duration-300"
          loading="lazy"
          onLoad={() => {
            setloading((pre) => ({ ...pre, effect: false }));
            setTimeout(() => {
              setloading((pre) => ({ ...pre, show: false }));
            }, 550);
          }}
          onError={handleImageError} // Handle image error
        />
        {/* loading */}
        {loading.show && (
          <div
            className={`imgloader absolute inset-0 bg-bg1 ${
              !loading.effect && "opacity-0"
            } duration-500`}
          ></div>
        )}
        <div className="absolute top-2 left-1 md:top-2 md:left-2 flex flex-col items-start gap-1 text-[8px] md:text-sm text-white">
          {/* available */}
          {!available && (
            <div
              className={`flex items-center gap-1 bg-red-600 py-1 px-1 md:px-2 rounded-md`}
            >
              <FiClock />
              Comming soon!
            </div>
          )}
          {tags?.includes("New-Product") && (
            <div
              className={`flex items-center gap-1 bg-green-600 py-1 px-1 md:px-2 rounded-md`}
            >
              New Arrival
            </div>
          )}
        </div>
        {!available && (
          <div className="w-full absolute bottom-0 text-center bg-bg1 py-1 font-black">
            Out of stock
          </div>
        )}
      </div>
      <div className="relative p-[10px]">
        <h3 className="py-[5px] md:py-[10px] text-xs md:text-base text-center w-full whitespace-nowrap text-ellipsis overflow-hidden">
          {name}
        </h3>
        <div className="flex items-center justify-center w-full">
          <div className="bg-theme text-white text-sm min-w-[90%] px-2 py-2 flex items-center justify-center rounded-full text-nowrap">
            {isrentalstore ? (
              <>
                <span>Rent </span> : ₹{" "}
                {parseInt(rentprice, 10).toLocaleString("en-IN")} /{" "}
                {locationrentprices[0]?.type.replace(/s$/, "")}
              </>
            ) : (
              <>₹{parseInt(buyprice, 10).toLocaleString("en-IN")}</>
            )}
          </div>
        </div>
        <div className="absolute w-24 h-0.5 bottom-1 left-1/2 -translate-x-1/2 bg-theme rounded-full"></div>
      </div>
    </Link>
  );
}

export default Productcard;
