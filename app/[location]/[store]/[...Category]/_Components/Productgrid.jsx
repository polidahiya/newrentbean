import React from "react";

function Productgrid({ children }) {
  return (
    <>
      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(176px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] place-items-center gap-2 md:gap-5 mt-5 mb-10">
        {children}
      </div>
    </>
  );
}

export default Productgrid;
