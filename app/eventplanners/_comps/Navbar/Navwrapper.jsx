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
      className={`fixed top-0 left-0 flex items-center justify-between h-20 px-20 py-4 w-full text-white z-20  duration-500 ${
        scrolled && "bg-black bg-opacity-60 backdrop-blur-md"
      }`}
    >
      {children}
    </nav>
  );
}

export default Navwrapper;
