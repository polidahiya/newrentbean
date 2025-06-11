"use client";
import React from "react";
import Searchbox from "../../Searchbox";
import { AppContextfn } from "@/app/Context";

function Searchbar({ productsname }) {
  const { showsearch, location } = AppContextfn();
  return (
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
  );
}

export default Searchbar;
