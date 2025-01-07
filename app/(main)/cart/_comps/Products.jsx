"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";
import { AppContextfn } from "@/app/Context";

export default function Products({ item, i }) {
  const { cart, setcart, setmessagefn } = AppContextfn();
  const fallbackImage = "/default-fallback-image.png";
  const product = cart[item];
  const MAX_QUANTITY = product?.maxquantity;

  const [imgSrc, setImgSrc] = useState(product?.image);
  const handleImageError = () => setImgSrc(fallbackImage);

  const handleIncrement = () => {
    if (product?.quantity < MAX_QUANTITY)
      setcart((pre) => {
        const updatedcart = pre;
        updatedcart[cartproductid] = {
          ...updatedcart[cartproductid],
          quantity: updatedcart[cartproductid].quantity + 1,
        };
        return updatedcart;
      });
  };
  const handleDecrement = () => {
    if (product?.quantity > 1)
      setcart((pre) => {
        const updatedcart = pre;
        updatedcart[cartproductid] = {
          ...updatedcart[cartproductid],
          quantity: updatedcart[cartproductid].quantity - 1,
        };
        return updatedcart;
      });
  };
  // add to cart button
  const handleRemoveProduct = () => {
    setcart((pre) => {
      const updatedcart = { ...pre };
      updatedcart[cartproductid] = {
        ...updatedcart[cartproductid],
        added: false,
      };
      return updatedcart;
    });
    setmessagefn("Removed from cart");
  };

  return (
    <div className="flex flex-col gap-[20px] w-full p-[20px]">
      {i !== 0 && <hr />}
      <div className="flex flex-col md:flex-row gap-[20px] md:h-[150px]">
        <Link
          href={`/${product.category}/${product.subcat}/${product._id}`}
          className="w-full md:w-auto aspect-[2/1] md:h-full md:aspect-square border border-slate-300"
        >
          <Image
            src={imgSrc}
            alt={product.name}
            height={100}
            width={100}
            className="h-full w-full aspect-[2/1] md:aspect-square object-contain object-center"
            onError={handleImageError}
          />
        </Link>
        <div className="flex flex-col h-full w-full">
          <h2 className="font-bold text-xl font-recline tracking-wider text-ellipsis overflow-hidden ">
            {product.name}
          </h2>
          <p className="font-bold text-gray-500">
            By:{" "}
            <span className="bg-theme bg-clip-text text-transparent">
              Rentbean
            </span>
          </p>
          <p className="font-bold text-gray-500 font-recline">
            {product?.isrentalstore ? "On Rent" : "Buy"}
          </p>
          <p className="font-bold mt-2">
            ₹{(product.price * product.price).toLocaleString("en-IN")}
          </p>
          <div className="flex gap-[20px] h-[30px] mt-[20px] md:mt-auto">
            <div className="flex items-center gap-1 h-full">
              <button
                className="h-full aspect-square rounded-[5px] border border-slate-300"
                onClick={handleDecrement}
              >
                -
              </button>
              <span className="h-full flex items-center justify-center px-[20px] border border-slate-300 rounded-[5px]">
                {product.quantity}
              </span>
              <button
                className="h-full aspect-square rounded-[5px] border border-slate-300"
                onClick={handleIncrement}
              >
                +
              </button>
            </div>
            <button
              className="h-full border border-slate-300 px-[20px] rounded-full"
              onClick={handleRemoveProduct}
            >
              <span className="hidden md:block">Remove</span>
              <AiOutlineDelete className="md:hidden aspect-square" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
