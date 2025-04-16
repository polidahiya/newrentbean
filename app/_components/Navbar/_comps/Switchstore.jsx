"use client";
import React from "react";
import { MdTimer } from "react-icons/md";
import { IoBagCheck } from "react-icons/io5";
import { AppContextfn } from "@/app/Context";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function Switchstore() {
  const { isrentalstore, setisrentalstore } = AppContextfn();
  const path = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.toString();
  const queryString = query ? `?${query}` : "";

  return (
    <div className="flex items-center justify-center gap-2">
      <Link
        href={`/Delhi/Rent${queryString}`}
        className={`w-full flex items-center justify-center gap-1 border px-5 py-1 rounded-lg ${
          isrentalstore ? "text-white bg-theme" : "bg-bg1"
        }`}
        onClick={(e) => {
          e.preventDefault();
          const newPath = path.replace("Buy", "Rent") + queryString;
          router.replace(newPath);
          setisrentalstore(true);
        }}
      >
        <MdTimer />
        Rent
      </Link>
      <Link
        href={`/Delhi/Buy${queryString}`}
        className={`w-full flex items-center justify-center gap-1 border px-5 py-1 rounded-lg ${
          !isrentalstore ? "text-white bg-cyan-600" : "bg-bg1"
        }`}
        onClick={(e) => {
          e.preventDefault();
          const newPath = path.replace("Rent", "Buy") + queryString;
          router.replace(newPath);
          setisrentalstore(false);
        }}
      >
        <IoBagCheck />
        Buy
      </Link>
    </div>
  );
}

export default Switchstore;
