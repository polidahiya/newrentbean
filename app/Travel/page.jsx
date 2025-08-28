import React from "react";
import Sidemenu from "./_comps/Sidemenu";
import Nextimage from "../_components/Nextimage";
import { MdHotel } from "react-icons/md";
import Link from "next/link";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import Verification from "../Verifytoken";
import { Cachedtravelpackages } from "../_serveractions/Getcachedata";
import { FaTrainSubway } from "react-icons/fa6";
import Deletebutton from "./_comps/Deletebutton";
import { filterdata } from "./Traveldata";
import Packageheading from "./_comps/Packageheading";
import TravelLanding from "./Landingpage";

async function page({ searchParams }) {
  const res = await Verification();
  const isadmin = res.verified;
  const allsearchparam = await searchParams;
  const {
    Locations = "All",
    Price_Range = "All",
    Duration = "All",
  } = allsearchparam;
  const rawposts = await Cachedtravelpackages();

  const matches = (value, range) => {
    if (range === "All") return true;
    const [min, max] = range;
    return value >= min && value <= max;
  };

  const posts = rawposts.filter((item) => {
    return (
      (Locations === "All" || item.locations.includes(Locations)) &&
      matches(item.price, filterdata.Price_Range.data[Price_Range]) &&
      matches(item.duration, filterdata.Duration.data[Duration])
    );
  });

  return (
    <div className="bg-bg1">
      <TravelLanding />
      <div className="p-2 md:p-10">
        <Packageheading />
        <div className="flex gap-2 mt-5">
          <Sidemenu {...allsearchparam} />

          <div className={`w-full grid gap-2 grid-cols-1 lg:grid-cols-2 h-fit`}>
            {isadmin && (
              <Link
                href="/Travel/Add"
                className="h-40 bg-white rounded-2xl shadow-md p-3 block"
              >
                <div className="h-full w-full border border-dashed border-gray-400 flex items-center justify-center rounded-md text-2xl">
                  <MdOutlineAddCircleOutline /> Add New
                </div>
              </Link>
            )}
            {posts.map((item, i) => (
              <div className="relative min-h-40" key={i}>
                <Link
                  href={`/Travel/${item._id}`}
                  className="h-full w-full bg-white rounded-2xl shadow-md p-3 flex items-center gap-3"
                >
                  {/* Image */}
                  <Nextimage
                    src={item.images[0]}
                    alt={item.title}
                    height={200}
                    width={200}
                    className="h-full max-h-40 aspect-square lg:aspect-[2/1] object-cover rounded-lg"
                  />

                  {/* Details */}
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                        {item?.title}
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Duration:{" "}
                        <span className="font-medium text-gray-800">
                          {item?.duration}{" "}
                          {item?.duration == 1 ? "Day" : "Days"}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Locations:{" "}
                        <span className="text-gray-700">
                          {item?.locations.map((loc, locationindex) => (
                            <span key={locationindex}>
                              {loc}
                              {locationindex < item.locations.length - 1
                                ? ", "
                                : ""}
                            </span>
                          ))}
                        </span>
                      </p>
                    </div>

                    {/* Hotel Badge */}
                    <div className="flex gap-2 flex-wrap mt-2">
                      {item?.hotel.length > 0 && (
                        <span className="inline-flex items-center gap-1 w-fit px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full whitespace-nowrap">
                          <MdHotel />
                          Hotel Included
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 w-fit px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full whitespace-nowrap">
                        <FaTrainSubway />
                        Transpot facility
                      </span>
                    </div>
                  </div>
                </Link>
                {isadmin && (
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Link
                      href={`/Travel/Add?edit=${item._id}`}
                      className="px-3 py-2 text-white bg-blue-500 rounded-md"
                    >
                      Edit
                    </Link>
                    <Deletebutton item={item} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Call to Action */}
      <section className="py-20 text-center bg-orange-500 text-white">
        <h2 className="text-4xl font-bold">Ready to Explore India?</h2>
        <p className="mt-4">
          Let us help you plan your perfect Indian journey.
        </p>
        <button className="mt-6 px-6 py-3 bg-white text-orange-600 font-semibold rounded-full shadow hover:bg-gray-100">
          Contact Us
        </button>
      </section>
    </div>
  );
}

export default page;
