"use client";
import React from "react";
import { AppContextfn } from "../Context";
import { cities, citiesAndLocations } from "../commondata";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Nextimage from "./Nextimage";
import { motion, AnimatePresence } from "framer-motion";

function Location() {
  const Locationimages = {
    Delhi: "/logo&ui/locationimages/Delhi.jpg",
    Noida: "/logo&ui/locationimages/Noida.jpg",
    Greater_Noida: "/logo&ui/locationimages/Greaternoida.jpg",
    Gurgaon: "/logo&ui/locationimages/Gurgaon.jpg",
    Ghaziabad: "/logo&ui/locationimages/Ghaziabad.jpg",
    Faridabad: "/logo&ui/locationimages/Faridabad.jpg",
  };
  const { location, setlocation } = AppContextfn();
  const path = usePathname();
  const router = useRouter();

  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const queryString = query ? `?${query}` : "";

  return (
    <AnimatePresence mode="wait">
      {(location?.show || location?.location == null) && (
        <motion.div
          initial={{ opacity: Number(0) }}
          animate={{ opacity: 1 }}
          exit={{ opacity: Number(0) }}
          transition={{ duration: 0.5 }}
          className={`fixed top-0 left-0 h-screen w-full flex items-center justify-center md:px-28 md:py-10 z-50`}
        >
          <motion.div
            initial={{ opacity: Number(0), y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: Number(0), y: 50 }}
            transition={{ duration: 0.5 }}
            className={`relative h-full w-full  flex flex-col items-center justify-between p-5 gap-5 bg-white z-10`}
          >
            <h3 className="text-xl font-semibold font-recline whitespace-nowrap mt-5 tracking-widest">
              🌍 Select your location {"("}India{")"}
            </h3>
            <div className="w-full flex flex-col md:flex-row md:items-center justify-center flex-wrap gap-5">
              {cities?.map((item, i) => {
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: Number(0), scale: 0.9, y: 30 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: i * 0.1 + 0.6,
                      type: "spring",
                      stiffness: 120,
                      damping: 12,
                      mass: 0.5,
                    }}
                  >
                    <Link
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
                      className={`relative flex items-center justify-center gap-2 w-full h-12 md:h-auto lg:w-fit pl-4 pr-8 py-3 border rounded-lg lg:hover:scale-110 lg:hover:shadow-lg lg:hover:border-transparent duration-200  ${
                        location?.location == item
                          ? "bg-theme text-white"
                          : "bg-white text-theme border"
                      }`}
                    >
                      <Nextimage
                        src={Locationimages[item]}
                        alt={item}
                        className={`absolute top-1/2 -translate-y-1/2 lg:translate-y-0 left-3 lg:static w-8 lg:w-12 aspect-square p-1 rounded-full bg-white`}
                        height={40}
                        width={40}
                      />
                      {item}
                    </Link>
                  </motion.div>
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

            {location?.location != null && (
              <button
                className="absolute right-0 top-0 h-[50px] aspect-square  bg-white z-10 lg:hover:bg-theme lg:hover:text-white"
                onClick={() => setlocation((pre) => ({ ...pre, show: false }))}
                aria-label="Close"
                title="Close"
              >
                X
              </button>
            )}
          </motion.div>
          <button
            className="absolute top-0 left-0 h-full w-full cursor-auto -z-10 bg-black/30"
            onClick={() => setlocation((pre) => ({ ...pre, show: false }))}
            aria-label="Close"
            title="Close"
          ></button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Location;
