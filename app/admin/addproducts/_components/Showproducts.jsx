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
import Image from "next/image";

function Showproducts({
  setdata,
  resetState,
  setdeletedimages,
  setshoweditform,
}) {
  const { setmessagefn, setshowdialog } = AppContextfn();

  const [categorystate, setcategorystate] = useState({
    category: "Health-&-Fitness",
    subcat: "Fitness-Machines",
    id: "",
  });

  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(false);
  const [gridview, setgridview] = useState(true);

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
      <div>
        <button
          className="px-5 py-1 bg-bg1 rounded-md"
          onClick={() => setgridview(false)}
        >
          Blocks
        </button>
        <button
          className="px-5 py-1 bg-bg1 rounded-md ml-2"
          onClick={() => setgridview(true)}
        >
          Table
        </button>
      </div>
      {!loading ? (
        gridview ? (
          <Producttabularform products={products} />
        ) : (
          <Productcardview products={products} />
        )
      ) : (
        <Componentloading />
      )}
    </div>
  );
}

const Productcardview = ({ products }) => {
  return (
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
                      const res = await Deleteproduct(item.images, item._id);
                      if (res.status == 200)
                        setproducts(
                          products.filter((product) => item._id !== product._id)
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
  );
};

const Producttabularform = ({ products }) => {
  return (
    <div className="container mx-auto overflow-x-scroll mt-5">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b whitespace-nowrap">
                Image
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b whitespace-nowrap">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b whitespace-nowrap">
                Category
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b whitespace-nowrap">
                Subcategory
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b whitespace-nowrap">
                Tags
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b whitespace-nowrap">
                Available
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b whitespace-nowrap">
                Trash
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b whitespace-nowrap">
                SKU
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b whitespace-nowrap min-w-80">
                Description
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b whitespace-nowrap">
                Max Quantity
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b whitespace-nowrap">
                Security Deposit
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b whitespace-nowrap min-w-80">
                Pricing
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b whitespace-nowrap">
                Buy Price
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b whitespace-nowrap">
                Along With
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b whitespace-nowrap">
                Available For
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b whitespace-nowrap min-w-64">
                SEO Title
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b whitespace-nowrap min-w-64">
                SEO Description
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b whitespace-nowrap min-w-64">
                SEO Keywords
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {item.images && item.images.length > 0 ? (
                    <Image
                      src={item.images[0]}
                      alt={item.name || "Product Image"}
                      width={100} // Reduced size for table
                      height={100}
                      className="object-cover object-center"
                      loading="lazy"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {item.name || "Unnamed Item"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {item.category || "N/A"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {item.subcat || "N/A"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {item.tags && item.tags.length > 0
                    ? item.tags.join(", ")
                    : "No Tags"}
                </td>
                <td className="px-4 py-2 text-sm border-b">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      item.available
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.available ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm border-b">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      item.trash
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.trash ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {item.sku || "N/A"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  <ul>
                    {item.desc && item.desc.length > 0
                      ? item.desc.map((item, i) => (
                          <li key={i} className="list-disc">
                            {item}
                          </li>
                        ))
                      : "No description"}
                  </ul>
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {item.maxquantity || "N/A"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {item.securitydeposit ? `₹${item.securitydeposit}` : "N/A"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {["Both", "Rent"].includes(item?.availablefor)
                    ? Object.entries(item.prices).map(([key, tenure]) => (
                        <div key={key}>
                          <strong className="mt-2 block">{key}</strong>
                          <ul>
                            {tenure.map((item, j) => (
                              <li key={j} className="list-disc text-sm">
                                {item?.time} {item?.type} - Rs {item?.price}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))
                    : "N/A"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {item.buyprice ? `₹${item.buyprice}` : "N/A"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {item.alongwith && item.alongwith.length > 0
                    ? item.alongwith.join(", ")
                    : "None"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {item.availablefor || "N/A"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {item.seotitle || "N/A"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {item.seodescription || "N/A"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {item.seokeywords.split(",").map((item, i) => (
                    <li
                      key={i}
                      className="bg-slate-200 rounded-full px-2 text-xs mt-1"
                    >
                      {item}
                    </li>
                  )) || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Showproducts;
