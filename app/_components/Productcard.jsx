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
      href={link ? link : `/${category}/${subcat}/${id}`}
      className={`group relative w-full shadow-md  bg-white duration-300 rounded-2xl overflow-hidden ${
        showproduct ? "opacity-100 scale-100" : "opacity-0 scale-75"
      }`}
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
        <div className="absolute top-[5px] left-[5px] md:top-[10px] md:left-[10px] flex flex-col items-start gap-[5px] text-[8px] md:text-[14px] text-white">
          {/* available */}
          {!available && (
            <div
              className={`flex items-center gap-[5px]  bg-red-600 py-[5px] px-[5px] md:px-[10px] rounded-[5px]`}
            >
              <FiClock />
              Comming soon!
            </div>
          )}
        </div>
      </div>

      <div className="relative p-[10px]">
        <h3 className="py-[5px] md:py-[10px] text-xs md:text-base text-center w-full whitespace-nowrap text-ellipsis overflow-hidden">
          {name}
        </h3>
        <div className="flex items-center justify-center">
          <div className="bg-theme text-white w-10/12 max-w-full flex items-center justify-center py-1 rounded-xl">
            {isrentalstore ? (
              <>
                <span>Rent </span> : ₹{" "}
                {parseInt(rentprice, 10).toLocaleString("en-IN")}
              </>
            ) : (
              <>₹{parseInt(buyprice, 10).toLocaleString("en-IN")}</>
            )}
          </div>
        </div>
        <div className="absolute w-24 h-[2px] bottom-1 left-1/2 -translate-x-1/2 bg-theme rounded-full"></div>
      </div>
    </Link>
  );
}

export default Productcard;
