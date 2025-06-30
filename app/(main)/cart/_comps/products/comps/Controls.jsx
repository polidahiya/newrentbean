"use client";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { AppContextfn } from "@/app/Context";
import { Usecartcontext } from "../../../Cartcontext";
import Revalidatepathfn from "@/app/_serveractions/Revalidatepathfn";
import { usePathname } from "next/navigation";

function Controls({ item, finaltenure, selectedt, cartproductid }) {
  const pathname = usePathname();

  const { setcart, setmessagefn } = AppContextfn(); // Ensure you have access to current cart
  const { setshowtenure } = Usecartcontext();

  const handleQuantityChange = async (slug) => {
    let dorevalidate = false;
    setcart((pre) => {
      const updatedcart = { ...pre };
      const currentItem = updatedcart[cartproductid];
      const newquantity = item.quantity + slug;

      if (newquantity >= 1 && newquantity <= item.maxquantity) {
        dorevalidate = true;
        updatedcart[cartproductid] = {
          ...currentItem,
          quantity: newquantity,
        };
      } else if (newquantity > currentItem.maxquantity) {
        setmessagefn("Maximum quantity reached");
      }

      return updatedcart;
    });

    if (dorevalidate) {
      await Revalidatepathfn(pathname);
    }
  };

  const handleRemoveProduct = async () => {
    setcart((pre) => {
      const updatedcart = { ...pre };
      updatedcart[cartproductid] = {
        ...updatedcart[cartproductid],
        added: false,
      };
      return updatedcart;
    });
    await Revalidatepathfn(pathname);
    setmessagefn("Removed from cart");
  };

  return (
    <div className="flex gap-5 h-[30px] mt-5 md:mt-auto">
      <div className="flex items-center gap-1 h-full">
        <button
          className={`h-full aspect-square rounded-md border border-slate-300 ${
            item.quantity == 1 && "opacity-50"
          }`}
          onClick={() => handleQuantityChange(-1)}
          aria-label="Decrease"
          title="Decrease"
        >
          -
        </button>
        <span className="h-full flex items-center justify-center px-5 border border-slate-300 rounded-md">
          {item.quantity}
        </span>
        <button
          className={`h-full aspect-square rounded-md border border-slate-300 ${
            item.quantity == item.maxquantity && "opacity-50"
          }`}
          onClick={() => handleQuantityChange(1)}
          aria-label="Increase"
          title="Increase"
        >
          +
        </button>
      </div>

      {cartproductid.split("-")[1] == "Rent" && (
        <button
          className="h-full rounded-md px-5 border border-slate-300"
          onClick={() =>
            setshowtenure({
              show: true,
              data: finaltenure,
              cartproductid,
            })
          }
          aria-label="Select Tenure"
          title="Select Tenure"
        >
          {selectedt?.time} {selectedt?.type}
        </button>
      )}

      <button
        className="h-full flex items-center gap-1 border border-slate-300 px-5 rounded-md"
        onClick={handleRemoveProduct}
        aria-label="Remove"
        title="Remove"
      >
        <AiOutlineDelete className="aspect-square" />
        <span className="hidden md:block">Remove</span>
      </button>
    </div>
  );
}

export default Controls;
