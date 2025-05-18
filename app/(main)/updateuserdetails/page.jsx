import React from "react";
import { cookies } from "next/headers";
import Form from "./Form";
import { redirect } from "next/navigation";

async function page() {
  const allcookies = await cookies();
  let token = allcookies.get("token");
  if (!token) redirect("/loginlogout");

  let userdata = allcookies.get("userdata")?.value;
  if (userdata) {
    userdata = JSON.parse(allcookies.get("userdata")?.value);
  }

  return (
    <div
      className="flex items-center justify-center px-[10px] md:px-10"
      style={{
        background: "url(/images/loginwallpaper.jpg) center left / cover",
        minHeight: "calc(100vh - 60px)",
      }}
    >
      <Form userdata={userdata} />
    </div>
  );
}

export default page;
