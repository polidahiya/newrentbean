import React from "react";
import Ordersplacednotif from "./_comps/Ordersplacednotif";
import { Cartcontextwrapper } from "./Cartcontext";
import Showtenuremenu from "./_comps/tenuremenu/Showtenuremenu";
import { FaOpencart } from "react-icons/fa6";
import Useraddress from "./_comps/Useraddress";
import Products from "./_comps/products/Products";
import Checkout from "./_comps/checkout/Checkout";
import Emptycart from "./_comps/Emptycart";
import Getcart from "@/app/_serveractions/Getcart";
import Verification from "@/app/Verifytoken";

async function page() {
  const { verified } = await Verification("public");
  const {
    userdata,
    location,
    cartitems,
    valuebeforecoupon,
    coupondata,
    totalPrice,
  } = await Getcart();

  const maxcashpaymentavailable = 25000;

  if (cartitems.length == 0) {
    return <Emptycart />;
  }

  return (
    <Cartcontextwrapper
      verified={verified}
      userdata={userdata}
      location={location}
      totalPrice={totalPrice}
      cartitems={cartitems}
      maxcashpaymentavailable={maxcashpaymentavailable}
    >
      <div className="p-2 md:px-10 bg-bg1">
        <div className="flex items-center justify-center gap-2 text-xl md:text-2xl font-bold font-recline py-5">
          Cart
          <FaOpencart />
        </div>
        {verified && userdata && <Useraddress userdata={userdata} />}
        {/* products */}
        <div className={`bg-white  ${userdata && "mt-5"}`}>
          {cartitems.map(([key, item], i) => (
            <Products
              key={i}
              item={item}
              cartproductid={key}
              location={location}
              i={i}
            />
          ))}
        </div>
        <Checkout
          cartitems={cartitems}
          totalPrice={totalPrice}
          maxcashpaymentavailable={maxcashpaymentavailable}
          coupon={coupondata?.code}
          valuebeforecoupon={valuebeforecoupon}
        />
      </div>
      <Ordersplacednotif />
      <Showtenuremenu />
    </Cartcontextwrapper>
  );
}

export default page;
