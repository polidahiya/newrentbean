import React from "react";
import Effecttext from "./_comps/Effecttext";
import Link from "next/link";

function Footer() {
  return (
    <footer>
      <Effecttext text={"Contact Us"} />
      <h2 className="text-4xl mt-5 max-w-xl">
        Ready to book a consultation or have a question for us?
      </h2>
      <div className="mt-10">
        <div className="flex">
          <div className="flex flex-col ">
            <h3 className="text-4xl pb-2">Explore</h3>
            <Link href={"/"}>Home</Link>
            <Link href={"/"}>Home</Link>
            <Link href={"/"}>Home</Link>
            <Link href={"/"}>Home</Link>
          </div>
          <div className="flex flex-col ml-40">
            <h3 className="text-4xl pb-2">More</h3>
            <Link href={"/"}>Home</Link>
            <Link href={"/"}>Home</Link>
            <Link href={"/"}>Home</Link>
            <Link href={"/"}>Home</Link>
          </div>
          <div className="flex flex-col ml-48">
            <h3 className="text-4xl pb-2">Connect</h3>
            <Link href={"/"}>Home</Link>
            <Link href={"/"}>Home</Link>
            <Link href={"/"}>Home</Link>
            <Link href={"/"}>Home</Link>
          </div>
        </div>
      </div>
      <p className="text-center py-5 text-sm font-semibold opacity-60">
        {"@"} {new Date().getFullYear()} RentBean.in. Eventplanners All rights
        reserved.
      </p>
    </footer>
  );
}

export default Footer;
