import React from "react";
import { cities } from "@/app/commondata";
import Standardinputfield from "./Standardinputfield";
import Dropdownmenu from "./Dropdownmenu";
import { MdAddToPhotos } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

function Rentpricecomp({ data, setdata }) {
  const handleaddtenure = (key) => {
    const updatedvalue = { ...data };
    updatedvalue.prices[key].push({ time: "0", type: "day", price: "100" });
    setdata({ ...data, updatedvalue });
  };

  const handledeletetenure = (key, index) => {
    const updatedvalue = { ...data };
    updatedvalue.prices[key].splice(index, 1);
    setdata({ ...data, updatedvalue });
  };

  return (
    <div className="border rounded-md p-5">
      <h2 className="p-5 font-bold text-center">Rent price</h2>
      <div className="mt-5">
        {Object.entries(data.prices).map(([key, value], i) => (
          <div key={i} className=" mt-5">
            <div className="font-semibold text-xl">location : {key}</div>
            <div className="space-y-3 mt-2">
              {value.map((item, j) => (
                <div key={j} className="flex gap-2 items-end">
                  <Standardinputfield
                    titlename="Time"
                    type="number"
                    isRequired={true}
                    value={item.time}
                    onchange={(e) =>
                      setdata((pre) => {
                        const updatedvalue = { ...pre };
                        updatedvalue.prices[key][j].time = e.target.value;
                        return { ...pre, updatedvalue };
                      })
                    }
                    clear={() =>
                      setdata((pre) => {
                        const updatedvalue = { ...pre };
                        updatedvalue.prices[key][j].time = "";
                        return { ...pre, updatedvalue };
                      })
                    }
                  />
                  <Dropdownmenu
                    title={"Type"}
                    state={item.type}
                    onchange={(value) =>
                      setdata((pre) => {
                        const updatedvalue = { ...pre };
                        updatedvalue.prices[key][j].type = value;
                        return { ...pre, updatedvalue };
                      })
                    }
                    options={[
                      "day",
                      "days",
                      "week",
                      "weeks",
                      "month",
                      "months",
                      "season",
                      "seasons",
                    ]}
                  />
                  <Standardinputfield
                    titlename="Price"
                    type="number"
                    isRequired={true}
                    value={item.price}
                    onchange={(e) =>
                      setdata((pre) => {
                        const updatedvalue = { ...pre };
                        updatedvalue.prices[key][j].price = e.target.value;
                        return { ...pre, updatedvalue };
                      })
                    }
                    clear={() =>
                      setdata((pre) => {
                        const updatedvalue = { ...pre };
                        updatedvalue.prices[key][j].price = "";
                        return { ...pre, updatedvalue };
                      })
                    }
                  />
                  <button
                    className="h-9 border bg-white text-red-500 px-3 rounded-md"
                    type="button"
                    onClick={() => handledeletetenure(key, j)}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="border border-gray-300 px-5 py-2 rounded-md text-sm mt-2"
              onClick={() => {
                handleaddtenure(key);
              }}
            >
              <MdAddToPhotos className="inline" /> Add more
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rentpricecomp;