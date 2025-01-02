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

export const metadata = {
  title:
    "Adorefurnix - Best Solid Wood Furniture in India",
  description:
    "Discover the best solid wood furniture in India. Shop Sheesham wood furniture, dining tables, sofas, and more online at affordable prices.",
  keywords:
    "Wholesale solid wood furniture, Solid wood furniture online, Best solid wood furniture, Solid wood furniture near me, Solid wood furniture price, Cheap solid wood furniture, Sheesham wood furniture, Furniture market near me, Kirti Nagar furniture market, Bedroom furniture, Dining table, Sofa set, Adorefurnix furniture",
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
              name: "AdoreFurnix",
              url: "https://adorefurnix.com",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://adorefurnix.com/Search?query={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <Appwrapper>
        <body className="antialiased">
          <Message />
          <div>{children}</div>
          {/* <Logininstant /> */}
          <div className="fixed bottom-5 right-5 md:bottom-10 md:right-10 flex flex-col items-end gap-2 z-30">
            <Gotopbutton />
            <Helpbutton />
          </div>
          <Seopara />
        </body>
      </Appwrapper>
    </html>
  );
}

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

const Seopara = () => (
  <div className="absolute -left-[9999px]">
    <header>
      <h1>Solid Wood Furniture and Quality Furniture in India</h1>
    </header>

    <section>
      <h2>Solid Wood Furniture in India</h2>
      <p>
        India is known for its high-quality&nbsp;
        <strong>solid wood furniture</strong>, offering a variety of styles and
        options both in physical stores and online. Many people search for&nbsp;
        <strong>solid wood furniture online in India</strong>, looking for
        durable and aesthetically pleasing options like&nbsp;
        <strong>solid wood beds</strong>, <strong>sofa sets</strong>, and&nbsp;
        <strong>dining tables</strong>.
      </p>

      <h3>Where to Find Solid Wood Furniture Near You</h3>
      <p>
        If you&apos;re looking for&nbsp;
        <strong>solid wood furniture near me</strong>, popular areas include
        cities like{" "}
        {cities.map((city, i) => {
          return <strong key={i}>{city} </strong>;
        })}
        , where markets such as the&nbsp;
        <strong>Kirti Nagar furniture market</strong> and&nbsp;
        <strong>Dwarka, Delhi</strong> are well-known for their wide selection
        of&nbsp;
        <strong>solid wood furniture</strong>.
      </p>

      <h3>Best Solid Wood Furniture Brands and Prices</h3>
      <p>
        When searching for the best&nbsp;
        <strong>solid wood furniture brands</strong>
        &nbsp;in India, affordability is key. Many consumers look for&nbsp;
        <strong>cheap solid wood furniture</strong> options and frequently
        search for terms like&nbsp;
        <strong>solid wood furniture under 5000</strong>&nbsp; and{" "}
        <strong>solid wood furniture price</strong> to find budget-friendly
        solutions.
      </p>
    </section>

    <section>
      <h2>Sheesham Wood Furniture in India</h2>
      <p>
        <strong>Sheesham wood furniture</strong> is particularly popular in
        India, with many customers looking for manufacturers in regions
        like&nbsp;
        <strong>Rajasthan</strong>. Searches for&nbsp;
        <strong>Sheesham wood furniture near me</strong> and&nbsp;
        <strong>wholesale Sheesham wood furniture</strong> are common among
        buyers who prefer this type of solid wood for its durability and beauty.
      </p>
    </section>

    <section>
      <h2>Furniture for Every Room</h2>
      <h3>Bedroom Furniture</h3>
      <p>
        Many buyers are interested in&nbsp;
        <strong>bedroom furniture</strong>&nbsp; such as{" "}
        <strong>double beds</strong>,&nbsp;<strong>single beds</strong>,
        and&nbsp;
        <strong>bed mattresses</strong>. Online searches like&nbsp;
        <strong>double bed online</strong>, <strong>bed price</strong>, and
        even&nbsp;
        <strong>bed under 5000</strong> help customers find the best deals.
      </p>

      <h3>Dining Room Furniture</h3>
      <p>
        <strong>Dining tables</strong> are another popular category, with
        searches like <strong>dining table 4 seater</strong>,&nbsp;
        <strong>dining table 6 seater</strong>, and&nbsp;
        <strong>dining table under 10000</strong> being frequent. Options such
        as a&nbsp;<strong>glass top dining table</strong>
        &nbsp;and even&nbsp;<strong>plastic dining tables</strong> are available
        for varying tastes and budgets.
      </p>

      <h3>Living Room Furniture</h3>
      <p>
        For the living room, customers often search for&nbsp;
        <strong>sofa sets</strong>
        &nbsp;, with preferences ranging from&nbsp;
        <strong>wooden sofa sets</strong>
        &nbsp;to <strong>sofa sets under 10000</strong> or even&nbsp;
        <strong>sofa under 5000</strong>. Designs for&nbsp;
        <strong>3-seater sofas</strong>&nbsp;are particularly popular for
        compact spaces.
      </p>
    </section>

    <section>
      <h2>Finding Quality Furniture Near You</h2>
      <p>
        Whether shopping online or visiting physical stores, finding&nbsp;
        <strong>quality furniture near me</strong> is a priority for many.
        Reputable stores like <strong>Adorefurnix</strong> ,{" "}
        <strong>Pepperfry</strong> and markets such as&nbsp;
        <strong>Kirti Nagar</strong> are popular for their diverse range
        of&nbsp;
        <strong>quality furniture</strong> at competitive prices.
      </p>

      <h3>Wholesale Furniture Markets in Delhi</h3>
      <p>
        If you&apos;re looking for bulk purchases or affordable prices,
        the&nbsp;
        <strong>wholesale furniture market in Delhi</strong> is a great place to
        explore. Many businesses and individuals flock to these markets to find
        the best deals on furniture for their homes or offices.
      </p>
    </section>

    <section>
      <h2>Adorefurnix Furniture - Your Go-To Furniture Website</h2>
      <p>
        <strong>Adorefurnix</strong> is a leading online furniture store that
        offers a wide range of&nbsp;
        <strong>solid wood furniture</strong>, including&nbsp;
        <strong>bedroom furniture</strong>,&nbsp;
        <strong>dining tables</strong>,&nbsp;
        <strong>sofa sets</strong>, and more. Whether you&apos;re looking for
        modern designs or traditional options, <strong>Adorefurnix</strong> has
        something to suit every taste and budget.
      </p>
    </section>

    <p>
      For more information, visit the&nbsp;
      <strong>best furniture website</strong>
      &nbsp;at <a href="https://adorefurnix.com">Adorefurnix</a>.
    </p>
  </div>
);
