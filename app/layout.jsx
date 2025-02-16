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

export const metadata = {
  title: "Rentbean - Best Solid Wood Furniture in India",
  description:
    "Discover the best solid wood furniture in India. Shop Sheesham wood furniture, dining tables, sofas, and more online at affordable prices.",
  keywords:
    "Wholesale solid wood furniture, Solid wood furniture online, Best solid wood furniture, Solid wood furniture near me, Solid wood furniture price, Cheap solid wood furniture, Sheesham wood furniture, Furniture market near me, Kirti Nagar furniture market, Bedroom furniture, Dining table, Sofa set, Rentbean furniture",
  openGraph: {
    images: `${domain}/minlogo.png`,
  },
  manifest: "/manifest.json",
};

export default async function RootLayout({ children }) {
  const allcookies = await cookies();
  const token = allcookies.get("token");
  const parseduserdata = allcookies.get("userdata")?.value;
  const userdata = parseduserdata ? JSON.parse(parseduserdata) : null;
  const rblocation = allcookies.get("rblocation")?.value;
  const cookiecart = allcookies.get("rentbeancart")?.value;
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
          content="44c7e34daae240451f1159d0ec6cb12b"
        />
        {/* ld json */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Rentbean",
              url: "https://Rentbean.in",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://Rentbean.in/Search?query={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <Appwrapper
        token={token}
        userdata={userdata}
        rblocation={rblocation}
        parsedCart={parsedCart}
        storetype={storetype}
      >
        <body className="antialiased max-w-[1500px] mx-auto">
          <Message />
          <Confirmdialogbox />
          <Location />
          <div>{children}</div>
          {/* <Logininstant /> */}
          <FIxedbuttons />
        </body>
      </Appwrapper>
    </html>
  );
}
