"use client";
import React from "react";
import { FaSitemap } from "react-icons/fa";
import Link from "next/link";
import { AppContextfn } from "@/app/Context";

function Sitemapbutton() {
  const { isrentalstore } = AppContextfn();
  return (
    <Link
      href={`/Sitemap/${isrentalstore ? "Rent" : "Buy"}`}
      className="flex items-center gap-1"
      prefetch={false}
    >
      <FaSitemap className="text-yellow-500" />
      Site map
    </Link>
  );
}

export default Sitemapbutton;
