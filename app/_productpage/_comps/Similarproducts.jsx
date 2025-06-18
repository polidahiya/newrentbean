import React from "react";
import { AiFillProduct } from "react-icons/ai";
import Link from "next/link";
import Nextimage from "@/app/_components/Nextimage";
import { selectedtenure } from "@/app/_components/_helperfunctions/selectedtenure";
import pricemaker from "@/app/_components/_helperfunctions/pricemaker";

function Similarproducts({
  allproducts,
  category,
  subcat,
  productid,
  location,
  store,
  isrentalstore,
}) {
  const maxproducts = 15;

  const similarproducts = allproducts
    .filter((item) => {
      const instore = isrentalstore
        ? ["Rent", "Both"].includes(item?.availablefor)
        : ["Buy", "Both"].includes(item?.availablefor);

      return (
        item.category == category &&
        item.subcat == subcat &&
        item._id != productid &&
        instore
      );
    })
    .slice(0, maxproducts);

  return (
    <>
      {similarproducts.length > 0 && (
        <div className="px-2 md:px-10 py-5 mt-8 bg-bg1">
          <h2 className="flex items-center gap-3 text-2xl font-semibold mb-4 text-gray-800">
            <AiFillProduct className="text-theme text-3xl" />
            <span className="font-recline">Similar Products</span>
          </h2>
          <div className="flex items-stretch gap-2 md:gap-5 mt-5 max-w-full overflow-x-scroll pb-5">
            {similarproducts.map((item, i) => {
              const tenure = selectedtenure(item, location).all;
              const lastprice = tenure[tenure.length - 1];
              const rentprice = Math.floor(lastprice.price / lastprice.time);

              return (
                <div
                  key={i}
                  className={`min-w-64 w-full md:max-w-64 p-2 flex flex-col justify-between gap-2 bg-white snap-always snap-center md:snap-start`}
                >
                  <Link
                    href={`/${location}/${store}/${category}/${subcat}/${item._id}`}
                    prefetch={false}
                  >
                    <div className="relative w-full aspect-square overflow-hidden">
                      <Nextimage
                        src={item.images[0]}
                        alt={item.name}
                        width={230}
                        height={230}
                        loading="lazy"
                        className="absolute h-full w-full object-contain"
                      />
                    </div>
                    <h2 className="text-center text-sm  md:text-base mt-5 truncate">
                      {item.name}
                    </h2>
                  </Link>
                  <div className="px-1 py-1 text-center text-theme">
                    {isrentalstore ? (
                      <>
                        Starting at {pricemaker(rentprice)}/
                        {tenure[0]?.type.replace(/s$/, "")}
                      </>
                    ) : (
                      <>
                        <span className="text-xs line-through mr-2">
                          {pricemaker(item.buymrp)}/-
                        </span>
                        {pricemaker(item.buyprice)}/-
                      </>
                    )}
                  </div>
                </div>
              );
            })}
            {similarproducts.length == maxproducts && (
              <div className="flex justify-center items-center px-20">
                <Link
                  href={`/${location}/${store}/${category}/${subcat}`}
                  className="relative group w-40 lg:w-56 aspect-[3/4] cursor-pointer"
                >
                  {/* Card 3 (Bottom) */}
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-white rounded-2xl shadow-lg transform transition-all duration-500 z-10 
          group-hover:-translate-x-6 group-hover:-rotate-6"
                  />

                  {/* Card 2 (Middle) */}
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-white rounded-2xl shadow-xl transform transition-all duration-500 z-20 
          group-hover:translate-x-6 group-hover:rotate-6"
                  />

                  {/* Card 1 (Top) */}
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl shadow-2xl transform 
          group-hover:-translate-y-2 transition-all duration-500 z-30 flex flex-col justify-center items-center"
                  >
                    <h2 className="text-2xl font-bold text-center">
                      More Like These
                    </h2>
                    <p className="mt-2 text-sm opacity-80 text-center">
                      Explore More
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Similarproducts;
