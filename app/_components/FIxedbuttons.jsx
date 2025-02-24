"use client";
import React from "react";
import Link from "next/link";
import { mobile } from "../commondata";
import { FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { FaArrowUpLong } from "react-icons/fa6";
import { AppContextfn } from "../Context";

function FIxedbuttons() {
  const path = usePathname();
  const isadminpage = path.split("/")[1] == "admin";

  return (
    <div className="fixed bottom-16 lg:bottom-5 right-5 md:right-10 flex flex-col items-end gap-2 z-30 print:hidden">
      <Gotopbutton />
      {!isadminpage && (
        <>
          <Whatsappbutton />
          <Helpbutton />
        </>
      )}
    </div>
  );
}

const Whatsappbutton = () => (
  <Link
    href={`https://wa.me/${mobile.replace(/ /g, "")}?text=${encodeURIComponent(
      "Hi Rentbean, I found your products interesting, and I would like to know more!"
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="group bg-theme flex items-center justify-center p-1 rounded-full overflow-hidden"
  >
    <span className="text-white opacity-0 text-sm max-w-0 lg:group-hover:opacity-100 lg:group-hover:max-w-60  lg:group-hover:px-5 whitespace-nowrap transition-all duration-300 ease-in-out">
      Chat with us on WhatsApp
    </span>
    <span className="h-8 aspect-square rounded-full bg-white text-theme grid place-content-center">
      <FaWhatsapp className="text-lg" />
    </span>
  </Link>
);

const Helpbutton = () => (
  <Link
    href="/Contact"
    className="group bg-theme flex items-center justify-center p-1 rounded-full overflow-hidden"
  >
    <span className="text-white opacity-0 text-sm max-w-0 lg:group-hover:opacity-100 lg:group-hover:max-w-32  lg:group-hover:px-5 whitespace-nowrap transition-all duration-300 ease-in-out">
      Need Help
    </span>
    <span className="h-8 aspect-square rounded-full bg-white text-theme grid place-content-center">
      ?
    </span>
  </Link>
);

const Gotopbutton = () => {
  const { scrolltop } = AppContextfn();

  return (
    <button
      className={`group flex flex-col items-center justify-center gap-1 text-sm 
         bg-theme text-white h-10 w-10 lg:hover:h-16 rounded-full
         overflow-hidden duration-300 ${
           !scrolltop && "opacity-0 pointer-events-none"
         }`}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
    >
      <FaArrowUpLong className="translate-y-[2px]" />
      <span className="h-0 m-0 p-0 opacity-0 lg:group-hover:opacity-100 lg:group-hover:h-4 duration-300">
        Top
      </span>
    </button>
  );
};

export default FIxedbuttons;
