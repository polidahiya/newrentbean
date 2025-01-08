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
    setredirectloginlink,
    // setinstantlogin,
  } = AppContextfn();
  const [showtenure, setshowtenure] = useState({ show: false, data: {} });
  const [showpaymentform, setshowpaymentform] = useState(false);
  const [orderid, setorderid] = useState("");

  const cartitems = Object.entries(cart).filter(([key, item]) => item.added);
  const totalQuantity = cartitems.reduce(
    (total, value) => total + value.quantity,
    0
  );

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
      Cookies.set("rentbeancart", JSON.stringify({}), {
        expires: 7,
      });
      setcart({});
    }

    if (orderstatus == "failed") setmessagefn("Order Failed!");
  }, []);

  if (cartitems.length == 0) {
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
      {showtenure?.show && (
        <Showtenuremenu showtenure={showtenure} setshowtenure={setshowtenure} />
      )}
      <div className="p-2 md:px-10 bg-bg1">
        <div className="flex items-center justify-center gap-[10px] text-xl md:text-2xl font-bold font-recline py-5">
          Cart
          <FaOpencart />
        </div>
        {userdata && <Useraddress userdata={userdata} />}
        {/* products */}
        <div className={`bg-white  ${userdata && "mt-5"}`}>
          {cartitems.map(([key, item], i) => (
            <Products
              key={i + new Date().getMilliseconds()}
              item={item}
              cartproductid={key}
              i={i}
            />
          ))}
        </div>
        {/* price details */}
        {/* <Pricedetails
          cartlength={cartlength}
          totalprice={totalprice}
          totaldiscount={totaldiscount}
        /> */}
        <div className="flex items-center w-full gap-5 bg-white  p-2 mt-5">
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
    </>
  );
}

const Showtenuremenu = ({ showtenure, setshowtenure }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-screen w-full flex items-center justify-center p-5 md:px-28 md:py-10 z-50`}
    >
      <div
        className={`relative h-full w-full  flex flex-col items-center justify-between p-[20px] gap-[20px] bg-white z-10`}
      >
        <h2 className="text-xl font-semibold font-recline whitespace-nowrap mt-5 tracking-widest">
          🌍 Select your location
        </h2>
        <div className="w-full flex items-center justify-center flex-wrap gap-5">
          {showtenure?.map((item, i) => {
            return (
              <button
                key={i}
                onClick={() =>
                  setshowtenure(() => ({ show: false, location: item }))
                }
                className={`flex items-center justify-center w-32 aspect-[2/1] border rounded-lg lg:hover:scale-110 lg:hover:shadow-lg lg:hover:border-none duration-200  ${
                  location.location == item
                    ? "bg-theme text-white"
                    : "bg-white text-theme border"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
        <p className=" w-[90%] text-center text-[8px] md:text-[12px]">
          We apologize if you couldn&#39;t find your location right now. Our
          site is always evolving to serve you better. In the meantime, feel
          free to explore what we have to offer, and remember, you&#39;re always
          welcome here, no matter where you&#39;re from.
        </p>
        {/* close button */}

        <button
          className="absolute right-0 top-0 h-[50px] aspect-square  bg-white z-10 lg:hover:bg-theme lg:hover:text-white"
          onClick={() => setshowtenure((pre) => ({ ...pre, show: false }))}
        >
          X
        </button>
      </div>
      <button
        className="absolute top-0 left-0 h-full w-full cursor-auto -z-10 bg-black bg-opacity-30"
        onClick={() => setshowtenure((pre) => ({ ...pre, show: false }))}
      ></button>
    </div>
  );
};
