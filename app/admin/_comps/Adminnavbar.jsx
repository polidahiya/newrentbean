"use client";
import React, { useState } from "react";
import Link from "next/link";
import Nextimage from "@/app/_components/Nextimage";
import { TbMenu2 } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { navLinks } from "./Navlinks";

function Adminnavbar() {
  const path = usePathname();
  const [showmenu, setshowmenu] = useState(false);

  // Hide navbar on invoice page
  if (path === "/admin/invoice") return null;

  return (
    <nav className="sticky top-0 z-20 flex items-center gap-2 h-[50px] px-4 md:px-10 bg-white shadow-sm border-b">
      {/* Logo */}
      <Link href="/Delhi" className="flex items-center">
        <Nextimage
          src="/logo&ui/3dlogo.png"
          alt="logo"
          height={40}
          width={120}
        />
      </Link>
      <button
        className="ml-auto h-[50px] grid place-content-center aspect-square lg:hidden"
        onClick={() => setshowmenu(!showmenu)}
      >
        {showmenu ? <span>X</span> : <TbMenu2 />}
      </button>
      {/* Navigation links */}
      <div
        className={`fixed lg:static right-0 top-[50px] h-screen lg:h-auto w-full lg:w-fit ml-auto p-2 lg:p-0 flex flex-col lg:flex-row items-center gap-2 bg-white duration-300 z-20 ${
          showmenu ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        {navLinks.map(({ href, label, logo }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 h-[38px] px-3 rounded-md w-full lg:w-fit lg:text-sm transition-all ${
              path.includes(href)
                ? "text-theme bg-white outline outline-1 outline-theme"
                : "bg-gray-50 hover:bg-gray-100 text-gray-700"
            }`}
            onClick={() => setshowmenu(false)}
          >
            {logo}
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Adminnavbar;
