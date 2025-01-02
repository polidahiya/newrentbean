"use server";
import { Adminverification } from "@/app/Verifytoken";
import { getcollection } from "@/app/Mongodb";

export const Getliveproducts = async (categorystate, searchmode) => {
  try {
    const { Productscollection, ObjectId } = await getcollection();
    const verification = await Adminverification();

    if (!verification) {
      return { status: 400, message: "Invalid user" };
    }

    let products = await Productscollection.find(
      searchmode
        ? { _id: new ObjectId(categorystate?.id) }
        : {
            category: categorystate.category,
            subcat: categorystate?.subcat,
          }
    ).toArray();

    products.map((item) => (item._id = item._id.toString()));

    return { status: 200, message: "Products fetched", products: products };
  } catch (error) {
    return { status: 500, message: "Server error!" };
  }
};
