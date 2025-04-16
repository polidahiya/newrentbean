import React from "react";
import Homepage from "@/app/_components/Homepage/Homepage";
import { cities, citiesAndLocations } from "@/app/commondata";
import { notFound } from "next/navigation";
import Wrapper from "./Wrapper";

async function page({ params }) {
  const allparams = await params;
  const location = decodeURIComponent(allparams?.location);
  const store = decodeURIComponent(allparams?.store);
  // undefined location
  if (
    (!cities.includes(location) && !citiesAndLocations.includes(location)) ||
    !["Buy", "Rent"].includes(store)
  )
    notFound();

  return (
    <Wrapper store={store}>
      <Homepage location={location} store={store} />;
    </Wrapper>
  );
}

export default page;
