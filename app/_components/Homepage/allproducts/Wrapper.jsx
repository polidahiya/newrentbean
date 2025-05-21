"use client";
import React, { useRef } from "react";
import { FaAngleLeft } from "react-icons/fa6";

function Wrapper({ children }) {
  let scrollref = useRef(null);
  let scrollvalue = 400;
  const handleScroll = (amount) => {
    if (scrollref.current) {
      scrollref.current.scrollLeft += amount;
    }
  };
  return (
    <div className="px-2 py-10 md:p-10 bg-gray-100">
      <div className="flex justify-between items-end p-2 md:p-0">
        <div className="text-[25px] font-recline">
          Fall in love
          <br />
          <div className="opacity-90 font-recline">
            With your space
            <div className="h-0.5 w-[100px] bg-theme"></div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleScroll(-scrollvalue)}
            className="flex items-center justify-center h-9 w-9 opacity-50 border border-gray-400 rounded-full hover:opacity-70"
            aria-label="Scroll left"
            title="Scroll left"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={() => handleScroll(scrollvalue)}
            className="flex items-center justify-center h-9 w-9 opacity-50 border border-gray-400 rounded-full hover:opacity-70 rotate-180"
            aria-label="scroll Right"
            title="scroll Right"
          >
            <FaAngleLeft />
          </button>
        </div>
      </div>
      {/* all posts */}
      <div
        ref={scrollref}
        className="overflow-x-scroll snap-x scroll-smooth snap-mandatory flex gap-2 mt-8"
      >
        {children}
      </div>
    </div>
  );
}

export default Wrapper;
