"use client";
import React from "react";
import Gotopbutton from "./Gotopbutton";
import Link from "next/link";
import { mobile } from "../commondata";
import { FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";

function FIxedbuttons() {
  const path = usePathname();

  if (path.split("/")[0] != "admin")
    return (
      <div className="fixed bottom-16 lg:bottom-5 right-5 md:right-10 flex flex-col items-end gap-2 z-30">
        <Gotopbutton />
        <Whatsappbutton />
        <Helpbutton />
      </div>
    );
}

const Whatsappbutton = () => (
  <Link
    href={`https://wa.me/${mobile.replace(/ /g, "")}?text=${encodeURIComponent(
      "Hi Adorefurnix, I found your products interesting, and I would like to know more!"
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

export default FIxedbuttons;
