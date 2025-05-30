"use server";
import Verification from "@/app/Verifytoken";
import { getcollection } from "@/app/Mongodb";

export const get_users = async (
  users_at_once,
  pagenumber,
  searchquery,
  filter
) => {
  try {
    const res = await Verification();

    if (!res?.verified) {
      return { status: 401, message: "Please login first" };
    }

    const { userscollection } = await getcollection();

    let query = {};
    const searchFilters = {
      0: { username: { $regex: searchquery, $options: "i" } },
      1: { email: { $regex: searchquery, $options: "i" } },
      2: { phonenum: { $regex: searchquery, $options: "i" } },
      3: { address: { $regex: searchquery, $options: "i" } },
      4: { usertype: { $regex: searchquery, $options: "i" } },
    };

    if (searchquery) {
      query = searchFilters[filter] || {};
    }

    const total_users = await userscollection.countDocuments(query);

    const users = await userscollection
      .find(query)
      .limit(users_at_once)
      .skip((pagenumber - 1) * users_at_once)
      .toArray();

    users.forEach((item) => (item._id = item._id.toString()));

    return { status: 200, users, total_users };
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    return { status: 500, message: "Server Error" };
  }
};
