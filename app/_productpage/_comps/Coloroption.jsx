"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Coloroption({ filteredproducts, color }) {
  return (
    <div className="flex flex-col md:flex-row gap-5 md:gap-0 mt-[30px]">
      <span className="font-semibold text-slate-400 whitespace-nowrap min-w-28">
        Color :
      </span>
      <div className="flex gap-[10px] flex-wrap ml-5 md:ml-0">
        {filteredproducts.colorpalets.map((item, i) => {
          return (
            <Link
              key={i}
              href={`/${filteredproducts.category}/${filteredproducts.subcat}/${filteredproducts._id}?color=${i}`}
              replace
              className={`relative p-[5px] flex flex-col items-center  cursor-pointer shadow-[0px_0px_5px_#bababa7f] 
                ${color == i && "outline outline-cyan-500"}`}
            >
              <Comp image={item.images[0]} i={i} />
              <p className="text-center text-[12px]">{item?.name}</p>
              <div
                className={`absolute top-[5px] right-[5px] w-[20px] aspect-square rounded-full`}
                style={{ backgroundColor: item?.color }}
              ></div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Comp({ image, i }) {
  const [safeimage, setsafeimage] = useState(image);
  return (
    <Image
      src={safeimage}
      className="h-[100px] min-w-[100px] object-contain object-center rounded-[5px]"
      alt={"color-option-" + i}
      height={100}
      width={100}
      onError={() => {
        setsafeimage("/default-fallback-image.png");
      }}
    ></Image>
  );
}

export default Coloroption;
