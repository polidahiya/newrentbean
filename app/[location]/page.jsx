import React from "react";
import Homepage from "../_components/Homepage/Homepage";
import { cities } from "../commondata";
import { notFound } from "next/navigation";

async function page({ params }) {
  const allparams = await params;
  const location = decodeURIComponent(allparams?.location);
  if (!cities.includes(location)) notFound();

  return <Homepage location={location} />;
}

export default page;
