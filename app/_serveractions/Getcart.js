"use server";
import { cookies } from "next/headers";
import { Cachedproducts } from "@/app/_serveractions/Getcachedata";
import { selectedtenure } from "@/app/_components/_helperfunctions/selectedtenure";
import { getcollection } from "../Mongodb";

export default async function Getcart() {
  try {
    const products = await Cachedproducts();
    const allcookies = await cookies();
    const rawuserdata = allcookies?.get("userdata")?.value;
    const userdata = rawuserdata ? JSON.parse(rawuserdata) : null;
    const location = allcookies?.get("rblocation")?.value;
    const store = allcookies?.get("storetype")?.value;
    const coupon = allcookies?.get("coupon")?.value;
    const rawcart = allcookies?.get("rentbeancart3")?.value;
    const cart = rawcart ? JSON.parse(rawcart) : null;
    const filteredcart = Object.entries(cart).filter(
      ([key, item]) => item.added
    );
    //
    const productMap = new Map(
      products.map((product) => [product._id, product])
    );
    const cartitems = filteredcart.map(([key, item]) => {
      const productId = key.split("-")[0];
      const productData = productMap.get(productId) || {};
      return [key, { ...item, ...productData }];
    });
    // total price
    let totalPrice = cartitems.reduce((total, [key, value]) => {
      const isrentalstore = key.split("-")[1] == "Rent";
      if (isrentalstore) {
        const securitydeposit = value?.securitydeposit * value.quantity;
        const price = selectedtenure(value, location);
        const totalprice = price?.selected?.price * value.quantity;
        return Number(total) + Number(totalprice) + Number(securitydeposit);
      } else {
        const totalprice = value?.buyprice * value?.quantity;
        return total + totalprice;
      }
    }, 0);

    // coupon
    let valuebeforecoupon = null;
    let coupondata = null;

    if (coupon) {
      const { coupons, ObjectId } = await getcollection();
      coupondata = await coupons.findOne({ _id: new ObjectId(coupon) });
      valuebeforecoupon = totalPrice;

      if (coupondata.discountType === "percentage") {
        const discount = (totalPrice * coupondata.discountValue) / 100;
        totalPrice = totalPrice - discount;
      } else if (coupondata.discountType === "fixed") {
        totalPrice = totalPrice - coupondata.discountValue;
      }
    }

    return {
      userdata,
      store,
      location,
      cartitems,
      filteredcart,
      valuebeforecoupon,
      coupondata,
      totalPrice,
    };
  } catch (error) {
    console.log(error);
    return { cartitems: [], filteredcart: [] };
  }
}
