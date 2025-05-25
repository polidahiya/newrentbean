"use server";
import Verification from "@/app/Verifytoken";
import { cookies } from "next/headers";
import { getcollection } from "@/app/Mongodb";
import Ordercconfirmation from "../_mailtemplates/Ordercconfirmation";
import sendEmail from "./Sendmail";
import { v4 as uuidv4 } from "uuid";

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

    if (!tokenres) {
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
      const selectedtenure = product.prices[product.location]
        ? product.prices[product.location][product.selectedtenure]
        : product.prices.Default[product.selectedtenure];
      const refined_product = { ...product, tenure: selectedtenure };
      delete refined_product.prices;
      delete refined_product.added;
      delete refined_product.sku;
      delete refined_product.selectedtenure;
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
      const products = ordersdata.map(([key, product]) => product);
      const mailhtml = Ordercconfirmation(
        userdata,
        paymentGroupId,
        createdAt,
        products,
        paymentMethod,
        totalPrice
      );

      sendEmail(
        "Order confirmation",
        ["rentbeandotin@gmail.com", order?.userdata?.email],
        mailhtml
      );
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

function getYYMMDD() {
  const date = new Date();
  const yy = date.getFullYear().toString().slice(-2); // Last 2 digits of year
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Month (01-12)
  const dd = String(date.getDate()).padStart(2, "0"); // Day (01-31)

  return `${yy}${mm}${dd}`;
}
