"use client";
import React, { useEffect } from "react";
import { Addtocartbuttons } from "./Publiccomps";
import { AppContextfn } from "@/app/Context";
import Tenure from "./Tenure";
import Dateselector from "./Dateselector";
import Nextimage from "@/app/_components/Nextimage";
import Switchstore from "./Switchstore";
import pricemaker from "@/app/_components/_helperfunctions/pricemaker";

function Details({ filteredProduct, store, location, isrentalstore }) {
  const { cart, setcart } = AppContextfn();
  const cartproductid = `${filteredProduct?._id}-${
    isrentalstore ? "Rent" : "Buy"
  }`;

  // Function to check if a selected date is in the past
  const today = new Date();
  const isPastDate = (day, month, year) => {
    const timenow = today.getHours();
    const selected = new Date(year, month, timenow > 8 ? day : day + 1);
    return selected < today;
  };

  useEffect(() => {
    if (!cart[cartproductid]?.added) {
      setcart((pre) => {
        const cartitems = Object.keys(pre).reduce((final, key) => {
          if (pre[key].added) {
            final[key] = pre[key];
          }
          return final;
        }, {});

        today.setHours(0, 0, 0, 0); // Normalize today’s date for comparison
        // Default selected date = today + 2 days
        const defaultDate = new Date(today);
        defaultDate.setDate(today.getDate() + 2);

        return {
          ...cartitems,
          [cartproductid]: {
            added: false,
            quantity: 1,
            selectedtenure: 0,
            tenureStart: {
              date: defaultDate.getDate(),
              month: defaultDate.getMonth(),
              year: defaultDate.getFullYear(),
            },
          },
        };
      });
    }
  }, []);

  return (
    <div className="flex-1 w-full lg:min-w-[400px]">
      <section className="w-full p-5 bg-bg1 md:rounded-3xl md:shadow-lg">
        <h1 className="text-xl md:text-2xl font-recline tracking-wider text-center mt-5">
          {filteredProduct?.name}
        </h1>
        {isrentalstore ? (
          ["Both", "Rent"].includes(filteredProduct?.availablefor) ? (
            <>
              <Dateselector
                cart={cart}
                setcart={setcart}
                cartproductid={cartproductid}
                isPastDate={isPastDate}
              />
              <Tenure
                filteredProduct={filteredProduct}
                cartproductid={cartproductid}
              />
            </>
          ) : (
            <Notavailableforstore title="This Product is not available for Rent" />
          )
        ) : ["Both", "Buy"].includes(filteredProduct?.availablefor) ? (
          <PriceDisplay
            filteredProduct={filteredProduct}
            cartproductid={cartproductid}
          />
        ) : (
          <Notavailableforstore title="This product is not available for purchase" />
        )}

        <Addtocartbuttons
          filteredproducts={filteredProduct}
          cartproductid={cartproductid}
          isPastDate={isPastDate}
        />
        <Switchstore
          filteredProduct={filteredProduct}
          location={location}
          store={store}
        />
        <div className="flex items-center justify-center gap-2  mt-5">
          <Deliverytrucksvg />
          <span className="text-[10px]">
            Delivery in 1 or 2 days {isrentalstore && "post KYC"}
          </span>
        </div>
      </section>
    </div>
  );
}

const PriceDisplay = ({ filteredProduct }) => {
  return (
    <div className="mt-10 flex flex-col gap-3 justify-center items-center">
      {filteredProduct?.tags?.includes("Refurbished") && (
        <div className="px-5 py-1 rounded-md bg-cyan-600 text-white inline-block">
          Get Refurbished at :
        </div>
      )}
      {filteredProduct?.tags?.includes("Brand-New") && (
        <div className="px-5 py-1 rounded-md bg-green-600 text-white inline-block">
          Get New at :
        </div>
      )}
      <div
        className="font-bold  text-2xl font-recline text-center"
        itemProp="offers"
        itemScope
        itemType="http://schema.org/Offer"
      >
        {filteredProduct?.buymrp && (
          <span className="line-through text-gray-500 mr-2 text-base">
            {pricemaker(filteredProduct?.buymrp)}
            {"/-"}
          </span>
        )}
        <span>
          {pricemaker(filteredProduct?.buyprice)}
          {"/-"}
        </span>
      </div>
    </div>
  );
};

const Deliverytrucksvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#000"
      version="1.1"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      className="h-[30px]"
    >
      <g>
        <circle cx={256} cy={256} r={256} fill="#E1EFFA" />
        <path
          fill="#BCD4E8"
          d="M396.695 211.325l-18.97 8.307-49.636-49.631-174.676 140.007 5.471 5.473-2.358 1.029 181.862 181.865c81.498-27.699 144.55-95.276 165.816-179.54l-107.509-107.51z"
        />
        <path
          fill="#0575A5"
          d="M396.695 211.325L328.09 211.325 328.09 291.036 156.526 291.036 156.526 316.511 421.117 316.511 421.117 260.324z"
        />
        <path
          fill="#FFF"
          d="M390.597 222.103L351.291 222.103 351.291 262.208 409.664 262.208z"
        />
        <path
          fill="#E1EFFA"
          d="M351.291 222.103L351.291 262.208 409.664 262.208z"
        />
        <path fill="#F28124" d="M156.518 170.01H328.089V291.047H156.518z" />
        <path fill="#FF9D4D" d="M156.518 170.01H328.089V230.521H156.518z" />
        <g fill="#FFF">
          <path d="M265.59 250.9L248.033 239.741 248.033 244.152 156.526 244.152 156.526 257.656 248.033 257.656 248.033 262.057z" />
          <path d="M265.59 210.125L248.033 198.973 248.033 203.379 156.526 203.379 156.526 216.881 248.033 216.881 248.033 221.279z" />
        </g>
        <path
          fill="#03628A"
          d="M242.916 321.004c.205-1.475.335-2.962.335-4.493 0-18.342-14.925-33.267-33.267-33.267-18.355 0-33.272 14.925-33.272 33.267 0 1.531.131 3.018.34 4.493h65.864z"
        />
        <circle cx="209.971" cy="316.518" r="25.477" fill="#283A4D" />
        <path
          fill="#F7F7F7"
          d="M222.449 316.511c0 6.884-5.588 12.467-12.462 12.467-6.889 0-12.475-5.583-12.475-12.467s5.583-12.472 12.475-12.472c6.873-.001 12.462 5.585 12.462 12.472z"
        />
        <path
          fill="#03628A"
          d="M407.496 321.004c.205-1.475.338-2.962.338-4.493 0-18.342-14.917-33.267-33.267-33.267-18.345 0-33.27 14.925-33.27 33.267 0 1.531.136 3.018.338 4.493h65.861z"
        />
        <circle cx="374.554" cy="316.518" r="25.477" fill="#283A4D" />
        <circle cx="374.554" cy="316.518" r="12.472" fill="#F7F7F7" />
        <g fill="#FF8E31">
          <path d="M153.413 297.523H159.649V309.995H153.413z" />
          <path d="M417.997 297.523H424.231V309.995H417.997z" />
        </g>
        <path
          fill="#FFF"
          d="M419.558 269.261H422.668V291.08200000000005H419.558z"
        />
        <g fill="#283A4D">
          <path d="M351.283 268.314H364.38V272.064H351.283z" />
          <path d="M119.296 207.795H150.817V212.46699999999998H119.296z" />
          <path d="M87.782 248.55H150.822V253.21900000000002H87.782z" />
        </g>
      </g>
    </svg>
  );
};

const Notavailableforstore = ({ title }) => {
  return (
    <div className="my-10 text-center">
      <Nextimage
        src="/logo&ui/emoji-sad.png"
        alt="Sad-image-png"
        height={56}
        width={56}
        className="aspect-square w-14 mx-auto opacity-75"
        loading="lazy"
      ></Nextimage>
      <p className="mt-5">{title}</p>
    </div>
  );
};
export default Details;
