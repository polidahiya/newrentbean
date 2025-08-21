import React from "react";
import LenisWrapper from "../_components/Lensiscroll";
import DeviceDetector from "../_components/_helperfunctions/Devicedetector";
import Footer from "../_components/footer/Footer";
import Navbar from "./_comps/navbar/Navbar";
import { Travelcontextwrapper } from "./Travelcontext";

async function layout({ children }) {
  const device = await DeviceDetector();

  return (
    <Travelcontextwrapper>
      {device == "desktop" && <LenisWrapper />}
      <Navbar />
      {children}
      <Footer />
    </Travelcontextwrapper>
  );
}

export default layout;
