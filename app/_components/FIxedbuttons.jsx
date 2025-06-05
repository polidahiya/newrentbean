"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { mobile } from "../commondata";
import { FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { FaArrowUpLong } from "react-icons/fa6";
import { AppContextfn } from "../Context";

function FIxedbuttons() {
  const path = usePathname();
  const isadminpage = path.split("/")[1] == "admin";
  const iseventmanager = path.split("/")[1] == "eventplanners";

  return (
    <div className="fixed bottom-20 lg:bottom-5 right-5 md:right-10 flex flex-col items-end gap-2 z-30 print:hidden">
      <Gotopbutton iseventmanager={iseventmanager} />
      {!isadminpage && (
        <>
          <Whatsappbutton iseventmanager={iseventmanager} />
          <Helpbutton iseventmanager={iseventmanager} />
        </>
      )}
    </div>
  );
}

const Whatsappbutton = ({ iseventmanager }) => (
  <Link
    href={`https://wa.me/${mobile.replace(/ /g, "")}?text=${encodeURIComponent(
      iseventmanager
        ? "Hi, I'm interested in planning an event. Can you help me with the details?"
        : "Hi Rentbean, I found your products interesting, and I would like to know more!"
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className={`group  flex items-center justify-center p-1 rounded-full overflow-hidden ${
      iseventmanager ? "bg-eventtheme" : "bg-theme"
    }`}
    prefetch={false}
  >
    <span className="text-white opacity-0 text-sm  max-w-0 lg:group-hover:opacity-100 lg:group-hover:max-w-60  lg:group-hover:px-5 whitespace-nowrap transition-all duration-300 ease-in-out">
      Chat with us on WhatsApp
    </span>
    <span
      className={`h-8 aspect-square rounded-full bg-white  grid place-content-center ${
        iseventmanager ? "text-eventtheme" : "text-theme"
      }`}
    >
      <FaWhatsapp className="text-lg" />
    </span>
  </Link>
);

const Helpbutton = ({ iseventmanager }) => (
  <Link
    href={iseventmanager ? "/eventplanners/contact" : "/Contact"}
    className={`group  flex items-center justify-center p-1 rounded-full overflow-hidden ${
      iseventmanager ? "bg-eventtheme" : "bg-theme"
    }`}
    prefetch={false}
  >
    <span className="text-white opacity-0 text-sm  max-w-0 lg:group-hover:opacity-100 lg:group-hover:max-w-32  lg:group-hover:px-5 whitespace-nowrap transition-all duration-300 ease-in-out">
      Need Help
    </span>
    <span
      className={`h-8 aspect-square rounded-full bg-white  grid place-content-center ${
        iseventmanager ? "text-eventtheme" : "text-theme"
      }`}
    >
      ?
    </span>
  </Link>
);

const Gotopbutton = ({ iseventmanager }) => {
  const [scrolltop, setscrolltop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 1000;
      setscrolltop((prev) => (prev !== shouldShow ? shouldShow : prev));
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`group flex flex-col items-center justify-center gap-1 text-sm  
          text-white h-10 w-10 lg:hover:h-16 rounded-full
         overflow-hidden duration-300 ${
           !scrolltop && "opacity-0 pointer-events-none"
         } ${iseventmanager ? "bg-eventtheme" : "bg-theme"}`}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      aria-label="Go to Top"
      title="Go to Top"
    >
      <FaArrowUpLong className="translate-y-[2px]" />
      <span className="h-0 m-0 p-0 opacity-0 lg:group-hover:opacity-100 lg:group-hover:h-4 duration-300">
        Top
      </span>
    </button>
  );
};

export default FIxedbuttons;
