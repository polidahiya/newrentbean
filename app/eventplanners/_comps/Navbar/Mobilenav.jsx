import Link from "next/link";
import React from "react";
import { IoHome, IoCalendar, IoCall } from "react-icons/io5";

function Mobilenav() {
  return (
    <div className="sticky bottom-0 left-0 right-0 h-12 p-2 flex items-center justify-around bg-white shadow-lg z-50 lg:hidden border-t border-gray-100">
      <Link
        href={"/eventplanners"}
        className="h-full flex items-center justify-center gap-2 px-5 text-eventtheme rounded-full shadow-md"
      >
        <IoHome className="" />
        <span className="text-xs font-medium">Home</span>
      </Link>
      <Link
        href={"/eventplanners/allevents"}
        className="h-full flex items-center justify-center gap-2 px-5 text-eventtheme rounded-full shadow-md"
      >
        <IoCalendar className="" />
        <span className="text-xs font-medium">Events</span>
      </Link>
      <Link
        href={"/eventplanners/contact"}
        className="h-full flex items-center justify-center gap-2 px-5 text-eventtheme rounded-full shadow-md"
      >
        <IoCall className="" />
        <span className="text-xs font-medium">Contact</span>
      </Link>
    </div>
  );
}

export default Mobilenav;
