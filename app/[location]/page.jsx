import React from "react";
import Homepage from "../_components/Homepage/Homepage";

async function page({ params }) {
  const allparams = await params;
  const location = decodeURIComponent(allparams?.location);

  return <Homepage location={location} />;
}

export default page;
