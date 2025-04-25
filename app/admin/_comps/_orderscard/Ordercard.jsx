"use client";
import React, { useState } from "react";
import {
  updatenote,
  deleteorder,
  changestatus,
} from "@/app/_serveractions/Adminorders";
import { orderstages } from "@/app/commondata";
import { AppContextfn } from "@/app/Context";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import ProductCard from "./Productcard";
import FormattedDate from "@/app/_components/_helperfunctions/Formateddate";
import { useRouter } from "next/navigation";

function Ordercard({ item }) {
  const router = useRouter();
  const { setmessagefn, setinvoicedata } = AppContextfn();
  const [note, setnote] = useState(item?.note || "");
  const [deleteconfirm, setdeleteconfirm] = useState(false);
  const [showorder, setshoworder] = useState(true);
  const [showstatusmenu, setshowstatusmenu] = useState(false);
  // change status funtion
  const changestatusfn = async (status) => {
    const res = await changestatus(item._id, status);
    if (res?.status == 200) {
      setshoworder(false);
    }
    setmessagefn(res?.message);
  };

  if (showorder)
    return (
      <div
        className={`relative flex flex-col md:flex-row items-start gap-5 shadow-md my-[20px] p-[10px] pt-12 md:pt-[10px]`}
      >
        <div className="flex flex-col items-start gap-1 w-full">
          <OrderDetail label="Order ID" value={item?._id} />
          <OrderDetail label="Order Status" value={orderstages[item?.status]} />
          {item?.paymentMethod == "online" && (
            <p className="text-sm text-gray-700 flex items-center gap-2">
              <span className="font-bold">Payment Status :</span>
              <span
                className={`h-[15px] aspect-square rounded-full ${
                  item?.paymentStatus == "success"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              ></span>
              {item?.paymentStatus}
            </p>
          )}
          <OrderDetail label="PaymentMethod" value={item?.paymentMethod} />
          <OrderDetail label="User Name" value={item?.userdata?.username} />
          <OrderDetail label="User Email" value={item?.userdata?.email} />
          <OrderDetail
            label="User Phone Number"
            value={item?.userdata?.phonenum}
          />
          <OrderDetail label="User Address" value={item?.userdata?.address} />
          <OrderDetail
            label="Order Date and Time"
            value={FormattedDate(item?.createdAt)}
          />
          <OrderDetail label="Location" value={item?.location} />
          {item?.delivered_date && (
            <OrderDetail
              label="Delivered Date"
              value={FormattedDate(item?.delivered_date)}
            />
          )}
          <hr className="my-3 border-gray-300" />
          <div className="w-full flex items-center justify-center gap-2 flex-wrap">
            {item?.products?.map((product, i) => (
              <ProductCard
                key={i}
                product={product}
                orderid={item?._id}
                productindex={i}
                location={item?.location}
              />
            ))}
          </div>

          {/* note */}
          <div className="flex items-end gap-2 w-full mt-5">
            <textarea
              className="h-full w-full border border-slate-300 min-h-[50px] p-[10px]"
              placeholder="Write a note here"
              value={note}
              onChange={(e) => {
                setnote(e.target.value);
              }}
            ></textarea>
            <button
              className="text-white bg-green-600 md:whitespace-nowrap h-[30px] px-5"
              onClick={async () => {
                const res = await updatenote(item?._id, note);
                setmessagefn(res?.message);
              }}
              aria-label="Update Note"
              title="Update Note"
            >
              Update Note
            </button>
          </div>
          {/* invoice button */}
          <button
            className="px-5 py-1 border bg-blue-500 text-white"
            onClick={() => {
              setinvoicedata(item);
              router.push("/admin/invoice");
            }}
            aria-label="Generate Invoice"
            title="Generate Invoice"
          >
            Generate Invoice
          </button>
          <div className="absolute top-[10px] right-[10px] flex items-center gap-2 z-10">
            {/* change status */}
            <button
              className="flex items-center gap-2 border border-slate-300 h-[30px] px-5 bg-white"
              onClick={() => {
                setshowstatusmenu((pre) => !pre);
              }}
              aria-label="Change status"
              title="Change status"
            >
              Change status
              <IoMdArrowDropdown
                className={`${showstatusmenu && "rotate-180"}`}
              />
            </button>
            {/*delete button  */}
            <button
              className=" border border-slate-300 bg-white h-[30px] aspect-square flex items-center justify-center"
              onClick={() => {
                setdeleteconfirm(true);
              }}
              aria-label="Delete Order"
              title="Delete Order"
            >
              <AiOutlineDelete />
            </button>
          </div>

          {/* status menu */}
          {showstatusmenu && (
            <StatusMenuOption changestatusfn={changestatusfn} />
          )}

          {/* delete confirmation */}
          {deleteconfirm && (
            <Deleteconfirmationmenu
              deleteorder={deleteorder}
              setmessagefn={setmessagefn}
              setdeleteconfirm={setdeleteconfirm}
              setshoworder={setshoworder}
              id={item?._id}
            />
          )}
          {/* black screen */}
          {(showstatusmenu || deleteconfirm) && (
            <div
              className="fixed top-0 left-0 h-screen w-screen z-[9]"
              onClick={() => {
                setdeleteconfirm(false);
                setshowstatusmenu(false);
              }}
            ></div>
          )}
        </div>
      </div>
    );
}

const OrderDetail = ({ label, value }) => (
  <p className="text-sm text-gray-700">
    <span className="font-bold">{label}:</span> {value}
  </p>
);

const StatusMenuOption = ({ changestatusfn }) => {
  const statusOptions = [
    { label: "Add to All orders", status: 0 },
    { label: "Add to Processing orders", status: 1 },
    { label: "Add to Shipped orders", status: 2 },
    { label: "Add to Delivered orders", status: 3 },
    { label: "Add to Canceled", status: 4 },
    { label: "Add to Refunded", status: 5 },
    { label: "Add to Completed", status: 6 },
  ];

  return (
    <div className="absolute top-[50px] right-[10px] flex flex-col items-center p-[5px] bg-white rounded-[10px] shadow-md border border-slate-300 z-10">
      {statusOptions.map(({ label, status }) => (
        <button
          key={status}
          className="w-full p-[5px] lg:hover:bg-slate-100"
          onClick={() => changestatusfn(status)}
          aria-label={label}
          title={label}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

const Deleteconfirmationmenu = ({
  deleteorder,
  setmessagefn,
  setdeleteconfirm,
  setshoworder,
  id,
}) => {
  return (
    <div className="absolute top-[50px] right-[10px] flex items-center gap-5 p-5 bg-white rounded-[10px] shadow-md border border-slate-300 z-10">
      <button
        className="text-red-500"
        onClick={async () => {
          const res = await deleteorder(id);
          if (res?.status == 200) {
            setshoworder(false);
          }
          setmessagefn(res?.message);
        }}
        aria-label="Confirm Delete"
        title="Confirm Delete"
      >
        Confirm
      </button>
      <button
        onClick={() => {
          setdeleteconfirm(false);
        }}
        aria-label="Cancel"
        title="Cancel"
      >
        Cancel
      </button>
    </div>
  );
};
//

export default Ordercard;
