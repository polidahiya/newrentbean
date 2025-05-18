import React from "react";
import { categorylist } from "@/app/commondata";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

function Heading({ location, store, searchQuery, category }) {
  return (
    <div
      className={`group relative w-fit ${category == "Search" && "indent-10 lg:indent-0"}`}
    >
      <h2 className="text-3xl font-semibold inline">
        {category == "Search"
          ? `Search (${store}) - ${searchQuery}`
          : category.replace(/-/g, " ")}
      </h2>
      <IoIosArrowDown className="inline -translate-y-1 group-hover:rotate-180 duration-300 text-3xl font-semibold" />
      <div className="group-hover:block hidden absolute top-0 right-0 z-10 w-full indent-0">
        <div className="mt-10 p-2 rounded-md border bg-white shadow-md float-left">
          {Object.keys(categorylist).map((key, i) => (
            <Link
              href={`/${location}/${store}/${key}`}
              key={i}
              className={`block hover:bg-bg1 whitespace-nowrap py-1 px-2 ${
                key == category && "text-theme"
              }`}
            >
              {key.replace(/-/g, " ")}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Heading;
