import React from "react";
import Nextimage from "@/app/_components/Nextimage";
import Link from "next/link";
import { months } from "@/app/commondata";
import { selectedtenure } from "@/app/_components/_helperfunctions/selectedtenure";
import Controls from "./comps/Controls";

export default function Products({ cartproductid, item, i, location, store }) {
  const tenure = selectedtenure(item, location);
  const finaltenure = tenure?.all;
  const selectedt = tenure?.selected;
  const totalprice = selectedt?.price;

  return (
    <div className="flex flex-col gap-5 w-full p-2">
      {i !== 0 && <hr />}
      <div className="flex flex-col md:flex-row gap-5 md:h-60">
        <Link
          href={`/${location}/${store}/${item?.category}/${item?.subcat}/${item?._id}`}
          className="w-full md:w-auto aspect-[2/1] md:h-full md:aspect-square"
        >
          <Nextimage
            src={item?.images[0]}
            alt={item?.name}
            height={100}
            width={100}
            className="h-full w-full aspect-[2/1] md:aspect-square object-contain md:object-cover object-center"
          />
        </Link>
        <div className="flex flex-col h-full w-full">
          <h2 className="font-bold text-xl font-recline tracking-wider text-ellipsis overflow-hidden ">
            {item.name}
          </h2>
          <p className="font-bold text-gray-500">
            By:{" "}
            <span className="bg-theme bg-clip-text text-transparent">
              Rentbean
            </span>
          </p>
          <p className="font-bold text-gray-500 font-recline mt-auto">
            {cartproductid.split("-")[1] == "Rent" ? "On Rent" : "For Buy"}
          </p>
          {cartproductid.split("-")[1] == "Rent" && (
            <p>
              Tenure Start Date: {item?.tenureStart?.date}{" "}
              {months[item?.tenureStart?.month]} {item?.tenureStart?.year}
            </p>
          )}
          {cartproductid.split("-")[1] == "Rent" ? (
            <>
              <p className="text-sm ">
                Rent: ₹{(totalprice * item?.quantity).toLocaleString("en-IN")}
                {"/-"}
              </p>
              <p className="text-sm ">
                Security Deposit : ₹
                {(item?.securitydeposit * item?.quantity).toLocaleString(
                  "en-IN"
                )}
                {"/-"} <span className="text-sky-500">{"(*Refundable)"}</span>
              </p>
              <p className="text-sm ">
                Total : ₹
                {(
                  totalprice * item?.quantity +
                  item?.securitydeposit * item?.quantity
                ).toLocaleString("en-IN")}
                {"/-"}{" "}
                <span className="text-sky-500">
                  {"(Rent + Security Deposit)"}
                </span>
              </p>
            </>
          ) : (
            <>
              <p>
                Price: ₹
                {(item?.buyprice * item?.quantity).toLocaleString("en-IN")}
                {"/-"}
              </p>
            </>
          )}

          <Controls
            item={item}
            finaltenure={finaltenure}
            selectedt={selectedt}
            cartproductid={cartproductid}
          />
        </div>
      </div>
    </div>
  );
}
