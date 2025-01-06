"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navcategories from "./Navcategories";
import Animatingmobilenemubutton from "./_comps/Animatingmobilenemubutton";
import Logedinusermenu from "./_comps/Logedinusermenu";
import { FaCartShopping } from "react-icons/fa6";
import { AppContextfn } from "@/app/Context";
import { FiSearch } from "react-icons/fi";
import Searchbox from "../Searchbox";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { FaOpencart } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";
import { TbSwitchHorizontal } from "react-icons/tb";

function Navbar({ params, productsname, token, userdata }) {
  const router = useRouter();
  const slug = params?.Category;
  const category = slug && slug[0] ? decodeURIComponent(slug[0]) : null;

  const {
    showsearch,
    setshowsearch,
    showcat,
    setshowcat,
    searchinputref,
    location,
    setlocation,
    isrentalstore,
    setisrentalstore,
  } = AppContextfn();

  useEffect(() => {
    const hidemenu2 = () => {
      setshowcat(false);
      setshowsearch(false);
    };
    window.addEventListener("popstate", hidemenu2);
    return () => {
      window.removeEventListener("popstate", hidemenu2);
    };
  }, []);

  return (
    <nav className="sticky bg-white top-0 left-0 w-full border-slate-300 lg:px-[40px] z-40">
      <div className="relative peer flex h-14 items-center justify-between py-2">
        {/* firstcomp */}
        <div className="flex items-center gap-0 md:gap-[10px] w-full h-full">
          <Animatingmobilenemubutton setshowsearch={setshowsearch} />
          {/* search button */}
          <button
            className="h-full aspect-square  flex items-center justify-center md:hidden "
            onClick={() => {
              history.pushState(null, "", "");
              setshowsearch(true);
              setTimeout(() => {
                searchinputref.current.focus();
              }, 100);
            }}
          >
            <FiSearch className="h-full text-[25px] aspect-square " />
          </button>
          {/* logo */}
          <Link
            href="/"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[30px] md:h-full md:static md:flex  md:translate-x-0 md:translate-y-0  md:w-fit p-1"
          >
            <Image
              className="w-auto h-full"
              src="/logo&ui/3dlogo.png"
              alt="Rentbean logo"
              height={50}
              width={200}
            ></Image>
          </Link>
          <button
            className="h-8 px-5 border rounded-full flex items-center justify-center gap-1 text-theme"
            onClick={() => setlocation((pre) => ({ ...pre, show: true }))}
          >
            <MdLocationPin className="inline-block" />{" "}
            <span>{location.location}</span>
          </button>
        </div>
        {/* searchbar */}
        <div
          className={`absolute top-[calc(100%+20px)] md:static w-full h-full lg:min-w-[500px] md:block lg:z-20 ${
            showsearch ? "block z-40" : "hidden"
          }`}
        >
          <Searchbox productsname={productsname} />
        </div>

        {/* third comp */}
        <div className="w-full h-full flex items-center justify-end gap-[5px] md:gap-[10px]">
          <button
            className="h-8 px-5 border rounded-full flex items-center justify-center gap-1 text-theme"
            onClick={() => setisrentalstore((pre) => !pre)}
          >
            <TbSwitchHorizontal className="inline-block" />{" "}
            {isrentalstore ? "Rental" : "Buy"} Store
          </button>
          {/* cart */}
          <Cartlink />
          {/* loged in user menu */}
          <Logedinusermenu userdata={userdata} token={token} />
        </div>
        {/* exit back screen */}
        {(showcat || showsearch) && (
          <div
            className="block lg:hidden fixed top-0 left-0 bg-black opacity-40 h-screen w-screen z-30"
            onClick={() => {
              window.history.back();
            }}
          ></div>
        )}
      </div>
      {/* categories */}
      <Navcategories category={category} />

      {/* backbutton */}
      {!showsearch && (
        <button
          className="absolute bottom-0 left-[10px] translate-y-[calc(100%+10px)] h-[40px] aspect-square bg-theme text-white rounded-full text-[20px] grid place-content-center lg:hidden"
          onClick={() => {
            router.back();
          }}
        >
          <IoMdArrowRoundBack />
        </button>
      )}
      {/* border effect */}
      <div
        className="absolute top-full left-0 pointer-events-none w-full h-1 shadow-[inset_0_1px_1px_0_rgba(0,0,0,.14),inset_0_2px_1px_-1px_rgba(0,0,0,.12)]"
        style={{
          WebkitMaskImage:
            "-webkit-linear-gradient(left,transparent,#000 5%,#000 95%,transparent)",
        }}
      ></div>
    </nav>
  );
}

export const Cartlink = () => {
  const { cart } = AppContextfn();
  const cartitems = Object.values(cart).filter((item) => item.added);

  const totalQuantity = cartitems.reduce(
    (total, value) => total + value.quantity,
    0
  );

  return (
    <div className="group relative  h-full aspect-square z-20">
      <Link
        href="/cart"
        className="h-full w-full flex items-center justify-center"
      >
        <FaCartShopping className="text-[25px]" />
      </Link>
      {totalQuantity > 0 && (
        <div className="absolute top-0 right-0 h-[15px] aspect-square bg-theme text-white text-[10px] rounded-full flex items-center justify-center ">
          {totalQuantity}
        </div>
      )}
      {/* cart peak */}
      <div className="absolute h-3 w-full hidden lg:group-hover:block">
        <div className="absolute top-full right-0  w-96 translate-x-[50px] rounded-lg bg-white flex  flex-col items-center  p-3 shadow-md">
          <span className="absolute top-0 right-[65px] -translate-y-1/2 rotate-45 w-2 aspect-square bg-white"></span>
          {totalQuantity > 0 ? (
            <>
              <div className="w-full flex flex-col gap-3 max-h-80  overflow-y-scroll hidescroll">
                {Object.values(cart).map((item, i) => {
                  return (
                    <Link
                      key={i}
                      href={`/${item?.category}/${item?.subcat}/${item?._id}`}
                      className="flex gap-2"
                    >
                      <Image
                        className="min-w-16 aspect-square rounded-sm object-cover bg-bg1"
                        src={item?.image}
                        alt={item?.name}
                        quality={10}
                        width={100}
                        height={100}
                      ></Image>
                      <div className="flex flex-col">
                        <h3 className="line-clamp-2">{item?.name}</h3>
                        {/* price */}
                        <p className="text-black">
                          ₹
                          {(item?.price * item?.quantity).toLocaleString(
                            "en-IN"
                          )}
                        </p>
                        <div className="flex gap-10 mt-auto">
                          <div>
                            <span className="text-slate-400">Quantity : </span>
                            <span>{item?.quantity}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <Link
                href="/cart"
                className="bg-theme text-white flex items-center justify-center gap-3 w-fit px-5 py-1 rounded-full text-sm font-semibold mt-3"
              >
                Go to Cart <FaOpencart />
              </Link>
            </>
          ) : (
            <div className="flex items-center px-5">
              <Image
                src="/no-cart.png"
                alt="Empty cart image"
                height={100}
                width={100}
                className="w-[100px]"
              ></Image>
              <p className="text-sm text-center">
                Your Cart is Empty, Add Some Products.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
