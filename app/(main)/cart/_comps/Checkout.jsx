import React, { useEffect } from "react";
import Link from "next/link";
import { IoShieldCheckmark } from "react-icons/io5";
import { SiRazorpay } from "react-icons/si";
import ApplyCoupon from "./Applycoupon";
import { motion, AnimatePresence } from "framer-motion";

function Checkout({cart, paymentMethod, setpaymentMethod, totalPrice, Order }) {
  const maxcashpaymentavailable = 25000;
  useEffect(() => {
    if (paymentMethod === "cod" && totalPrice >= maxcashpaymentavailable)
      setpaymentMethod("online");
  }, [totalPrice]);

  return (
    <div className="w-full  bg-white mt-4 pt-2 pb-10 px-2 md:px-10">
      <h3 className="font-bold mt-5 mb-2 text-xl font-recline text-center">
        Checkout
      </h3>
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-0 mt-6">
        <div className="flex-1">
          <p className="font-bold my-2 text-xl font-recline">
            Total payable : ₹{totalPrice.toLocaleString("en-IN")}/-
          </p>
          {/* Section Title */}
          <p className="font-bold text-xl font-recline mt-6">Payment Method</p>

          <div className="w-full flex flex-col gap-4 text-sm mt-2">
            {/* Online Payment Option */}
            <label
              className={`w-full md:md:max-w-96 flex items-center gap-4 p-4 border rounded-md cursor-pointer transition duration-300 ${
                paymentMethod === "online"
                  ? "bg-theme-light border-theme"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="online"
                checked={paymentMethod === "online"}
                onChange={() => setpaymentMethod("online")}
                className="w-5 h-5 cursor-pointer"
              />
              <span className="text-gray-700 font-medium">Pay Online</span>
            </label>

            {/* COD Option */}
            <label
              className={`w-full md:max-w-96 flex items-center gap-4 p-4 border rounded-md cursor-pointer transition duration-300 ${
                paymentMethod === "cod"
                  ? "bg-theme-light border-theme"
                  : "bg-gray-100 border-gray-300"
              } `}
            >
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setpaymentMethod("cod")}
                disabled={totalPrice >= maxcashpaymentavailable}
                className="w-5 h-5 cursor-pointer"
              />
              <span className="text-gray-700 font-medium">
                Cash on Delivery (COD)
              </span>
            </label>
            {totalPrice > maxcashpaymentavailable && (
              <p className="text-xs  opacity-75">
                * COD is available only for orders below ₹
                {maxcashpaymentavailable}
              </p>
            )}
          </div>
        </div>
        <div className="flex-1">
          <ApplyCoupon cart={cart} totalPrice={totalPrice}/>
          {/* Terms and Place Order Section */}
          <div className="flex flex-col items-center md:items-start w-full gap-4 bg-white rounded-md mt-6">
            <button
              className={`relative w-full md:max-w-96 flex items-center justify-center gap-2  py-3 rounded-md text-white font-semibold shadow-md transition transform hover:scale-105 overflow-hidden ${
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
                    <SiRazorpay className="text-[#105ef1] inline-block" />{" "}
                    powered by Razorpay
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <p className="text-xs w-full md:max-w-96 text-gray-600 text-center">
              By placing an order, you agree to our{" "}
              <Link
                target="_blank"
                href="/Terms&Conditions"
                className="text-sky-500 hover:underline"
              >
                Terms & Conditions
              </Link>
              ,{" "}
              <Link
                target="_blank"
                href="/PrivacyPolicy"
                className="text-sky-500 hover:underline"
              >
                Privacy Policies
              </Link>{" "}
              and{" "}
              <Link
                target="_blank"
                href="/rentalagreement"
                className="text-sky-500 hover:underline"
              >
                Rent Agreement
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
