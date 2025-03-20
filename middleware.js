import { NextResponse } from "next/server";

export function middleware(req) {
  const blockedPaths = [
    "/parameters.yaml",
    "/parameters.json",
    "/parameters.ini",
    "/.env",
    "/config/",
    "/database.php",
    "/security.php",
    "/mailjet.env",
    "/mailchimp.env",
    "/sendgrid_keys.json",
  ];
  
  if (blockedPaths.some((path) => req.nextUrl.pathname.includes(path))) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to home
  }

  if (
    req.nextUrl.pathname === "/Delhi/Others/Baby_Car_Seats/babycarseat1"
  ) {
    return NextResponse.redirect(
      new URL("/Delhi/Others/Baby-Care/67a78a526bc874a1dec69593", req.url)
    );
  }

  return NextResponse.next();
}
