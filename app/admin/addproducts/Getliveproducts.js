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

    let products;
    if (searchmode == "category") {
      products = await Productscollection.find({
        category: categorystate.category,
        subcat: categorystate?.subcat,
      }).toArray();
    }

    if (searchmode == "id") {
      products = await Productscollection.find({
        _id: new ObjectId(categorystate?.id),
      }).toArray();
    }

    if (searchmode == "trash") {
      products = await Productscollection.find({
        trash: true,
      }).toArray();
    }

    products.map((item) => (item._id = item._id.toString()));

    return { status: 200, message: "Products fetched", products: products };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server error!" };
  }
};
