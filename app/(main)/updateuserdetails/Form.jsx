"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AppContextfn } from "@/app/Context";
import { updateuserdetails } from "./Serveractions";
import Updateusersvg from "@/app/_svgs/Updateusersvg";
import Recaptcha from "@/app/_components/_helperfunctions/Recaptcha";

function Form({ userdata }) {
  const { setmessagefn } = AppContextfn();
  const [showloading, setshowloading] = useState(false);

  const nameref = useRef("");
  const phonenumref = useRef("");
  const addressref = useRef("");

  useEffect(() => {
    nameref.current.value = userdata.username;
    phonenumref.current.value = userdata.phonenum;
    addressref.current.value = userdata.address;
  }, []);

  const updateuserfn = async () => {
    const refarray = [nameref, phonenumref, addressref];
    for (let i = 0; i < refarray.length; i++) {
      if (refarray[i]?.current?.value == "") {
        refarray[i]?.current?.focus();
        setmessagefn("Please fill this field");
        return;
      }
    }
    setshowloading(true);

    const userdetails = {
      username: nameref.current.value,
      phonenum: phonenumref.current.value,
      address: addressref.current.value,
    };

    Recaptcha(
      async () => {
        const res = await updateuserdetails(userdetails);
        setshowloading(false);
        setmessagefn(res?.message);
      },
      () => {
        setmessagefn("Something went wrong!");
        setshowloading(false);
      }
    );
  };

  return (
    <div className="blackshadow1 w-full md:w-[700px] bg-white p-[30px] rounded-[20px]">
      <Image
        src="/minlogo.png"
        alt="adorefurnix logo image"
        className=" top-[20px] left-[30px] h-[50px] w-[50px]"
        width={156}
        height={60}
        
      ></Image>
      <div className="flex items-center justify-center gap-[10px] text-[25px] font-semibold  font-recline ">
        <Updateusersvg styles="h-[30px] translate-y-[-3px]" />
        Update Details
      </div>
      <div className="mt-[50px] lg:grid lg:grid-cols-2 lg:gap-x-[30px] ">
        <div className=" relative h-[35px] w-full my-[30px] lg:my-[15px] bg-transparent">
          <input
            ref={nameref}
            className="forminput absolute h-full w-full top-0 left-0 flex items-center outline-none  border-b border-b-theme box-content bg-white text-black"
            type="text"
            required
          />
          <label
            className="formlabel absolute h-full w-full top-0 left-0 z-10 flex items-center bg-white  pointer-events-none duration-150"
            htmlFor="name"
          >
            Name
          </label>
        </div>
        <div className="relative h-[35px] w-full my-[30px] lg:my-[15px] bg-transparent">
          <input
            ref={phonenumref}
            className="forminput absolute h-full w-full top-0 left-0 flex items-center outline-none  border-b border-b-theme box-content bg-white text-black"
            type="number"
            required
          />
          <label
            className="formlabel absolute h-full w-full top-0 left-0 z-10 flex items-center bg-white  pointer-events-none duration-150"
            htmlFor="name"
          >
            Mobile Number
          </label>
        </div>
        <div className="relative h-[35px] w-full my-[30px] lg:my-[15px] bg-transparent col-span-2">
          <input
            ref={addressref}
            className="forminput absolute h-full w-full top-0 left-0 flex items-center outline-none  border-b border-b-theme box-content bg-white text-black"
            type="text"
            required
          />
          <label
            className="formlabel absolute h-full w-full top-0 left-0 z-10 flex items-center bg-white  pointer-events-none duration-150"
            htmlFor="name"
          >
            Address
          </label>
        </div>
      </div>
      <center>
        <button
          className="flex items-center justify-center gap-[10px] px-[100px] py-[5px] bg-theme text-white rounded-full mt-[20px] "
          onClick={updateuserfn}
        >
          {showloading && (
            <div className="h-[20px] aspect-square rounded-full  border-r-2 border-l-2 border-white animate-spin"></div>
          )}
          <span>Update Details</span>
        </button>
      </center>
    </div>
  );
}

export default Form;
