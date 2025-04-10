"use client";
import { AppContextfn } from "@/app/Context";

function Togglebutton({ children }) {
  const { moredesc, setmoredesc } = AppContextfn();

  return (
    <button
      className="flex justify-center items-center w-full fill-textcolor mt-[10px]"
      onClick={() => {
        setmoredesc(!moredesc);
      }}
      aria-label={moredesc?"Read less":"Read more"} title={moredesc?"Read less":"Read more"}
    >
      {moredesc ? "Read Less" : "Read More"}
      <svg
        className={`h-[20px] fill-textcolor ${moredesc ? "rotate-180" : ""}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {children}
      </svg>
    </button>
  );
}

export default Togglebutton;
