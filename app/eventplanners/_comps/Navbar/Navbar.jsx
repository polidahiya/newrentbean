import React from "react";
import Navwrapper from "./Navwrapper";
import { FaPhoneAlt } from "react-icons/fa";
import { categories } from "@/app/eventplanners/commondata";
import Link from "next/link";

function Navbar() {
  return (
    <Navwrapper>
      <div className="h-full flex-1 py-4">
        <img
          src="/eventplanners/logo.png"
          alt="rentbean eventplanners logo"
          className="h-full -translate-y-full group-hover/nav: brightness-0 saturate-100 invert-[94%] sepia-[8%] hue-rotate-[298deg]"
          style={{
            animation: `movedownanimation 0.6s ease-in-out forwards`,
          }}
        />
      </div>
      <div className="flex-1 h-full text-sm flex items-center justify-center">
        <div className="overflow-hidden px-5">
          <Link
            href={"/"}
            className=" -translate-y-full"
            style={{
              animation: `movedownanimation 0.6s 0.2s ease-in-out forwards`,
            }}
          >
            Home
          </Link>
        </div>
        <Categorydropdown />

        <div className="overflow-hidden px-5">
          <Link
            href={"/"}
            className=" -translate-y-full"
            style={{
              animation: `movedownanimation 0.6s 0.6s ease-in-out forwards`,
            }}
          >
            Contact us
          </Link>
        </div>
        <div className="overflow-hidden px-5">
          <Link
            href={"/"}
            className=" -translate-y-full"
            style={{
              animation: `movedownanimation 0.6s 1s ease-in-out forwards`,
            }}
          >
            Blogs
          </Link>
        </div>
      </div>
      <div className="overflow-hidden flex-1 flex items-center justify-end">
        <button
          className="flex items-center gap-2 border border-white rounded-full px-5 py-2  bg-white text-eventtheme hover:bg-transparent hover:text-white cursor-pointer -translate-y-full"
          style={{
            animation: `movedownanimation 0.6s 1.2s ease-in-out forwards`,
          }}
        >
          <FaPhoneAlt />
          Book Now!
        </button>
      </div>
    </Navwrapper>
  );
}

const Categorydropdown = () => {
  return (
    <div className="group/categorycontainer h-full">
      <Link
        href={"/"}
        className="-translate-y-full h-full px-5 grid place-content-center"
        style={{
          animation: `movedownanimation 0.6s 0.4s ease-in-out forwards`,
        }}
      >
        Events
      </Link>
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-full min-h-8 bg-white px-6 py-10 shadow-lg rounded-b-xl lg:hidden group-hover/categorycontainer:block z-50">
        <h2 className="text-3xl font-bold mb-6 text-center">Categories</h2>

        <div className="flex max-h-screen  overflow-y-auto">
          {Object.entries(categories).map(([categoryname, category], i) => (
            <div key={i} className="w-full">
              <h3 className="text-xl font-semibold mb-2">
                {categoryname.replace(/-/g, " ")}
              </h3>

              <div className="space-y-2 ml-2 text-sm">
                {Object.entries(category.subcat).map(
                  ([subcatname, subcat], j) => (
                    <div key={j}>
                      <p className="font-medium">
                        <Linkeffect
                          title={subcatname.replace(/-/g, " ")}
                          linkto={"/"}
                        />
                      </p>

                      {subcat.subcat && (
                        <div className="pl-3 border-l border-gray-300 ml-1 mt-1 space-y-1">
                          {Object.entries(subcat.subcat).map(
                            ([supersubcatname, _], k) => (
                              <div key={k} className="opacity-80">
                                <Linkeffect
                                  title={supersubcatname.replace(/-/g, " ")}
                                  linkto={"/"}
                                />
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Linkeffect = ({ title, linkto }) => {
  return (
    <Link href={linkto} className="relative block group w-fit">
      {title}
      <span className="block absolute top-full left-0 h-0.5 w-0 lg:group-hover:w-full bg-eventtheme duration-300"></span>
    </Link>
  );
};

export default Navbar;
