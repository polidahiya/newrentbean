import React from "react";
import { cookies } from "next/headers";
import Form from "./Form";
import { redirect } from "next/navigation";

function page() {
  let token = cookies().get("token");
  if (!token) redirect("/loginlogout");

  let userdata = cookies().get("userdata")?.value;
  if (userdata) {
    userdata = JSON.parse(cookies().get("userdata")?.value);
  }

  return (
    <div
      className="flex items-center justify-center px-[10px] md:px-[40px]"
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
