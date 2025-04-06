"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

function Trusties() {
  const images = [
    "/eventplanners/companies/IBM.png",
    "/eventplanners/companies/airtel.png",
    "/eventplanners/companies/HSBC.png",
    "/eventplanners/companies/Wynk_music_logo.png",
    "/eventplanners/companies/pizza-hut-.png",
    "/eventplanners/companies/Reebok-logo.png",
    "/eventplanners/companies/The_Lalit-01.png",
  ];

  const [visibleIndexes, setVisibleIndexes] = useState([]);

  useEffect(() => {
    images.forEach((_, i) => {
      setTimeout(() => {
        setVisibleIndexes((prev) => [...prev, i]);
      }, i * 200); // Stagger by 300ms
    });
  }, []);

  return (
    <div className="absolute bottom-0 left-0 w-full flex justify-evenly items-center list-none backdrop-blur-sm py-7">
      {images.map((item, i) => (
        <div className="overflow-hidden" key={i}>
          <Image
            src={item}
            alt={item}
            height={80}
            width={140}
            quality={100}
            className={`h-12 object-contain contrast-200 brightness-0 invert duration-1000 ease-in-out ${
              visibleIndexes.includes(i) ? "translate-y-0" : "translate-y-20"
            }`}
          />
        </div>
      ))}
    </div>
  );
}

export default Trusties;
