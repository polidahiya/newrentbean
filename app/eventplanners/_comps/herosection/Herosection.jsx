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
      <div
        className="absolute top-1/2 -translate-y-1/2 right-24 flex flex-col items-center socialanimation opacity-0 z-10"
        style={{
          animation: "fadeoutanimation 0.6s 3s ease-in-out forwards",
        }}
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent to-white"></div>
        <div
          className="flex flex-col gap-5 text-white text-xl h-8 overflow-hidden"
          style={{
            animation: `socialanimationicons 0.3s 3.1s ease-in-out forwards`,
          }}
        >
          <Link
            href={"/"}
            className="border border-white border-opacity-50 rounded-full p-1 hover:bg-white hover:text-theme translate-y-full"
            style={{ animation: "moveupanimation 0.3s 3.2s forwards" }}
          >
            <FaFacebook />
          </Link>
          <Link
            href={"/"}
            className="border border-white border-opacity-50 rounded-full p-1 hover:bg-white hover:text-theme translate-y-full"
            style={{ animation: "moveupanimation 0.3s 3.3s forwards" }}
          >
            <RiInstagramFill />
          </Link>
          <Link
            href={"/"}
            className="border border-white border-opacity-50 rounded-full p-1 hover:bg-white hover:text-theme translate-y-full"
            style={{ animation: "moveupanimation 0.3s 3.4s forwards" }}
          >
            <RiTwitterXFill />
          </Link>
          <Link
            href={"/"}
            className="border border-white border-opacity-50 rounded-full p-1 hover:bg-white hover:text-theme translate-y-full"
            style={{ animation: "moveupanimation 0.3s 3.5s forwards" }}
          >
            <FaPinterestP />
          </Link>
        </div>
        <div className="w-px h-20 bg-gradient-to-b from-white to-transparent"></div>
      </div>
      <Trusties />
      <div className="absolute inset-0 h-full w-full">
        <Backgroundimages />
      </div>
    </div>
  );
}

export default Herosection;
