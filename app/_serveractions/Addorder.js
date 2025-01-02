"use server";
import { Userification } from "@/app/Verifytoken";
import { cookies } from "next/headers";
import { getcollection } from "@/app/Mongodb";


export const Placeorder = async (ordersdata) => {
  try {
    const { orderscollection } =await getcollection();
    const tokenres = await Userification();

    if (!tokenres) {
      return { status: 500, message: "Please login first" };
    }
    // cookies
    const userdata = JSON.parse(cookies()?.get("userdata")?.value);

    let order = {
      paymentStatus: "pending",
      status: 0,
      userdata,
      products: Object.values(ordersdata).map((product) => ({
        ...product,
        status: 0,
      })),
      note: "",
      createdAt: new Date(),
    };
    const result = await orderscollection.insertOne(order);

    if (result.insertedCount != 0) {
      return {
        status: 200,
        message: "Order Placed Successfully",
        id: result.insertedId.toString(),
      };
    } else {
      return { status: 500, message: "Order Failed" };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
};
