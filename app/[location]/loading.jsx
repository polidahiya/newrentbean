"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Loadingtile from "@/app/_components/Loading/Loadingtile";
import Loadingmobilebottomnav from "@/app/_components/Loading/Loadingmobilebottomnav";
import Loadingnav from "@/app/_components/Loading/Loadingnav";
import Productgrid from "@/app/[location]/[store]/[...Category]/_Components/Productgrid";

function loading() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const names = {
    0: <Homeui />,
    1: <Homeui />,
    2: <Homeui />,
    3: <Categoryandsubcat />,
    4: <Categoryandsubcat />,
    5: <Prodcutui />,
  };
  return (
    <div className="px-2 md:px-10 max-h-screen overflow-hidden">
      <Loadingnav />
      {names[segments.length] || names[0]}
      <Loadingmobilebottomnav />
    </div>
  );
}
const Homeui = () => {
  return (
    <>
      <div className="flex items-center md:pt-5 gap-5 overflow-hidden">
        <Loadingtile className="hidden lg:block w-[30%] aspect-[9/16] overflow-hidden" />
        <Loadingtile className="relative w-full aspect-square md:aspect-video overflow-hidden" />
        <Loadingtile className="hidden lg:block w-[30%] aspect-[9/16] overflow-hidden" />
      </div>
      {/* switch store */}
      <div className="pt-5 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 max-w-xl w-full">
          <Loadingtile className="gg">choose how you want to shop</Loadingtile>
          <Loadingtile className="gg">
            You can both rent our products for a period of time or buy them
            permanently. Switch the mode below to explore your preferred
            shopping method.
          </Loadingtile>
          <Loadingtile className="gg">Rent or Buy</Loadingtile>
          <Loadingtile className="gg">
            Currently showing: Rent listings
          </Loadingtile>
        </div>
      </div>
      {/* categories */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 mt-10">
        <Loadingtile className="w-full aspect-square"></Loadingtile>
        <Loadingtile className="w-full aspect-square"></Loadingtile>
        <Loadingtile className="w-full aspect-square"></Loadingtile>
        <Loadingtile className="w-full aspect-square"></Loadingtile>
        <Loadingtile className="w-full aspect-square"></Loadingtile>
      </div>
    </>
  );
};

const Categoryandsubcat = () => {
  return (
    <>
      <div>
        {/* subcat */}
        <div className="relative flex items-center justify-center lg:hidden">
          <div className="w-fit  flex items-center overflow-x-scroll p-2 gap-3">
            {new Array(3).fill(0).map((_, index) => (
              <div key={index} className="w-20">
                <Loadingtile className={"w-full h-20"} />
                <Loadingtile className={"w-full h-4 mt-1"} />
              </div>
            ))}
          </div>
        </div>
        {/*  heading*/}
        <div className="mt-5 flex items-center justify-between">
          <Loadingtile className={"text-3xl w-fit"}>
            event and parties
          </Loadingtile>
          <Loadingtile className={"text-3xl w-fit"}>event</Loadingtile>
        </div>
        {/* breadcrumb */}
        <div className="mt-2 flex items-center gap-2">
          <Loadingtile className={"w-fit inline-block"}>Home</Loadingtile>
          <Loadingtile className={"w-fit inline-block"}>Home</Loadingtile>
          <Loadingtile className={"w-fit inline-block"}>Home</Loadingtile>
        </div>
        <Productgrid>
          {new Array(8).fill(0).map((_, index) => (
            <Loadingtile key={index} className={"w-full aspect-[3/4.2]"} />
          ))}
        </Productgrid>
      </div>
    </>
  );
};

const Prodcutui = () => {
  return (
    <div className="relative flex flex-col lg:flex-row items-start lg:py-2 lg:pt-5  gap-5">
      <div className="w-full lg:flex-[2] lg:sticky lg:top-[120px]">
        {/* images */}
        <div className="relative flex w-full flex-col-reverse lg:flex-row lg:items-center gap-2">
          {/* mini images */}
          <div className="flex lg:w-[70px] lg:h-full lg:flex-col flex-wrap lg:flex-nowrap gap-2 lg:max-h-[400px] justify-center">
            {new Array(4).fill(0).map((_, index) => (
              <Loadingtile
                key={index}
                className={`relative w-[70px] lg:w-full aspect-square`}
              ></Loadingtile>
            ))}
          </div>
          {/* main */}
          <Loadingtile className="relative w-full h-full aspect-square md:aspect-auto md:h-96"></Loadingtile>
        </div>
        {/* breadcrumbs */}
        <div className="pt-10 opacity-70 px-2 lg:px-0 line-clamp-2 text-center lg:text-start">
          <div className="space-x-2">
            <Loadingtile className="text-xs inline-block">Home</Loadingtile>
            <Loadingtile className="text-xs inline-block">category</Loadingtile>
            <Loadingtile className="text-xs inline-block">
              sub category
            </Loadingtile>
            <Loadingtile className="text-xs inline-block">
              Poster Dining 6 Seater With Cushioned Chairs
            </Loadingtile>
          </div>
        </div>
      </div>
      {/* details */}
      <div className="flex-1 w-full lg:min-w-[400px]">
        <div className="w-full p-5">
          <Loadingtile className="text-xl md:text-2xl tracking-wider text-center mt-5">
            Poster Dining 6 Seater With Cushioned Chairs
          </Loadingtile>
          <div className="mx-7">
            <Loadingtile className="h-9 mt-5"></Loadingtile>
          </div>
          <Loadingtile className="mt-5"></Loadingtile>
          <Loadingtile className="mt-2 text-center">Choose Tenure</Loadingtile>
          <div className="flex mt-2 gap-2">
            {new Array(3).fill(0).map((_, index) => (
              <Loadingtile key={index} className="h-11 flex-1" />
            ))}
          </div>
          <Loadingtile className="mt-2 text-center">Choose Tenure</Loadingtile>
          <Loadingtile className="h-20 mt-10" />
          <div className="flex mt-5 gap-5">
            <Loadingtile className="h-12 w-28" />
            <Loadingtile className="h-12 w-full" />
          </div>
          <Loadingtile className="flex items-center justify-center gap-2 text-xs mt-5">
            truck Delivery in 1 or 2 days post KYC
          </Loadingtile>
        </div>
      </div>
    </div>
  );
};

export default loading;
