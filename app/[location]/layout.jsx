import React from "react";
import Banner from "../_components/Epfloatingbanner/Banner";

function layout({ children }) {
  return (
    <>
      {children}
      <Banner />
    </>
  );
}

export default layout;
