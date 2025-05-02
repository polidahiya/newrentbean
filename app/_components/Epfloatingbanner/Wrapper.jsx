"use client";
import React, { useState } from "react";

function Wrapper({ children }) {
  const [showbanner, setshowbanner] = useState(true);
  const [popup, setpopup] = useState(false);

  useState(() => {
    const timer = setTimeout(() => {
      setpopup(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!showbanner) return null;

  return (
    <div
      className={`fixed w-full max-w-72 lg:max-w-xl bottom-20 lg:bottom-5 left-5 md:left-10 z-30 print:hidden  duration-300 ${
        popup ? "scale-100" : " scale-0"
      }`}
    >
      {children}
      <button
        className="absolute bottom-full -translate-y-1 right-0 h-5 aspect-square bg-white rounded-full flex items-center justify-center text-[10px] border"
        onClick={() => setshowbanner(false)}
      >
        x
      </button>
    </div>
  );
}

export default Wrapper;
