"use client";
import React, { useRef } from "react";
import { Sendpassresetmail, Resetpassword } from "./Serveraction";
import { AppContextfn } from "@/app/Context";
import { useState } from "react";
import Recaptcha from "@/app/_components/_helperfunctions/Recaptcha";

function Publicpage({ token = null }) {
  const { setmessagefn } = AppContextfn();
  const inputref = useRef(null);
  const [loading, setloading] = useState(false);

  const Submitform = () => {
    const inputvalue = inputref.current.value;
    if (token) {
      // password check
      const minLength = 8;
      const maxLength = 100;

      if (inputvalue.length < minLength) {
        inputref.current.focus();
        setmessagefn("Password is too short ( " + minLength + " chars min )*");
        return;
      }

      if (inputvalue.length > maxLength) {
        inputref.current.focus();
        setmessagefn("Password is too big ( " + maxLength + " chars min )*");
        return;
      }

      setloading(true);
      Recaptcha(
        async () => {
          const res = await Resetpassword(inputvalue, token);
          setmessagefn(res?.message);
          setloading(false);
        },
        () => {
          setmessagefn("Something went wrong!");
          setloading(false);
        }
      );
    } else {
      // email check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputvalue)) {
        inputref.current.focus();
        setmessagefn("Invalid email");
        return;
      }
      setloading(true);
      Recaptcha(
        async () => {
          const res = await Sendpassresetmail(inputvalue);
          setmessagefn(res?.message);
          setloading(false);
        },
        () => {
          setmessagefn("Something went wrong!");
          setloading(false);
        }
      );
    }
  };
  return (
    <>
      <div className="mt-7">
        {/* email field */}
        <div
          className={`relative h-[35px] w-full my-[30px] lg:my-[15px] bg-transparent`}
        >
          <input
            ref={inputref}
            className="forminput absolute h-full w-full top-0 left-0 flex items-center outline-none  border-b border-b-theme box-content bg-white text-black"
            type={token ? "text" : "email"}
            required
          />
          <label className="formlabel absolute h-full w-full top-0 left-0 z-10 flex items-center bg-white  pointer-events-none duration-150">
            {token ? "Enter new password" : "Enter your email"}
          </label>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="relative group flex items-center justify-center gap-2 px-12 py-[5px] bg-theme text-white rounded-full  mt-5  overflow-hidden"
          onClick={Submitform}
          aria-label="Change Password" title="Change Password"
        >
          {loading && (
            <div className="h-[20px] aspect-square rounded-full  border-r-2 border-l-2 border-white animate-spin z-10"></div>
          )}
          <span className="z-10">{token ? "Change password" : "Continue"}</span>
        </button>
      </div>
    </>
  );
}

export default Publicpage;
