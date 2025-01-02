"use client";
import { Placeorder } from "@/app/_serveractions/Addorder";
import { AppContextfn } from "@/app/Context";
import React, { useState, useEffect } from "react";
import Products from "./Products";
import PaymentPage from "./Payuform";
import Pricedetails from "./Pricedetails";
import Emptycart from "./Emptycart";
import Useraddress from "./Useraddress";
import { IoShieldCheckmark } from "react-icons/io5";
import { FaOpencart } from "react-icons/fa6";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Recaptcha from "@/app/_components/_helperfunctions/Recaptcha";
import { event } from "nextjs-google-analytics";

export default function Page({ userdata, token, orderstatus }) {
  const router = useRouter();
  const {
    cart,
    setcart,
    settoggleorderplacedmenu,
    setmessagefn,
    pincoderef,
    setredirectloginlink,
    // setinstantlogin,
  } = AppContextfn();

  const [showpaymentform, setshowpaymentform] = useState(false);
  const [orderid, setorderid] = useState("");

  let cartlength = 0;
  Object.keys(cart).forEach((item) => {
    cartlength += cart[item].quantity;
  });

  let totalprice = 0;
  let totaldiscount = 0;
  Object.keys(cart).forEach((item) => {
    const price = Number(cart[item].price);
    const beforediscount = (price / (100 - cart[item].discount)) * 100;
    const quantity = cart[item].quantity;
    totalprice += beforediscount * quantity;
    totaldiscount += (beforediscount - price) * quantity;
  });

  // place order fucntion
  const Order = () => {
    if (!token) {
      setmessagefn("Please Login");
      setredirectloginlink("/cart");
      router.push("/loginlogout");

      // history.pushState(null, "", "");
      // setinstantlogin((pre) => ({ ...pre, show: true }));
      // setTimeout(() => {
      //   setinstantlogin((pre) => ({ ...pre, effect: true }));
      // }, 350);
      // return;
    }

    const usecookie = Cookies.get("userdata");
    if (!usecookie) {
      setmessagefn("Please login first!");
      return;
    }

    if (
      userdata?.phonenum.trim() === "" ||
      userdata?.address.trim() === "" ||
      userdata?.username.trim() === ""
    ) {
      setmessagefn("Update Your Details");
      setredirectloginlink("/cart");
      router.push("/updateuserdetails");
      return;
    }

    if (!JSON.parse(usecookie).pincode) {
      setmessagefn("Please select your pincode");
      pincoderef.current.focus();
      return;
    }

    Recaptcha(
      async () => {
        const res = await Placeorder(cart);
        if (res?.status == 200) {
          event("button_click", {
            category: "User Interaction",
            label: "Order placed",
            value: 1,
          });
          setorderid(res?.id);
          setshowpaymentform(true);
        } else {
          setmessagefn(res?.message);
        }
      },
      () => {
        setmessagefn("Something went wrong!");
      }
    );
  };

  // order success
  useEffect(() => {
    if (orderstatus == "success") {
      settoggleorderplacedmenu(true);
      Cookies.set("cart", JSON.stringify({}), {
        expires: 7,
      });
      setcart({});
    }

    if (orderstatus == "failed") setmessagefn("Order Failed!");
  }, []);

  if (cartlength == 0) {
    return <Emptycart />;
  }

  return (
    <>
      {showpaymentform && (
        <PaymentPage
          orderid={orderid}
          amount={totalprice - totaldiscount}
          userdata={userdata}
          setshowpaymentform={setshowpaymentform}
        />
      )}
      <div className="p-[5px] md:p-[20px] flex flex-col lg:flex-row gap-[10px] bg-bg1 min-h-[calc(100vh-111px)]">
        <div className="w-full">
          <div className="h-[50px] flex items-center justify-center gap-[10px] text-[20px] font-bold font-recline   lg:hidden">
            Cart
            <FaOpencart />
          </div>

          {userdata && <Useraddress userdata={userdata} />}

          {/* products */}
          <div
            className={` border border-slate-300 bg-white  ${
              userdata && "mt-[10px]"
            }`}
          >
            {Object.keys(cart).map((item, i) => (
              <Products
                key={i + new Date().getMilliseconds()}
                item={item}
                i={i}
              />
            ))}

            <div className="sticky bottom-0 flex items-center w-full gap-[10px] bg-white shadow-[0px_-2px_10px_#e1e1e1] p-[10px]">
              <p className="text-[10px] md:text-[12px] text-center w-full">
                By placing an order, you agree to our{" "}
                <Link
                  href="/Terms&Conditions"
                  className="text-sky-500 hover:underline"
                >
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/PrivacyPolicy"
                  className="text-sky-500 hover:underline"
                >
                  Policies
                </Link>
              </p>
              <button
                className="flex items-center gap-[10px] px-[20px] py-[5px] border border-slate-300 rounded-[5px] bg-theme  text-white ml-auto whitespace-nowrap"
                onClick={Order}
              >
                <IoShieldCheckmark />
                Place Order
              </button>
            </div>
          </div>
        </div>
        {/* price details */}
        <Pricedetails
          cartlength={cartlength}
          totalprice={totalprice}
          totaldiscount={totaldiscount}
        />
      </div>
    </>
  );
}
