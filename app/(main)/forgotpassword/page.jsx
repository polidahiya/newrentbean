"use client";
import Image from "next/image";
import Usersvg from "@/app/_svgs/Usersvg";
import Link from "next/link";
import Publicpage from "./Publicpage";

function page({ searchParams }) {
  return (
    <div
      className="relative flex items-center justify-center py-[20px]"
      style={{
        background: "url(/images/loginwallpaper.jpg) center left / cover",
        minHeight: "calc(100vh - 60px)",
      }}
    >
      <div className="relative bg-white w-[90%] max-w-[750px] rounded-[20px] shadow-lg p-[30px]">
        <Image
          src="/minlogo.png"
          alt="logo image"
          className=" top-[20px] left-[30px] h-[50px] w-[50px] invert"
          width={156}
          height={60}
          
        ></Image>
        <center>
          <div className="relative w-fit flex items-center justify-center text-base md:text-[30px] ">
            <Usersvg styles="absolute top-[50%] left-0 translate-y-[-50%] translate-x-[-120%]  h-[30px] border border-slate-300 rounded-full fill-white" />
            Reset Password
          </div>
        </center>
        <Publicpage token={searchParams?.token} />
        <p className="text-[14px] text-center mt-5">
          Back to
          <Link
            href={"/loginlogout"}
            className="text-theme cursor-pointer ml-1"
            replace
          >
            login
          </Link>{" "}
          page
        </p>
      </div>
    </div>
  );
}

export default page;
