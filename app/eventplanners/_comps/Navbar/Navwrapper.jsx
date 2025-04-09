"use client";
import React, { useEffect, useState } from "react";

function Navwrapper({ children }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed group/nav top-0 left-0 flex items-center justify-between h-20 px-20 w-full text-white lg:hover:bg-white lg:hover:text-text z-20  duration-500 ${
        scrolled && "bg-white text-text"
      }`}
    >
      {children}
    </nav>
  );
}

export default Navwrapper;
