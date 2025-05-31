import React from "react";
import Blogscomp from "./Blogscomp";
import Promices from "./Promices/Promices";
import Categories from "./Categories";
import { Cachedproducts } from "@/app/_serveractions/Getcachedata";
import Footer from "../footer/Footer";
import { cookies } from "next/headers";
import Allproducts from "./allproducts/Allproducts";
import Description from "./homedesc/Description";
import Herosection from "./Herosection";
import Navbar from "../Navbar/Navbar";
import Mobilenav from "../Navbar/_comps/Mobilenav";
import Customerreviews from "./customerreview/Customerreviews";
import Roadmap from "./Roadmap";
import DirectSearchcomps from "./DirectSearchcomps";
// import Ads1 from "./Ads1";
import Homestoreswitch from "./Homestoreswitch/File";
import Epbanner from "../Epfloatingbanner/Banner";
import DeviceDetector from "@/app/_components/_helperfunctions/Devicedetector";

export default async function Homepage({
  params,
  location = "Delhi",
  store = "Rent",
}) {
  const Device = await DeviceDetector();
  const allcookies = await cookies();
  const token = allcookies.get("token")?.value;
  const userdata = allcookies.get("userdata")?.value;

  const products = await Cachedproducts();
  const instoreproducts = products.filter(
    (item) => item?.availablefor == store || item?.availablefor == "Both"
  );

  return (
    <>
      <Navbar
        params={params}
        token={token}
        userdata={userdata}
      />
      <div>
        <Herosection location={location} store={store} Device={Device}/>
        <Spaceadder>
          <Homestoreswitch location={location} store={store} Device={Device}/>
        </Spaceadder>
        <Spaceadder>
          <Categories location={location} store={store} />
        </Spaceadder>
        <Spaceadder>
          <Allproducts
            products={instoreproducts.sort(() => Math.random() - 0.5)}
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
      {(Device === "mobile" || Device === "tablet") && (
        <Mobilenav store={store} location={location} />
      )}
    </>
  );
}

const Spaceadder = ({ children }) => {
  return <div className="mt-5 lg:mt-20">{children}</div>;
};
