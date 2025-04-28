"use client";
import React from "react";
import { categorylist } from "@/app/commondata";
import Link from "next/link";
import { FaCaretDown } from "react-icons/fa";
import Nextimage from "@/app/_components/Nextimage";

function Navcategories({ category, location, isrentalstore }) {
  return (
    <div className={`hidden lg:flex items-center justify-center gap-5 py-2 `}>
      {Object.entries(categorylist).map(([key, item], i) => {
        return (
          <div key={i} className="group relative">
            <Link
              key={i}
              prefetch={false}
              href={`/${location}/${isrentalstore ? "Rent" : "Buy"}/${key}`}
              className={`w-full flex items-center justify-center gap-2 text-sm  px-5 py-1 rounded-full relative z-10 ${
                category == key
                  ? "lg:bg-theme lg:text-white"
                  : "lg:group-hover:bg-slate-100"
              }`}
            >
              <Nextimage
                height="15"
                width="15"
                src={item.image}
                alt={key}
                className={`h-4 aspect-square ${
                  category == key && "brightness-0 invert"
                }`}
              />
              {key.replace(/-/g, " ")}
            </Link>
            <FaCaretDown
              className={`absolute top-[calc(100%-5px)] hidden lg:group-hover:block left-1/2 -translate-x-1/2`}
            />
            {/* subcategories */}
            <div
              className={`absolute w-fit top-0 hidden lg:group-hover:block lg:left-1/2 lg:-translate-x-1/2`}
            >
              <div className="p-2 bg-white flex flex-col  lg:rounded-md lg:border lg:border-slate-300 lg:mt-12 shadow-md">
                {item.subcat.map((subcat, j) => {
                  return (
                    <Link
                      key={j}
                      href={`/${location}/${
                        isrentalstore ? "Rent" : "Buy"
                      }/${key}/${subcat.name}`}
                      prefetch={false}
                      className="p-1 flex items-center gap-2 lg:w-52 text-sm  lg:hover:bg-bg1 group/link"
                    >
                      <Nextimage
                        src={subcat?.image}
                        alt={subcat?.name}
                        height={40}
                        width={40}
                        loading="lazy"
                        className="h-10 aspect-square mix-blend-multiply"
                      />
                      <p className="flex flex-col">
                        <span className="lg:group-hover/link:text-theme">
                          {subcat?.name.replace(/-/g, " ")}
                        </span>
                        <span className="opacity-50 text-xs">
                          {subcat?.subcat}
                        </span>
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Navcategories;
