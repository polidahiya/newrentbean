"use client";
import React, { useEffect, useState } from "react";

function Navclient({ children }) {
  const [shownavbottom, setshownavbottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 50;
      if (shouldShow != shownavbottom) setshownavbottom(shouldShow);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [shownavbottom]);

  return (
    <nav
      className={`sticky bg-white top-0 left-0 w-full px-2 md:px-10 z-40 ${
        shownavbottom && "shadow"
      }`}
    >
      {children}
    </nav>
  );
}

export default Navclient;
