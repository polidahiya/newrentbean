import React from "react";
import Effecttext from "./Effecttext";
import Link from "next/link";
import { categories } from "../commondata";

function Footer() {
  return (
    <footer className="px-5 md:px-10 mt-20">
      <Effecttext text={"Contact Us"} />
      <h2 className=" text-3xl lg:text-4xl mt-5 max-w-xl">
        Ready to book a consultation or have a question for us?
      </h2>
      <div className="mt-10">
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-40">
          <div className="flex flex-col">
            <h3 className="text-3xl lg:text-4xl pb-2">Explore</h3>
            {Object.keys(categories).map((item, i) => (
              <Link
                key={i}
                href={`/eventplanners/${item}`}
                className="pl-2 py-0.5"
              >
                {item?.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
          <div className="flex flex-col">
            <h3 className="text-3xl lg:text-4xl pb-2">More</h3>
            <Link href={"/"} className="pl-2">
              Home
            </Link>
            <Link href={"/"} className="pl-2">
              Home
            </Link>
            <Link href={"/"} className="pl-2">
              Home
            </Link>
            <Link href={"/"} className="pl-2">
              Home
            </Link>
          </div>
          {/* <div className="flex flex-col">
            <h3 className="text-3xl lg:text-4xl pb-2">Connect</h3>
            <Link href={"/"} className="pl-2">
              Home
            </Link>
            <Link href={"/"} className="pl-2">
              Home
            </Link>
            <Link href={"/"} className="pl-2">
              Home
            </Link>
            <Link href={"/"} className="pl-2">
              Home
            </Link>
          </div> */}
        </div>
      </div>
      <p className="text-center py-10 text-sm font-semibold opacity-60">
        {"@"} {new Date().getFullYear()} RentBean.in. Eventplanners All rights
        reserved.
      </p>
    </footer>
  );
}

export default Footer;
