import Link from "next/link";
import React from "react";
import Ordersrefreshbutton from "./Ordersrefreshbutton";
import { IoIosArrowDown } from "react-icons/io";

function Selectordertype({ ordertype, Refreshorders, totalorders }) {
  const orderTypes = [
    "Orders",
    "Processing",
    "Shipped",
    "Delivered",
    "Canceled",
    "Refunded",
    "Completed",
  ];

  return (
    <div className="w-full flex flex-wrap gap-2 items-center">
      <div className={`group relative w-fit`}>
        <div className="flex items-center gap-2 px-2 md:px-5 py-1 rounded-md border cursor-pointer">
          {orderTypes[ordertype]}
          <IoIosArrowDown className="group-hover:rotate-180 duration-300" />
        </div>
        <div className="group-hover:block hidden absolute top-0 right-0 z-10 w-full indent-0">
          <div className="mt-10 p-2 rounded-md border bg-white shadow-md float-left">
            {orderTypes.map((order, i) => {
              const isActive = ordertype == i;
              return (
                <Link
                  key={i}
                  href={`/admin/Orders/${i}`}
                  className={`block hover:bg-bg1 whitespace-nowrap py-1 px-2 ${
                    isActive && "text-theme"
                  }`}
                >
                  {order}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="px-2 md:px-5 py-1 rounded-md border ">
        <span className="text-gray-500">Total Orders:</span> {totalorders}
      </div>
      <Link href="/admin/Orders/Add" className="px-2 md:px-5 py-1 rounded-md border">
        Add Order
      </Link>
      <div className="ml-auto">
        <Ordersrefreshbutton Refreshorders={Refreshorders} />
      </div>
    </div>
  );
}

export default Selectordertype;
