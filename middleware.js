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
    "/Furniture/Sofas/67b6102a9a118e904146dca1":"/Delhi/Furniture/Sofas",
    "/Furniture/Beds/67d12e721dc96095ed7b31ea":"/Delhi/Furniture/Beds",
    "/Faridabad/Furniture/Bed/bed3":"/Faridabad/Furniture/Beds",
    "/Ghaziabad/Furniture/Study_Table/studytable6":"/Ghaziabad/Furniture/Study-Tables",
    "/Event%20&%20Parties/Fitness_and_Gym":"/Delhi/Health-&-Fitness",
    "/Event-&-Parties/Party-Items":"/Delhi/Event-&-Parties/Party-Items",
    "/Health-&-Fitness/Weight-&-Rack":"/Delhi",
    "/Faridabad/Electronics/TV/tv1": "/Delhi",
    "/Ghaziabad/Furniture/Bookshelf/bookshelf4": "/Delhi/Furniture/Bookshelves",
    "/Gurgaon/Fitness_and_Gym/Gym_Bikes/gymbike2":
      "/Delhi/Health-&-Fitness/Fitness-Machines/67aa0b20d3c03b8d8dfec665",
    "/Health%20&%20Fitness/Health-&-Fitness/Fitness-Machines":
      "/Delhi/Health-&-Fitness/Fitness-Machines",
    "/Delhi/Electronics/Games/ps41":
      "/Delhi/Electronic/Entertainment/67b95005c27c092372193e24",
    "/Search/Electronics": "/Delhi/Electronic",
    "/Noida/Furniture/Study_Table/studytable5": "/Noida/Furniture/Study-Tables",
    "/Furniture/Center-Tables/67b60ac523429fd41b34842a":
      "/Noida/Furniture/Center-Tables/67b60ac523429fd41b34842a",
    "/Health-&-Fitness/Fitness-Machines/67aa0991926cbba85e25ef59":
      "/Noida/Health-&-Fitness/Fitness-Machines/67aa0991926cbba85e25ef59",
    "/Faridabad/Furniture/Sofa/sofa6": "/Faridabad/Furniture/Sofas",
    "/Electronic/Mobile-%26-Accessories/67beab13214753926787bfd2":
      "/Noida/Electronic/Mobile-&-Accessories/67beab13214753926787bfd2",
    "/Gurgaon/Event_and_Parties/Hookah/hookah2":
      "/Gurgaon/Event-&-Parties/Party-Items",
    "/Furniture/Beds/67a88b18a1ffaa422456899b":
      "/Noida/Furniture/Beds/67a88b18a1ffaa422456899b",
    "/Search/Fitness_and_Gym": "/Delhi/Health-&-Fitness/Fitness-Machines",
    "/Delhi/Furniture/Bookshelf": "/Delhi/Furniture/Bookshelves",
    "/Electronic/Mobile-%26-Accessories/67c13a4f779915d391caa3f4":
      "/Noida/Electronic/Mobile-&-Accessories/67c13a4f779915d391caa3f4",
    "/Gurgaon/Furniture/Bed/bed2": "/Gurgaon/Furniture/Beds",
    "/Search/Electronic": "/Delhi/Electronic",
    "/Event%20&%20Parties/Event-&-Parties": "/Delhi/Event-&-Parties",
    "/noida/Fitness_and_Gym": "/Noida/Health-&-Fitness",
    "/Search/Electronic/Laptops": "/Delhi/Electronic/Laptops",
    "/Noida/Event_and_Parties/Beer_Tower":
      "/Noida/Event-&-Parties/Party-Items/67b8cee3dca7b40724c75ce3",
    "/Ghaziabad/Furniture/Bed/bed4": "/Ghaziabad/Furniture/Beds",
    "/Ghaziabad/Electronics/Projector/projector1": "/",
    "/Gurgaon/Electronics/Laptop/laptop1": "/Gurgaon/Electronic/Laptops",
    "/Electronic/Electronic": "/Delhi/Electronic",
    "/Others/Event-&-Parties": "/Delhi/Event-&-Parties",
    "/Etawah/Fitness_and_Gym": "/Etawah/Health-&-Fitness",
    "/Gurgaon/Others/Baby_Carrier/babycarrier1": "/Gurgaon/Others/Baby-Care",
    "/Health%20&%20Fitness/Fitness_and_Gym": "/Delhi/Health-&-Fitness",
    "/Electronic/Entertainment/67b604bfe822b52fba89afac":
      "/Delhi/Electronic/Entertainment/67b604bfe822b52fba89afac",
    "/Ghaziabad/Event_and_Parties/Barbeque/barbaque1":
      "/Ghaziabad/Event-&-Parties/Party-Items/67b8c3a1d0f7f5406ff6d35c",
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
