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
import ProductCard from "./Productcard";
import FormattedDate from "@/app/_components/_helperfunctions/Formateddate";
import { useRouter } from "next/navigation";

function Ordercard({ item }) {
  const router = useRouter();
  const { setmessagefn, setinvoicedata, setshowdialog } = AppContextfn();

  const [note, setnote] = useState(item?.note || "");
  const [showorder, setshoworder] = useState(true);
  const [open, setopen] = useState(false);
  const [status, setstatus] = useState(item?.status);

  const changestatusfn = async (newStatus) => {
    const res = await changestatus(item._id, newStatus);
    if (res?.status === 200) {
      setstatus(newStatus);
    }
    setmessagefn(res?.message);
  };

  const handleDelete = async () => {
    const res = await deleteorder(item._id);
    if (res?.status === 200) {
      setshoworder(false);
    }
    setmessagefn(res?.message);
  };

  if (!showorder) return null;

  return (
    <div className="relative flex flex-col md:flex-row items-start gap-5 shadow-md my-5 p-4 pt-12 md:pt-4">
      <div className="flex flex-col items-start gap-2 w-full">
        <table className="text-sm text-gray-700 w-full border-collapse">
          <tbody>
            <InfoRow label="Order ID" value={item?._id} />
            <InfoRow label="Order Status" value={orderstages[status]} />
            {item?.paymentMethod === "online" && (
              <tr>
                <td className="font-bold border py-1 px-2">Payment Status</td>
                <td className="border py-1 px-2 flex items-center gap-2">
                  <span
                    className={`h-[15px] aspect-square rounded-full ${
                      item?.paymentStatus === "success"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></span>
                  {item?.paymentStatus}
                </td>
              </tr>
            )}
            <InfoRow label="Payment Method" value={item?.paymentMethod} />
            <InfoRow label="User Name" value={item?.userdata?.username} />
            <InfoRow label="User Email" value={item?.userdata?.email} />
            <InfoRow
              label="User Phone Number"
              value={item?.userdata?.phonenum}
            />
            <InfoRow label="User Address" value={item?.userdata?.address} />
            <InfoRow
              label="Order Date and Time"
              value={FormattedDate(item?.createdAt)}
            />
            <InfoRow label="Location" value={item?.location} />
            {item?.delivered_date && (
              <InfoRow
                label="Delivered Date"
                value={FormattedDate(item?.delivered_date)}
              />
            )}
          </tbody>
        </table>
        <hr className="my-3 border-gray-300" />
        {/* Products toggle */}
        <button
          className="px-5 py-1 rounded-full bg-theme text-white"
          onClick={() => setopen((pre) => !pre)}
        >
          {open ? "Close" : "Open"}
        </button>

        {open && (
          <>
            <div className="w-full flex flex-wrap gap-2 justify-center">
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
            {/* Note and Invoice Section */}
            <div className="w-full mt-6 space-y-4">
              {/* Note Box */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Internal Note
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <textarea
                    className="w-full border border-slate-300 min-h-[80px] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-theme"
                    placeholder="Write a note here..."
                    value={note}
                    onChange={(e) => setnote(e.target.value)}
                  ></textarea>
                  <button
                    className="h-[40px] px-6 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm self-start"
                    onClick={async () => {
                      const res = await updatenote(item._id, note);
                      setmessagefn(res?.message);
                    }}
                  >
                    Save Note
                  </button>
                </div>
              </div>

              {/* Invoice Button */}
              <div>
                <button
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
                  onClick={() => {
                    setinvoicedata(item);
                    router.push("/admin/invoice");
                  }}
                >
                  Generate Invoice
                </button>
              </div>
            </div>
          </>
        )}

        {/* Action buttons */}
        <div className="absolute top-3.5 right-3.5 flex gap-2 z-10">
          {/* Status select */}
          <select
            className="border border-slate-300 px-2 py-1 bg-white"
            value={status}
            onChange={(e) => changestatusfn(Number(e.target.value))}
          >
            <option value={0}>All Orders</option>
            <option value={1}>Processing</option>
            <option value={2}>Shipped</option>
            <option value={3}>Delivered</option>
            <option value={4}>Canceled</option>
            <option value={5}>Refunded</option>
            <option value={6}>Completed</option>
          </select>

          {/* Delete button */}
          <button
            className="border border-slate-300 bg-white h-[30px] aspect-square flex items-center justify-center"
            onClick={async () => {
              setshowdialog({
                show: true,
                title: "Delete?",
                continue: handleDelete,
                type: false,
              });
            }}
            aria-label="Cancel"
            title="Cancel"
          >
            <AiOutlineDelete />
          </button>
        </div>
      </div>
    </div>
  );
}

// Inline info display
const InfoRow = ({ label, value }) => (
  <tr>
    <td className="font-bold border py-1 px-2 w-[180px]">{label}</td>
    <td className="border py-1 px-2">{value}</td>
  </tr>
);

export default Ordercard;
