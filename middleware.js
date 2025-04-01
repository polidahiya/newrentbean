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

  const redirects = {
    "/noida/Fitness_and_Gym": "/Noida/Health-&-Fitness",
    "/Electronic/Electronic": "/Noida/Electronic",
    "/Others/Event-&-Parties": "/Noida/Event-&-Parties",
    "/Etawah/Fitness_and_Gym": "/Noida/Health-&-Fitness",
    "/Health%20&%20Fitness/Fitness_and_Gym": "/Noida/Health-&-Fitness",
    "/Electronic/Entertainment/67b604bfe822b52fba89afac":
      "/Noida/Electronic/Entertainment/67b604bfe822b52fba89afac",
    "/Ghaziabad/Event_and_Parties/Barbeque/barbaque1":
      "/Noida/Event-&-Parties/Party-Items/67b8c3a1d0f7f5406ff6d35c",
    "/Delhi/Others/Baby_Car_Seats/babycarseat1":
      "/Delhi/Others/Baby-Care/67a78a526bc874a1dec69593",
  };
  const pathname = req.nextUrl.pathname;

  if (blockedPaths.some((path) => pathname.includes(path))) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to home
  }

  if (redirects[pathname]) {
    return NextResponse.redirect(new URL(redirects[pathname], req.url));
  }

  const splitpath = pathname.split("/");
  if (splitpath[1] == "null") {
    splitpath[1] = "Delhi";
    const newpath = splitpath.join("/");
    return NextResponse.redirect(new URL(newpath, req.url));
  }

  return NextResponse.next();
}
