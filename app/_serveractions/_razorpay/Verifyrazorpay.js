"use server";
import { getcollection } from "@/app/Mongodb";
import crypto from "crypto";
import { Send_mail_to_payment_group_id } from "../Addorder";

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

      // Send mail
      await Send_mail_to_payment_group_id(paymentGroupId);

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
