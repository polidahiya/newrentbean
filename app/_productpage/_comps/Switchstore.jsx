import React from "react";
import Link from "next/link";
import { selectedtenure } from "@/app/_components/_helperfunctions/selectedtenure";
import pricemaker from "@/app/_components/_helperfunctions/pricemaker";

function Switchstore({ filteredProduct, location, store }) {
  const allprices = selectedtenure(filteredProduct, location).all;
  const lastprice = allprices[allprices.length - 1];
  const rentprice = Math.floor(lastprice.price / lastprice.time);
  const buyprice = filteredProduct?.buyprice;

  const showSwitch =
    filteredProduct?.availablefor === "Both" ||
    filteredProduct?.availablefor !== store;

  const isCurrentlyBuying = store === "Buy";

  return (
    showSwitch && (
      <div className="mt-6 flex flex-col items-center gap-2 text-sm sm:flex-row sm:justify-center">
        <span className="">
          {isCurrentlyBuying ? `Rent this product at ` : `Buy this product at `}
          <span className="text-cyan-400 font-semibold">
            {pricemaker(isCurrentlyBuying ? rentprice : buyprice)}/-
          </span>
        </span>
        <Link
          href={`/${location}/${isCurrentlyBuying ? "Rent" : "Buy"}/${
            filteredProduct?.category
          }/${filteredProduct?.subcat}/${filteredProduct?._id}`}
          className="inline-block rounded-md bg-cyan-600 px-3 py-1 text-white font-medium hover:bg-cyan-700 transition duration-200"
          aria-label="Switch Store"
          title="Switch Store"
        >
          Switch to {isCurrentlyBuying ? "Rent" : "Buy"}
        </Link>
      </div>
    )
  );
}

export default Switchstore;
