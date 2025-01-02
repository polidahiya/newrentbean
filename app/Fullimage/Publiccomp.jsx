"use client";
import React, { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";

function Publiccomp({ pid, index, color, allproducts }) {
  const [togglemenu, settogglemenu] = useState(true);
  const product = allproducts.filter((item) => item?._id == pid)[0];
  const images = product?.colorpalets[color]?.images;
  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div
        className={`absolute top-0 left-0 px-5 py-2  w-full flex items-center gap-2 text-sm font-bold text-white bg-[linear-gradient(90deg,black,transparent)] duration-300 ${
          togglemenu ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Link
          href={`/${product?.category}/${product?.subcat}/${product?._id}?color=${color}`}
          className="text-xl p-2 box-content rounded-full lg:hover:bg-white  lg:hover:bg-opacity-20"
          replace
        >
          <IoArrowBackOutline />
        </Link>
        <h1>{product?.name}</h1>
      </div>
      <Image
        src={images[index]}
        alt={product?.name}
        width={2000}
        height={2000}
        className="h-full w-full object-contain"
        quality={100}
        loading="lazy"
        onClick={() => settogglemenu((pre) => !pre)}
      ></Image>
      <div
        className={`w-full flex items-center justify-center flex-wrap gap-2 bg-black bg-opacity-50 absolute bottom-0 p-5 left-1/2 -translate-x-1/2 duration-300 ${
          togglemenu ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {images.map((image, i) => (
          <Link
            key={i}
            href={`/Fullimage?pid=${pid}&color=${color}&index=${i}`}
            replace
          >
            <Image
              src={image}
              alt={product?.name}
              height={100}
              width={100}
              quality={0}
              loading="lazy"
              className={`min-w-16 w-16 md:min-w-12 md:w-12 aspect-square border md:border-2 ${
                index == i ? "border-theme" : "border-slate-300"
              }`}
            ></Image>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Publiccomp;
