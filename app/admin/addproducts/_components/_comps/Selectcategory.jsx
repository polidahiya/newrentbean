import React from "react";
import { categorylist } from "@/app/commondata";
import { AppContextfn } from "@/app/Context";

function Selectcategory() {
  const { addproduct, setaddproduct } = AppContextfn();

  const handlecategorychange = (e) => {
    const value = e.target.value;
    setaddproduct({
      ...addproduct,
      category: value,
      subcat: categorylist[value]?.subcat[0]?.name,
    });
  };

  const handlesubcategorychange = (e) => {
    const value = e.target.value;
    setaddproduct({
      ...addproduct,
      subcat: value,
    });
  };

  return (
    <div className="flex flex-col md:flex-row  items-center justify-center gap-10 mt-10 px-5">
      <div className="w-full flex gap-5 items-center">
        <label className="flex-1 text-[20px] font-bold ">Category :</label>
        <select
          className="flex-1 p-2 border border-slate-300 outline-none rounded-md"
          value={addproduct?.category}
          onChange={handlecategorychange}
        >
          {Object.keys(categorylist).map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {categorylist[addproduct?.category]?.subcat.length != 0 && (
        <div className="w-full flex gap-5 items-center">
          <label className="flex-1 text-[20px] font-bold ">Sub-Category :</label>
          <select
            className="flex-1 p-2 border border-slate-300 outline-none rounded-md"
            value={addproduct?.subcat}
            onChange={handlesubcategorychange}
          >
            {categorylist[addproduct?.category]?.subcat?.map((item, i) => (
              <option key={i} value={item?.name}>
                {item?.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default Selectcategory;
