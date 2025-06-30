import Link from "next/link";
import ApplyCoupon from "../Applycoupon";
import Paymentmethodtoggler from "./comps/Paymentmethodtoggler";
import Orderbutton from "./comps/Orderbutton";

function Checkout({
  cartitems,
  totalPrice,
  maxcashpaymentavailable,
  coupon,
  valuebeforecoupon,
}) {
  return (
    <div className="w-full  bg-white mt-4 pt-2 pb-10 px-2 md:px-10">
      <div className="flex flex-col lg:flex-row gap-10 mt-6">
        <div className="flex-1 space-y-6">
          <h3 className="font-bold text-2xl font-recline">Checkout</h3>
          <div className="font-bold my-2 text-xl ">
            <p className="font-recline">Total payable</p>
            <p className="flex gap-2 text-2xl mt-2">
              {valuebeforecoupon && (
                <span className="block relative text-gray-400">
                  ₹{valuebeforecoupon.toLocaleString("en-IN")}/-
                  <img src="/logo&ui/linethrough.png" alt="" 
                  className="absolute top-0 left-0 w-full h-full object-contain revealfromleft"/>
                </span>
              )}
              <span>₹{totalPrice.toLocaleString("en-IN")}/-</span>
            </p>
          </div>
          <ApplyCoupon
            cartitems={cartitems}
            totalPrice={totalPrice}
            coupon={coupon}
          />
        </div>
        <div className="flex-1">
          <>
            <p className="font-bold text-xl font-recline">Payment Method</p>

            <div className="w-full flex flex-col gap-4 text-sm mt-2">
              {/* Online Payment Option */}
              <Paymentmethodtoggler
                totalPrice={totalPrice}
                maxcashpaymentavailable={maxcashpaymentavailable}
              />
              {totalPrice > maxcashpaymentavailable && (
                <p className="text-xs  opacity-75">
                  * COD is available only for orders below ₹
                  {maxcashpaymentavailable}
                </p>
              )}
            </div>
          </>
          {/* Terms and Place Order Section */}
          <div className="flex flex-col items-center md:items-start w-full gap-4 bg-white rounded-md mt-6">
            <Orderbutton />
            <p className="text-xs w-full text-gray-600 text-center">
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
