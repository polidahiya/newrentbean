"use server";
import { getcollection } from "@/app/Mongodb";
import crypto from "crypto";
import Ordercconfirmation from "@/app/_mailtemplates/Ordercconfirmation";
import sendEmail from "../Sendmail";

async function Verifyrazorpay(razorpaydata, paymentGroupId) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      razorpaydata;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.Razortpay_secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      const { orderscollection } = await getcollection();

      // Update all orders with this paymentGroupId
      await orderscollection.updateMany(
        { paymentGroupId },
        { $set: { paymentStatus: "success" } }
      );

      // Fetch updated orders for email
      const updatedOrders = await orderscollection
        .find({ paymentGroupId })
        .toArray();

      try {
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
      } catch (error) {}

      return {
        status: 200,
        message: "Payment verified successfully",
      };
    } else {
      return { status: 400, message: "Invalid signature" };
    }
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Server error" };
  }
}

export default Verifyrazorpay;