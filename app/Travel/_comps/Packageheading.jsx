"use client";
import React from "react";
import { LuFilter } from "react-icons/lu";
import { Travelcontextfn } from "../Travelcontext";

function Packageheading() {
  const { settravelsidemenu } = Travelcontextfn();
  return (
    <div className="flex items-center justify-between mt-5">
      <h2 className="text-2xl font-semibold text-gray-800">Popular Packages</h2>
      <button
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white rounded-md shadow-md"
        onClick={() => settravelsidemenu(true)}
      >
        <LuFilter className="w-4 h-4" />
        <span>Filter</span>
      </button>
    </div>
  );
}

export default Packageheading;
