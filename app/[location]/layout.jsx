import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

function layout({ children }) {
  //   const headersList = headers();
  //   const fullUrl = headersList.get("referer") || headersList.get("host");
  //   const pathname = new URL(fullUrl || `http://${headersList.get("host")}`)
  //     .pathname;

  //   const splitpath = pathname.split("/");
  //   if (splitpath[1] == "null") {
  //     splitpath[1] = "Delhi";
  //     const newpath = splitpath.join("/");
  //     redirect(newpath);
  //   }
  return <>{children}</>;
}

export default layout;
