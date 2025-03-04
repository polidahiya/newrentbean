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
    return NextResponse.rewrite(new URL("/", req.url)); // Redirect to home
  }

  return NextResponse.next();
}
