import { useState } from "react";
import Image from "next/image";
import { IoMdArrowDropdown } from "react-icons/io";
import { changeproductstatus } from "@/app/_serveractions/Adminorders";
import { AppContextfn } from "@/app/Context";

export default function ProductCard({ product, orderid, productindex }) {
  const [pshowstatus, setpshowstatus] = useState(false);
  const [localStatus, setLocalStatus] = useState(product?.status); // Local state for status

  return (
    <div className={`relative bg-white shadow-lg rounded-lg p-4 md:max-w-80`}>
      {localStatus != 0 && <Canceledorrefundedbadge status={localStatus} />}
      <Image
        className="w-full rounded-t-lg aspect-[4/3] object-cover object-center"
        src={product?.colorpalets[product?.selectedcolor].images[0]}
        alt="product image"
        width={300}
        height={300}
        loading="lazy"
        
      />
      <div className="p-4">
        <OrderDetail label="Name" value={product?.name} />
        <OrderDetail label="Price" value={`Rs ${product?.price}`} />
        <OrderDetail label="Quantity" value={`${product?.quantity}`} />
        <OrderDetail label="Discount" value={`${product?.discount} %`} />
        <OrderDetail label="Dimensions" value={`${product?.Dimensions}`} />
        <ProductColorDetail
          color={product?.colorpalets[product?.selectedcolor]}
        />
      </div>
      {/* status button*/}
      <div className="absolute top-[10px] right-[10px] flex items-center gap-[10px] z-10">
        <button
          className="flex items-center gap-[10px] border border-slate-300 h-[30px] px-[20px] bg-white"
          onClick={() => {
            setpshowstatus((pre) => !pre);
          }}
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
        >
          {label}
        </button>
      ))}
    </div>
  );
};

const OrderDetail = ({ label, value }) => (
  <p className="text-sm text-gray-700">
    <span className="font-bold">{label}:</span> {value}
  </p>
);

const Canceledorrefundedbadge = ({ status }) => {
  return (
    <div
      className={`absolute top-[10px] left-[10px] ${status == 1 && "bg-red-500"}
      ${status == 2 && "bg-yellow-600"} text-white px-[20px] py-[5px]`}
    >
      {status == 1 && "Canceled"}
      {status == 2 && "Refunded"}
    </div>
  );
};

const ProductColorDetail = ({ color }) => (
  <div className="flex items-center gap-2">
    <span className="text-gray-700">Color:</span>
    <span
      className="h-6 w-6 rounded-full inline-block"
      style={{ backgroundColor: color?.color }}
    />
    {color.name}
  </div>
);
