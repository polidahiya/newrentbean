"use client";

import React, { useState } from "react";
import Productnotfound from "@/app/_components/Productnotfound";
import Productcard from "@/app/_components/Productcard";
import Heart from "@/app/_svgs/Heart";
import { AppContextfn } from "@/app/Context";
import { likeproduct } from "@/app/_serveractions/Likedproducts";

function Likedproducts({ filtereditems }) {
  const { setmessagefn } = AppContextfn();
  const [favouritesproducts, setfavouritesproducts] = useState(filtereditems);

  const dislike = async () => {
    let res = await likeproduct(item._id, true);
    if (res?.status == 200) {
      setfavouritesproducts((pre) => {
        const filteredArray = pre.filter((pro) => pro._id != item._id);
        return filteredArray;
      });
    }
    setmessagefn(res?.message);
  };

  if (favouritesproducts.length == 0)
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-110px)]">
        <Productnotfound />
      </div>
    );

  return (
    <div
      className={`min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-110px)] grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center gap-[20px] p-[20px]`}
    >
      {favouritesproducts.map((item, i) => {
        return (
          <div
            key={i}
            className="relative  w-full max-w-[350px] md:min-w-[270px] shadow-md rounded-[10px] overflow-hidden"
          >
            <Productcard
              key={i + new Date().getMilliseconds() + Math.random()} // More stable key
              index={i}
              id={item._id}
              image={item.colorpalets[0]?.images[0]}
              {...item}
            />
            {/* like button */}
            <button
              className="absolute right-[10px] top-[10px] bg-white rounded-full p-[3px] "
              title="Remove from favourites"
              onClick={dislike}
            >
              <Heart
                styles={`h-[25px]  w-[25px]  translate-y-[1px] fill-red-500 stroke-none`}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Likedproducts;
