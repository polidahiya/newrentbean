import React from "react";
import Productcard from "@/app/_components/Productcard";
import { AiFillProduct } from "react-icons/ai";
import Link from "next/link";
import { LuArrowRightCircle } from "react-icons/lu";

function Similarproducts({ allproducts, category, subcat, productid }) {
  const maxproducts = 15;
  const similarproducts = allproducts
    .filter(
      (item) =>
        item.category == category &&
        item.subcat == subcat &&
        item._id != productid
    )
    .slice(0, maxproducts);

  return (
    <>
      {similarproducts.length > 0 && (
        <div className="px-2 md:px-10 py-5 mt-8">
          <h2 className="flex items-center gap-3 text-2xl font-semibold mb-4 text-gray-800">
            <AiFillProduct className="text-theme text-3xl" />
            <span className="font-recline">Similar Products</span>
          </h2>
          <div className="flex items-stretch gap-[20px]  mt-[20px] max-w-full overflow-x-scroll pb-[20px]">
            {similarproducts.map((item, i) => {
              return (
                <Productcard
                  key={i}
                  index={i}
                  id={item._id}
                  image={item?.images[0]}
                  {...item}
                  maxwidth={true}
                />
              );
            })}
            {similarproducts.length == maxproducts && (
              <div className="relative flex items-center z-20 whitespace-nowrap px-5">
                <Link
                  href={`/${category}/${subcat}`}
                  className="relative group flex items-center justify-center gap-[10px] px-6 py-3  text-white font-semibold rounded-full overflow-hidden"
                >
                  <span>View all</span>
                  <LuArrowRightCircle />
                  <div className="absolute top-0 left-0 w-[200%] h-full bg-bg1 -z-10 group-hover:translate-x-[-50%] duration-200"></div>
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
