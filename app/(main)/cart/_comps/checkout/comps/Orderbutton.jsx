"use client";
import React from "react";
import { IoShieldCheckmark } from "react-icons/io5";
import { SiRazorpay } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { Usecartcontext } from "../../../Cartcontext";

function Orderbutton() {
  const { Order, paymentMethod } = Usecartcontext();
  return (
    <button
      className={`relative w-full flex items-center justify-center gap-2  py-3 rounded-md text-white font-semibold hover:shadow overflow-hidden transition-all ${
        paymentMethod
          ? "bg-theme cursor-pointer"
          : "bg-gray-300 cursor-not-allowed"
      }`}
      onClick={Order}
      aria-label="Place order"
      title="Place order"
    >
      <IoShieldCheckmark size={20} />
      Place Order
      <AnimatePresence mode="wait">
        {paymentMethod == "online" && (
          <motion.span
            initial={{ y: 60 }}
            animate={{ y: 0 }}
            exit={{ y: 60 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-1 right-2 text-[8px]"
          >
            <SiRazorpay className="text-[#105ef1] inline-block" /> powered by
            Razorpay
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export default Orderbutton;
