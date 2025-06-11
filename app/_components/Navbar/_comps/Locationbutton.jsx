"use client";
import React from "react";
import { MdLocationPin } from "react-icons/md";
import { AppContextfn } from "@/app/Context";

function Locationbutton() {
  const { location, setlocation } = AppContextfn();
  return (
    <button
      className="hidden lg:flex px-5 py-1 border rounded-lg items-center justify-center gap-1 bg-bg1"
      onClick={() => setlocation((pre) => ({ ...pre, show: true }))}
      aria-label="Select Location"
      title="Select Location"
    >
      <MdLocationPin className="inline-block" />{" "}
      <span>{location?.location}</span>
    </button>
  );
}

export default Locationbutton;
