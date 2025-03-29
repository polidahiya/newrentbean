"use client";
import { Placeorder } from "@/app/_serveractions/Addorder";
import { AppContextfn } from "@/app/Context";
import React, { useState, useEffect } from "react";
import Products from "./Products";
import Emptycart from "./Emptycart";
import Useraddress from "./Useraddress";
import { FaOpencart } from "react-icons/fa6";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Recaptcha from "@/app/_components/_helperfunctions/Recaptcha";
import { event } from "nextjs-google-analytics";
import Showtenuremenu from "./Showtenuremenu";
import Checkout from "./Checkout";
import Razorpayidcreate from "@/app/_serveractions/_razorpay/Razorpayidcreate";
import Verifyrazorpay from "@/app/_serveractions/_razorpay/Verifyrazorpay";

export default function Page({ userdata, token }) {
  const router = useRouter();
  const {
    cart,
    setcart,
    settoggleorderplacedmenu,
    setmessagefn,
    setredirectloginlink,
    location,
    // setinstantlogin,
  } = AppContextfn();
  const [showtenure, setshowtenure] = useState({ show: false, data: {} });
  const [paymentMethod, setpaymentMethod] = useState("online");

  const cartitems = Object.entries(cart).filter(([key, item]) => item.added);
  const totalPrice = cartitems.reduce((total, [key, value]) => {
    if (value.isrentalstore) {
      const finaltenure =
        location?.location in value?.prices
          ? value?.prices[location?.location]
          : value?.prices.Default;
      const securitydeposit = value?.securitydeposit * value.quantity;
      const totalprice =
        finaltenure[value?.selectedtenure]?.price * value.quantity;
      return Number(total) + Number(totalprice) + Number(securitydeposit);
    } else {
      const totalprice = value?.buyprice * value?.quantity;
      return total + totalprice;
    }
  }, 0);

  // place order fucntion
  const Order = () => {
    const usercookie = Cookies.get("userdata");

    if (!token || !usercookie) {
      setmessagefn("Please Login");
      setredirectloginlink("/cart");
      router.push("/loginlogout");
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

    Recaptcha(
      async () => {
        const res = await Placeorder(
          cartitems,
          paymentMethod,
          totalPrice,
          location?.location || "Default"
        );
        if (res?.status == 200) {
          event("button_click", {
            category: "User Interaction",
            label: "Order placed",
            value: 1,
          });

          if (paymentMethod == "online") {
            loadRazorpay(userdata, res?.id);
          } else {
            setmessagefn(res?.message);
            ordersuccess();
          }
        } else {
          setmessagefn(res?.message);
        }
      },
      () => {
        setmessagefn("Something went wrong!");
      }
    );
  };
  // load razor pay
  const loadRazorpay = async (userdata, mongoid) => {
    const res = await Razorpayidcreate(totalPrice, "INR");
    if (res.status !== 200) {
      setmessagefn("Payment Failed!");
      return;
    }
    const order = res?.order;

    const options = {
      key: process.env.Razortpay_Key,
      amount: totalPrice, // Amount in paise
      currency: order.currency || "INR",
      name: "Rentbean",
      description: "Transaction",
      image: "/logo&ui/minlogo.png",
      order_id: order.id, // Order ID generated from your backend
      handler: async (response) => {
        const res = await Verifyrazorpay(response, mongoid);
        setmessagefn(res?.message);
        if (res?.status == 200) {
          ordersuccess();
        }
      },
      prefill: {
        name: userdata?.username,
        email: userdata?.email,
        contact: userdata?.phonenum,
      },
      theme: {
        color: "#d68e43",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response) {
      console.error("Payment failed", response.error);
    });
    paymentObject.open();
  };

  // order success

  const ordersuccess = () => {
    settoggleorderplacedmenu(true);
    Cookies.set("rentbeancart2", JSON.stringify({}), {
      expires: 7,
    });
    setcart({});
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  if (cartitems.length == 0) {
    return <Emptycart />;
  }

  return (
    <>
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
              setshowtenure={setshowtenure}
            />
          ))}
        </div>
        <Checkout
          paymentMethod={paymentMethod}
          setpaymentMethod={setpaymentMethod}
          totalPrice={totalPrice}
          Order={Order}
        />
      </div>
    </>
  );
}
