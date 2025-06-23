"use server";
import { Cachedproducts } from "@/app/_serveractions/Getcachedata";
import Verification from "@/app/Verifytoken";
export default async function Getproducts({ category, subcat, store }) {
  try {
    const tokenres = await Verification("public");
    if (!tokenres?.verified) {
      return { status: 500, message: "Please login first" };
    }

    const products = await Cachedproducts();
    const filteredProducts = products.filter(
      (product) =>
        product.category == category &&
        product.subcat == subcat &&
        (product.availablefor == store || product.availablefor == "Both")
    );

    return { status: 200, products: filteredProducts };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { status: 500, message: "Error fetching products" };
  }
}
