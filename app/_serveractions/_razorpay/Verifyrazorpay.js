"use server";
import { getcollection } from "@/app/Mongodb";
import crypto from "crypto";
import Ordercconfirmation from "@/app/_mailtemplates/Ordercconfirmation";
import sendEmail from "../Sendmail";

async function Verifyrazorpay(razorpaydata, mongoid) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      razorpaydata;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.Razortpay_secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      const { orderscollection, ObjectId } = await getcollection();
      const orderdata = await orderscollection.findOneAndUpdate(
        { _id: new ObjectId(mongoid) },
        { $set: { paymentStatus: "success" } }
      );
      // send mails
      const mailhtml = Ordercconfirmation(orderdata);
      sendEmail(
        "Order confirmation",
        ["rentbeandotin@gmail.com", orderdata?.userdata?.email],
        mailhtml
      );
      return {
        status: 200,
        message: "Payment verified successfully",
      };
    } else {
      return { status: 400, message: "Invalid signature" };
    }
  } catch (error) {
    return { status: 500, message: "Server error" };
  }
}

export default Verifyrazorpay;
