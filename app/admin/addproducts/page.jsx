"use client";
import React, { useEffect, useState } from "react";
import Addandupdateproduct from "./_components/Addproduct";
import Showproducts from "./_components/Showproducts";
import { useSearchParams } from "next/navigation";
import { AppContextfn } from "@/app/Context";
import { Getliveproducts } from "./Getliveproducts";
import Componentloading from "@/app/_components/Componentloading";

function Page() {
  const searchParams = useSearchParams();
  const productid = searchParams.get("id");
  const { setmessagefn } = AppContextfn();
  const [loading, setloading] = useState(false);

  const initialState = {
    category: "Health-&-Fitness",
    subcat: "Fitness-Machines",
    tags: [],
    name: "",
    brand: "Rentbean",
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
    buymrp: "",
    buyprice: "",
    alongwith: [],
    availablefor: "Rent", //"Rent", "Buy", "Both"
    howtouse: "",
    seotitle: "",
    seodescription: "",
    seokeywords: "Rentbean, Rentmojo, Furlenco, Justdial, olx, Rent",
    buyseotitle: "",
    buyseodescription: "",
    buyseokeywords: "Rentbean, Furlenco, Justdial, olx,",
  };
  const [data, setdata] = useState(initialState);
  const [deletedimages, setdeletedimages] = useState([]);
  const [showeditform, setshoweditform] = useState(false);
  const resetState = () => {
    setdata(initialState);
  };

  useEffect(() => {
    if (productid) {
      setloading(true);
      (async () => {
        const res = await Getliveproducts({ id: productid }, "id");
        setloading(false);

        if (res?.status == 200) {
          if (res?.data?.length != 0) {
            setdata(res?.products[0]);
            setshoweditform(true);
          } else {
            setmessagefn("Product not found");
          }
        }
      })();
    }
  }, [productid]);

  return (
    <div>
      {showeditform && (
        <div className="fixed h-screen w-full left-0 top-0  flex items-center justify-center bg-black/25 z-30">
          <div className="w-full h-screen overflow-y-scroll">
            <Addandupdateproduct
              data={data}
              setdata={setdata}
              resetState={resetState}
              deletedimages={deletedimages}
              setdeletedimages={setdeletedimages}
              setshoweditform={setshoweditform}
            />
          </div>
          <button
            className="absolute top-5 right-5 w-10 aspect-square border text-white bg-red-500"
            onClick={() => setshoweditform(false)}
            aria-label="Cancel"
            title="Cancel"
          >
            x
          </button>
        </div>
      )}
      <Showproducts
        setdata={setdata}
        resetState={resetState}
        setdeletedimages={setdeletedimages}
        setshoweditform={setshoweditform}
      />
      {loading && <Componentloading />}
    </div>
  );
}

export default Page;

// variants: [
//   {
//     name: "Ram",
//     values: [
//       {
//         value: "8GB",
//         increaseprice: true,
//         price: 500,
//         imageindex: 5,
//         available: true,
//       },
//       {
//         value: "16GB",
//         increaseprice: true,
//         price: 1000,
//         imageindex: 3,
//         available: true,
//       },
//     ],
//     affectprice: true,
//   },
// ];
