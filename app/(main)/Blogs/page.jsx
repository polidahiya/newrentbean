import React from "react";
import { Cachedblogs } from "@/app/_serveractions/Getcachedata";
import Image from "next/image";
import Link from "next/link";

async function page() {
  const blogs = await Cachedblogs();

  return (
    <div>
      <h2 className="text-center font-bold text-[25px] md:text-[35px]  font-recline mt-[20px]">
        Blogs
      </h2>
      <section
        className={`min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-110px)] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] place-items-center gap-[20px] p-[20px]`}
      >
        {blogs?.map((blog, i) => {
          const mainHeading = blog?.blogdata?.find(
            (item) => item.type === "mainheading"
          )?.content;
          const firstImage =
            blog?.blogdata?.find((item) => item.type === "image")?.content ||
            "/images/noblogimage.jpg";

          return (
            <Link
              href={"/Blogs/" + blog?._id}
              key={i}
              className="group relative w-full md:max-w-[300px] bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  className="rounded-t-lg w-full aspect-[4/3] object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  src={firstImage}
                  height={300}
                  width={300}
                  alt="Blog Image"
                  
                />
              </div>
              <div className="p-4">
                <p className="text-lg font-semibold text-slate-700 line-clamp-2 mb-2">
                  {mainHeading}
                </p>
                <p className="text-sm font-bold text-slate-500 mb-1">
                  Last updated: {blog?.date}
                </p>
                <p className="absolute top-3 right-3 font-black bg-theme bg-clip-text text-transparent w-fit">
                  AdoreFurnix
                </p>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}

export default page;
