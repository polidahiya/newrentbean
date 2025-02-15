import React from "react";
import Blogscomp from "./_components/Homepage/Blogscomp";
import Promices from "./_components/Homepage/Promices";
import Bestselling from "./_components/Homepage/Bestselling";
import Categories from "./_components/Homepage/Categories";
import { Cachedproducts } from "./_serveractions/Getcachedata";
import Footer from "./_components/Footer";
import Newarrival from "./_components/Homepage/Newarrival";
import { cookies } from "next/headers";
import Allproducts from "./_components/Homepage/Allproducts";
import Citiesdescription from "./_components/Homepage/Citiesdescription";
import Herosection from "./_components/Homepage/Herosection";
import Navbar from "./_components/Navbar/Navbar";
import Mobilenav from "./_components/Navbar/_comps/Mobilenav";
import Ordercconfirmation from "./_mailtemplates/Ordercconfirmation";

export default async function Home({ searchParams, params }) {
  const allcookies = await cookies();
  const token = allcookies.get("token")?.value;
  const userdata = allcookies.get("userdata")?.value;

  let parseduserdata;
  if (userdata) parseduserdata = JSON.parse(userdata);

  const products = await Cachedproducts();
  const productsname = products?.map((item) => item?.name);

  const test = {
    _id: "67ab6fbdb2996c0876086eba",
    paymentMethod: "online",
    status: 0,
    userdata: {
      username: "parvesh",
      email: "polidahiya830@gmail.com",
      phonenum: "8700705247",
      usertype: "admin",
      address: "Near shiv temple,village hayatpur",
    },
    products: [
      {
        added: true,
        quantity: 2,
        sku: "Rbdibst007-buy-Delhi",
        prices: {
          Default: [
            { time: "3", type: "months", price: "7200" },
            { time: "6", type: "months", price: "13500" },
          ],
          Gurgaon: [
            { time: "1", type: "month", price: "3000" },
            { time: "3", type: "days", price: "7200" },
            { time: "6", type: "days", price: "13500" },
          ],
        },
        selectedtenure: 0,
        buyprice: "34999",
        name: "Solid Sheesham Wood Diamond Bed King Size 6X6.5 feet",
        image:
          "https://res.cloudinary.com/dmn8xdsq4/image/upload/v1739192786/Rentbean/qbzlw9skg6sdgqesqwar.jpg",
        securitydeposit: "2000",
        maxquantity: "2",
        isrentalstore: false,
        location: "Delhi",
        productlink: "/Furniture/Beds/67a88b18a1ffaa422456899b",
        status: 0,
      },
      {
        added: true,
        quantity: 2,
        sku: "RbBabycarrier002-rental-Delhi",
        prices: {
          Default: [
            { time: "3", type: "days", price: "400" },
            { time: "7", type: "days", price: "700" },
            { time: "30", type: "days", price: "1000" },
          ],
        },
        selectedtenure: 0,
        buyprice: "",
        name: "Baby carrier age group 0-12 months ",
        image:
          "https://res.cloudinary.com/dmn8xdsq4/image/upload/v1739038331/Rentbean/tp3p3al7mzahmbv6uzpq.webp",
        securitydeposit: "500",
        maxquantity: "2",
        isrentalstore: true,
        location: "Delhi",
        productlink: "/Others/Baby-Care/67a79e7f006c27b1f1ca4424",
        status: 0,
      },
    ],
    note: "",
    createdAt: 1739288509898,
    paymentStatus: "success",
  };
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: Ordercconfirmation(test),
        }}
      ></div>
      <Navbar
        params={params}
        productsname={productsname}
        token={token}
        userdata={userdata}
      />
      <div className="flex flex-col gap-16 lg:gap-20">
        <Herosection location={"delhi"} />
        <Categories />
        {/* <Newarrival products={products} /> */}
        {/* <Bestselling products={products} /> */}
        <Allproducts products={products.sort(() => Math.random() - 0.5)} />
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
