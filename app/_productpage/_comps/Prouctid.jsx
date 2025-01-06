"use client";
import React from "react";
import { MdContentCopy } from "react-icons/md";
import copytoclipboard from "@/app/_components/_helperfunctions/copytoclipboard";
import { AppContextfn } from "@/app/Context";

function Prouctid({ sku }) {
  const { setmessagefn } = AppContextfn();
  return (
    <p className="font-semibold my-3 text-center">
      SKU : <span className="">{sku}</span>
      <MdContentCopy
        className="inline-block ml-2 text-theme cursor-pointer"
        onClick={() => {
          copytoclipboard(sku, () => {
            setmessagefn("Copied to clipboard");
          });
        }}
      />
    </p>
  );
}

export default Prouctid;
