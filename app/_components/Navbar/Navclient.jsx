"use client";
import React from "react";
import Link from "next/link";
import Nextimage from "@/app/_components/Nextimage";
import Navcategories from "./Navcategories";
import Logedinusermenu from "./_comps/Logedinusermenu";
import { AppContextfn } from "@/app/Context";
import Searchbox from "../Searchbox";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { usePathname } from "next/navigation";
import Switchstore from "./_comps/Switchstore";
import Cart from "./_comps/Cart";

function Navclient({ params, productsname, token, userdata, Device }) {
  const path = usePathname();
  const splitpath = path.split("/");
  const slug = params?.Category;
  const category = slug && slug[0] ? decodeURIComponent(slug[0]) : null;

  const {
    showsearch,
    showcat,
    location,
    setlocation,
    isrentalstore,
    shownavbottom,
  } = AppContextfn();

  return (
    <nav
      className={`sticky bg-white top-0 left-0 w-full px-2 md:px-10 z-40 ${
        shownavbottom && "shadow"
      }`}
    >
      <div className="relative flex h-14 items-center justify-between py-2 ">
        {/* firstcomp */}
        <div className="flex items-center gap-0 md:gap-2 w-full h-full">
          {/* logo */}
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
          {/* location */}
          {Device == "desktop" && (
            <button
              className="hidden lg:flex px-5 py-1 border rounded-lg items-center justify-center gap-1 bg-bg1"
              onClick={() => setlocation((pre) => ({ ...pre, show: true }))}
              aria-label="Select Location"
              title="Select Location"
            >
              <MdLocationPin className="inline-block" />{" "}
              <span>{location?.location}</span>
            </button>
          )}
        </div>
        {/* searchbar */}
        <div
          className={`absolute top-[calc(100%+20px)] md:static h-10 w-full md:h-full lg:w-full lg:max-w-[500px] md:block lg:z-20 ${
            showsearch ? "block z-40" : "hidden"
          }`}
        >
          <Searchbox
            productsname={productsname}
            location={location?.location || "Delhi"}
          />
        </div>

        {/* third comp */}
        <div className="w-full h-full flex items-center justify-end gap-1 md:gap-2">
          {/* rent or buy switch */}
          {Device == "desktop" && (
            <div className="hidden lg:block">
              <Switchstore />
            </div>
          )}
          {Device == "desktop" && <Cart />}
          <Logedinusermenu userdata={userdata} token={token} />
        </div>
        {/* exit back screen */}
        {(showcat || showsearch) && (
          <div
            className="block lg:hidden fixed top-0 left-0 bg-black opacity-20 h-screen w-screen z-30"
            onClick={() => {
              window.history.back();
            }}
          ></div>
        )}
      </div>
      {/* categories */}
      {Device == "desktop" && (
        <Navcategories
          category={category}
          location={location?.location}
          isrentalstore={isrentalstore}
        />
      )}

      <Link href="/Contact" prefetch={false}></Link>
      {/* backbutton */}
      {!(
        ["Buy", "Rent"].includes(splitpath[2]) && splitpath[3] == undefined
      ) && (
        <button
          className="group bg-theme flex items-center justify-center p-1 h-10 lg:h-8 absolute top-full lg:bottom-0 translate-y-2 lg:-translate-y-10 left-[10px] md:left-11 rounded-full overflow-hidden"
          onClick={() => {
            window.history.back();
          }}
          aria-label="Cancel"
          title="Cancel"
        >
          <span className="h-8 lg:h-6 aspect-square rounded-full bg-white text-theme grid place-content-center">
            <IoMdArrowRoundBack />
          </span>
          <span className="text-white opacity-0 text-sm  max-w-0 lg:group-hover:opacity-100 lg:group-hover:max-w-20 lg:group-hover:px-3 whitespace-nowrap transition-all duration-300 ease-in-out">
            Back
          </span>
        </button>
      )}
    </nav>
  );
}

export default Navclient;
