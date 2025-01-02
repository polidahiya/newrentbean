"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";
import { AppContextfn } from "@/app/Context";
import Cookies from "js-cookie";

export default function Products({ item, i }) {
  const { cart, setcart, setmessagefn } = AppContextfn();
  const fallbackImage = "/default-fallback-image.png";
  const color = item.split(",")[1];
  const product = cart[item];

  const [imgSrc, setImgSrc] = useState(
    product.colorpalets[product.selectedcolor].images[0]
  );

  const handleImageError = () => setImgSrc(fallbackImage);

  const priceBeforeDiscount =
    product.discount > 0
      ? Math.floor((product.price / (100 - product.discount)) * 100)
      : null;

  const updateCartQuantity = (increment) => {
    setcart((prev) => {
      const newQuantity = Math.max(
        1,
        Math.min(10, product.quantity + increment)
      );
      const updatedCart = {
        ...prev,
        [item]: { ...product, quantity: newQuantity },
      };
      Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 });
      return updatedCart;
    });
  };

  const handleRemoveProduct = () => {
    const newCart = { ...cart };
    delete newCart[item];
    Cookies.set("cart", JSON.stringify(newCart), { expires: 7 });
    setcart(newCart);
    setmessagefn("Product Removed");
  };

  return (
    <div className="flex flex-col gap-[20px] w-full p-[20px]">
      {i !== 0 && <hr />}
      <div className="flex flex-col md:flex-row gap-[20px] md:h-[150px]">
        <Link
          href={`/${product.category}/${product.subcat}/${product._id}?color=${color}`}
          className="w-full md:w-auto aspect-[2/1] md:h-full md:aspect-square border border-slate-300"
        >
          <Image
            src={imgSrc}
            alt={product.name}
            height={200}
            width={200}
            className="h-full w-full aspect-[2/1] md:aspect-square object-contain object-center"
            onError={handleImageError}
          />
        </Link>
        <div className="flex flex-col h-full w-full">
          <h2 className="font-bold text-[18px] text-ellipsis overflow-hidden ">
            {product.name}
          </h2>
          <p className="font-bold text-gray-500">
            By:{" "}
            <span className="bg-theme bg-clip-text text-transparent">
              AdoreFurnix
            </span>
          </p>
          <p className="font-bold flex gap-[10px] items-baseline mt-[10px]">
            {priceBeforeDiscount && (
              <span className="text-gray-500 line-through">
                ₹
                {(priceBeforeDiscount * product.quantity).toLocaleString(
                  "en-IN"
                )}
              </span>
            )}
            <span className="text-[20px] text-black">
              ₹{(product.price * product.quantity).toLocaleString("en-IN")}
            </span>
            {priceBeforeDiscount && (
              <span className="text-[14px] text-green-500 font-semibold">
                {product.discount}% OFF
              </span>
            )}
          </p>
          <div className="flex gap-[20px] h-[30px] mt-[20px] md:mt-auto">
            <div className="flex items-center gap-[5px] h-full">
              <button
                className="h-full aspect-square rounded-[5px] border border-slate-300"
                onClick={() => product.quantity > 1 && updateCartQuantity(-1)}
              >
                -
              </button>
              <span className="h-full flex items-center justify-center px-[20px] border border-slate-300 rounded-[5px]">
                {product.quantity}
              </span>
              <button
                className="h-full aspect-square rounded-[5px] border border-slate-300"
                onClick={() => product.quantity < 10 && updateCartQuantity(1)}
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
