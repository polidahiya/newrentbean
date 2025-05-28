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
  const navLinks = [
    { href: "/admin/", label: "Orders", logo: <FaDollyFlatbed /> },
    { href: "/admin/Users", label: "Users", logo: <HiUserGroup /> },
    { href: "/admin/Blogs", label: "Add Blogs", logo: <RiBloggerFill /> },
    { href: "/admin/addproducts", label: "Add Products", logo: <IoBagAdd /> },
    {
      href: "/admin/contactmessages",
      label: "Messages",
      logo: <AiFillMessage />,
    },
    { href: "/admin/settings", label: "Settings", logo: <IoSettingsSharp /> },
  ];
  if (path == "/admin/invoice") return;

  return (
    <nav className="sticky top-0 flex items-center gap-1 md:gap-2 h-[50px] shadow-md p-[7px] px-[10px] lg:px-10 z-20 bg-bg1">
      <Link href="/Delhi">
        <Nextimage src="/logo&ui/3dlogo.png" alt="logo" height={40} width={150} />
      </Link>
      {navLinks.map(({ href, label, logo }, index) => (
        <NavLink key={href} href={href} isFirst={index === 0}>
          {logo}
          <span className="hidden md:block">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

const NavLink = ({ href, children, isFirst }) => (
  <Link
    className={`flex items-center gap-2 h-full rounded-[5px] px-[10px] bg-white ${
      isFirst && "ml-auto"
    }`}
    href={href}
  >
    {children}
  </Link>
);

export default Adminnavbar;
