import React from "react";
import { CgDetailsMore } from "react-icons/cg";

function Productdesc({ description }) {
  return (
    <div className="mt-8 p-6 md:px-10">
      {/* Heading */}
      <h2 className="flex items-center gap-3 text-2xl font-semibold mb-4 text-gray-800">
        <CgDetailsMore className="text-theme text-3xl" />
        <span className="font-recline">Product Details</span>
      </h2>

      {/* List of product details */}
      <ul className="space-y-3 md:pl-5">
        {description?.map((desc, i) => (
          <li
            key={i}
            className="text-gray-700 leading-relaxed text-justify"
          >
            <span className="text-theme mr-2 text-lg -translate-y-1">→</span>
            {desc}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Productdesc;
