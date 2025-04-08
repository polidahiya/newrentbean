import React, { useEffect } from "react";
import Link from "next/link";
import { IoShieldCheckmark } from "react-icons/io5";
import { SiRazorpay } from "react-icons/si";

function Checkout({ paymentMethod, setpaymentMethod, totalPrice, Order }) {
  const maxcashpaymentavailable = 10000;
  useEffect(() => {
    if (paymentMethod === "cod" && totalPrice >= maxcashpaymentavailable)
      setpaymentMethod("online");
  }, [totalPrice]);

  return (
    <div className="w-full flex flex-col gap-6 bg-white mt-4 p-4">
      <h3 className="font-bold mt-5 mb-2 text-xl font-recline text-center">
        Checkout
      </h3>
      <p className="font-bold my-2 text-xl font-recline">
        Total payable : ₹{totalPrice.toLocaleString("en-IN")}/-
      </p>
      {/* Section Title */}
      <span className="font-bold mt-2 text-xl font-recline">
        Payment Method
      </span>

      <div className="w-full flex flex-col gap-4 text-sm">
        {/* Online Payment Option */}
        <label
          className={`w-full md:max-w-80 flex items-center gap-4 p-4 border rounded-md cursor-pointer transition duration-300 ${
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
          className={`w-full md:max-w-80 flex items-center gap-4 p-4 border rounded-md cursor-pointer transition duration-300 ${
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
          <p className="text-sm opacity-75">
            * COD is available only for orders below ₹{maxcashpaymentavailable}
          </p>
        )}
      </div>

      {/* Terms and Place Order Section */}
      <div className="flex flex-col items-center w-full gap-4 bg-white p-4 rounded-md">
        <button
          className={`relative w-full md: max-w-96 flex items-center justify-center gap-2  py-4 md:py-3 rounded-md text-white font-semibold shadow-md transition transform hover:scale-105 ${
            paymentMethod
              ? "bg-theme cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          onClick={Order}
        >
          <IoShieldCheckmark size={20} />
          Place Order
          {paymentMethod == "online" && (
            <span className="absolute bottom-1 right-2 text-[10px]">
              <SiRazorpay className="text-[#105ef1] inline-block" /> powered by
              Razorpay
            </span>
          )}
        </button>
        <p className="text-[12px] text-gray-600 text-center">
          By placing an order, you agree to our{" "}
          <Link
            target="_blank"
            href="/Terms&Conditions"
            className="text-sky-500 hover:underline"
          >
            Terms & Conditions
          </Link>{" "}
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
            Rental Agreement
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default Checkout;
