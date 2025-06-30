"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { AppContextfn } from "@/app/Context";
import { Placeorder } from "@/app/_serveractions/Addorder";
import Recaptcha from "@/app/_components/_helperfunctions/Recaptcha";
import { event } from "nextjs-google-analytics";
import Razorpayidcreate from "@/app/_serveractions/_razorpay/Razorpayidcreate";
import { useRouter } from "next/navigation";
import { selectedtenure } from "@/app/_components/_helperfunctions/selectedtenure";
import Verifyrazorpay from "@/app/_serveractions/_razorpay/Verifyrazorpay";

const Cartcontext = createContext({});
export function Cartcontextwrapper({
  maxcashpaymentavailable,
  location,
  verified,
  userdata,
  cartitems,
  totalPrice,
  children,
}) {
  const router = useRouter();
  const { setcart, setmessagefn, setredirectloginlink } = AppContextfn();
  const [toggleorderplacedmenu, settoggleorderplacedmenu] = useState(false);
  const [showtenure, setshowtenure] = useState({ show: false, data: {} });
  const [paymentMethod, setpaymentMethod] = useState("online");

  useEffect(() => {
    if (paymentMethod === "cod" && totalPrice >= maxcashpaymentavailable)
      setpaymentMethod("online");
  }, [totalPrice]);

  // place order fucntion
  const Order = () => {
    if (!verified || !userdata) {
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
        const res = await Placeorder(paymentMethod);
        if (res?.status == 200) {
          try {
            event("purchase", {
              transaction_id: res?.paymentGroupId,
              affiliation: "Online Store",
              value: totalPrice, // total value (excluding tax and shipping if desired)
              tax: 0,
              shipping: 0,
              currency: "INR",
              items: cartitems.map(([key, item]) => ({
                item_id: key,
                item_name: item?.name,
                quantity: item?.quantity,
                price:
                  key.split("-")[1] == "Rent"
                    ? selectedtenure(item, location)?.selected?.price
                    : item?.buyprice,
              })),
            });
          } catch (error) {
            console.error(error);
          }

          if (paymentMethod == "online") {
            loadRazorpay(userdata, res?.paymentGroupId);
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
  const loadRazorpay = async (userdata, paymentGroupId) => {
    const res = await Razorpayidcreate(totalPrice, "INR");
    if (res.status !== 200) {
      setmessagefn("Payment Failed!");
      return;
    }
    const order = res?.order;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: totalPrice, // Amount in paise
      currency: order.currency || "INR",
      name: "Rentbean",
      description: "Transaction",
      image: "/logo&ui/minlogo.png",
      order_id: order.id, // Order ID generated from your backend
      handler: async (response) => {
        const res = await Verifyrazorpay(response, paymentGroupId);
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
    setcart({});
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <Cartcontext.Provider
      value={{
        paymentMethod,
        setpaymentMethod,
        Order,
        showtenure,
        setshowtenure,
        toggleorderplacedmenu,
        settoggleorderplacedmenu,
      }}
    >
      {children}
    </Cartcontext.Provider>
  );
}

export function Usecartcontext() {
  return useContext(Cartcontext);
}
