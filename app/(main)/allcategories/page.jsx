import React from "react";
import { categorylist } from "@/app/commondata";
import Link from "next/link";
import Image from "next/image";

async function page({ params }) {
  const allparams = await params;
  const location = allparams?.location || "Delhi";
  return (
    <div className="px-2 md:px-10 py-5">
      {Object.entries(categorylist).map(([key, item], i) => (
        <div key={i}>
          <Link
            href={`/${location}/${key}`}
            className="w-full flex items-center justify-center font-recline gap-5"
          >
            <p className="font-recline text-xl tracking-wide">
              {key?.replace(/-/g, " ")}
            </p>
            <p className="font-recline text-xl tracking-wide text-theme">
              View All
            </p>
          </Link>
          <div className="flex items-center justify-center gap-5 flex-wrap mt-5 mb-10">
            {item?.subcat.map((subcat, j) => {
              return (
                <Link
                  href={`/${location}/${key}/${subcat?.name}`}
                  key={j}
                  className="flex flex-col items-center"
                >
                  <Image
                    src={subcat?.image}
                    alt={subcat?.name}
                    height={100}
                    width={100}
                    className="w-24 aspect-square object-contain"
                  ></Image>
                  <p className="text-center text-sm mt-1">
                    {subcat?.name?.replace(/-/g, " ")}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default page;
