import React from "react";
import Wrapper from "./Wrapper";
import { Cachedproducts } from "@/app/_serveractions/Getcachedata";
import Verification from "@/app/Verifytoken";

async function page({ searchParams }) {
  const { edit } = await searchParams;

  const getproducts = async ({ category, subcat, store }) => {
    "use server";
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
  };

  if (edit) {
    const { GetOrderById } = await import(
      "@/app/admin/Orders/Add/Serveraction"
    );
    const res = await GetOrderById(edit);
    if (res.status == 200) {
      return <Wrapper getproducts={getproducts} order={res?.order}></Wrapper>;
    }
    return <div>{res.message}</div>;
  }

  return (
    <div>
      <Wrapper getproducts={getproducts}></Wrapper>
    </div>
  );
}

export default page;
