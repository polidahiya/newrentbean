import React from "react";
import Blogscomp from "./Blogscomp";
import Promices from "./Promices/Promices";
import Categories from "./Categories";
import { Cachedproducts } from "@/app/_serveractions/Getcachedata";
import Footer from "../footer/Footer";
import Allproducts from "./allproducts/Allproducts";
import Description from "./homedesc/Description";
import Herosection from "./Herosection";
import Navbar from "../Navbar/Navbar";
import Mobilenav from "../Navbar/bottomnav/Mobilenav";
import Customerreviews from "./customerreview/Customerreviews";
import Roadmap from "./Roadmap";
import DirectSearchcomps from "./DirectSearchcomps";
// import Ads1 from "./Ads1";
import Homestoreswitch from "./Homestoreswitch/File";
import Epbanner from "../Epfloatingbanner/Banner";
import DeviceDetector from "@/app/_components/_helperfunctions/Devicedetector";
import Firstorder from "../Promocodes/Firstorder";

export default async function Homepage({
  location = "Delhi",
  store = "Rent",
  params,
}) {
  const Device = await DeviceDetector();

  const products = await Cachedproducts();
  const instoreproducts = products.filter(
    (item) => item?.availablefor == store || item?.availablefor == "Both"
  );

  return (
    <>
      <Navbar params={params} />
      <div>
        <Herosection location={location} store={store} Device={Device} />
        <Spaceadder>
          <Homestoreswitch location={location} store={store} Device={Device} />
        </Spaceadder>
        <div className="px-2 md:px-10 pt-5">
          <Firstorder />
        </div>
        <Spaceadder>
          <Categories location={location} store={store} />
        </Spaceadder>

        <Spaceadder>
          <Allproducts
            products={instoreproducts
              .sort(() => Math.random() - 0.5)
              .slice(0, 20)}
            location={location}
            store={store}
          />
        </Spaceadder>

        <Spaceadder>
          <DirectSearchcomps location={location} store={store} />
        </Spaceadder>
        {/* <Ads1 /> */}
        <Spaceadder>
          <Roadmap />
        </Spaceadder>

        <div className="px-5 md:px-14">
          <Epbanner />
        </div>
        <Spaceadder>
          <Customerreviews />
        </Spaceadder>
        <Spaceadder>
          <Blogscomp />
        </Spaceadder>
        <Spaceadder>
          <div>
            <h2 className="text-center font-bold text-2xl md:text-4xl font-recline">
              Why Choose Us?
            </h2>
            <Promices />
          </div>
        </Spaceadder>
        <Spaceadder>
          <Description location={location.replace(/-/g, " ")} store={store} />
        </Spaceadder>
        <Spaceadder>
          <Footer store={store} location={location} />
        </Spaceadder>
      </div>
      <Mobilenav />
    </>
  );
}

const Spaceadder = ({ children }) => {
  return <div className="mt-5 lg:mt-20">{children}</div>;
};
