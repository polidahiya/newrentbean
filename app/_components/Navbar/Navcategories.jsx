"use client";
import React from "react";
import { categorylist } from "@/app/commondata";
import Link from "next/link";
import { FaCaretDown } from "react-icons/fa";

function Navcategories({ category }) {
  return (
    <div
      className={`hidden lg:flex items-center justify-center gap-5 h-0 lg:peer-hover:h-[50px] lg:hover:h-[50px] opacity-0 lg:peer-hover:opacity-100 lg:hover:opacity-100 p-0 lg:peer-hover:p-[10px] lg:hover:p-[10px] overflow-y-hidden lg:hover:overflow-y-visible duration-300`}
    >
      {Object.keys(categorylist).map((item, i) => {
        return (
          <div key={i} className="group relative">
            <Link
              key={i}
              href={"/" + item}
              className={`h-[30px] w-full flex items-center justify-center  text-sm px-5 py-[5px] rounded-full relative z-10 ${
                category == item
                  ? "lg:bg-theme lg:text-white"
                  : "lg:group-hover:bg-theme lg:group-hover:text-white "
              }`}
            >
              {item.replace(/-/g, " ")}
            </Link>
            {/* subcategories */}
            {categorylist[item].subcat.length > 0 && (
              <>
                {/* down arrow */}
                <FaCaretDown
                  className={`absolute top-[calc(100%-5px)] hidden lg:group-hover:block left-1/2 -translate-x-1/2`}
                />

                {/* subcategories */}
                <div
                  className={`absolute top-0 hidden lg:group-hover:block  lg:group-hover:max-h-screen overflow-hidden duration-500 lg:duration-0 ${
                    i == 0 && "lg:left-0"
                  } ${
                    i == Object.keys(categorylist)?.length - 1 && "lg:right-0"
                  } ${
                    i != 0 &&
                    i != Object.keys(categorylist)?.length - 1 &&
                    "lg:left-1/2 lg:-translate-x-1/2"
                  }`}
                >
                  <div className="p-2 lg:p-1 bg-white flex flex-col lg:gap-2 lg:rounded-2xl lg:border lg:border-slate-300 lg:mt-12">
                    {categorylist[item].subcat.map((subcat, j) => {
                      return (
                        <Link
                          key={j}
                          href={`/${item}/${subcat.name}`}
                          className="p-1 lg:hover:bg-theme lg:hover:text-white rounded-full lg:w-52 pl-10 lg:pl-0 lg:text-center text-[14px]"
                        >
                          {subcat?.name.replace(/-/g, " ")}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Navcategories;
