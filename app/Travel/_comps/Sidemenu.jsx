"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { filterdata } from "../Traveldata";
import { Travelcontextfn } from "../Travelcontext";

function Sidemenu(props) {
  const { travelsidemenu, settravelsidemenu } = Travelcontextfn();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const generateHref = (category, subcat) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(category, subcat);
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div
      className={`fixed lg:static top-0 left-0 w-full lg:w-80 h-dvh lg:h-auto z-50 lg:z-0 p-2 lg:p-0 bg-gray-100 lg:bg-transparent flex flex-col ${
        travelsidemenu ? "-translate-x-0" : "-translate-x-full lg:translate-x-0"
      } duration-300`}
    >
      <div className="flex items-center py-2 lg:hidden">
        <div className="flex-1"></div>
        <div className="flex-1 text-3xl text-center">Filters</div>
        <div className="flex-1 flex justify-end">
          <button
            className="text-3xl h-10 aspect-square flex items-center justify-center"
            onClick={() => settravelsidemenu(false)}
          >
            X
          </button>
        </div>
      </div>
      <div className="space-y-2 h-full overflow-y-scroll lg:overflow-y-visible hidescroll">
        {Object.entries(filterdata).map(([category, value], i) => (
          <div key={i} className="text-sm bg-white rounded-2xl shadow-md p-2">
            <div className="relative px-5 py-2 font-semibold rounded-xl bg-gray-100 z-10">
              {value?.icon}
              {category}
            </div>
            <div className="pl-5">
              {Object.keys(value?.data).map((itemj, j) => (
                <Link
                  key={j}
                  href={generateHref(category, itemj)}
                  className={`block relative px-5 py-2 lg:hover:text-theme last:pb-4 before:absolute before:h-16 first:before:h-10 before:w-4 before:border-l before:border-b before:border-gray-300 before:left-0 left-0 before:bottom-1/2 before:rounded-bl-md ${
                    props[category || "All"] === itemj && "text-theme"
                  }`}
                  scroll={false}
                  onClick={() => settravelsidemenu(false)}
                >
                  {value?.icon}
                  {itemj}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidemenu;
