import React from "react";
import { categorylist } from "@/app/commondata";
import Link from "next/link";
import Nextimage from "@/app/_components/Nextimage";

function Categories({ location, store }) {
  return (
    <div id="categories" className="py-6 px-4 md:px-10 flex justify-center">
      <div className="w-fit grid grid-cols-4 md:grid-cols-5 gap-4">
        {Object.entries(categorylist).map(([key, value], i) => (
          <Link
            key={i}
            href={`/${location}/${store}/${key}`}
            prefetch={false}
            title={key}
            className="flex flex-col items-center justify-center rounded-2xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-1 p-3 group"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
              <Nextimage
                height={30}
                width={30}
                src={value?.image}
                alt={key}
                className="h-6 w-6 md:h-7 md:w-7 object-contain"
              />
            </div>
            <p className="mt-2 text-[10px] md:text-[12px] text-center text-gray-800 font-semibold capitalize leading-tight">
              {key.replace(/-/g, " ")}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
