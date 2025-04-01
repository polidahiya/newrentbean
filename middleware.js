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
    "/Gurgaon/Furniture/Bed/bed2": "/Noida/Furniture/Beds",
    "/Search/Electronic": "/Noida/Electronic",
    "/Event%20&%20Parties/Event-&-Parties": "/Noida/Event-&-Parties",
    "/noida/Fitness_and_Gym": "/Noida/Health-&-Fitness",
    "/Search/Electronic/Laptops": "/Noida/Electronic/Laptops",
    "/Noida/Event_and_Parties/Beer_Tower":
      "/Noida/Event-&-Parties/Party-Items/67b8cee3dca7b40724c75ce3",
    "/Ghaziabad/Furniture/Bed/bed4": "/Noida/Furniture/Beds",
    "/Ghaziabad/Electronics/Projector/projector1": "/",
    "/Gurgaon/Electronics/Laptop/laptop1": "/Noida/Electronic/Laptops",
    "/Electronic/Electronic": "/Noida/Electronic",
    "/Others/Event-&-Parties": "/Noida/Event-&-Parties",
    "/Etawah/Fitness_and_Gym": "/Noida/Health-&-Fitness",
    "/Gurgaon/Others/Baby_Carrier/babycarrier1": "/Noida/Others/Baby-Care",
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
    return NextResponse.redirect(new URL("/", req.url)); // Permanent redirect to home
  }

  if (redirects[pathname]) {
    return NextResponse.redirect(new URL(redirects[pathname], req.url), {
      status: 301,
    }); // Permanent redirect
  }

  const splitpath = pathname.split("/");
  if (splitpath[1] == "null") {
    splitpath[1] = "Delhi";
    const newpath = splitpath.join("/");
    return NextResponse.redirect(new URL(newpath, req.url), { status: 301 });
  }

  return NextResponse.next();
}
