"use client";
import Link from "next/link";
import React from "react";
import { IoHome, IoCalendar, IoCall } from "react-icons/io5";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    href: "/eventplanners",
    icon: <IoHome />,
    label: "Home",
  },
  {
    href: "/eventplanners/allevents",
    icon: <IoCalendar />,
    label: "Events",
  },
  {
    href: "/eventplanners/contact",
    icon: <IoCall />,
    label: "Contact",
  },
];

function Mobilenav() {
  const path = usePathname();
  return (
    <div className="sticky bottom-0 left-0 right-0 h-12 p-2 flex items-center justify-around bg-white shadow-lg z-50 lg:hidden border-t border-gray-100">
      {navLinks.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="relative h-full flex items-center justify-center gap-2 px-5 text-eventtheme rounded-full shadow-md"
        >
          {link.icon}
          <span className="text-xs font-medium">{link.label}</span>
          <span
            className={`block h-0.5 w-0 absolute -bottom-1 left-1/2 -translate-x-1/2 bg-eventtheme rounded-full duration-300 ${
              path === link.href && "w-1/3"
            }`}
          ></span>
        </Link>
      ))}
    </div>
  );
}

export default Mobilenav;
