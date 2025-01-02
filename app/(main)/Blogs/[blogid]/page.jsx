import React from "react";
import { Cachedblogs } from "@/app/_serveractions/Getcachedata";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import Link from "next/link";
import Image from "next/image";

async function page({ params }) {
  const blogs = await Cachedblogs();
  const blog = blogs?.filter((item) => item._id == params?.blogid)[0];

  return (
    <div className="flex flex-col md:flex-row gap-6 min-h-screen px-6 md:px-12">
      <div className="flex-[2] mb-5 mt-9 lg:mt-0">
        {blog.blogdata.map((item, i) => {
          switch (item?.type) {
            case "mainheading":
              return (
                <h1
                  key={i}
                  className="text-[32px] font-extrabold my-4 font-recline  tracking-wide "
                >
                  {item?.content}
                  {i == 0 && (
                    <span className="flex items-center gap-2 text-[14px] font-normal mt-3 ml-3 text-gray-500">
                      <SlCalender />
                      <span>{blog?.date}</span>
                    </span>
                  )}
                </h1>
              );
            case "heading":
            case "paragraph":
            case "list":
              return (
                <div
                  key={i}
                  className={`my-2 text-justify ${
                    item?.type == "heading"
                      ? "text-[22px] font-semibold"
                      : "text-[16px]"
                  }`}
                >
                  {item?.type == "list" && (
                    <MdOutlineArrowRightAlt className="inline-block text-indigo-500" />
                  )}
                  {item?.content}
                </div>
              );
            case "image":
              let image;
              if (item?.content instanceof File) image = item?.preview;
              else image = item?.content;
              return (
                <Image
                  key={i}
                  src={image}
                  height={300}
                  width={400}
                  loading="lazy"
                  alt="furniture blog"
                  
                  className="w-full md:max-w-[60%] aspect-video object-cover object-center rounded-lg shadow-md mb-4 bg-bg1"
                />
              );
            default:
              return null;
          }
        })}
      </div>
      <Showblogs blogs={blogs?.filter((item) => item._id != params?.blogid)} />
    </div>
  );
}

function Showblogs({ blogs }) {
  return (
    <div className="flex-1 py-2 w-full mt-6">
      <h1 className="text-[25px] font-bold flex items-center justify-center gap-2">
        More Blogs
      </h1>
      <div className="flex flex-row md:flex-col items-center gap-2 mt-2 overflow-x-scroll w-full py-5">
        {blogs.slice(0, 10).map((blog, i) => {
          const mainHeading = blog?.blogdata?.find(
            (item) => item.type === "mainheading"
          )?.content;
          const firstImage = blog?.blogdata?.find(
            (item) => item.type === "image"
          )?.content;

          return (
            <Link
              href={"/Blogs/" + blog?._id}
              key={i}
              className="group rounded-xl shadow-md p-2 min-w-64 md:min-w-full"
            >
              <Image
                className="w-full aspect-video rounded-md object-cover object-center bg-bg1"
                height={300}
                width={500}
                src={firstImage}
                alt={`Blog image ${i + 1}`} // Add descriptive alt text
                
              />
              <p className="mt-1 line-clamp-2">{mainHeading}</p>
            </Link>
          );
        })}
        <center className="md:mt-4">
          <Link
            href="/Blogs"
            className="flex items-center justify-center gap-1 w-fit px-6 py-1 text-white bg-theme font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out whitespace-nowrap"
          >
            Show more <FaArrowAltCircleRight />
          </Link>
        </center>
      </div>
    </div>
  );
}

export default page;
