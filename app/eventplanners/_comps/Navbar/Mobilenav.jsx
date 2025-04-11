import Link from "next/link";
import React from "react";
import { TiHome } from "react-icons/ti";
import { CgMenuGridO } from "react-icons/cg";
import { FaPhoneAlt } from "react-icons/fa";

function Mobilenav() {
  return (
    <div className="sticky  bottom-0 h-14 w-full flex items-center justify-around bg-white test z-50 lg:hidden">
      <Link
        href={"/eventplanners"}
        className="flex items-center gap-1 px-5 py-1 rounded-md border"
      >
        <TiHome />
        Home
      </Link>
      <Link
        href={"/eventplanners"}
        className="flex items-center gap-1 px-5 py-1 rounded-md border"
      >
        <CgMenuGridO />
        Events
      </Link>
      <Link
        href={"/eventplanners"}
        className="flex items-center gap-1 px-5 py-1 rounded-md border"
      >
        <FaPhoneAlt />
        Contact
      </Link>
    </div>
  );
}

export default Mobilenav;
