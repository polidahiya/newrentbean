"use client";
import React, { useState } from "react";
import Addandupdateproduct from "./_components/Addproduct";
import Showproducts from "./_components/Showproducts";

function Page() {
  const initialState = {
    category: "Health-&-Fitness",
    subcat: "Treadmill",
    name: "",
    available: true,
    trash: false,
    sku: "",
    desc: [""],
    images: [],
    maxquantity: "3",
    securitydeposit: "1000",
    prices: {
      Default: [
        { time: "", type: "day", price: "" },
        { time: "", type: "days", price: "" },
        { time: "", type: "days", price: "" },
      ],
    },
    buyprice: "",
    availablefor: "Rent", //"Rent", "Buy", "Both"
    seotitle: "",
    seodescription: "",
    seokeywords: "",
  };
  const [data, setdata] = useState(initialState);
  const [deletedimages, setdeletedimages] = useState([]);
  const [showeditform, setshoweditform] = useState(false);
  const resetState = () => {
    setdata(initialState);
  };
  return (
    <div>
      {showeditform && (
        <div className="fixed h-screen w-full left-0 top-0  flex items-center justify-center bg-black bg-opacity-25 z-30">
          <div className="w-full h-full overflow-y-scroll">
            <Addandupdateproduct
              data={data}
              setdata={setdata}
              initialState={initialState}
              resetState={resetState}
              deletedimages={deletedimages}
              setdeletedimages={setdeletedimages}
              setshoweditform={setshoweditform}
            />
          </div>
          <button
            className="absolute top-5 right-5 w-10 aspect-square border text-white bg-red-500"
            onClick={() => setshoweditform(false)}
          >
            x
          </button>
        </div>
      )}
      <Showproducts
        setdata={setdata}
        setdeletedimages={setdeletedimages}
        setshoweditform={setshoweditform}
      />
    </div>
  );
}

export default Page;
