"use client";
import React from "react";
import { BsSortDownAlt } from "react-icons/bs";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const sortlist = [
  { name: "Default" },
  { name: "Price: Low to high" },
  { name: "Price: High to low" },
];

function Sort({ sortvalue }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="group relative flex items-center gap-2 border px-5 py-1 rounded-md ">
      <BsSortDownAlt /> Sort
      <div className="group-hover:block hidden absolute top-0 right-0 z-10 w-full">
        <div className="mt-10 p-2 rounded-md border bg-white shadow-md float-right">
          {sortlist.map((item, i) => {
            const params = new URLSearchParams(searchParams);
            params.set("sort", i);
            return (
              <Link
                href={`${pathname}?${params.toString()}`}
                className={`block hover:bg-bg1 whitespace-nowrap py-1 px-2 ${
                  sortvalue == i && "text-theme"
                }`}
                key={i}
              >
                {item?.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sort;
