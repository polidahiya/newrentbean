import React from "react";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { RiTwitterXFill } from "react-icons/ri";
import { FaPinterestP } from "react-icons/fa6";
import Trusties from "./Trusties";
import Backgroundimages from "./Backgroundimages";

function Herosection() {
  return (
    <div className="relative min-h-screen w-full">
      <nav className="relative flex items-center justify-between h-16 px-20 py-2 w-full text-white">
        <div className="h-full">
          <img
            src="/eventplanners/logo.png"
            alt="rentbean eventplanners logo"
            className="h-full -translate-y-full"
            style={{
              animation: `movedownanimation 0.6s ease-in-out forwards`,
            }}
          />
        </div>
        <ul className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm flex items-center gap-10 overflow-hidden">
          <li
            className="-translate-y-full"
            style={{
              animation: `movedownanimation 0.6s 0.2s ease-in-out forwards`,
            }}
          >
            Contact us
          </li>
          <li
            className="-translate-y-full"
            style={{
              animation: `movedownanimation 0.6s 0.4s ease-in-out forwards`,
            }}
          >
            Contact us
          </li>
          <li
            className="-translate-y-full"
            style={{
              animation: `movedownanimation 0.6s 0.6s ease-in-out forwards`,
            }}
          >
            Contact us
          </li>
          <li
            className="-translate-y-full"
            style={{
              animation: `movedownanimation 0.6s 0.8s ease-in-out forwards`,
            }}
          >
            Contact us
          </li>
          <li
            className="-translate-y-full"
            style={{
              animation: `movedownanimation 0.6s 1s ease-in-out forwards`,
            }}
          >
            Contact us
          </li>
        </ul>
        <div className="overflow-hidden">
          <button
            className="border border-white rounded-full px-5 py-2 hover:bg-white hover:text-theme cursor-pointer -translate-y-full"
            style={{
              animation: `movedownanimation 0.6s 1.2s ease-in-out forwards`,
            }}
          >
            Book now!
          </button>
        </div>
      </nav>
      {/* center data */}
      <div className=""></div>
      {/* socials */}
      <div
        className="absolute top-1/2 -translate-y-1/2 right-24 flex flex-col items-center socialanimation opacity-0"
        style={{ animation: "socialanimation 0.6s 1.4s ease-in-out forwards" }}
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent to-white"></div>
        <div className="flex flex-col gap-5 text-white text-xl">
          <Link
            href={"/"}
            className="border border-white border-opacity-50 rounded-full p-1 hover:bg-white hover:text-theme"
          >
            <FaFacebook />
          </Link>
          <Link
            href={"/"}
            className="border border-white border-opacity-50 rounded-full p-1 hover:bg-white hover:text-theme"
          >
            <RiInstagramFill />
          </Link>
          <Link
            href={"/"}
            className="border border-white border-opacity-50 rounded-full p-1 hover:bg-white hover:text-theme"
          >
            <RiTwitterXFill />
          </Link>
          <Link
            href={"/"}
            className="border border-white border-opacity-50 rounded-full p-1 hover:bg-white hover:text-theme"
          >
            <FaPinterestP />
          </Link>
        </div>
        <div className="w-px h-20 bg-gradient-to-b from-white to-transparent"></div>
      </div>
      <Trusties />
      <div className="absolute inset-0 h-full w-full -z-10">
        <Backgroundimages />
      </div>
    </div>
  );
}

export default Herosection;
