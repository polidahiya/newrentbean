import React from "react";
import DeviceDetector from "../_components/_helperfunctions/Devicedetector";
import LenisWrapper from "../_components/Lensiscroll";

async function layout({ children }) {
  const device = await DeviceDetector();
  return (
    <>
      {device == "desktop" && <LenisWrapper />}
      {children}
    </>
  );
}

export default layout;
