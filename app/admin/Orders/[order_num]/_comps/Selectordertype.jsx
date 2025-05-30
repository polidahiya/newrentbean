import Link from "next/link";
import React from "react";
import Ordersrefreshbutton from "./Ordersrefreshbutton";

function Selectordertype({ ordertype, Refreshorders }) {
  const orderTypes = [
    { id: 0, label: "Orders" },
    { id: 1, label: "Processing" },
    { id: 2, label: "Shipped" },
    { id: 3, label: "Delivered" },
    { id: 4, label: "Canceled" },
    { id: 5, label: "Refunded" },
    { id: 6, label: "Completed" },
  ];

  return (
    <div className="w-full flex flex-wrap gap-2 items-center">
      {orderTypes.map((order) => {
        const isActive = ordertype == order.id;
        return (
          <Link
            key={order.id}
            href={`/admin/Orders/${order.id}`}
            className={`text-sm px-3 py-1 rounded-full transition-all border
              ${
                isActive
                  ? "bg-theme text-white border-theme"
                  : "bg-gray-100  hover:bg-theme hover:text-white hover:border-theme"
              }`}
          >
            {order.label}
          </Link>
        );
      })}

      <div className="ml-auto">
        <Ordersrefreshbutton Refreshorders={Refreshorders} />
      </div>
    </div>
  );
}

export default Selectordertype;
