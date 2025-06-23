"use server";
import { getcollection } from "@/app/Mongodb";
import Verification from "@/app/Verifytoken";

export async function Showcoupon() {
  try {
    const { coupons } = await getcollection();
    const tokenres = await Verification();
    if (!tokenres?.verified) {
      return { status: 400, message: "Please login first" };
    }
    const coupon = await coupons.find().sort({ lastupdate: -1 }).toArray();
    coupon.forEach((item) => {
      item._id = item._id.toString();
    });
    return { status: 200, coupon };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
}

export async function Addcoupon(coupondata) {
  try {
    const { coupons, ObjectId } = await getcollection();
    const tokenres = await Verification();

    if (!tokenres?.verified) {
      return { status: 400, message: "Please login first" };
    }
    const date = new Date().getTime();
    if (coupondata._id) {
      // update coupon
      const filter = { _id: new ObjectId(coupondata._id) };
      const { _id, ...updatedCouponData } = coupondata;
      await coupons.updateOne(filter, {
        $set: { ...updatedCouponData, lastupdate: date },
      });
      return { status: 200, message: "Updated successfully" };
    } else {
      // create new coupon
      await coupons.insertOne({ ...coupondata, lastupdate: date });
      return { status: 200, message: "Added successfully" };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
}
