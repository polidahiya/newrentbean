"use server";
import Verification from "@/app/Verifytoken";
import { getcollection } from "@/app/Mongodb";

export const get_users = async () => {
  try {
    const res = await Verification();

    if (!res?.verified) {
      return { status: 401, message: "Please login first" };
    }

    const { userscollection } = await getcollection();

    const total_users = await userscollection.countDocuments();

    const users = await userscollection.find().toArray();
    users.forEach((item) => (item._id = item._id.toString()));

    return { status: 200, users, total_users };
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    return { status: 500, message: "Server Error" };
  }
};
