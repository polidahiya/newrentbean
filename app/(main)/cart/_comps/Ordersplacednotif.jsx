"use client";
import React from "react";
import Image from "next/image";
import { AppContextfn } from "@/app/Context";
import { useRouter } from "next/navigation";

function Ordersplacednotif() {
  const router = useRouter();
  const { toggleorderplacedmenu, settoggleorderplacedmenu } = AppContextfn();
  if (toggleorderplacedmenu)
    return (
      <div className="fixed top-0 left-0 flex items-center justify-center h-full w-full bg-black bg-opacity-[0.5] z-[999]">
        <div className="flex flex-col items-center justify-center  w-[300px] aspect-[4/3] bg-white rounded-[10px] ">
          <Image
            src={"/orderplaced%20successfully.gif"}
            alt="order placed successfully animation"
            height={100}
            width={100}
            className="h-[100px] object-cover"
            unoptimized
          ></Image>
          <p>Order placed Successfully</p>
          <button
            className="bg-green-500 px-[30px] py-[5px] text-white rounded-[5px] my-[20px]"
            onClick={() => {
              settoggleorderplacedmenu(false);
              router.replace("/");
            }}
          >
            Ok
          </button>
        </div>
      </div>
    );
}

export default Ordersplacednotif;
