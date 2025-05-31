"use client";
import React from "react";
import { AppContextfn } from "@/app/Context";
import { FaCartShopping } from "react-icons/fa6";
import { FaOpencart } from "react-icons/fa6";
import { selectedtenure } from "@/app/_components/_helperfunctions/selectedtenure";
import Link from "next/link";
import Nextimage from "@/app/_components/Nextimage";

function Cart() {
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
                  const finaltenure = selectedtenure(
                    item,
                    location?.location
                  ).selected;
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
}

export default Cart;
