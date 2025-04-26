import React from "react";
import Link from "next/link";

function Switchstore({ filteredProduct, location, store }) {
  return (
    <div className="mt-5 flex items-center justify-center gap-1 text-sm ">
      {(filteredProduct?.availablefor == "Both" ||
        filteredProduct?.availablefor != store) && (
        <>
          <span className="text-cyan-500">
            {store == "Buy" ? "Rent this product?" : "Buy this Product?"}
          </span>
          <Link
            href={`/${location}/${store == "Buy" ? "Rent" : "Buy"}/${
              filteredProduct?.category
            }/${filteredProduct?.subcat}/${filteredProduct?._id}`}
            className="lg:hover:text-theme"
            aria-label="Switch Store"
            title="Switch Store"
          >
            Switch Store
          </Link>
        </>
      )}
    </div>
  );
}

export default Switchstore;
