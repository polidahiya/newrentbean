"use client";
import { MdOutlineRefresh } from "react-icons/md";
import React, { useState } from "react";

function Ordersrefreshbutton({ Refreshorders }) {
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    if (loading) return;
    setLoading(true);
    const url = new URL(window.location);
    await Refreshorders(url.pathname);
    setLoading(false);
  };

  return (
    <button
      onClick={handleRefresh}
      aria-label="Refresh Orders"
      title="Refresh Orders"
      disabled={loading}
      className={`grid place-content-center w-9 h-9 rounded-full border border-gray-300 text-gray-700 
        hover:bg-gray-100 hover:text-black transition-all duration-200
        ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
    >
      <MdOutlineRefresh
        size={20}
        className={`${loading ? "animate-spin" : ""}`}
      />
    </button>
  );
}

export default Ordersrefreshbutton;
