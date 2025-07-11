"use client";
import React from "react";
import Nextimage from "@/app/_components/Nextimage";
import { useRouter } from "next/navigation";
import { Usecartcontext } from "../Cartcontext";
import { Clear_cart_coupon_cookies } from "@/app/_serveractions/Addorder";

function Ordersplacednotif() {
  const router = useRouter();
  const { toggleorderplacedmenu, settoggleorderplacedmenu } = Usecartcontext();
  if (toggleorderplacedmenu)
    return (
      <div className="fixed top-0 left-0 flex items-center justify-center h-full w-full bg-black/50 z-[999]">
        <div className="flex flex-col items-center justify-center  w-[300px] aspect-[4/3] bg-white rounded-[10px] ">
          <Nextimage
            src={"/orderplaced%20successfully.gif"}
            alt="order placed successfully animation"
            height={100}
            width={100}
            className="h-[100px] object-cover"
            unoptimized
          ></Nextimage>
          <p>Order placed Successfully</p>
          <button
            className="bg-green-500 px-[30px] py-[5px] text-white rounded-[5px] my-[20px]"
            onClick={async () => {
              await Clear_cart_coupon_cookies();
              settoggleorderplacedmenu(false);
              router.replace("/");
            }}
            aria-label="ok"
            title="ok"
          >
            Ok
          </button>
        </div>
      </div>
    );
}

export default Ordersplacednotif;
