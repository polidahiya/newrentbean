"use server";
import Verification from "@/app/Verifytoken";
import { cookies } from "next/headers";
import { getcollection } from "@/app/Mongodb";
import Ordercconfirmation from "../_mailtemplates/Ordercconfirmation";
import sendEmail from "./Sendmail";

export const Placeorder = async (
  ordersdata,
  paymentMethod,
  totalPrice,
  location
) => {
  try {
    const { orderscollection, sitedata } = await getcollection();
    const tokenres = await Verification("public");

    if (!tokenres) {
      return { status: 500, message: "Please login first" };
    }
    // cookies
    const userdata = JSON.parse(cookies()?.get("userdata")?.value);

    const updatedsitedata = await sitedata.findOneAndUpdate(
      {},
      { $inc: { orderNumber: 1 } },
      { returnDocument: "after", upsert: true }
    );

    const orderNumber = `Rb${getYYMMDD()}-${updatedsitedata?.orderNumber}`;

    let order = {
      orderNumber,
      paymentMethod,
      status: 0,
      userdata,
      products: Object.values(ordersdata).map((product) => ({
        ...product[1],
        status: 0,
      })),
      location,
      totalPrice,
      note: "",
      createdAt: new Date(),
    };

    if (paymentMethod == "online") {
      order.paymentStatus = "pending";
    }

    const insertedorder = await orderscollection.insertOne(order);

    if (insertedorder?.insertedCount != 0) {
      // send mails
      if (paymentMethod == "cod") {
        const mailhtml = Ordercconfirmation(order);
        sendEmail(
          "Order confirmation",
          ["rentbeandotin@gmail.com", order?.userdata?.email],
          mailhtml
        );
      }

      return {
        status: 200,
        message: "Order Placed Successfully",
        id: insertedorder.insertedId.toString(),
      };
    } else {
      return { status: 200, message: "Order Failed" };
    }
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
