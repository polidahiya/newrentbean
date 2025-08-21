import React from "react";
import Link from "next/link";
import Nextimage from "@/app/_components/Nextimage";

function Navbar() {
  return (
    <nav className="h-16 shadow-md sticky top-0 flex items-center justify-between bg-white px-2 md:px-10 z-40">
      <Link
        className="h-full md:w-fit p-1 inline-block"
        href={"/Travel"}
        prefetch={false}
      >
        <Nextimage
          className="h-full object-contain"
          src="/logo&ui/3dlogo.png"
          alt="Rentbean logo"
          height={50}
          width={200}
          priority
        ></Nextimage>
      </Link>
    </nav>
  );
}

export default Navbar;
