import React from "react";
import Blogscomp from "./Blogscomp";
import Promices from "./Promices";
import Categories from "./Categories";
import { Cachedproducts } from "@/app/_serveractions/Getcachedata";
import Footer from "../Footer";
import { cookies } from "next/headers";
import Allproducts from "./Allproducts";
import Citiesdescription from "./Citiesdescription";
import Herosection from "./Herosection";
import Navbar from "../Navbar/Navbar";
import Mobilenav from "../Navbar/_comps/Mobilenav";
import Customerreviews from "./Customerreviews";
import Roadmap from "./Roadmap";
import DirectSearchcomps from "./DirectSearchcomps";

export default async function Homepage({ params, location = "Delhi" }) {
  const allcookies = cookies();
  const token = allcookies.get("token")?.value;
  const userdata = allcookies.get("userdata")?.value;

  let parseduserdata;
  if (userdata) parseduserdata = JSON.parse(userdata);

  const products = await Cachedproducts();
  const productsname = products?.map((item) => item?.name);

  return (
    <>
      <Navbar
        params={params}
        productsname={productsname}
        token={token}
        userdata={userdata}
      />
      <div className="flex flex-col gap-16 lg:gap-20">
        <Herosection location={location} />
        <Categories location={location} />
        <Allproducts products={products.sort(() => Math.random() - 0.5)} />
        <DirectSearchcomps />
        <Roadmap />
        <Customerreviews />
        <Blogscomp />
        <div>
          <h2 className="text-center font-bold text-2xl md:text-4xl font-recline">
            Why Choose Us?
          </h2>
          <Promices />
        </div>
        <Citiesdescription location={location} />
        <Footer />
      </div>
      <Mobilenav />
    </>
  );
}
