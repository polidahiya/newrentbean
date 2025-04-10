import React, { useState } from "react";
import { boxoptions } from "@/app/commondata";

function ALongwithbox({ state, setState, statename }) {
  const [selectedOption, setSelectedOption] = useState("");

  const Handleadd = (e) => {
    const value = e.target.value;
    if (!state.includes(value)) {
      setState((pre) => ({ ...pre, [statename]: [...state, value] }));
    }
    setSelectedOption(""); // Reset select value
  };

  const Handleremove = (value) => {
    setState((pre) => ({
      ...pre,
      [statename]: state.filter((item) => item !== value),
    }));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Along With
      </label>
      <div className="flex items-center gap-2 my-2 flex-wrap">
        {state.map((item, i) => (
          <div
            key={i}
            className="relative flex flex-col items-center justify-center w-32 border overflow-hidden rounded-md"
          >
            <img src={boxoptions[item]?.img} alt={item} className="backdrop-hue-rotate-60" />
            <p className="text-sm text-center pb-1">{item}</p>
            <button
              onClick={() => Handleremove(item)}
              className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors"
              aria-label="Cancel" title="Cancel"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <select
          value={selectedOption}
          onChange={(e) => Handleadd(e)}
          className="block w-full py-2 px-3 border border-gray-300 rounded-md outline-none bg-white"
          aria-label="Select collections"
        >
          <option value="" disabled>
            Select Collections
          </option>
          {Object.keys(boxoptions).map((item, i) => (
            <option key={i} value={item}>
              {item.replace(/-/g, " ")}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ALongwithbox;
