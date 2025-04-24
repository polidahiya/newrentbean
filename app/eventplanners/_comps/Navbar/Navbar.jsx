import React from "react";
import Navwrapper from "./Navwrapper";
import { FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";
import Showevents from "../../(group)/allevents/Showevents";

function Navbar() {
  return (
    <Navwrapper>
      <div className="h-full flex-1 py-4">
        <Link href="/eventplanners" className="relative block h-full">
          <img
            src="/eventplanners/logo.png"
            alt="rentbean eventplanners logo "
            className="absolute inset-0 logo h-full -translate-y-full group-hover/nav:opacity-0"
            style={{
              animation: `movedownanimation 0.6s ease-in-out forwards`,
            }}
          />
          <img
            src="/eventplanners/logopink.png"
            alt="rentbean eventplanners logo"
            className="absolute inset-0 logopink opacity-0 h-full -translate-y-full group-hover/nav:opacity-100"
            style={{
              animation: `movedownanimation 0.6s ease-in-out forwards`,
            }}
          />
        </Link>
      </div>
      <div className="hidden flex-1 h-full  lg:flex items-center justify-center">
        <div className="overflow-hidden text-sm h-full">
          <Link
            href={"/eventplanners"}
            className="grid place-content-center relative group/links h-full -translate-y-full px-5"
            style={{
              animation: `movedownanimation 0.6s 0.2s ease-in-out forwards`,
            }}
          >
            <span className="block relative py-1">
              Home
              <span className="block absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-eventtheme group-hover/links:w-full duration-300"></span>
            </span>
          </Link>
        </div>
        <Categorydropdown />
        <div className="overflow-hidden text-sm h-full">
          <Link
            href={"/eventplanners/contact"}
            className="grid place-content-center relative group/links h-full -translate-y-full px-5"
            style={{
              animation: `movedownanimation 0.6s 0.6s ease-in-out forwards`,
            }}
          >
            <span className="block relative py-1">
              Contact us
              <span className="block absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-eventtheme group-hover/links:w-full duration-300"></span>
            </span>
          </Link>
        </div>
        {/* <div className="overflow-hidden text-sm h-full">
          <Link
            href={"/"}
            className="grid place-content-center relative group/links h-full -translate-y-full px-5"
            style={{
              animation: `movedownanimation 0.6s 1s ease-in-out forwards`,
            }}
          >
            <span className="block relative py-1">
              Blogs
              <span className="block absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-eventtheme group-hover/links:w-full duration-300"></span>
            </span>
          </Link>
        </div> */}
      </div>
      <div className="overflow-hidden flex-1 flex items-center justify-end">
        <Link
          href={"/eventplanners/contact"}
          className="callnow flex items-center gap-2 border border-white rounded-full px-5 py-2 text-xs md:text-base bg-white text-eventtheme hover:bg-eventtheme hover:text-white cursor-pointer group-hover/nav:border-eventtheme -translate-y-full"
          style={{
            animation: `movedownanimation 0.6s 1.2s ease-in-out forwards`,
          }}
        >
          <FaPhoneAlt />
          Book Now!
        </Link>
      </div>
    </Navwrapper>
  );
}

const Categorydropdown = () => {
  return (
    <div className="group/categorycontainer h-full">
      <Link
        href={"/eventplanners/allevents"}
        className="grid place-content-center relative group/links h-full -translate-y-full px-5 text-sm"
        style={{
          animation: `movedownanimation 0.6s 0.4s ease-in-out forwards`,
        }}
      >
        <span className="block relative py-1">
          Events
          <span className="block absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-eventtheme group-hover/links:w-full duration-300"></span>
        </span>
      </Link>
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-full bg-white px-20 pt-10 pb-20 shadow-lg rounded-b-3xl lg:hidden group-hover/categorycontainer:block z-50">
        <Showevents />
      </div>
    </div>
  );
};

export default Navbar;
