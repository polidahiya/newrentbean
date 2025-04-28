import React from "react";
import { categorylist } from "@/app/commondata";
import Link from "next/link";
import Nextimage from "@/app/_components/Nextimage";

async function page({ searchParams }) {
  const { location, store } = await searchParams;

  return (
    <div className="px-2 md:px-10 py-5">
      {Object.entries(categorylist).map(([key, item], i) => (
        <div key={i}>
          <Link
            href={`/${location}/${store}/${key}`}
            prefetch={false}
            className="w-full flex items-center justify-center font-recline gap-5"
            replace
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
                  href={`/${location}/${store}/${key}/${subcat?.name}`}
                  key={j}
                  className="flex flex-col items-center"
                  prefetch={false}
                  replace
                >
                  <Nextimage
                    src={subcat?.image}
                    alt={subcat?.name}
                    height={100}
                    width={100}
                    className="w-24 aspect-square object-contain"
                  ></Nextimage>
                  <p className="text-center text-sm  mt-1">
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
