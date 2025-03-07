import React from "react";
import Blogscomp from "./_components/Homepage/Blogscomp";
import Promices from "./_components/Homepage/Promices";
import Categories from "./_components/Homepage/Categories";
import { Cachedproducts } from "./_serveractions/Getcachedata";
import Footer from "./_components/Footer";
import { cookies } from "next/headers";
import Allproducts from "./_components/Homepage/Allproducts";
import Citiesdescription from "./_components/Homepage/Citiesdescription";
import Herosection from "./_components/Homepage/Herosection";
import Navbar from "./_components/Navbar/Navbar";
import Mobilenav from "./_components/Navbar/_comps/Mobilenav";
import Customerreviews from "./_components/Homepage/Customerreviews";
import Roadmap from "./_components/Homepage/Roadmap";
import DirectSearchcomps from "./_components/Homepage/DirectSearchcomps";

export default async function Home({ searchParams, params }) {
  const allcookies = await cookies();
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
        <Herosection location={"delhi"} />
        <Categories />
        <Allproducts products={products.sort(() => Math.random() - 0.5)} />
        <DirectSearchcomps />
        <Roadmap />
        <Customerreviews />
        <Blogscomp />
        <div>
          <h2 className="text-center font-bold text-2xl md:text-4xl  font-recline">
            Why Choose Us?
          </h2>
          <Promices />
        </div>
        <Citiesdescription city={searchParams?.location} />
        <Footer />
      </div>
      <Mobilenav />
    </>
  );
}
