"use server";
import Verification from "@/app/Verifytoken";
import { cookies } from "next/headers";
import { getcollection } from "@/app/Mongodb";
import Ordercconfirmation from "../_mailtemplates/Ordercconfirmation";
import sendEmail from "./Sendmail";
import { v4 as uuidv4 } from "uuid";
import { selectedtenure } from "../_components/_helperfunctions/selectedtenure";
import {getYYMMDD} from "@/app/_components/_helperfunctions/Yymmdd";

export const Placeorder = async (
  ordersdata,
  paymentMethod,
  totalPrice,
  location
) => {
  try {
    const allcookies = await cookies();

    const { orderscollection, sitedata } = await getcollection();
    const tokenres = await Verification("public");

    if (!tokenres?.verified) {
      return { status: 500, message: "Please login first" };
    }
    // cookies
    const userdata = JSON.parse(allcookies?.get("userdata")?.value);

    const paymentGroupId = uuidv4();
    const createdAt = new Date();

    for (let [key, product] of ordersdata) {
      const updatedsitedata = await sitedata.findOneAndUpdate(
        {},
        { $inc: { orderNumber: 1 } },
        { returnDocument: "after", upsert: true }
      );
      const orderNumber = `Rb${getYYMMDD()}-${updatedsitedata?.orderNumber}`;

      // deleting extras from product
      const finaltenure = selectedtenure(product, product.location).selected;
      const refined_product = { ...product, tenure: finaltenure };
      delete refined_product.prices;
      delete refined_product.added;
      delete refined_product.sku;
      delete refined_product.finaltenure;
      delete refined_product.maxquantity;
      delete refined_product.status;

      let order = {
        paymentGroupId,
        orderNumber,
        paymentMethod,
        status: 0,
        userdata,
        product: refined_product,
        location,
        totalPrice,
        note: "",
        createdAt: createdAt,
      };
      if (paymentMethod == "online") {
        order.paymentStatus = "pending";
      }
      await orderscollection.insertOne(order);
    }

    // send mail
    if (paymentMethod == "cod") {
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
    const { orderscollection } = await getcollection();
    const updatedOrders = await orderscollection
      .find({ paymentGroupId })
      .toArray();

    if (updatedOrders?.length > 0) {
      const firstorder = updatedOrders[0];
      const products = updatedOrders.map((order) => order.product);
      const mailhtml = Ordercconfirmation(
        firstorder?.userdata,
        firstorder?.paymentGroupId,
        firstorder?.createdAt,
        products,
        firstorder?.paymentMethod,
        firstorder?.totalPrice
      );
      sendEmail(
        "Order confirmation",
        ["rentbeandotin@gmail.com", updatedOrders[0]?.userdata?.email],
        mailhtml
      );
    }
  } catch (error) {
    console.log(error);
  }
}

