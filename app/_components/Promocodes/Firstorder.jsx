import React from "react";
import { FaTag } from "react-icons/fa";

function Firstorder() {
  return (
    <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-xl shadow-sm flex items-center justify-center text-center space-x-2">
      <FaTag className="text-yellow-600 text-lg sm:text-xl" />
      <p className="text-sm sm:text-base font-medium">
        Use the coupon code{" "}
        <span className="font-bold text-yellow-900">WELCOME500</span> on your
        first order to get a flat ₹500 off on orders above ₹5000.
      </p>
    </div>
  );
}

export default Firstorder;
