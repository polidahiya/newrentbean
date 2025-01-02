"use client";
import React from "react";
import { MdContentCopy } from "react-icons/md";
import copytoclipboard from "@/app/_components/_helperfunctions/copytoclipboard";
import { AppContextfn } from "@/app/Context";

function Prouctid({ pid }) {
  const { setmessagefn } = AppContextfn();
  return (
    <p className="font-semibold my-3">
      SKU : <span className="">{pid}</span>
      <MdContentCopy
        className="inline-block ml-2 text-theme lg:text-inherit lg:hover:text-theme cursor-pointer"
        onClick={() => {
          copytoclipboard(pid, () => {
            setmessagefn("Copied to clipboard");
          });
        }}
      />
    </p>
  );
}

export default Prouctid;
