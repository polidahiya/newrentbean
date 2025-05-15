import React from "react";
import { BsSortDownAlt } from "react-icons/bs";
const sortlist = [
  { name: "Default" },
  { name: "Price: Low to high" },
  { name: "Price: High to low" },
];

function Sort() {
  return (
    <>
      <div className="group relative flex items-center gap-2 border px-5 py-1 rounded-md bg-bg1">
        <BsSortDownAlt /> Sort
        <div className="group-hover:block absolute top-full right-0 z-10 p-2 rounded-md border bg-white shadow-md">
          {sortlist.map((item, i) => (
            <div className="hover:bg-bg1 whitespace-nowrap py-1 px-2" key={i}>
              {item?.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Sort;
