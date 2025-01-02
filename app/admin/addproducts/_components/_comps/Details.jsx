import React from "react";
import { AppContextfn } from "@/app/Context";

function Details() {
  const { addproduct, setaddproduct } = AppContextfn();

  const updatefields = (e) => {
    setaddproduct({ ...addproduct, [e.target.name]: e.target.value });
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-2 p-5">
      <InputField
        label="Name:"
        name="name"
        type="text"
        value={addproduct?.name}
        onChange={updatefields}
      />
      <InputField
        label="Dimensions:"
        name="Dimensions"
        type="text"
        value={addproduct?.Dimensions}
        onChange={updatefields}
      />
      <InputField
        label="Price:"
        name="price"
        type="number"
        value={addproduct?.price}
        onChange={updatefields}
      />
      <InputField
        label="Discount percentage (0-100):"
        name="discount"
        type="number"
        value={addproduct?.discount}
        onChange={updatefields}
      />
      <InputField
        label="Keywords:"
        name="keywords"
        type="text"
        value={addproduct?.keywords}
        onChange={updatefields}
      />
      <AvailableToggle
        available={addproduct?.available}
        setAvailable={(value) =>
          setaddproduct({ ...addproduct, available: value })
        }
      />
      <InputField
        label="Ratings (0-5):"
        name="rating"
        type="number"
        value={addproduct?.rating}
        onChange={updatefields}
      />
    </div>
  );
}

function InputField({ label, name, type, value, onChange }) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full outline-none border border-slate-300 p-2 rounded-md"
      />
    </div>
  );
}

function AvailableToggle({ available, setAvailable }) {
  return (
    <div>
      <label className="py-2">Available:</label>
      <div className="flex items-center gap-[10px]">
        <button
          className={`flex-1 border border-slate-300 rounded-md ${
            available ? "bg-green-600 text-white" : "bg-white"
          } px-4 py-2`}
          onClick={() => setAvailable(true)}
        >
          Yes
        </button>
        <button
          className={`flex-1 border border-slate-300 rounded-md ${
            available ? "bg-white" : "bg-green-600 text-white"
          } px-4 py-2`}
          onClick={() => setAvailable(false)}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default Details;
