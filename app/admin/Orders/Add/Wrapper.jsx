"use client";
import React, { useEffect, useState } from "react";
import Dropdownmenu from "../../addproducts/_components/_comps/Dropdownmenu";
import Standardinputfield from "../../addproducts/_components/_comps/Standardinputfield";
import { orderstages, cities } from "@/app/commondata";
import Selectcategory from "../../addproducts/_components/_comps/Selectcategory";
import Nextimage from "@/app/_components/Nextimage";
import ProductCard from "@/app/admin/Orders/[order_num]/_comps/_orderscard/Productcard";
import Productselectmenu from "./Productselectmenu";
import { AddOrder } from "./Serveraction";
import { AppContextfn } from "@/app/Context";
import { MdModeEdit } from "react-icons/md";
import Togglebuttons from "@/app/admin/addproducts/_components/_comps/Togglebuttons";
import Dateselector from "../../_comps/formcomps/Dateselector";
import Getproducts from "./Getcachedproducts";

function Wrapper({ order }) {
  const { setmessagefn } = AppContextfn();
  const today = new Date();
  const initialorderdata = {
    paymentMethod: "cod",
    status: 0,
    userdata: {
      username: "",
      email: "",
      phonenum: "",
      usertype: "user",
      address: "",
    },
    location: "Delhi",
    totalPrice: "",
    note: "",
    product: {
      quantity: 1,
      buyprice: "",
      name: "",
      image: "" || "/logo&ui/default-fallback-image.png",
      securitydeposit: "",
      isrentalstore: true,
      productlink: "",
      tenureStart: {
        date: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear(),
      },
      tenure: {
        time: "1",
        type: "day",
        price: "0",
      },
    },
  };
  const [orderdata, setorderdata] = useState(order || initialorderdata);
  const [categories, setcategories] = useState({
    category: "Health-&-Fitness",
    subcat: "Fitness-Machines",
    store: "Rent",
  });
  const [products, setproducts] = useState([]);
  const [selectedproduct, setselectedproduct] = useState({
    data: null,
    show: false,
  });
  const [loading, setloading] = useState(false);
  const [sendmail, setsendmail] = useState(true);
  const [customtotal, setcustomtotal] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await Getproducts(categories);
      if (!res || res.status !== 200) {
        setproducts([]);
      } else {
        setproducts(res.products || []);
      }
    })();
  }, [categories]);

  const handleDropdownChange = (value) =>
    setorderdata((prev) => ({ ...prev, paymentMethod: value }));

  // calculate total price
  const calculateTotalPrice = () => {
    return orderdata.product.isrentalstore
      ? (Number(orderdata.product.tenure.price) +
          Number(orderdata.product.securitydeposit)) *
          orderdata.product.quantity
      : Number(orderdata.product.buyprice) * orderdata.product.quantity;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    //
    if (!customtotal) {
      orderdata.totalPrice = calculateTotalPrice();
    }
    const res = await AddOrder(orderdata, sendmail);
    setmessagefn(res.message || "Something went wrong");
    setloading(false);
  };

  return (
    <div className="">
      <button
        onClick={() => window.history.back()}
        type="button"
        className="fixed right-2 md:right-6 top-16  border rounded-md px-5 py-1 bg-theme text-white z-10"
      >
        X
      </button>
      <p className="text-center pt-5">
        <span className="font-bold font-serif text-2xl">Add Order</span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="p-2 pb-20 md:p-6 bg-white space-y-6"
      >
        <Dropdownmenu
          title="Payment Method"
          state={orderdata.paymentMethod}
          onchange={handleDropdownChange}
          options={["online", "cod"]}
        />
        <Dropdownmenu
          title="Order Status"
          state={orderstages[orderdata.status]}
          onchange={(value) =>
            setorderdata((prev) => ({
              ...prev,
              status: orderstages.indexOf(value),
            }))
          }
          options={orderstages}
        />
        <Dropdownmenu
          title="Location"
          state={orderdata.location}
          onchange={(value) =>
            setorderdata((prev) => ({
              ...prev,
              location: value,
            }))
          }
          options={cities}
        />
        {/* Delivered Date */}
        {orderdata.status > 2 && (
          <Dateselector
            state={orderdata?.delivered_date}
            setstate={(isoDate) => {
              setorderdata((prev) => ({
                ...prev,
                delivered_date: isoDate,
              }));
            }}
          />
        )}

        {/* User Details */}
        <p className="text-center font-bold font-serif text-xl my-5">
          User Details
        </p>
        {/* User Name */}
        <Standardinputfield
          titlename="User Name"
          value={orderdata.userdata.username}
          onchange={(e) =>
            setorderdata((prev) => ({
              ...prev,
              userdata: { ...prev.userdata, username: e.target.value },
            }))
          }
          clear={() =>
            setorderdata((prev) => ({
              ...prev,
              userdata: { ...prev.userdata, username: "" },
            }))
          }
        />
        {/* User Email */}
        <Standardinputfield
          titlename="User Email"
          type="email"
          value={orderdata.userdata.email}
          onchange={(e) =>
            setorderdata((prev) => ({
              ...prev,
              userdata: { ...prev.userdata, email: e.target.value },
            }))
          }
          clear={() =>
            setorderdata((prev) => ({
              ...prev,
              userdata: { ...prev.userdata, email: "" },
            }))
          }
        />
        {/* User Phone */}
        <Standardinputfield
          titlename="User Phone"
          type="tel"
          value={orderdata.userdata.phonenum}
          onchange={(e) =>
            setorderdata((prev) => ({
              ...prev,
              userdata: { ...prev.userdata, phonenum: e.target.value },
            }))
          }
          clear={() =>
            setorderdata((prev) => ({
              ...prev,
              userdata: { ...prev.userdata, phonenum: "" },
            }))
          }
        />
        {/* User Address */}
        <Standardinputfield
          titlename="User Address"
          value={orderdata.userdata.address}
          onchange={(e) =>
            setorderdata((prev) => ({
              ...prev,
              userdata: { ...prev.userdata, address: e.target.value },
            }))
          }
          clear={() =>
            setorderdata((prev) => ({
              ...prev,
              userdata: { ...prev.userdata, address: "" },
            }))
          }
        />
        <p className="text-center font-bold font-serif text-xl my-5">
          Product Details
        </p>
        {/* show selected product */}
        <div className="relative border rounded-md">
          <button
            className="absolute top-0 right-0 bg-gray-100 w-10 aspect-square grid place-content-center"
            type="button"
            onClick={() => {
              setselectedproduct({
                data: null,
                show: true,
              });
            }}
          >
            <MdModeEdit />
          </button>
          <ProductCard product={orderdata?.product} />
        </div>
        {/* select product */}
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
            {products.map((product) => (
              <div
                key={product._id}
                className="flex flex-col items-center bg-gray-50 rounded-lg shadow-sm p-4 hover:shadow-md transition"
                onClick={() => {
                  // set products details
                  setorderdata((prev) => ({
                    ...prev,
                    product: {
                      ...prev.product,
                      buyprice: product.buyprice || "",
                      name: product.name || "",
                      image: product.images[0] || "",
                      securitydeposit: product.securitydeposit || "",
                      isrentalstore: categories.store == "Rent",
                      productlink: `${prev?.location}/${categories.store}/${categories.category}/${categories.subcat}/${product._id}`,
                    },
                  }));
                  // more details menu
                  setselectedproduct({
                    data: product,
                    show: true,
                  });
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
            ))}
          </div>
        </div>
        {/* customtotal toggle*/}
        <Togglebuttons
          titlename="Custom Total Price?"
          value={customtotal}
          positive={() => setcustomtotal(true)}
          negative={() => setcustomtotal(false)}
          positiveText="Custom"
          negativeText="Auto"
          colors={{ positive: "text-gray-500", negative: "text-gray-500" }}
        />
        {/* total price */}
        <Standardinputfield
          titlename={customtotal ? "Total (Custom)" : "Total (Auto)"}
          isRequired={false}
          type="number"
          value={customtotal ? orderdata.totalPrice : ""}
          placeholder={customtotal ? "" : calculateTotalPrice()}
          disabled={!customtotal}
          onchange={(e) =>
            setorderdata((prev) => ({
              ...prev,
              totalPrice: e.target.value,
            }))
          }
          clear={() =>
            setorderdata((prev) => ({
              ...prev,
              totalPrice: "",
            }))
          }
        />
        {/* Note */}
        <Standardinputfield
          titlename="Note"
          value={orderdata.note || ""}
          isRequired={false}
          onchange={(e) =>
            setorderdata((prev) => ({
              ...prev,
              note: e.target.value,
            }))
          }
          clear={() =>
            setorderdata((prev) => ({
              ...prev,
              note: "",
            }))
          }
        />
        {/* Send mail */}
        <Togglebuttons
          titlename="Send mail?"
          value={sendmail}
          positive={() => setsendmail(true)}
          negative={() => setsendmail(false)}
          positiveText="Yes"
          negativeText="No"
        />
        {/* Buttons */}
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
            {orderdata._id ? "Update Order" : "Add Order"}
          </button>
          {orderdata._id && (
            <button
              onClick={() => window.history.back()}
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
              setorderdata(initialorderdata);
              setselectedproduct({ data: null, show: false });
            }}
          >
            Clear Form
          </button>
        </div>
      </form>
      {selectedproduct.show && (
        <Productselectmenu
          orderdata={orderdata}
          setorderdata={setorderdata}
          selectedproduct={selectedproduct}
          setselectedproduct={setselectedproduct}
        />
      )}
    </div>
  );
}

export default Wrapper;
