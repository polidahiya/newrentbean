import React from "react";
import { categorylist } from "@/app/commondata";
import Link from "next/link";
import Image from "next/image";

function Categories({ location, store }) {
  return (
    <div id="categories" className="">
      <div className="flex items-center justify-center gap-2 md:gap-[20px] px-[10px] md:px-10 flex-wrap">
        {Object.entries(categorylist).map(([key, value], i) => {
          return (
            <Link
              className="categoriestile h-[60px] w-[60px] md:h-[70px] md:w-[120px]  rounded-lg flex flex-col items-center justify-center bg-white border border-gray-200 lg:hover:border-none lg:hover:scale-110 lg:hover:shadow-[0_8px_14px_0_#bfcfdc]   duration-200"
              key={i}
              href={`/${location}/${store}/${key}`}
              prefetch={false}
              title={key}
            >
              <Image
                height={20}
                width={20}
                className="h-[30%] md:h-[20px]"
                src={value?.image}
                alt={key}
              />
              <p className="text-[8px] md:text-[11px] text-center md:whitespace-nowrap">
                {key.replace(/-/g, " ")}
              </p>
            </Link>
          );
        })}
      </div>
    
    
    </div>
  );
}

export default Categories;