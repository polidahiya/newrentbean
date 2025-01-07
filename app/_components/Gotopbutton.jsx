"use client";
import { FaArrowUpLong } from "react-icons/fa6";
import { AppContextfn } from "../Context";

function Gotopbutton() {
  const { scrolltop } = AppContextfn();

  return (
    <button
      className={`group flex flex-col items-center justify-center gap-1 text-sm 
         bg-theme text-white h-10 w-10 lg:hover:h-16 rounded-full
         overflow-hidden duration-300 ${
           !scrolltop && "opacity-0 pointer-events-none"
         }`}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
    >
      <FaArrowUpLong className="translate-y-[2px]" />
      <span className="h-0 m-0 p-0 opacity-0 lg:group-hover:opacity-100 lg:group-hover:h-4 duration-300">
        Top
      </span>
    </button>
  );
}

export default Gotopbutton;
