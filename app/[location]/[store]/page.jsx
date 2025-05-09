import React from "react";
import Homepage from "@/app/_components/Homepage/Homepage";
import { cities, citiesAndLocations } from "@/app/commondata";
import { notFound } from "next/navigation";
import Wrapper from "./Wrapper";
import { domain } from "@/app/commondata";

async function page({ params }) {
  const allparams = await params;
  const location = decodeURIComponent(allparams?.location);
  const store = decodeURIComponent(allparams?.store);
  // undefined location
  if (
    (!cities.includes(location) && !citiesAndLocations.includes(location)) ||
    !["Buy", "Rent"].includes(store)
  )
    notFound();

  return (
    <Wrapper store={store}>
      <Homepage location={location} store={store} />
    </Wrapper>
  );
}

export const generateMetadata = async ({ params }) => {
  const allparams = await params;
  const location = decodeURIComponent(allparams?.location);
  const store = decodeURIComponent(allparams?.store);
  return {
    title: `Rentbean - Great for flexible rental options in ${location}`,
    description:
      store == "Rent"
        ? `Rent premium products at the best prices in ${location}! From treadmills, gym bikes, cycles, laptops, iPhones, and gaming consoles (PS4, PS5) to home appliances, party essentials, hookahs, baby gear, camping gear, and more—get everything on rent with flexible plans, doorstep delivery, and hassle-free booking. Rent now!`
        : `Buy premium products at unbeatable prices in ${location}! Shop treadmills, gym bikes, laptops, iPhones, gaming consoles (PS4, PS5), home appliances, party essentials, baby gear, and more. Fast delivery, great deals, and quality you can trust.`,
    keywords:
      store == "Rent"
        ? `rent products in ${location}, rent electronics in ${location}, rent fitness equipment in ${location}, treadmill on rent in ${location}, laptop on rent in ${location}, rent iPhone in ${location}, gaming console rental ${location}, home appliances on rent ${location}, party items for rent ${location}, hookah on rent ${location}, baby gear rental ${location}, camping equipment on rent ${location}, affordable rental service ${location}, doorstep delivery rental ${location}
`
        : `buy products online in ${location}, buy electronics in ${location}, shop fitness equipment ${location}, buy treadmill in ${location}, best laptops to buy in ${location}, buy refurbished laptops in ${location}, buy second hand laptops in ${location}, buy iPhone online ${location}, gaming console for sale ${location}, home appliances to buy ${location}, buy party supplies ${location}, baby gear for sale ${location}, camping gear to buy ${location}, affordable products for sale ${location}, online shopping ${location}, fast delivery products ${location}
`,
    openGraph: {
      images: `${domain}/logo&ui/minlogo.png`,
    },
    alternates: {
      canonical: `${domain}/${location}/${store}`,
    },
    // manifest: "/manifest.json",
  };
};

export default page;
