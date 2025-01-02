import React from "react";
import Userdetails from "./_components/Userdetails";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function page() {
  const token = cookies().get("token");
  if (token) redirect("/");
  return (
    <div
      className="relative flex items-center justify-center py-[20px]"
      style={{
        background: "url(/images/loginwallpaper.jpg) center left / cover",
        minHeight: "calc(100vh - 60px)",
      }}
    >
      <Userdetails />
    </div>
  );
}

export default page;
