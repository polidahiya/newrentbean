import "./globals.css";
import { Appwrapper } from "./Context";
import Message from "./_components/Message";
import { domain } from "./commondata";
import Script from "next/script";
// import Logininstant from "./_components/Logininstant";
import Gotopbutton from "./_components/Gotopbutton";
import Link from "next/link";
import Googleanayltics from "./_components/Googleanayltics";
import { cities } from "./commondata";
import React from "react";
import Confirmdialogbox from "./_components/Confirmdialogbox";
import Location from "./_components/Location";
import { FaWhatsapp } from "react-icons/fa";
import { mobile } from "./commondata";


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

export default function RootLayout({ children }) {
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
      <Appwrapper>
        <body className="antialiased max-w-[1500px] mx-auto">
          <Message />
          <Confirmdialogbox />
          <Location />
          <div>{children}</div>
          {/* <Logininstant /> */}
          <div className="fixed bottom-5 right-5 md:bottom-10 md:right-10 flex flex-col items-end gap-2 z-30">
            <Gotopbutton />
            <Whatsappbutton />
            <Helpbutton />
          </div>
        </body>
      </Appwrapper>
    </html>
  );
}

const Whatsappbutton = () => (
  <Link
    href={`https://wa.me/${mobile.replace(/ /g, "")}?text=${encodeURIComponent(
      "Hi Adorefurnix, I found your products interesting, and I would like to know more!"
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="group bg-theme flex items-center justify-center p-1 rounded-full overflow-hidden"
  >
    <span className="text-white opacity-0 text-sm max-w-0 lg:group-hover:opacity-100 lg:group-hover:max-w-60  lg:group-hover:px-5 whitespace-nowrap transition-all duration-300 ease-in-out">
      Chat with us on WhatsApp
    </span>
    <span className="h-8 aspect-square rounded-full bg-white text-theme grid place-content-center">
      <FaWhatsapp className="text-lg" />
    </span>
  </Link>
);

const Helpbutton = () => (
  <Link
    href="/Contact"
    className="group bg-theme flex items-center justify-center p-1 rounded-full overflow-hidden"
  >
    <span className="text-white opacity-0 text-sm max-w-0 lg:group-hover:opacity-100 lg:group-hover:max-w-32  lg:group-hover:px-5 whitespace-nowrap transition-all duration-300 ease-in-out">
      Need Help
    </span>
    <span className="h-8 aspect-square rounded-full bg-white text-theme grid place-content-center">
      ?
    </span>
  </Link>
);
