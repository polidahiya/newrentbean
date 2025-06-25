import React from "react";
import Page from "./_comps/Publicpage";
import { cookies } from "next/headers";
import Ordersplacednotif from "./_comps/Ordersplacednotif";

async function page() {
  const allcookies = await cookies();
  const token = allcookies?.get("token")?.value;
  const rawuserdata = allcookies?.get("userdata")?.value;
  const userdata = rawuserdata ? JSON.parse(rawuserdata) : null;
  
  return (
    <>
      <Ordersplacednotif />
      <Page userdata={userdata} token={token} />
    </>
  );
}

export default page;
