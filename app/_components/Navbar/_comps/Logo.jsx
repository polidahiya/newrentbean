"use client";
import React from "react";
import Nextimage from "../../Nextimage";
import Link from "next/link";
import { AppContextfn } from "@/app/Context";
function Logo() {
  const { location, isrentalstore } = AppContextfn();

  return (
    <Link
      className="h-full md:w-fit p-1"
      href={`/${location?.location}/${isrentalstore ? "Rent" : "Buy"}`}
      prefetch={false}
    >
      <Nextimage
        className="w-auto h-full"
        src="/logo&ui/3dlogo.png"
        alt="Rentbean logo"
        height={50}
        width={200}
        priority
      ></Nextimage>
    </Link>
  );
}

export default Logo;
