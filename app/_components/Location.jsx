"use client";
import React from "react";
import { AppContextfn } from "../Context";
import { cities, citiesAndLocations } from "../commondata";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

function Location() {
  const { location, setlocation } = AppContextfn();
  const path = usePathname();
  const router = useRouter();

  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const queryString = query ? `?${query}` : "";

  if (location?.show || location?.location == null)
    return (
      <div
        className={`fixed top-0 left-0 h-screen w-full flex items-center justify-center p-5 md:px-28 md:py-10 z-50`}
      >
        <div
          className={`relative h-full w-full  flex flex-col items-center justify-between p-5 gap-5 bg-white z-10`}
        >
          <h3 className="text-xl font-semibold font-recline whitespace-nowrap mt-5 tracking-widest">
            🌍 Select your location {"("}India{")"}
          </h3>
          <div className="w-full flex flex-col md:flex-row md:items-center justify-center flex-wrap gap-5">
            {cities?.map((item, i) => {
              return (
                <Link
                  key={i}
                  href={`/${item}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const matchedCity = cities.find((city) =>
                      path.includes(`${city}`)
                    );
                    if (matchedCity) {
                      const updatedUrl =
                        path.replace(`${matchedCity}`, item) + queryString;
                      router.push(updatedUrl);
                    } else {
                      const matchedLocation = citiesAndLocations.find(
                        (location) => path.includes(`${location}`)
                      );
                      if (matchedLocation) {
                        const updatedUrl =
                          path.replace(`${matchedLocation}`, item) +
                          queryString;
                        router.push(updatedUrl);
                      } else {
                        router.refresh();
                      }
                    }

                    setlocation(() => ({ show: false, location: item }));
                  }}
                  className={`flex items-center justify-center w-full h-12 md:h-auto md:w-32 md:aspect-[2/1] border rounded-lg lg:hover:scale-110 lg:hover:shadow-lg lg:hover:border-none duration-200  ${
                    location?.location == item
                      ? "bg-theme text-white"
                      : "bg-white text-theme border"
                  }`}
                >
                  {item}
                </Link>
              );
            })}
          </div>
          <p className=" w-[90%] text-center text-[8px] md:text-[12px]">
            We apologize if you couldn&#39;t find your location right now. Our
            site is always evolving to serve you better. In the meantime, feel
            free to explore what we have to offer, and remember, you&#39;re
            always welcome here, no matter where you&#39;re from.
          </p>
          {/* close button */}

          <button
            className="absolute right-0 top-0 h-[50px] aspect-square  bg-white z-10 lg:hover:bg-theme lg:hover:text-white"
            onClick={() => setlocation((pre) => ({ ...pre, show: false }))}
            aria-label="Close"
            title="Close"
          >
            X
          </button>
        </div>
        <button
          className="absolute top-0 left-0 h-full w-full cursor-auto -z-10 bg-black bg-opacity-30"
          onClick={() => setlocation((pre) => ({ ...pre, show: false }))}
          aria-label="Close"
          title="Close"
        ></button>
      </div>
    );
}

export default Location;
