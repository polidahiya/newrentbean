import React from "react";
import { Cachedblogs } from "@/app/_serveractions/Getcachedata";
import Nextimage from "@/app/_components/Nextimage";
import Link from "next/link";

async function Blogscomp() {
  const blogs = await Cachedblogs();

  return (
    <div className="py-10">
      <div className="text-center mb-10">
        <Link
          href="/Blogs"
          prefetch={false}
          className="text-3xl md:text-4xl font-extrabold font-recline hover:text-theme transition-colors"
          title="More Blogs"
        >
          Blogs
        </Link>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Discover stories, tips, and insights from our latest blog posts.
        </p>
      </div>

      <section className="px-4 md:px-8 lg:px-16 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogs?.slice(0, 3).map((blog, i) => {
          const mainHeading = blog?.blogdata?.find(
            (item) => item.type === "mainheading"
          )?.content;

          const firstImage =
            blog?.blogdata?.find((item) => item.type === "image")?.content ||
            "/images/noblogimage.jpg";

          const paragraphs = blog?.blogdata
            ?.filter((item) => item.type === "paragraph")
            ?.slice(0, 2);

          return (
            <div
              key={i}
              className="flex flex-col shadow-md rounded-xl overflow-hidden bg-white"
            >
              <Nextimage
                src={firstImage}
                alt="Blog Image"
                className="w-full h-52 object-cover bg-bg1"
                loading="lazy"
                height={208}
                width={400}
                quality={20}
              />

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-semibold mb-1 line-clamp-2">
                  {mainHeading}
                </h3>
                <p className="text-sm font-semibold mb-3">📅 {blog?.date}</p>
                <div className="flex-1">
                  {paragraphs?.map((item, j) => (
                    <p
                      key={j}
                      className="text-sm mb-3 line-clamp-3"
                    >
                      {item.content}
                    </p>
                  ))}
                </div>

                <Link
                  href={`/Blogs/${blog?._id}`}
                  prefetch={false}
                  className="mt-auto inline-block text-cyan-500 text-sm text-center font-medium py-2 px-4 rounded-full transition-colors"
                >
                  Read more
                </Link>
              </div>
            </div>
          );
        })}
      </section>

      <div className="flex justify-center mt-10">
        <Link
          href="/Blogs"
          className="bg-theme text-white hover:bg-opacity-90 flex items-center gap-2 py-2 px-6 rounded-full text-sm font-semibold shadow-md transition"
          prefetch={false}
        >
          View All Blogs
        </Link>
      </div>
    </div>
  );
}

export default Blogscomp;
