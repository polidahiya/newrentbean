import React from "react";
import { boxoptions } from "@/app/commondata";
import Nextimage from "@/app/_components/Nextimage";
import { FaBoxOpen } from "react-icons/fa";

function Alongwith({ alongwith }) {
  return (
    <div className="px-10 mt-10">
      <h2 className="flex items-center gap-3 text-2xl font-semibold mb-4 text-gray-800">
        <FaBoxOpen className="text-theme text-3xl" />
        <span className="font-recline">What you get</span>
      </h2>
      <div className="flex items-stretch flex-wrap justify-center md:justify-start gap-2 ">
        {alongwith?.map((item, i) => (
          <div
            key={i}
            className="relative flex flex-col items-center justify-center w-32 border overflow-hidden rounded-md"
          >
            <Nextimage
              height={126}
              width={126}
              src={boxoptions[item]?.img}
              alt={item}
              className="hue-rotate-60"
            />
            <p className="text-sm  text-center pb-1">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alongwith;
