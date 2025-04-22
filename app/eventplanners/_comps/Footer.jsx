import React from "react";
import Effecttext from "./Effecttext";
import Link from "next/link";
import { categories } from "../commondata";

const moreLinks = [
  { label: "About Us", href: "/eventplanners/aboutus" },
  { label: "Privacy Policy", href: "/eventplanners/privacypolicy" },
  { label: "Terms & Conditions", href: "/eventplanners/termsandconditions" },
];

const locations = ["Delhi", "Gurgaon", "Noida", "Faridabad", "Ghaziabad"];

function Footer() {
  return (
    <footer className="px-5 md:px-10 mt-20 bg-gray-50 py-12 border-t border-gray-200">
      <Effecttext text="Contact Us" />
      <h2 className="text-2xl md:text-3xl font-semibold mt-4 max-w-xl">
        Ready to book a consultation or have a question for us?
      </h2>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Explore Section */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-800">Explore</h3>
          <ul className="space-y-2">
            {Object.keys(categories).map((item, i) => (
              <li key={i}>
                <Link
                  href={`/eventplanners/${item}`}
                  className="text-gray-600 hover:text-black transition"
                >
                  {item.replace(/-/g, " ")}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* More Section */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-800">More</h3>
          <ul className="space-y-2">
            {moreLinks.map(({ label, href }, i) => (
              <li key={i}>
                <Link href={href} className="text-gray-600 hover:text-black transition">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Locations Section */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-800">Available Locations</h3>
          <ul className="space-y-2">
            {locations.map((city, i) => (
              <li key={i} className="text-gray-600">{city}</li>
            ))}
          </ul>
        </div>

        {/* Connect Section */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-800">Connect</h3>
          <p className="text-gray-600">
            Email us at{" "}
            <a
              href="mailto:support@rentbean.in"
              className="text-blue-600 hover:underline"
            >
              support@rentbean.in
            </a>
          </p>
          <p className="text-gray-600 mt-2">Gurgaon, Haryana, India</p>
        </div>
      </div>

      <p className="text-center mt-12 text-sm text-gray-500">
        © {new Date().getFullYear()} RentBean.in | EventPlanners. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
