import React from "react";
import {
  Review1,
  Review2,
  Review3,
  Review4,
  Review5,
  Review6,
  Review7,
  Review8,
  Review9,
} from "./Templates";

function Desktop() {
  return (
    <>
      <div className="p-20">
        {/* first */}
        <div className="flex flex-col lg:flex-row">
          <div className="w-full aspect-square">
            <Review1 />
            <Review2 />
          </div>
          <div className="w-full aspect-square">
            <Review3 />
          </div>
          <div className="w-full aspect-square">
            <Review4 />
            <Review5 />
          </div>
        </div>
        {/* second */}
        <div className="flex flex-col lg:flex-row gap-5 -translate-y-10">
          <Review6 />
          <Review7 />
          <Review8 />
          <Review9 />
        </div>
      </div>
    </>
  );
}

export default Desktop;
