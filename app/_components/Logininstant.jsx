"use client";
import React, { useEffect, useRef } from "react";
import { AppContextfn } from "../Context";
import { Userlogin } from "../_serveractions/Userlogin";

function Logininstant() {
  const { instantlogin, setinstantlogin } = AppContextfn();
  const nameref = useRef(null);
  const emailref = useRef(null);
  const passwordref = useRef(null);
  const phonenumref = useRef(null);
  const addressref = useRef(null);

  const loginfn = async () => {
    const res = await Userlogin({ email: "polidahiya830@gmail.com" }, 1);
    console.log(res);
  };

  useEffect(() => {
    window.addEventListener("popstate", closemenu);
    return () => {
      window.removeEventListener("popstate", closemenu);
    };
  }, []);

  const closemenu = () => {
    setinstantlogin((pre) => ({ ...pre, effect: false }));
    setTimeout(setinstantlogin, 350, (pre) => ({ ...pre, show: false }));
  };
  if (instantlogin.show)
    return (
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 p-5 duration-300 ${
          instantlogin?.effect ? "opacity-100 " : "opacity-0 "
        }`}
      >
        <section
          className={`relative w-full md:w-[600px] aspect-[4/3] flex  shadow-xl duration-300 border border-white  ${
            instantlogin?.effect
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
        >
          {/* left */}
          <div
            className="absolute h-full top-0 w-1/2 left-0 flex flex-col items-center justify-center gap-2 px-5 text-sm "
            style={{
              background: "url(/images/instantloginimage.jpg) center/contain",
            }}
          >
            <input
              ref={emailref}
              className="w-full px-5 py-[6px] outline-none  border-b border-b-theme  bg-white"
              type="email"
              placeholder="Enter Your Email Here!"
              required
            />
            <button
              className="w-fit px-5 py-[6px] bg-theme text-white rounded-full"
              onClick={loginfn}
              aria-label="Next"
              title="Next"
            >
              Next
            </button>
          </div>
          {/* right */}
          <div className="absolute h-full top-0 w-1/2 right-0 flex flex-col items-center bg-bg1 text-[#263242]">
            <div>
              <p className="text-center text-[150px] font-bold">01</p>
              <p className="px-5 text-[25px]">Let us know who you are!</p>
              <p className="pl-5 pr-28 mt-3">
                You Email works as a unique user for us.
              </p>
            </div>
            {/* dotts */}
            <ul className="flex gap-5 mt-auto my-5">
              <li className="w-[5px] aspect-square rounded-full bg-white"></li>
              <li className="w-[5px] aspect-square rounded-full bg-white"></li>
              <li className="w-[5px] aspect-square rounded-full bg-white"></li>
            </ul>
          </div>
          {/* canclebutton */}
          <button
            className="absolute top-0 right-0 h-12 aspect-square flex items-center justify-center bg-[#263242] text-white rounded-bl-2xl"
            onClick={() => {
              window.history.back();
            }}
            aria-label="Close"
            title="Close"
          >
            X
          </button>
        </section>
        {/* backscreen */}
        <button
          className="absolute inset-0 bg-black/30 -z-10"
          onClick={() => {
            window.history.back();
          }}
          aria-label="Close"
          title="Close"
        ></button>
      </div>
    );
}

// function Inputfiels({ refval, type,}) {
//   return (
//     <input
//       ref={refval}
//       className="absolute h-full w-full top-0 left-0 flex items-center px-5 outline-none  border-b border-b-theme box-content bg-white text-black"
//       type={type}
//       required
//     />
//   );
// }

export default Logininstant;
