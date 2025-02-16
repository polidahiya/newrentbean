"use client";
import React, { useState } from "react";
import { categorylist } from "@/app/commondata";
import { Getliveproducts } from "../Getliveproducts";
import { Deleteproduct } from "../Serveraction";
import { AppContextfn } from "@/app/Context";
import Componentloading from "@/app/_components/Componentloading";
import Productcard from "@/app/_components/Productcard";
import { IoSearchOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { IoIosCopy } from "react-icons/io";

function Showproducts({
  setdata,
  resetState,
  setdeletedimages,
  setshoweditform,
}) {
  const { setmessagefn, setshowdialog } = AppContextfn();

  const [categorystate, setcategorystate] = useState({
    category: "Health-&-Fitness",
    subcat: "Treadmill",
    id: "",
  });

  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(false);

  const handlecategorychange = (e) => {
    const value = e.target.value;
    setcategorystate({
      ...categorystate,
      category: value,
      subcat: categorylist[value]?.subcat[0]?.name,
    });
  };

  const handlesubcategorychange = (e) => {
    const value = e.target.value;
    setcategorystate({
      ...categorystate,
      subcat: value,
    });
  };

  const showproducts = async (searchmode) => {
    setloading(true);
    const res = await Getliveproducts(categorystate, searchmode);
    if (res.status == 200) {
      setproducts(res?.products);
    }

    setmessagefn(res?.message);
    setloading(false);
  };

  return (
    <div className="px-5">
      {/* search id way */}
      <div className="flex items-center h-10 border border-slate-300 rounded-[5px] p-1 mt-5">
        <input
          type="text"
          className="h-full w-full px-5 outline-none"
          placeholder="Product id"
          value={categorystate?.id}
          onChange={(e) =>
            setcategorystate((pre) => ({ ...pre, id: e.target.value }))
          }
          onKeyDown={(e) => {
            if (e.key == "Enter") showproducts("id");
          }}
        />
        <button
          className="flex items-center gap-2 px-5 h-full bg-theme text-white border border-slate-300 rounded-[5px] ml-auto"
          onClick={() => showproducts("id")}
        >
          <IoSearchOutline />
          <span className="hidden md:inline-block">Search</span>
        </button>
      </div>
      {/* search categories way */}
      <div className="flex flex-col md:flex-row  items-center justify-center gap-10 mt-10">
        <div className="w-full flex gap-5 items-center">
          <label className="flex-1 text-[20px] font-bold ">Category :</label>
          <select
            className="flex-1 p-2 border border-slate-300 outline-none rounded-md"
            value={categorystate?.category}
            onChange={handlecategorychange}
          >
            {Object.keys(categorylist).map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        {categorylist[categorystate?.category]?.subcat.length != 0 && (
          <div className="w-full flex gap-5 items-center">
            <label className="flex-1 text-[20px] font-bold ">
              Sub-Category :
            </label>
            <select
              className="flex-1 p-2 border border-slate-300 outline-none rounded-md"
              value={categorystate?.subcat}
              onChange={handlesubcategorychange}
            >
              {categorylist[categorystate?.category]?.subcat?.map((item, i) => (
                <option key={i} value={item?.name}>
                  {item?.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="flex justify-center gap-2 mt-5">
        <button
          className="rounded-md p-[5px] px-5 text-white bg-theme"
          onClick={() => showproducts("category")}
        >
          Show Products
        </button>
        {/* add new product form */}
        <button
          className="border px-5 rounded-md text-white bg-theme"
          onClick={() => {
            setshoweditform(true);
            resetState();
          }}
        >
          + Add New
        </button>
        <button
          className="border px-5 rounded-md text-white bg-theme"
          onClick={() => showproducts("trash")}
        >
          Trash Products
        </button>
      </div>

      {/* products */}
      {!loading ? (
        <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center gap-[10px] md:gap-[20px] p-3 md:p-8">
          {products.map((item, i) => {
            return (
              <div
                key={i}
                className="relative h-full w-full max-w-[350px] md:min-w-[270px] shadow-md bg-white rounded-3xl"
              >
                <Productcard
                  index={i}
                  id={item._id}
                  image={item.images[0]}
                  {...item}
                />
                <div className="absolute top-0 right-0 flex flex-col w-12 gap-2 p-1">
                  {/* delete product button */}
                  <button
                    className="w-full aspect-square bg-red-600 text-white rounded-full"
                    onClick={async () => {
                      setshowdialog({
                        show: true,
                        title: "Delete?",
                        continue: async () => {
                          const res = await Deleteproduct(
                            item.images,
                            item._id
                          );
                          if (res.status == 200)
                            setproducts(
                              products.filter(
                                (product) => item._id !== product._id
                              )
                            );

                          setmessagefn(res?.message);
                        },
                        type: false,
                      });
                    }}
                  >
                    X
                  </button>

                  {/* update product button */}
                  <button
                    className="w-full aspect-square flex items-center justify-center bg-green-600 rounded-full text-white"
                    onClick={() => {
                      setdata(item);
                      setdeletedimages([]);
                      setshoweditform(true);
                    }}
                  >
                    <FaEdit className="inline-block" />
                  </button>

                  {/* copy product */}
                  <button
                    className="w-full aspect-square flex items-center justify-center bg-blue-500 rounded-full text-white"
                    onClick={() => {
                      setdata(() => {
                        const updateddata = item;
                        delete updateddata._id;
                        updateddata.images = [];
                        return updateddata;
                      });
                      setdeletedimages([]);
                      setshoweditform(true);
                    }}
                  >
                    <IoIosCopy className="inline-block" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Componentloading />
      )}
    </div>
  );
}

export default Showproducts;
