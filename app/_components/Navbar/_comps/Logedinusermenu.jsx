"use client";
import React, { useEffect } from "react";
import Usersvg from "@/app/_svgs/Usersvg";
import Link from "next/link";
import { AppContextfn } from "@/app/Context";
import Navorderssvg from "@/app/_svgs/Navorderssvg";
import Heart from "@/app/_svgs/Heart";
import Updateusersvg from "@/app/_svgs/Updateusersvg";
import Logoutsvg from "@/app/_svgs/Logoutsvg";
import { logout } from "@/app/(main)/loginlogout/Serveractions";
import { useRouter } from "next/navigation";
import { RiAdminFill } from "react-icons/ri";

function Logedinusermenu({ token, userdata }) {
  const router = useRouter();
  const { toggleusermenu, setmessagefn, setredirectloginlink, showusermenu } =
    AppContextfn();

  const parsedUserData = userdata ? JSON.parse(userdata) : null;

  if (!token) {
    return (
      <button
        onClick={() => {
          const link = new URL(window.location.href);
          setredirectloginlink(link.pathname);
        }}
        aria-label="Login"
        title="Login"
      >
        <Link
          href="/loginlogout"
          prefetch={false}
          className="flex items-center justify-center text-white h-[30px] px-[10px] md:px-[20px] rounded-full bg-theme"
        >
          Login
        </Link>
      </button>
    );
  }
  return (
    <>
      {/* User menu button */}
      <div className="relative  h-full aspect-square z-30">
        <button
          className=" h-full aspect-square  p-1"
          onClick={showusermenu}
          aria-label="Show menu"
          title="Show menu"
        >
          <Usersvg styles="h-full aspect-square fill-white stroke-white border border-slate-300 rounded-full" />
        </button>

        {/* Menu */}
        {toggleusermenu.show && (
          <div
            className={`absolute top-[calc(100%+10px)] right-0 w-[250px] bg-white border border-slate-300 rounded-[10px] p-[10px] shadow-lg duration-300 z-30 ${
              toggleusermenu.effect
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[20px]"
            }`}
          >
            <div className="flex justify-center">
              <Usersvg styles="h-[30px] border border-slate-300 rounded-full mt-[20px] aspect-square fill-white" />
            </div>
            <div className="text-center mt-[5px]">
              {parsedUserData?.username || "User Name"}
            </div>
            <div className="text-center text-[12px] text-cyan-500">
              {parsedUserData?.email || "User Email"}
            </div>
            <div
              className="flex flex-col gap-[2px] w-full mt-[30px]"
              onClick={() => {
                setTimeout(hidemenu, 100);
              }}
            >
              <Link
                href={`/orderdetails`}
                prefetch={false}
                replace
                className="p-1 flex items-center gap-[10px] lg:hover:bg-slate-100 cursor-pointer"
              >
                <Navorderssvg styles="w-6 h-6" />
                Orders Detail
              </Link>
              <hr />
              <Link
                href={`/likedproducts`}
                prefetch={false}
                replace
                className="p-1 flex items-center gap-[10px] lg:hover:bg-slate-100 cursor-pointer"
              >
                <Heart styles="w-6 h-6 fill-red-500" />
                Liked Products
              </Link>
              <hr />
              <Link
                href={`/updateuserdetails`}
                prefetch={false}
                replace
                className="p-1 flex items-center gap-[10px] lg:hover:bg-slate-100 cursor-pointer"
              >
                <Updateusersvg styles="w-6 h-6" />
                Update User Details
              </Link>
              <hr />
              {parsedUserData?.usertype == "admin" && (
                <>
                  <Link
                    href={`/admin`}
                    prefetch={false}
                    replace
                    className="p-1 flex items-center gap-[10px] lg:hover:bg-slate-100 cursor-pointer"
                  >
                    <RiAdminFill className="w-6 h-6" />
                    Admin Dashboard
                  </Link>
                  <hr />
                </>
              )}
              <div
                className="p-1 flex items-center gap-[10px] lg:hover:bg-slate-100 cursor-pointer"
                onClick={async () => {
                  const res = await logout();
                  setmessagefn(res?.message);
                  if (res.status === 200) router.push("/");
                }}
              >
                <Logoutsvg styles="w-6 h-6" />
                Logout
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Overlay to close menu */}
      {toggleusermenu.show && (
        <button
          className="fixed top-0 left-0 h-screen w-screen cursor-default"
          onClick={() => {
            window.history.back();
          }}
          aria-label="Cancel"
          title="Cancel"
        ></button>
      )}
    </>
  );
}

export default Logedinusermenu;
