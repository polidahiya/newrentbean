"use client";
import React from "react";
import Link from "next/link";
import Nextimage from "@/app/_components/Nextimage";
import Navcategories from "./Navcategories";
import Logedinusermenu from "./_comps/Logedinusermenu";
import { FaCartShopping } from "react-icons/fa6";
import { AppContextfn } from "@/app/Context";
import Searchbox from "../Searchbox";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaOpencart } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";
import { usePathname } from "next/navigation";
import { selectedtenure } from "../_helperfunctions/selectedtenure";
import Switchstore from "./_comps/Switchstore";

function Navbar({ params, productsname, token, userdata }) {
  const path = usePathname();
  const splitpath = path.split("/");
  const slug = params?.Category;
  const category = slug && slug[0] ? decodeURIComponent(slug[0]) : null;

  const {
    showsearch,
    showcat,
    location,
    setlocation,
    isrentalstore,
    shownavbottom,
  } = AppContextfn();

  return (
    <nav
      className={`sticky bg-white top-0 left-0 w-full px-2 md:px-10 z-40 ${
        shownavbottom && "shadow"
      }`}
    >
      <div className="relative flex h-14 items-center justify-between py-2 ">
        {/* firstcomp */}
        <div className="flex items-center gap-0 md:gap-2 w-full h-full">
          {/* logo */}
          <Link
            className="h-full md:w-fit p-1"
            href={`/${location?.location}/${isrentalstore ? "Rent" : "Buy"}`}
            prefetch={false}
          >
            <Nextimage
              className="w-auto h-full"
              src="/logo&ui/3dlogo.png"
              alt="Rentbean logo"
              height={50}
              width={200}
              priority
            ></Nextimage>
          </Link>
          {/* location */}
          <button
            className="hidden lg:flex px-5 py-1 border rounded-lg items-center justify-center gap-1 bg-bg1"
            onClick={() => setlocation((pre) => ({ ...pre, show: true }))}
            aria-label="Select Location"
            title="Select Location"
          >
            <MdLocationPin className="inline-block" />{" "}
            <span>{location?.location}</span>
          </button>
        </div>
        {/* searchbar */}
        <div
          className={`absolute top-[calc(100%+20px)] md:static h-10 w-full md:h-full lg:w-full lg:max-w-[500px] md:block lg:z-20 ${
            showsearch ? "block z-40" : "hidden"
          }`}
        >
          <Searchbox
            productsname={productsname}
            location={location?.location || "Delhi"}
          />
        </div>

        {/* third comp */}
        <div className="w-full h-full flex items-center justify-end gap-1 md:gap-2">
          {/* rent or buy switch */}
          <div className="hidden lg:block">
            <Switchstore />
          </div>
          <Cartlink />
          <Logedinusermenu userdata={userdata} token={token} />
        </div>
        {/* exit back screen */}
        {(showcat || showsearch) && (
          <div
            className="block lg:hidden fixed top-0 left-0 bg-black opacity-20 h-screen w-screen z-30"
            onClick={() => {
              window.history.back();
            }}
          ></div>
        )}
      </div>
      {/* categories */}
      <Navcategories
        category={category}
        location={location?.location}
        isrentalstore={isrentalstore}
      />

      <Link href="/Contact" prefetch={false}></Link>
      {/* backbutton */}
      {!(
        ["Buy", "Rent"].includes(splitpath[2]) && splitpath[3] == undefined
      ) && (
        <button
          className="group bg-theme flex items-center justify-center p-1 h-10 lg:h-8 absolute top-full lg:bottom-0 translate-y-2 lg:-translate-y-10 left-[10px] md:left-11 rounded-full overflow-hidden"
          onClick={() => {
            window.history.back();
          }}
          aria-label="Cancel"
          title="Cancel"
        >
          <span className="h-8 lg:h-6 aspect-square rounded-full bg-white text-theme grid place-content-center">
            <IoMdArrowRoundBack />
          </span>
          <span className="text-white opacity-0 text-sm  max-w-0 lg:group-hover:opacity-100 lg:group-hover:max-w-20 lg:group-hover:px-3 whitespace-nowrap transition-all duration-300 ease-in-out">
            Back
          </span>
        </button>
      )}
    </nav>
  );
}

export const Cartlink = () => {
  const { cart, location } = AppContextfn();
  const cartitems = Object.values(cart).filter((item) => item.added);
  const totalQuantity = cartitems.reduce(
    (total, value) => total + value.quantity,
    0
  );

  return (
    <div className="hidden md:block group relative h-full aspect-square z-20">
      <Link
        href="/cart"
        className="h-full w-full flex items-center justify-center"
        prefetch={false}
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
        <div className="absolute top-full right-0  w-[500px] translate-x-[50px] rounded-lg bg-bg1  flex  flex-col items-center  p-3 shadow-lg">
          <span className="absolute top-0 right-[65px] -translate-y-1/2 rotate-45 w-4 aspect-square bg-bg1"></span>
          {totalQuantity > 0 ? (
            <>
              <div
                className={`w-full text-xs flex flex-col max-h-80  overflow-y-scroll ${
                  totalQuantity < 3 && "hidescroll"
                }`}
              >
                {Object.values(cartitems).map((item, i) => {
                  const finaltenure = selectedtenure(item, location?.location);
                  const totalprice = finaltenure?.price;
                  return (
                    <Link
                      key={i}
                      href={item?.productlink}
                      className="flex gap-2 border-b p-2 bg-white"
                      prefetch={false}
                    >
                      <Nextimage
                        className="min-w-[100px] aspect-square rounded-sm object-cover bg-blend-multiply"
                        src={item?.image}
                        alt={item?.name}
                        quality={10}
                        width={100}
                        height={100}
                      ></Nextimage>
                      <div className="flex flex-col">
                        <h3 className="line-clamp-2 text-sm  font-semibold">
                          {item?.name}
                        </h3>
                        {/* price */}
                        {item?.isrentalstore ? (
                          <>
                            <p>
                              Rent: ₹
                              {(totalprice * item?.quantity).toLocaleString(
                                "en-IN"
                              )}
                              {"/-"}
                            </p>
                            <p>
                              Security Deposit : ₹
                              {(
                                item?.securitydeposit * item?.quantity
                              ).toLocaleString("en-IN")}
                              {"/-"}
                            </p>
                            <p>
                              Total : ₹
                              {(
                                totalprice * item?.quantity +
                                item?.securitydeposit * item?.quantity
                              ).toLocaleString("en-IN")}
                              {"/-"}
                            </p>
                          </>
                        ) : (
                          <>
                            <p>
                              Price: ₹
                              {(item?.buyprice * item?.quantity).toLocaleString(
                                "en-IN"
                              )}
                              {"/-"}
                            </p>
                          </>
                        )}
                        <div className="flex gap-10 mt-auto">
                          <div>
                            <span className="text-slate-400">Quantity : </span>
                            <span>{item?.quantity}</span>
                          </div>
                          <div className="text-theme font-bold">
                            {item?.isrentalstore ? "Rent" : "Buy"}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <Link
                href="/cart"
                prefetch={false}
                className="bg-theme text-white flex items-center justify-center gap-3 w-fit px-5 py-1 rounded-full text-sm  font-semibold mt-3"
              >
                Go to Cart <FaOpencart />
              </Link>
            </>
          ) : (
            <div className="flex items-center px-5">
              <Nextimage
                src="/no-cart.png"
                alt="Empty cart image"
                height={100}
                width={100}
                className="w-[100px]"
              ></Nextimage>
              <p className="text-sm  text-center">
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
