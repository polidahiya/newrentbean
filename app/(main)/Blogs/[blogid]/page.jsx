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
        <div className="md:mt-4 flex justify-center">
          <Link
            href="/Blogs"
            className="flex items-center justify-center gap-1 w-fit px-6 py-1 text-white bg-theme font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out whitespace-nowrap"
          >
            Show more <FaArrowAltCircleRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

export const generateMetadata = async ({ params }) => {
  const blogs = await Cachedblogs();
  const blog = blogs?.filter((item) => item._id == params?.blogid)[0];
  const mainheading = blog?.blogdata?.filter(
    (item) => item?.type == "mainheading"
  );
  const para = blog?.blogdata?.filter((item) => item?.type == "paragraph");
  const Images = blog?.blogdata?.filter((item) => item?.type == "image");
  const rentalKeywords = [
    `renting,
    rental services,
    rent online,
    rental platform,
    rental marketplace,
    rent vs buy,
    renting benefits,
    best rental deals,
    affordable rentals,
    online rental store,
    rental business`,
    `electronics rental,
    rent laptops,
    rent gadgets,
    rent smartphones,
    rent gaming consoles,
    rent appliances,
    rent projectors,
    IT equipment rental,
    tech rental services`,
    `furniture rental,
    rent home furniture,
    office furniture rental,
    rent sofas,
    rent beds,
    rent tables,
    rent chairs,
    short-term furniture rental,
    home decor rental`,
    `event rentals,
    rent speakers,
    rent party equipment,
    rent decorations,
    rent DJ setup,
    wedding rentals,
    photography equipment rental,
    rent stage equipment`,
    `fitness equipment rental,
    rent treadmill,
    rent exercise bike,
    rent home gym,
    rent sports gear,
    rent camping equipment,
    adventure gear rental`,
    `appliance rental,
    rent refrigerator,
    rent washing machine,
    rent microwave,
    rent air conditioner,
    home essentials rental`,
    `best rental services,
    why rent instead of buy,
    top rental websites,
    how to rent online,
    cheap rental options,
    benefits of renting,
    renting tips and tricks,
    rental guide`,
  ];

  return {
    title: mainheading[0]?.content,
    description: para[0]?.content,
    keywords:
      rentalKeywords[Math.floor(Math.random() * (rentalKeywords.length - 1))] +
      "Rent, Rentbean, Rentmojo , furlenco , Electronics on rent , furniture on rent , treadmill on rent , mobile on rent , laptop on rent",
    openGraph: {
      images: Images[0]?.content,
    },
  };
};

export default page;
