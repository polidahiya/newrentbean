import React from "react";
import Wrapper from "./Wrapper";
import DeviceDetector from "../../_helperfunctions/Devicedetector";
import { cities } from "@/app/commondata";

async function Mobilenav({ params }) {
  const rawParams = await params;
  const { location = "Delhi", store = "Rent" } = rawParams ?? {};

  const Device = await DeviceDetector();
  const highlightedPaths = [
    ...["Rent", "Buy"].flatMap((item) =>
      cities.map((city) => `/${city}/${item}`)
    ),
  ];

  return (
    <>
      {(Device === "mobile" || Device === "tablet") && (
        <Wrapper
          store={store}
          location={location}
          highlightedPaths={highlightedPaths}
        />
      )}
    </>
  );
}

export default Mobilenav;
