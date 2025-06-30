"use client";
import React, { useEffect, useState } from "react";
import { useCouponContext } from "../Couponcontext";
import Standardinputfield from "../../addproducts/_components/_comps/Standardinputfield";
import Dropdownmenu from "../../addproducts/_components/_comps/Dropdownmenu";
import Togglebuttons from "../../addproducts/_components/_comps/Togglebuttons";
import Multiselecttags from "../../addproducts/_components/_comps/Multiselecttags";
import { categorylist } from "@/app/commondata";
import Dateselector from "../../_comps/formcomps/Dateselector";
import Selectcategory from "../../addproducts/_components/_comps/Selectcategory";
import Nextimage from "@/app/_components/Nextimage";
import Getproducts from "../../Orders/Add/Getcachedproducts";
import { Addcoupon } from "./Serveraction";
import { AppContextfn } from "@/app/Context";

const categoryandsubcatnames = [
  "Rent",
  "Buy",
  "Cart",
  ...Object.keys(categorylist),
  ...Object.values(categorylist).flatMap((item) =>
    item.subcat.map((subitem) => subitem.name)
  ),
];

export default function Page() {
  const { setmessagefn } = AppContextfn();
  const {
    data,
    setdata,
    loading,
    setloading,
    initialstate,
    categories,
    setcategories,
    products,
    setproducts,
  } = useCouponContext();
  const [showproducts, setshowproducts] = useState(false);

  useEffect(() => {
    (async () => {
      if (!showproducts) return;
      const res = await Getproducts(categories);
      if (!res || res.status !== 200) {
        setproducts([]);
      } else {
        setproducts(res.products || []);
      }
    })();
  }, [categories, showproducts]);

  const handleDropdownChange = (value) =>
    setdata((prev) => ({ ...prev, discountType: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    const res = await Addcoupon(data);
    if (res.status === 200) {
      setdata(initialstate);
    }
    setmessagefn(res.message || "Something went wrong");
    setloading(false);
  };

  return (
    <div className="">
      <button
        onClick={() => {
          setdata(initialstate);
          window.history.back();
        }}
        type="button"
        className="fixed right-2 md:right-6 top-16  border rounded-md px-5 py-1 bg-theme text-white z-10"
      >
        X
      </button>
      <p className="text-center pt-5">
        <span className="font-bold font-serif text-2xl">Add Coupons</span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="p-2 pb-20 md:p-6 bg-white space-y-6"
      >
        <Standardinputfield
          titlename="Coupons Code"
          value={data.code}
          onchange={(e) =>
            setdata((prev) => ({ ...prev, code: e.target.value }))
          }
          clear={() => setdata((prev) => ({ ...prev, code: "" }))}
        />
        <Dropdownmenu
          title="Coupon Type"
          state={data.discountType}
          onchange={handleDropdownChange}
          options={["percentage", "fixed"]}
        />

        {/* discount value */}
        <Standardinputfield
          titlename="Discount Value"
          type="number"
          value={data.discountValue}
          onchange={(e) =>
            setdata((prev) => ({ ...prev, discountValue: e.target.value }))
          }
          clear={() => setdata((prev) => ({ ...prev, discountValue: "" }))}
        />
        {/* discount value */}
        <Standardinputfield
          titlename="Min Amount"
          type="number"
          value={data.minAmount}
          onchange={(e) =>
            setdata((prev) => ({ ...prev, minAmount: e.target.value }))
          }
          clear={() => setdata((prev) => ({ ...prev, minAmount: "" }))}
        />
        {/* Usage limit */}
        <Standardinputfield
          titlename={`Usage Limit : ${
            data.usageLimit == -1 ? "unlimited " : data.usageLimit
          } (use -1 for unlimited)`}
          type="number"
          value={data.usageLimit}
          onchange={(e) =>
            setdata((prev) => ({ ...prev, usageLimit: e.target.value }))
          }
          clear={() => setdata((prev) => ({ ...prev, usageLimit: "" }))}
        />
        {/* Usage limit per user*/}
        <Standardinputfield
          titlename={`Usage Limit per User : ${
            data.usageLimitperuser == -1 ? "unlimited " : data.usageLimitperuser
          } (use -1 for unlimited)`}
          type="number"
          value={data.usageLimitperuser}
          onchange={(e) =>
            setdata((prev) => ({ ...prev, usageLimitperuser: e.target.value }))
          }
          clear={() => setdata((prev) => ({ ...prev, usageLimitperuser: "" }))}
        />
        {/* categoreies */}
        <Multiselecttags
          title="Applicatble on (Cart - all, category or subcat or productid + store(Rent/Buy))"
          state={data.applicableList}
          setState={setdata}
          statename="applicableList"
          options={categoryandsubcatnames}
        />
        {/* show products toggler */}
        <Togglebuttons
          titlename="Show Products?"
          value={showproducts}
          positive={() => setshowproducts(true)}
          negative={() => setshowproducts(false)}
          positiveText="Yes"
          negativeText="No"
          colors={{ positive: "text-green-500", negative: "text-red-500" }}
        />
        {/* select product */}
        {showproducts && (
          <div className="space-y-4">
            <Selectcategory data={categories} setdata={setcategories} />
            {/* store button */}
            <div className="flex gap-4 justify-center my-4">
              <button
                type="button"
                className={`px-4 py-2 rounded-md border ${
                  categories.store == "Rent"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 border-blue-600"
                } transition`}
                onClick={() =>
                  setcategories((prev) => ({ ...prev, store: "Rent" }))
                }
              >
                Rent
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-md border ${
                  categories.store == "Buy"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 border-blue-600"
                } transition`}
                onClick={() =>
                  setcategories((prev) => ({ ...prev, store: "Buy" }))
                }
              >
                Buy
              </button>
            </div>
            {/* products */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-5 mb-10 max-h-screen overflow-y-scroll">
              {products.map((product) => {
                const matches = [product._id, product.category, product.subcat];

                const isCategoryMatch =
                  (matches.some((item) => data.applicableList.includes(item)) &&
                    data.applicableList.includes(categories.store)) ||
                  data.applicableList.includes("Cart");

                return (
                  <div
                    key={product._id}
                    className={`relative rounded-lg shadow-sm p-4 hover:shadow-md transition overflow-hidden ${
                      isCategoryMatch ? "bg-blue-100" : "bg-gray-50"
                    }`}
                  >
                    <div
                      className="flex flex-col items-center"
                      onClick={() => {
                        if (!data.applicableList.includes(product._id))
                          setdata((pre) => ({
                            ...pre,
                            applicableList: [
                              ...pre.applicableList,
                              product._id,
                            ],
                          }));
                      }}
                    >
                      <Nextimage
                        src={product?.images[0]}
                        alt={product?.name}
                        height={100}
                        width={100}
                        loading="lazy"
                        className="h-24 w-24 md:h-32 md:w-32 object-contain rounded-md mb-2 mix-blend-multiply"
                      />
                      <span className="text-center text-sm font-medium mt-2">
                        {product?.name}
                      </span>
                    </div>
                    {isCategoryMatch && (
                      <button
                        className="absolute top-0 right-0 w-10 aspect-square bg-red-600 text-white"
                        type="button"
                        onClick={() => {
                          setdata((prev) => ({
                            ...prev,
                            applicableList: prev.applicableList.filter(
                              (id) => id !== product._id
                            ),
                          }));
                        }}
                      >
                        X
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* customtotal toggle*/}
        <Togglebuttons
          titlename="Is Active?"
          value={data.isActive}
          positive={() => setdata((prev) => ({ ...prev, isActive: true }))}
          negative={() => setdata((prev) => ({ ...prev, isActive: false }))}
          positiveText="Yes"
          negativeText="No"
          colors={{ positive: "text-green-500", negative: "text-red-500" }}
        />
        {/* valid from */}
        <div className="flex flex-col md:flex-row gap-4">
          <Dateselector
            label="Valid From"
            state={data?.validFrom}
            setstate={(isoDate) => {
              setdata((prev) => ({
                ...prev,
                validFrom: isoDate,
              }));
            }}
          />
          {/* Valid To */}
          <Dateselector
            label="Valid To"
            state={data?.validTo}
            setstate={(isoDate) => {
              setdata((prev) => ({
                ...prev,
                validTo: isoDate,
              }));
            }}
          />
        </div>
        {/* Buttons */}
        {JSON.stringify(data) != JSON.stringify(initialstate) && (
          <div className="sticky bottom-0 flex items-center justify-center gap-5 py-5">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-4 py-2  bg-blue-600 text-white rounded-md hover:bg-blue-700"
              aria-label="Submit"
              title="Submit"
            >
              {loading && (
                <span className="block h-5 aspect-square border-t-2 border-b-2 border-white rounded-full animate-spin"></span>
              )}
              {data._id ? "Update Coupon" : "Add Coupon"}
            </button>
            {data._id && (
              <button
                onClick={() => {
                  setdata(initialstate);
                  window.history.back();
                }}
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2  border rounded-md bg-white"
              >
                Cancel
              </button>
            )}
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2  border rounded-md bg-white"
              onClick={() => {
                setdata(initialstate);
              }}
            >
              Clear Form
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
