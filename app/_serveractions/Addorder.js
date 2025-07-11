"use server";
import Verification from "@/app/Verifytoken";
import { getcollection } from "@/app/Mongodb";
import Ordercconfirmation from "../_mailtemplates/Ordercconfirmation";
import sendEmail from "./Sendmail";
import { v4 as uuidv4 } from "uuid";
import { selectedtenure } from "../_components/_helperfunctions/selectedtenure";
import { getYYMMDD } from "@/app/_components/_helperfunctions/Yymmdd";
import Getcart from "./Getcart";
import { cookies } from "next/headers";

export const Placeorder = async (paymentMethod) => {
  try {
    const { orderscollection, sitedata } = await getcollection();
    const tokenres = await Verification("public");

    if (!tokenres?.verified) {
      return { status: 400, message: "Please login first" };
    }

    const { cartitems, userdata, totalPrice, location, coupondata } =
      await Getcart();

    const paymentGroupId = uuidv4();
    const createdAt = new Date();

    for (let [key, product] of cartitems) {
      const updatedsitedata = await sitedata.findOneAndUpdate(
        {},
        { $inc: { orderNumber: 1 } },
        { returnDocument: "after", upsert: true }
      );

      const finalproductdata = {
        quantity: product.quantity,
        selectedtenure: product.selectedtenure,
        buyprice: product.buyprice,
        name: product.name,
        image: product.images[0],
        securitydeposit: product.securitydeposit,
        isrentalstore: key.split("-")[1] == "Rent",
        tenureStart: product.tenureStart,
        tenure: selectedtenure(product, location).selected,
      };

      let order = {
        paymentGroupId,
        orderNumber: `Rb${getYYMMDD()}-${updatedsitedata?.orderNumber}`,
        paymentMethod,
        status: 0,
        userdata,
        product: finalproductdata,
        location,
        totalPrice,
        note: "",
        createdAt: createdAt,
      };
      // add coupon data
      if (coupondata)
        order.coupondata = {
          code: coupondata?.code,
          discountType: coupondata?.discountType,
          discountValue: coupondata?.discountValue,
          share: cartitems.length,
        };
      // add payment status for online
      if (paymentMethod == "online") {
        order.paymentStatus = "pending";
      }
      await orderscollection.insertOne(order);
    }

    if (paymentMethod == "cod") {
      // update coupon usage
      if (coupondata)
        await Updatecouponusage(userdata?.email, coupondata?.code);
      // send mail
      await Send_mail_to_payment_group_id(paymentGroupId);
    }

    return {
      status: 200,
      message: "Order Placed Successfully",
      paymentGroupId,
    };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
};

export async function Send_mail_to_payment_group_id(paymentGroupId) {
  try {
    if (!paymentGroupId) return;
    const { orderscollection } = await getcollection();
    const res = await orderscollection.find({ paymentGroupId }).toArray();

    if (res?.length > 0) {
      const firstorder = res[0];
      const products = res.map((order) => order.product);
      const mailhtml = Ordercconfirmation(
        firstorder.userdata,
        firstorder.paymentGroupId,
        firstorder.createdAt,
        products,
        firstorder.paymentMethod,
        firstorder.totalPrice
      );
      sendEmail(
        "Order confirmation",
        ["rentbeandotin@gmail.com", res[0]?.userdata?.email],
        mailhtml
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export async function Clear_cart_coupon_cookies() {
  const allcookies = await cookies();
  allcookies.set("rentbeancart3", JSON.stringify({}));
  allcookies.delete("coupon");
}

export async function Updatecouponusage(email, couponCode) {
  const { userscollection } = await getcollection();
  await userscollection.updateOne(
    { email },
    {
      $inc: { [`couponusage.${couponCode}`]: 1 }, // increment the count
    }
  );
}
