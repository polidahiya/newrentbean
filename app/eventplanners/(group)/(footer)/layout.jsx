import React from "react";

function layout({ children }) {
  return (
    <div className="">
      <div
        className="h-40"
        style={{
          background: `#2A7B9B`,
          background: `linear-gradient(90deg, rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)`,
        }}
      ></div>
      <div className="px-5">{children}</div>
    </div>
  );
}

export default layout;
