"use client";
import React, { useState } from "react";
import Link from "next/link";
import Nextimage from "@/app/_components/Nextimage";
import { FaDollyFlatbed } from "react-icons/fa";
import { RiBloggerFill } from "react-icons/ri";
import { IoBagAdd } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { HiUserGroup } from "react-icons/hi2";
import { RiCoupon3Fill } from "react-icons/ri";
import { TbMenu2 } from "react-icons/tb";

function Adminnavbar() {
  const path = usePathname();
  const [showmenu, setshowmenu] = useState(false);

  // Hide navbar on invoice page
  if (path === "/admin/invoice") return null;

  const navLinks = [
    { href: "/admin/Orders/0", label: "Orders", logo: <FaDollyFlatbed /> },
    { href: "/admin/Users", label: "Users", logo: <HiUserGroup /> },
    { href: "/admin/Coupons", label: "Coupons", logo: <RiCoupon3Fill /> },
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
      <button
        className="ml-auto h-[50px] grid place-content-center aspect-square lg:hidden"
        onClick={() => setshowmenu(!showmenu)}
      >
        {showmenu ? <span>X</span> : <TbMenu2 />}
      </button>
      {/* Navigation links */}
      <div
        className={`fixed lg:static right-0 top-[50px] h-screen lg:h-auto w-full lg:w-fit ml-auto p-2 lg:p-0 flex flex-col lg:flex-row items-center gap-2 bg-white duration-300 ${
          showmenu ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        {navLinks.map(({ href, label, logo }) => (
          <NavLink key={href} href={href} active={path.includes(href)}>
            {logo}
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

const NavLink = ({ href, children, active }) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 h-[38px] px-3 rounded-md w-full lg:w-fit lg:text-sm transition-all
        ${
          active
            ? "text-theme bg-white outline outline-1 outline-theme"
            : "bg-gray-50 hover:bg-gray-100 text-gray-700"
        }
      `}
    >
      {children}
    </Link>
  );
};

export default Adminnavbar;
