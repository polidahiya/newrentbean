import React from "react";
import Wrapper from "./Wrapper";
import DeviceDetector from "../../_helperfunctions/Devicedetector";

async function Mobilenav({ params }) {
  const rawParams = await params;
  const { location = "Delhi", store = "Rent" } = rawParams ?? {};

  const Device = await DeviceDetector();

  return (
    <>
      {(Device === "mobile" || Device === "tablet") && (
        <Wrapper store={store} location={location} />
      )}
    </>
  );
}

export default Mobilenav;
