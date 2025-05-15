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
  const [localStatus, setLocalStatus] = useState(product?.status); // Local state for status

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
    <div
      className={`relative bg-white shadow-lg rounded-lg p-4 h-full md:max-w-80`}
    >
      {localStatus != 0 && <Canceledorrefundedbadge status={localStatus} />}
      <Nextimage
        className="w-full rounded-t-lg aspect-square object-cover object-center"
        src={image}
        alt="product image"
        width={300}
        height={300}
        loading="lazy"
      />
      <div className="p-4">
        <OrderDetail label="Name" value={name} />
        {isrentalstore && (
          <OrderDetail
            label="Tenure start date"
            value={
              tenureStart?.date +
              " " +
              months[tenureStart?.month] +
              " " +
              tenureStart?.year
            }
          />
        )}
        <OrderDetail
          label="Type"
          value={isrentalstore ? "For Rent" : "For Sell"}
        />
        {isrentalstore && (
          <OrderDetail
            label="Duration"
            value={tenure?.time + " " + tenure?.type}
          />
        )}
        <OrderDetail
          label="Price"
          value={`₹${parseInt(
            (isrentalstore ? tenure?.price : buyprice) * quantity,
            10
          ).toLocaleString("en-IN")}/-`}
        />
        <OrderDetail label="Quantity" value={`${quantity}`} />
        {isrentalstore && (
          <OrderDetail
            label="Security Deposit"
            value={`₹${parseInt(securitydeposit * quantity, 10).toLocaleString(
              "en-IN"
            )}/-`}
          />
        )}
      </div>
      {/* status button*/}
      <div className="absolute top-[10px] right-[10px] flex items-center gap-2 z-10">
        <button
          className="flex items-center gap-2 border border-slate-300 h-[30px] px-5 bg-white"
          onClick={() => {
            setpshowstatus((pre) => !pre);
          }}
          aria-label="Change Status"
          title="Change Status"
        >
          Status
          <IoMdArrowDropdown className={`${pshowstatus && "rotate-180"}`} />
        </button>
      </div>
      {/* status options */}
      {pshowstatus && (
        <ProductstatusOption
          orderid={orderid}
          productindex={productindex}
          setLocalStatus={setLocalStatus}
        />
      )}
      {/* black screen */}
      {pshowstatus && (
        <div
          className="fixed top-0 left-0 h-screen w-screen z-[9]"
          onClick={() => {
            setpshowstatus(false);
          }}
        ></div>
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
      setLocalStatus(status); // Update local status to reflect the change
      setmessagefn(res?.message);
    }
  };

  return (
    <div className="absolute top-[50px] right-[10px] flex flex-col items-center p-[5px] bg-white rounded-[10px] shadow-md border border-slate-300 z-10">
      {statusOptions.map(({ label, status }) => (
        <button
          key={status}
          className="w-full p-[5px] lg:hover:bg-slate-100 "
          onClick={() => changestatusfn(status)}
          aria-label={label}
          title={label}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

const OrderDetail = ({ label, value }) => (
  <p className="text-sm  text-gray-700">
    <span className="font-bold">{label}:</span> {value}
  </p>
);

const Canceledorrefundedbadge = ({ status }) => {
  return (
    <div
      className={`absolute top-[10px] left-[10px] ${status == 1 && "bg-red-500"}
      ${status == 2 && "bg-yellow-600"} text-white px-5 py-[5px]`}
    >
      {status == 1 && "Canceled"}
      {status == 2 && "Refunded"}
    </div>
  );
};
