import React from "react";
import Effecttext from "./Effecttext";
import Link from "next/link";
import { categories } from "../commondata";
import { cities as locations, media } from "../commondata";

const moreLinks = [
  { label: "About Us", href: "/eventplanners/aboutus" },
  { label: "Privacy Policy", href: "/eventplanners/privacypolicy" },
  { label: "Terms & Conditions", href: "/eventplanners/termsandconditions" },
];

function Footer() {
  return (
    <footer
      className="px-7 md:px-10 mt-20 text-sm   py-12 border-t border-gray-20"
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 30%, rgba(209, 209, 209,0.04) 0%, rgba(209, 209, 209,0.04) 50%,rgba(138, 138, 138,0.04) 50%, rgba(138, 138, 138,0.04) 100%),radial-gradient(circle at 9% 40%, rgba(209, 209, 209,0.04) 0%, rgba(209, 209, 209,0.04) 50%,rgba(71, 71, 71,0.04) 50%, rgba(71, 71, 71,0.04) 100%),radial-gradient(circle at 84% 81%, rgba(147, 147, 147,0.04) 0%, rgba(147, 147, 147,0.04) 50%,rgba(253, 253, 253,0.04) 50%, rgba(253, 253, 253,0.04) 100%),linear-gradient(340deg, rgba(212,30,153, 0.25),rgba(255,55,223, 0))",
      }}
    >
      <Effecttext text="Contact Us" />
      <h2 className="text-2xl md:text-3xl mt-4 max-w-xl font-recline">
        Ready to book a consultation or have a question for us?
      </h2>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-10">
        {/* Explore Section */}
        <div>
          <h3 className="relative text-xl font-semibold mb-4 w-fit">
            <span className="absolute block bottom-0 left-0 h-0.5 w-[calc(100%+10px)] bg-eventtheme"></span>
            Explore
          </h3>
          <ul className="space-y-2">
            {Object.keys(categories).map((item, i) => (
              <li key={i}>
                <Link
                  href={`/eventplanners/${item}`}
                  className=" hover:text-black transition"
                >
                  {item.replace(/-/g, " ")}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* More Section */}
        <div>
          <h3 className="relative text-xl font-semibold mb-4 w-fit">
            <span className="absolute block bottom-0 left-0 h-0.5 w-[calc(100%+10px)] bg-eventtheme"></span>
            More
          </h3>
          <ul className="space-y-2">
            {moreLinks.map(({ label, href }, i) => (
              <li key={i}>
                <Link
                  href={href}
                  className=" hover:text-black transition"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Locations Section */}
        <div>
          <h3 className="relative text-xl font-semibold mb-4 w-fit">
            <span className="absolute block bottom-0 left-0 h-0.5 w-[calc(100%+10px)] bg-eventtheme"></span>
            Available Locations
          </h3>
          <ul className="space-y-2">
            {locations.map((city, i) => (
              <li key={i} className="">
                {city}
              </li>
            ))}
          </ul>
        </div>

        {/* Connect Section */}
        <div>
          <h3 className="relative text-xl font-semibold mb-4 w-fit">
            <span className="absolute block bottom-0 left-0 h-0.5 w-[calc(100%+10px)] bg-eventtheme"></span>
            Connect
          </h3>
          <p className="">
            Email us at{" "}
            <a
              href={`mailto:${media?.email}`}
              className="text-blue-600 hover:underline"
            >
              {media?.email}
            </a>
          </p>
          <p className=" mt-2">{media?.address}</p>
        </div>
      </div>

      <p className="text-center mt-12 text-sm  text-gray-500">
        © {new Date().getFullYear()} RentBean.in | EventPlanners. All rights
        reserved.
      </p>
    </footer>
  );
}

export default Footer;
