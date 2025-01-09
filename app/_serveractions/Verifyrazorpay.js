"use server";

async function Verifyrazorpay(razorpaydata) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      razorpaydata;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.Razortpay_secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      // do payment verification
      return { status: 200, message: "Payment verified successfully" };
    } else {
      return { status: 400, message: "Invalid signature" };
    }
  } catch (error) {
    return { status: 500, message: "Server error" };
  }
}

export default Verifyrazorpay;
