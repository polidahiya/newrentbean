"use server";
import { getcollection } from "@/app/Mongodb";
import { unstable_cache } from "next/cache";
import { revalidateTag } from "next/cache";
import { CACHE_TIME } from "../commondata";

// const productMap = new Map(products.map(product => [product._id, product]));
// const filtered = [...productMap.values()].filter(
//   (product) => product.category === "Electronics"
// );

export const Cachedproducts = unstable_cache(
  async () => {
    const { Productscollection } = await getcollection();
    const productsList = await Productscollection.find({
      trash: false,
    })
      .sort({ sortOrder: 1 })
      .toArray();

    productsList.forEach((item) => {
      item._id = item._id.toString();
    });

    return productsList;
  },
  ["products"],
  { revalidate: CACHE_TIME, tags: ["products"] }
);

export const Cachedproductsname = unstable_cache(
  async () => {
    const products = await Cachedproducts();
    return products.map((item) => item?.name);
  },
  ["product-names"],
  { revalidate: CACHE_TIME, tags: ["products"] }
);

export async function refreshproductsnow() {
  try {
    revalidateTag("products");
    return { status: 200, message: "Products Refreshed on site" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error!" };
  }
}

// blogs
export const Cachedblogs = unstable_cache(
  async () => {
    const { blogscollection } = await getcollection();
    const blogs = await blogscollection.find({}).sort({ _id: -1 }).toArray();
    return blogs.map((item) => ({ ...item, _id: item._id.toString() }));
  },
  ["blogs"],
  { revalidate: CACHE_TIME, tags: ["blogs"] }
);

export async function refreshblogsnow() {
  try {
    revalidateTag("blogs");
    return { status: 200, message: "Blogs Refreshed on site" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error!" };
  }
}
