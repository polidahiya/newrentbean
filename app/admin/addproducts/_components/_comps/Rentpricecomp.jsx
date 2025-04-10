import React from "react";
import { cities } from "@/app/commondata";
import Standardinputfield from "./Standardinputfield";
import Dropdownmenu from "./Dropdownmenu";
import { MdAddToPhotos } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { AppContextfn } from "@/app/Context";

function Rentpricecomp({ data, setdata }) {
  const { setmessagefn } = AppContextfn();

  const handleaddtenure = (key) => {
    const updatedvalue = data;
    updatedvalue.prices[key].push({ time: "", type: "day", price: "" });
    setdata({ ...data, ...updatedvalue });
  };

  const handledeletetenure = (key, index) => {
    const updatedvalue = data;
    updatedvalue.prices[key].splice(index, 1);
    setdata({ ...data, ...updatedvalue });
  };

  const handleaddcity = (value) => {
    if (value in data.prices) {
      setmessagefn("City already exists");
      return;
    }
    setdata((prevData) => ({
      ...prevData,
      prices: {
        ...prevData.prices,
        [value]: prevData.prices.Default.map((item) => ({ ...item })), // Deep copy each item
      },
    }));
  };

  const handledeletecity = (key) => {
    const updatedvalue = data;
    delete updatedvalue.prices[key];
    setdata({ ...data, ...updatedvalue });
  };

  return (
    <div className="border rounded-md p-5">
      <h2 className="p-5 font-bold text-center">Rent price</h2>
      <div className="mt-5">
        {Object.entries(data.prices).map(([key, value], i) => (
          <div key={i} className="mt-5 ">
            <div className="font-semibold text-xl">location : {key}</div>
            <div className="space-y-3 mt-2 overflow-y-scroll">
              {value.map((item, j) => (
                <div key={j} className="flex gap-2 items-end min-w-[450px]">
                  <Standardinputfield
                    titlename="Time"
                    type="number"
                    isRequired={true}
                    value={item.time}
                    onchange={(e) =>
                      setdata((pre) => {
                        const updatedvalue = pre;
                        updatedvalue.prices[key][j].time = e.target.value;
                        return { ...pre, ...updatedvalue };
                      })
                    }
                    clear={() =>
                      setdata((pre) => {
                        const updatedvalue = pre;
                        updatedvalue.prices[key][j].time = "";
                        return { ...pre, ...updatedvalue };
                      })
                    }
                  />
                  <Dropdownmenu
                    title={"Type"}
                    state={item.type}
                    onchange={(value) =>
                      setdata((pre) => {
                        const updatedvalue = pre;
                        updatedvalue.prices[key][j].type = value;
                        return { ...pre, ...updatedvalue };
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
                        const updatedvalue = pre;
                        updatedvalue.prices[key][j].price = e.target.value;
                        return { ...pre, ...updatedvalue };
                      })
                    }
                    clear={() =>
                      setdata((pre) => {
                        const updatedvalue = pre;
                        updatedvalue.prices[key][j].price = "";
                        return { ...pre, ...updatedvalue };
                      })
                    }
                  />
                  <button
                    className="h-9 border bg-white text-red-500 px-3 rounded-md"
                    type="button"
                    onClick={() => handledeletetenure(key, j)}
                    aria-label="Delete" title="Delete"
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
              aria-label="add" title="add"
            >
              <MdAddToPhotos className="inline" /> Add more
            </button>
            {key != "Default" && (
              <button
                type="button"
                className="border border-gray-300 px-5 py-2 text-red-500 rounded-md text-sm mt-2 ml-2"
                onClick={() => {
                  handledeletecity(key);
                }}
                aria-label="Delete City" title="Delete City"
              >
                <AiFillDelete className="inline" /> Delete City
              </button>
            )}
          </div>
        ))}
      </div>
      {/* add a city */}
      <div className="mt-5">
        <Dropdownmenu
          title={"Add a city"}
          state={""}
          onchange={handleaddcity}
          options={["", ...cities]}
        />
      </div>
    </div>
  );
}

export default Rentpricecomp;
