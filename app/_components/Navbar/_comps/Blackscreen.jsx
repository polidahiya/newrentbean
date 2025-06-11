"use client";
import React from "react";
import { AppContextfn } from "@/app/Context";

function Blackscreen() {
  const { showsearch, showcat } = AppContextfn();
  return (
    <>
      {(showcat || showsearch) && (
        <div
          className="block lg:hidden fixed top-0 left-0 bg-black opacity-20 h-screen w-screen z-30"
          onClick={() => {
            window.history.back();
          }}
        ></div>
      )}
    </>
  );
}

export default Blackscreen;
