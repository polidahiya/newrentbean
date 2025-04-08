import React from "react";
import "./epstyles.css";
import Navbar from "./_comps/Navbar/Navbar";

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
    </>
  );
}

export default layout;
