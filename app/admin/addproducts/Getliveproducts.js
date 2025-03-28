"use server";
import Verification from "@/app/Verifytoken";
import { getcollection } from "@/app/Mongodb";

export const Getliveproducts = async (categorystate, searchmode) => {
  try {
    const { Productscollection, ObjectId } = await getcollection(
      "Edit-Products"
    );
    const res = await Verification();
    if (!res?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    const queries = {
      category: {
        category: categorystate.category,
        subcat: categorystate.subcat,
      },
      id: categorystate.id ? { _id: new ObjectId(categorystate.id) } : null,
      trash: { trash: true },
    };

    const query = queries[searchmode] || {}; // Ensure query is never undefined

    const products = await Productscollection.find(query)
      .sort({ sortOrder: 1 })
      .toArray();

    products.map((item) => (item._id = item._id.toString()));

    return { status: 200, message: "Products fetched", products: products };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server error!" };
  }
};
