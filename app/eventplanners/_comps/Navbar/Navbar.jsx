import React from "react";
import Navwrapper from "./Navwrapper";

function Navbar() {
  return (
    <Navwrapper>
      <div className="h-full">
        <img
          src="/eventplanners/logo.png"
          alt="rentbean eventplanners logo"
          className="h-full -translate-y-full"
          style={{
            animation: `movedownanimation 0.6s ease-in-out forwards`,
          }}
        />
      </div>
      <ul className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm flex items-center gap-10 overflow-hidden">
        <li
          className="-translate-y-full"
          style={{
            animation: `movedownanimation 0.6s 0.2s ease-in-out forwards`,
          }}
        >
          Contact us
        </li>
        <li
          className="-translate-y-full"
          style={{
            animation: `movedownanimation 0.6s 0.4s ease-in-out forwards`,
          }}
        >
          Contact us
        </li>
        <li
          className="-translate-y-full"
          style={{
            animation: `movedownanimation 0.6s 0.6s ease-in-out forwards`,
          }}
        >
          Contact us
        </li>
        <li
          className="-translate-y-full"
          style={{
            animation: `movedownanimation 0.6s 0.8s ease-in-out forwards`,
          }}
        >
          Contact us
        </li>
        <li
          className="-translate-y-full"
          style={{
            animation: `movedownanimation 0.6s 1s ease-in-out forwards`,
          }}
        >
          Contact us
        </li>
      </ul>
      <div className="overflow-hidden">
        <button
          className="border border-white rounded-full px-5 py-2  bg-white text-theme hover:bg-transparent hover:text-white cursor-pointer -translate-y-full"
          style={{
            animation: `movedownanimation 0.6s 1.2s ease-in-out forwards`,
          }}
        >
          Book Now!
        </button>
      </div>
    </Navwrapper>
  );
}

export default Navbar;
