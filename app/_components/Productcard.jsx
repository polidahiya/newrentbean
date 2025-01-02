"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Rating from "./Ratingstars";
import { FaTags } from "react-icons/fa";
import { FiClock } from "react-icons/fi";

function Productcard({
  index,
  id,
  category,
  subcat,
  name,
  price,
  discount,
  available,
  image,
  rating,
  keywords,
  colorpalets,
  link,
}) {
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

  let pricebeforediscount = null;
  if (discount > 0) {
    pricebeforediscount = Math.floor((price / (100 - discount)) * 100);
  }

  return (
    <Link
      href={link ? link : `/${category}/${subcat}/${id}`}
      className={`group relative h-full w-full max-w-[350px] md:min-w-[270px] shadow-md  bg-white duration-300 ${
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
          {/* discount */}
          {pricebeforediscount && (
            <div className="flex items-center gap-[5px]  bg-green-600 py-[5px] px-[5px] md:px-[10px] rounded-[5px]">
              <FaTags />
              {discount}% OFF
            </div>
          )}
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
        {/* best selling tag */}
        {keywords?.toLowerCase().includes("best seller") && (
          <Image
            className="absolute top-0 right-0 w-12 md:w-16 aspect-square object-contain"
            src="/images/bestsellertag.png"
            alt="best selling tag Image"
            height={100}
            width={100}
            loading="lazy"
          />
        )}
        {/* color options */}
        <div className="absolute bottom-2 right-2 p-1 rounded-full bg-white flex items-center gap-1">
          {colorpalets?.slice(0, 2).map((colors, j) => (
            <div
              key={j}
              className="aspect-square h-3 md:h-4 rounded-full outline outline-1 outline-slate-300"
              style={{ backgroundColor: colors.color }}
            ></div>
          ))}
          {colorpalets.length > 2 && (
            <span className="text-[10px] px-1">+{colorpalets.length - 2}</span>
          )}
        </div>
      </div>

      <div className="p-[5px] md:p-[10px]">
        <h3 className="py-[5px] md:py-[10px] text-[12px] md:text-[16px] font-semibold text-center w-full whitespace-nowrap text-ellipsis overflow-hidden">
          {name}
        </h3>
        <Rating rating={rating} />
        <div className="mt-[10px] flex flex-wrap items-center gap-[5px] md:gap-[10px]">
          <span className="font-bold text-[16px] md:text-[20px]">
            ₹{parseInt(price, 10).toLocaleString("en-IN")}
          </span>
          {pricebeforediscount && (
            <>
              <span className="line-through text-[12px] md:text-[16px] text-[#878787]">
                ₹{parseInt(pricebeforediscount, 10).toLocaleString("en-IN")}
              </span>
              <span className="font-bold text-[12px] md:text-[16px] text-[#388e3c]">
                {discount}% off
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

export default Productcard;
