import Link from "next/link";
import React from "react";
import Ordersrefreshbutton from "./Ordersrefreshbutton";

function Selectordertype({ ordertype, Refreshorders }) {
  // Define the order types and their labels
  const orderTypes = [
    { id: 0, label: "All" },
    { id: 1, label: "Processing" },
    { id: 2, label: "Shipped" },
    { id: 3, label: "Delivered" },
    { id: 4, label: "Canceled" },
    { id: 5, label: "Refunded" },
  ];

  return (
    <div className="md:h-[30px] bg-white w-full flex items-center flex-wrap gap-[10px]">
      {orderTypes.map((order) => (
        <Link
          key={order.id}
          href={`/admin/?order=${order.id}`}
          className={`h-full grid place-content-center border border-slate-300 py-1 md:py-0 px-[10px] text-sm md:text-base rounded-[5px] ${
            ordertype == order.id && "bg-theme text-white"
          }`}
        >
          {order.label}
        </Link>
      ))}

      {/* Refresh orders button */}
      <Ordersrefreshbutton Refreshorders={Refreshorders} />
    </div>
  );
}

export default Selectordertype;
