import React from "react";
import Page from "./_comps/Publicpage";
import { cookies } from "next/headers";
import Ordersplacednotif from "./_comps/Ordersplacednotif";

async function page() {
  const allcookies = await cookies();
  const token = allcookies?.get("token")?.value;
  const userdata = allcookies?.get("userdata")?.value;
  let parseduserdata;
  if (userdata) {
    parseduserdata = JSON.parse(userdata);
  }
  return (
    <>
      <Ordersplacednotif />
      <Page userdata={parseduserdata} token={token} />
    </>
  );
}

export default page;
