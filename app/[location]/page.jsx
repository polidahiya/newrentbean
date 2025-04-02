import React from "react";
import Homepage from "../_components/Homepage/Homepage";
import { cities, citiesAndLocations } from "../commondata";
import { notFound } from "next/navigation";

async function page({ params }) {
  const allparams = await params;
  const location = decodeURIComponent(allparams?.location);

  // undefined location
  if (!cities.includes(location) && !citiesAndLocations.includes(location))
    notFound();

  return <Homepage location={location} />;
}

export default page;
