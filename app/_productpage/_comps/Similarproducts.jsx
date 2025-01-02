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
        <div className="bg-[#f7f7fa] px-[10px] md:px-[40px] py-[20px]">
          <h2 className="flex items-center gap-[10px] text-[22px] font-bold text-center md:text-start w-full">
            <AiFillProduct /> Similar Products
          </h2>
          <div className="flex items-stretch gap-[20px]  mt-[20px] max-w-full overflow-x-scroll pb-[20px]">
            {similarproducts.map((item, i) => {
              return (
                <div
                  key={i}
                  className="min-w-[250px] md:min-w-[300px] max-w-[350px]  shadow-md  overflow-hidden bg-white"
                >
                  <Productcard
                    index={i}
                    id={item._id}
                    image={item.colorpalets[0].images[0]}
                    {...item}
                  />
                </div>
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
