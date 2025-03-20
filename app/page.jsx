import React from "react";
import Homepage from "./_components/Homepage/Homepage";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function page() {
  const location = (await cookies()).get("rblocation")?.value;
  if (location) {
    redirect("/" + location);
  }

  return <Homepage />;
}

export default page;
