import React from "react";
import Link from "next/link";
import TravelForm from "./_comps/Form";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { unstable_cache } from "next/cache";
import { getcollection } from "@/app/Mongodb";
import { CACHE_TIME } from "@/app/commondata";
import Nextimage from "@/app/_components/Nextimage";
import DeviceDetector from "@/app/_components/_helperfunctions/Devicedetector";
import Verification from "@/app/Verifytoken";

const imagesize = {
  mobile: {
    height: 300,
    width: 400,
  },
  tablet: {
    height: 400,
    width: 600,
  },
  desktop: {
    height: 600,
    width: 800,
  },
};

async function page({ params }) {
  const res = await Verification();
  const isadmin = res.verified;

  const device = await DeviceDetector();
  const { package: id } = await params;

  const getposts = unstable_cache(
    async () => {
      try {
        const { travelpackages, ObjectId } = await getcollection();
        const posts = await travelpackages.findOne({ _id: new ObjectId(id) });
        posts._id = posts._id.toString();
        return posts;
      } catch (error) {
        console.log(error);
        return {};
      }
    },
    [`travelpackages-${id}`],
    { revalidate: CACHE_TIME, tags: [`travelpackages-${id}`] }
  );

  const data = await getposts();

  const converter = new QuillDeltaToHtmlConverter(data?.delta, {});
  const html = converter.convert();
  return (
    <div className="">
      <Nextimage
        src={data?.images[0]}
        alt={data?.title}
        height={imagesize[device].height}
        width={imagesize[device].width}
        className="w-full h-96 object-cover brightness-50"
      />
      <div className="flex flex-col lg:flex-row px-2 md:px-10 gap-5 py-10">
        {/* main */}
        <main className="w-full lg:w-1/2">
          {/* top links */}
          <div className="flex gap-2 sticky top-16 z-20 py-2">
            <Link
              href="#timeline"
              className="flex-1 py-2 text-center rounded-full  bg-white shadow-md"
            >
              Timeline
            </Link>
            <Link
              href="#Details"
              className="flex-1 py-2 text-center rounded-full  bg-white shadow-md"
            >
              Details
            </Link>
            <Link
              href="#hoteldetails"
              className="flex-1 py-2 text-center rounded-full  bg-white shadow-md"
            >
              Hotel
            </Link>
            <Link
              href="#description"
              className="flex-1 py-2 text-center rounded-full  bg-white shadow-md"
            >
              Description
            </Link>
          </div>
          <div id="timeline">
            <h2 className="text-3xl font-semibold py-5 ml-14">Timeline</h2>
            <div className="relative overflow-hidden flex flex-col gap-5 py-5">
              <div className="absolute left-[121px] top-0 w-0.5 h-full bg-theme"></div>
              {data.timeline.map((item, i) => (
                <div key={i} className="px-1">
                  <div className="relative ml-40 p-5 rounded-3xl drop-shadow-lg bg-white">
                    <div className="absolute -left-14 top-10 w-7 aspect-square bg-theme rounded-full">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 aspect-square bg-white rounded-full"></div>
                    </div>
                    <div className="w-6 aspect-square bg-white absolute top-10 left-0 -translate-x-1/2 rotate-45"></div>
                    <div className="absolute -left-40 top-10 w-20 py-2 rounded-3xl bg-white text-center -translate-y-2">
                      Day {i + 1}
                    </div>
                    <h3 className="text-2xl text-theme font-medium font-recline">
                      {item?.title}
                    </h3>
                    <p>{item?.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* include and exclued table */}
          <div className="py-6 mt-10" id="Details">
            <h2 className="text-3xl font-semibold mb-4 text-center">
              What’s Included / Excluded
            </h2>
            <div className="overflow-x-auto shadow-md rounded-3xl">
              <table className="w-full text-center">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="w-1/2 p-3 text-gray-700 font-semibold border-b text-center text-xl">
                      Included
                    </th>
                    <th className="w-1/2 p-3 text-gray-700 font-semibold border-b text-center text-xl">
                      Excluded
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from(
                    {
                      length: Math.max(
                        data.included.length,
                        data.excluded.length
                      ),
                    },
                    (_, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="p-3 border-b text-gray-600">
                          {data.included[i] || ""}
                        </td>
                        <td className="p-3 border-b text-gray-600">
                          {data.excluded[i] || ""}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* hotel table */}
          <div className="py-6 mt-10" id="hoteldetails">
            <h2 className="text-3xl font-semibold mb-4 text-center">Hotels</h2>
            <div className="overflow-x-auto shadow-md rounded-3xl">
              <table className="w-full text-center">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="w-1/3 p-3 text-gray-700 font-semibold border-b text-center text-xl">
                      Type
                    </th>
                    <th className="w-1/3 p-3 text-gray-700 font-semibold border-b text-center text-xl">
                      Hotel
                    </th>
                    <th className="w-1/3 p-3 text-gray-700 font-semibold border-b text-center text-xl">
                      Pricing
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.hotel.map((item, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="p-3 border-b text-gray-600">
                        {item.type}
                      </td>
                      <td className="p-3 border-b text-gray-600">
                        {item.hotels}
                      </td>
                      <td className="p-3 border-b text-gray-600">
                        {item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div
            id="description"
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
        </main>
        {/* form */}
        <div className="w-full lg:w-1/2 h-fit lg:sticky lg:top-16">
          <TravelForm />
        </div>
      </div>
      {isadmin && (
        <Link
          href={`/Travel/Add?edit=${id}`}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 py-2 px-5 rounded-full bg-theme text-white"
          id="back"
        >
          Edit
        </Link>
      )}
    </div>
  );
}

export default page;
