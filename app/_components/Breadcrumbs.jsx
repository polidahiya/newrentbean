import React from "react";
import Link from "next/link";
import { HiOutlineHome } from "react-icons/hi";

function Breadcrumbs({ list, currentroute = "Current route", location }) {
  return (
    <div className="space-x-2">
      <Link href={`/${location}`} className="lg:hover:text-cyan-500 group">
        <HiOutlineHome className="hidden group-first:inline -translate-y-[2px] mr-1" />
        Home
      </Link>
      <span className="last:hidden">/</span>
      {list.map((item, index) => (
        <React.Fragment key={index}>
          <Link href={item?.link} className="lg:hover:text-cyan-500">
            {item?.name?.replace(/-/g, " ")}
          </Link>
          <span className="last:hidden">/</span>
        </React.Fragment>
      ))}
      <span>{currentroute?.replace(/-/g, " ")}</span>
    </div>
  );
}

export default Breadcrumbs;
