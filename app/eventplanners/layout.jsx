import React from "react";
import "./epstyles.css";
import Navbar from "./_comps/Navbar/Navbar";
import Mobilenav from "./_comps/Navbar/Mobilenav";
import Footer from "./_comps/Footer";

export const metadata = {
  title: "Event Planners",
  description: "",
  manifest: "/eventplanners/manifest.json",
};

function layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <Mobilenav />
    </>
  );
}

export default layout;
