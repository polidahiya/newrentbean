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
import Link from "next/link";
import { MdModeEditOutline } from "react-icons/md";

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
    <div className="relative bg-white rounded-xl shadow-lg p-6 my-6 w-full">
      {/* Action Buttons */}
      <div className="absolute top-4 right-4 flex gap-2">
        <select
          className="border border-gray-300 text-sm rounded-md px-2 py-1"
          value={status}
          onChange={(e) => changestatusfn(Number(e.target.value))}
        >
          {orderstages.map((stage, index) => (
            <option key={index} value={index}>
              {stage}
            </option>
          ))}
        </select>
        <Link
          href={`/admin/Orders/Add?edit=${item._id}`}
          className="border border-gray-300 rounded-md p-1 hover:bg-gray-100"
        >
          <MdModeEditOutline size={18} />
        </Link>
        <button
          className="text-red-600 border border-gray-300 rounded-md p-1 hover:bg-red-100"
          onClick={() =>
            setshowdialog({
              show: true,
              title: "Delete?",
              continue: handleDelete,
              type: false,
            })
          }
          aria-label="Delete"
          title="Delete"
        >
          <AiOutlineDelete size={18} />
        </button>
      </div>

      {/* Order Info Table */}
      <div className="text-sm text-gray-800 space-y-1 overflow-x-auto pt-10 md:pt-0">
        <table className="w-full border border-gray-200 rounded-md overflow-hidden text-left text-sm">
          <tbody>
            <InfoRow label="Order Number" value={item?.orderNumber} />
            <InfoRow label="Order Status" value={orderstages[status]} />
            {item?.paymentMethod === "online" && (
              <InfoRow
                label="Payment Status"
                value={
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-3 w-3 rounded-full ${
                        item?.paymentStatus === "success"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></span>
                    {item?.paymentStatus}
                  </div>
                }
              />
            )}
            <InfoRow label="Payment Method" value={item?.paymentMethod} />
            {item?.paymentMethod === "Online" && (
              <InfoRow label="Payment Group ID" value={item?.paymentGroupId} />
            )}
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
      </div>

      {/* Toggle Product View */}
      <div className="mt-4 flex justify-center">
        <button
          className="px-5 py-1.5 rounded-full bg-theme text-white text-sm"
          onClick={() => setopen((prev) => !prev)}
        >
          {open ? "Hide Products" : "Show Products"}
        </button>
      </div>

      {open && (
        <div className="mt-4 space-y-6">
          <div className="flex flex-wrap gap-3 justify-center">
            <ProductCard
              product={item?.product}
              location={item?.location}
              coupon={item?.coupondata}
            />
          </div>

          {/* Notes & Invoice Section */}
          <div className="space-y-4">
            {/* Note Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Internal Note
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <textarea
                  className="w-full border border-gray-300 min-h-[80px] p-3 rounded-md focus:ring-2 focus:ring-theme"
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
        </div>
      )}
    </div>
  );
}

// Inline info display
const InfoRow = ({ label, value }) => (
  <tr className="border-t">
    <td className="font-semibold px-3 py-2 w-48 bg-gray-50">{label}</td>
    <td className="px-3 py-2">{value}</td>
  </tr>
);

export default Ordercard;
