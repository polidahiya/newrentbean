"use client";
import React from "react";
import Nextimage from "@/app/_components/Nextimage";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function Productnotfound({ location, store, category, subcat }) {
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const queryString = query ? `?${query}` : "";
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <Nextimage
        className="brightness-110"
        src="/logo&ui/product_not_found.jpeg"
        alt="no product found image"
        width={300}
        height={300}
      ></Nextimage>
      <div>
        <span className="text-cyan-500">No products to {store} - </span>
        <Link
          href={`/${location}/${store == "Buy" ? "Rent" : "Buy"}/${category}${
            subcat ? `/${subcat}` : ""
          }${queryString}`}
          className="lg:hover:text-theme"
          aria-label="Switch Store"
          title="Switch Store"
        >
          Switch to {store == "Buy" ? "Rent" : "Buy"} store
        </Link>
      </div>
    </div>
  );
}

export default Productnotfound;
