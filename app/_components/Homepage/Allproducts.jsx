"use client";
import React, { useState } from "react";
import Productcard from "../Productcard";
import { MdOutlineArrowRightAlt } from "react-icons/md";

function Allproducts({ products }) {
  const [shuffledProducts] = useState(products);
  const [index, setindex] = useState(0);

  const maxlimit = 15;

  return (
    <div className="relative px-4 md:px-8 lg:px-16">
      <h2 className="text-center font-bold text-2xl md:text-4xl  font-recline">
        lovely Collection
      </h2>
      <p className="text-gray-600 mb-6  text-center mt-2 md:mt-4">
        You will love to take these home.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 md:gap-6">
        {shuffledProducts.slice(0 + index * 4, 4 + index * 4).map((item, i) => (
          <Productcard
            key={i + new Date().getMilliseconds() + Math.random()} // More stable key
            index={i}
            id={item._id}
            image={item.colorpalets[0]?.images[0]}
            {...item}
          />
        ))}
      </div>
      <div className="flex justify-center gap-5  mt-5">
        <button
          className={`lg:absolute top-1/2 lg:-translate-y-1/2 rounded-full shadow-lg p-3 text-2xl aspect-square bg-theme text-white left-5 lg:left-10 ${
            index == 0 && "hidden"
          }`}
          onClick={() => setindex((pre) => (pre > 0 ? pre - 1 : pre))}
        >
          <MdOutlineArrowRightAlt className="rotate-180" />
        </button>
        <button
          className={`lg:absolute top-1/2 lg:-translate-y-1/2 rounded-full shadow-lg p-3 text-2xl aspect-square bg-theme text-white right-5 lg:right-10 ${
            index == maxlimit && "hidden"
          }`}
          onClick={() => setindex((pre) => (pre < maxlimit ? pre + 1 : pre))}
        >
          <MdOutlineArrowRightAlt />
        </button>
      </div>
    </div>
  );
}

export default Allproducts;
