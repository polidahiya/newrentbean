import { useState } from "react";
import Nextimage from "@/app/_components/Nextimage";
import { IoMdArrowDropdown } from "react-icons/io";
import { changeproductstatus } from "@/app/_serveractions/Adminorders";
import { AppContextfn } from "@/app/Context";
import { months } from "@/app/commondata";

export default function ProductCard({
  product,
  orderid,
  productindex,
  location,
}) {
  const [pshowstatus, setpshowstatus] = useState(false);
  const [localStatus, setLocalStatus] = useState(product?.status);

  const {
    name,
    isrentalstore,
    quantity,
    prices,
    buyprice,
    selectedtenure,
    securitydeposit,
    image,
    tenureStart,
  } = product;

  const locationrentprices =
    location in prices ? prices[location] : prices?.Default;
  const tenure = locationrentprices[selectedtenure];

  return (
    <div className="relative bg-white shadow-md rounded-xl overflow-hidden w-full max-w-md">
      {/* Canceled or Refunded Badge */}
      {localStatus !== 0 && <Canceledorrefundedbadge status={localStatus} />}

      <Nextimage
        className="w-full aspect-square object-cover object-center"
        src={image}
        alt="product image"
        width={300}
        height={300}
        loading="lazy"
      />

      <div className="p-4 space-y-2 text-sm text-gray-800">
        <OrderDetail label="Name" value={name} />
        {isrentalstore && (
          <OrderDetail
            label="Tenure Start"
            value={`${tenureStart?.date} ${months[tenureStart?.month]} ${
              tenureStart?.year
            }`}
          />
        )}
        <OrderDetail
          label="Type"
          value={isrentalstore ? "For Rent" : "For Sale"}
        />
        {isrentalstore && (
          <OrderDetail
            label="Duration"
            value={`${tenure?.time} ${tenure?.type}`}
          />
        )}
        <OrderDetail
          label="Price"
          value={`₹${parseInt(
            (isrentalstore ? tenure?.price : buyprice) * quantity,
            10
          ).toLocaleString("en-IN")}/-`}
        />
        <OrderDetail label="Quantity" value={quantity} />
        {isrentalstore && (
          <OrderDetail
            label="Security Deposit"
            value={`₹${parseInt(securitydeposit * quantity, 10).toLocaleString(
              "en-IN"
            )}/-`}
          />
        )}
      </div>

      {/* Status Button */}
      <div className="absolute top-3 right-3 z-20">
        <button
          onClick={() => setpshowstatus((prev) => !prev)}
          className="flex items-center gap-1 px-3 h-[32px] text-sm bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-100 transition"
          aria-label="Change Status"
        >
          Status{" "}
          <IoMdArrowDropdown className={`${pshowstatus && "rotate-180"}`} />
        </button>
      </div>

      {/* Dropdown */}
      {pshowstatus && (
        <ProductstatusOption
          orderid={orderid}
          productindex={productindex}
          setLocalStatus={setLocalStatus}
        />
      )}

      {/* Overlay to close dropdown */}
      {pshowstatus && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setpshowstatus(false)}
        />
      )}
    </div>
  );
}

const ProductstatusOption = ({ orderid, productindex, setLocalStatus }) => {
  const { setmessagefn } = AppContextfn();
  const statusOptions = [
    { label: "None", status: 0 },
    { label: "Canceled", status: 1 },
    { label: "Refunded", status: 2 },
  ];

  const changestatusfn = async (status) => {
    const res = await changeproductstatus(orderid, productindex, status);
    if (res?.status === 200) {
      setLocalStatus(status);
      setmessagefn(res?.message);
    }
  };

  return (
    <div className="absolute top-12 right-3 bg-white border border-slate-300 rounded-md shadow-lg z-30 overflow-hidden">
      {statusOptions.map(({ label, status }) => (
        <button
          key={status}
          onClick={() => changestatusfn(status)}
          className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100"
        >
          {label}
        </button>
      ))}
    </div>
  );
};

const OrderDetail = ({ label, value }) => (
  <p>
    <span className="font-medium">{label}:</span> {value}
  </p>
);

const Canceledorrefundedbadge = ({ status }) => {
  const statusText = status === 1 ? "Canceled" : "Refunded";
  const badgeColor = status === 1 ? "bg-red-500" : "bg-yellow-500";

  return (
    <div
      className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-white rounded-full shadow-md ${badgeColor}`}
    >
      {statusText}
    </div>
  );
};
