"use client";
import { MdOutlineRefresh } from "react-icons/md";
import React, { useState } from "react";

function Ordersrefreshbutton({ Refreshorders }) {
  const [loading, setloading] = useState(false);
  return (
    <button
      className=" grid place-content-center h-full aspect-square  border border-slate-300 p-1 md:p-0 rounded-[5px] ml-auto "
      title="Refresh Orderes"
      onClick={async () => {
        setloading(true);
        const url = new URL(window.location);
        await Refreshorders(url.pathname);
        setloading(false);
      }}
    >
      <MdOutlineRefresh className={`${loading && "animate-spin duration-200"}`} />
    </button>
  );
}

export default Ordersrefreshbutton;
