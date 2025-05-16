import React from "react";
import { Cachedblogs } from "@/app/_serveractions/Getcachedata";
import Nextimage from "@/app/_components/Nextimage";
import Link from "next/link";

async function page() {
  const blogs = await Cachedblogs();

  return (
    <div className="min-h-screen py-10">
      <h2 className="text-center font-bold text-[25px] md:text-[35px]  font-recline  mb-5">
        Blogs
      </h2>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5 md:px-10">
        {blogs?.map((blog, i) => {
          const mainHeading = blog?.blogdata?.find(
            (item) => item.type === "mainheading"
          )?.content;
          const firstImage =
            blog?.blogdata?.find((item) => item.type === "image")?.content ||
            "/images/noblogimage.jpg";

          return (
            <Link
              href={`/Blogs/${blog?._id}`}
              key={i}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-transparent"
            >
              <div className="relative overflow-hidden">
                <Nextimage
                  className="w-full h-auto aspect-[4/3] object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  src={firstImage}
                  height={300}
                  width={400}
                  alt="Blog Image"
                />
                <div className="absolute top-2 right-2 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-extrabold text-theme border border-theme shadow-sm">
                  Rentbean
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-slate-800 line-clamp-2">
                  {mainHeading}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  📅 Last updated: {blog?.date}
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
