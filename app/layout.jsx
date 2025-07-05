import "./globals.css";
import { Appwrapper } from "./Context";
import Message from "./_components/Message";
import { domain } from "./commondata";
import Script from "next/script";
// import Logininstant from "./_components/Logininstant";
import Googleanayltics from "./_components/Googleanayltics";
import React from "react";
import Confirmdialogbox from "./_components/Confirmdialogbox";
import Location from "./_components/Location";
import FIxedbuttons from "./_components/FIxedbuttons";
import { cookies } from "next/headers";
import { cities } from "./commondata";
import { Mulish } from "next/font/google";
import Clienterror from "./_serveractions/Errorsender/Clienterror";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"], // choose weights you need
  style: ["normal", "italic"], // optional
  display: "swap",
});

export const metadata = {
  title: "Rentbean - Great for flexible rental options.",
  description:
    "Rent premium products at the best prices! From treadmills, gym bikes, cycles, laptops, and iPhones to gaming consoles (PS4, PS5), home appliances, party essentials, hookahs, baby gear, camping equipment, and more—get everything you need on rent with flexible plans. Hassle-free booking, doorstep delivery & affordable rates. Rent now!",
  keywords:
    "rent treadmill, rent cycle, rent gym bike, rent laptop, rent phone, rent iPhone, rent gaming console, rent PS4, rent PS5, rent home appliances, rent party items, rent hookah, rent baby car seat, rent beer tower, rent tent, rent camping gear, rent baby carrier, rent electronics, rent fitness equipment, rent gadgets, rent event items, rent furniture, online rental store, affordable rentals, flexible rental plans, rent near me.",
  openGraph: {
    images: `${domain}/logo&ui/minlogo.png`,
  },
  manifest: "/manifest.json",
  robots: "index, follow",
};

export default async function RootLayout({ children }) {
  const allcookies = await cookies();
  const token = allcookies.get("token");
  const parseduserdata = allcookies.get("userdata")?.value;
  const userdata = parseduserdata ? JSON.parse(parseduserdata) : null;
  const rblocation = allcookies.get("rblocation")?.value;
  const cookiecart = allcookies.get("rentbeancart3")?.value;
  const parsedCart = cookiecart ? JSON.parse(cookiecart) : {};
  const storetype = allcookies.get("storetype")?.value;

  return (
    <html lang="en">
      <head>
        <Googleanayltics />
        {/* recaptcha */}
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        ></Script>
        {/* pinterest site claim */}
        <meta
          name="p:domain_verify"
          content="9e98018f71cfced9ea0ff9df1dd5ebd6"
        />
        {/* ld json */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Rentbean India",
              url: "https://rentbean.in",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://rentbean.in/Delhi/Rent/Search?query={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              publisher: {
                "@type": "Organization",
                name: "RentBean",
                url: "https://rentbean.in",
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "India",
              },
              areaServed: cities.map((item) => ({
                "@type": "City",
                name: item,
              })),
            }),
          }}
        />
        {/* <meta name="theme-color" content="#d68e43" /> */}
      </head>
      <body
        className={`${mulish.className} antialiased max-w-[1900px] mx-auto`}
      >
        <Clienterror />
        <Appwrapper
          token={token}
          userdata={userdata}
          rblocation={rblocation}
          parsedCart={parsedCart}
          storetype={storetype}
        >
          <Message />
          <Confirmdialogbox />
          <Location />
          <div>{children}</div>
          {/* <Logininstant /> */}
          <FIxedbuttons />
        </Appwrapper>
      </body>
    </html>
  );
}
