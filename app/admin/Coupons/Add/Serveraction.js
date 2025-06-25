"use server";
import { getcollection } from "@/app/Mongodb";
import Verification from "@/app/Verifytoken";
import { cookies } from "next/headers";

export async function Showcoupon() {
  try {
    const tokenres = await Verification();
    if (!tokenres?.verified) {
      return { status: 400, message: "Please login first" };
    }

    const { coupons } = await getcollection();

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
    const tokenres = await Verification();
    if (!tokenres?.verified) {
      return { status: 400, message: "Please login first" };
    }

    const { coupons, ObjectId } = await getcollection();

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

export async function Applycoupon(coupon, totalPrice, cart) {
  try {
    const tokenres = await Verification("public");
    if (!tokenres?.verified) {
      return { status: 400, message: "Please login to apply coupon" };
    }

    // const { coupons } = await getcollection();

    // if (tokenres?.usertype === "admin") {
    // } else {
    // const coupondata = await coupons.findOne({ code: coupon });
    const coupondata = {
      _id: "6858d74bc6f606a792b39045",
      code: "RB00R1",
      discountType: "percentage",
      discountValue: "5",
      validFrom: "2025-06-23T04:24:00.000Z",
      validTo: "2030-12-31T04:24:00.000Z",
      usageLimit: "10",
      applicableList: ["Entertainment", "Furniture"],
      isActive: true,
      minAmount: "0",
    };

    if (!coupondata) return { status: 400, message: "Invalid coupon code" };
    else if (!coupondata.isActive)
      return { status: 400, message: "Coupon is not active" };
    else if (!Checkcoupondate(coupondata.validFrom, coupondata.validTo))
      return { status: 400, message: "Coupon is expired" };
    else if (coupondata.minAmount > totalPrice)
      return {
        status: 400,
        message: `Min amount not met - Rs ${coupondata.minAmount}`,
      };
    else if (coupondata.usageLimit == 0 || coupondata.usageLimit < -1)
      return {
        status: 400,
        message: "Coupon usage limit exceeded",
      };
    else {
      const isCouponApplicable = (
        coupondata,
        { store, category, subcat, pid }
      ) => {
        const list = coupondata.applicableList;

        // Applies to entire cart
        if (list.includes("Cart")) return true;

        // Applies specifically
        const storeMatch = list.includes(store);
        const itemMatch =
          list.includes(category) ||
          list.includes(subcat) ||
          list.includes(pid);

        return storeMatch && itemMatch;
      };
      const isCouponApplicableToAll = Object.values(cart).every((item) => {
        const [_, location, store, category, subcat, pid] =
          item.productlink.split("/");
        console.log(store, category, subcat, pid);

        return isCouponApplicable(coupondata, { store, category, subcat, pid });
      });

      if (isCouponApplicableToAll)
        return {
          status: 400,
          message: "Coupon applied successfully",
          coupondata,
        };
      else
        return { status: 400, message: "Not applicable on these categories" };
    }
    // }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
}

const Checkcoupondate = (validFrom, validTo) => {
  const now = new Date();
  const start = new Date(validFrom);
  const end = new Date(validTo);
  return now >= start && now <= end;
};
// test1,RB00R1
