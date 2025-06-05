"use client";
import React from "react";
import Link from "next/link";
import Nextimage from "@/app/_components/Nextimage";
import { FaDollyFlatbed } from "react-icons/fa";
import { RiBloggerFill } from "react-icons/ri";
import { IoBagAdd } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { HiUserGroup } from "react-icons/hi2";

function Adminnavbar() {
  const path = usePathname();

  // Hide navbar on invoice page
  if (path === "/admin/invoice") return null;

  const navLinks = [
    { href: "/admin/Orders/0", label: "Orders", logo: <FaDollyFlatbed /> },
    { href: "/admin/Users", label: "Users", logo: <HiUserGroup /> },
    { href: "/admin/Blogs", label: "Blogs", logo: <RiBloggerFill /> },
    { href: "/admin/addproducts", label: "Products", logo: <IoBagAdd /> },
    {
      href: "/admin/contactmessages",
      label: "Messages",
      logo: <AiFillMessage />,
    },
    { href: "/admin/settings", label: "Settings", logo: <IoSettingsSharp /> },
  ];

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

      {/* Spacer to push links right */}
      <div className="flex-grow" />

      {/* Navigation links */}
      {navLinks.map(({ href, label, logo }) => (
        <NavLink key={href} href={href} active={path === href}>
          {logo}
          <span className="hidden md:inline">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

const NavLink = ({ href, children, active }) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 h-[38px] px-3 rounded-md text-sm font-medium transition-all
        ${
          active
            ? "bg-theme text-white"
            : "bg-gray-50 hover:bg-gray-100 text-gray-700"
        }
      `}
    >
      {children}
    </Link>
  );
};

export default Adminnavbar;
