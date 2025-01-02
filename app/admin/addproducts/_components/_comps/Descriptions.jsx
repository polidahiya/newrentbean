import React from "react";
import { AppContextfn } from "@/app/Context";

function Descriptions() {
  const { addproduct, setaddproduct } = AppContextfn();

  const handleArrayChange = (e, index, key) => {
    const newArray = [...addproduct[key]];
    newArray[index] = e.target.value;
    setaddproduct({
      ...addproduct,
      [key]: newArray,
    });
  };
  
  return (
    <div className="flex flex-col items-center gap-[10px] mt-[30px] px-[20px]">
      <label className="text-center mt-[30px] text-[20px] font-bold">
        Descriptions
      </label>
      {addproduct.desc.map((descItem, index) => (
        <div
          key={index}
          className="w-full flex gap-[10px] bg-slate-300 p-[5px]"
        >
          <input
            type="text"
            value={descItem}
            className="h-[30px] w-full outline-none rounded-[10px] px-[20px]"
            onChange={(e) => handleArrayChange(e, index, "desc")}
          />
          <button
            className="h-[30px] aspect-square bg-red-600 text-white rounded-[10px] border border-slate-300"
            onClick={() => {
              const newdesc = [...addproduct.desc];
              newdesc.splice(index, 1);

              setaddproduct({
                ...addproduct,
                desc: newdesc,
              });
            }}
          >
            X
          </button>
        </div>
      ))}
      <button
        className="h-[30px] w-[100px] bg-green-600 text-white rounded-[10px] "
        onClick={() => {
          setaddproduct({ ...addproduct, desc: [...addproduct.desc, ""] });
        }}
      >
        +
      </button>
    </div>
  );
}

export default Descriptions;
