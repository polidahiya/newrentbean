"use client";
import React from "react";
import { AppContextfn } from "@/app/Context";
import { Deletetravelpackage } from "../Serveraction";
import Revalidatepathfn from "@/app/_serveractions/Revalidatepathfn";

function Deletebutton({ item }) {
  const { setshowdialog, setmessagefn } = AppContextfn();
  return (
    <button
      className="px-3 py-2 text-white bg-red-500 rounded-md"
      onClick={() => {
        setshowdialog({
          show: true,
          title: "Delete?",
          continue: async () => {
            const res = await Deletetravelpackage(item);
            setmessagefn(res?.message);
            if (res?.status === 200) Revalidatepathfn("/Travel");
          },
          type: false,
        });
      }}
    >
      Delete
    </button>
  );
}

export default Deletebutton;
