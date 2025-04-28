import Link from "next/link";
import React from "react";
import Nextimage from "@/app/_components/Nextimage";
import Footer from "./_components/footer/Footer";
import Navbar from "./_components/Navbar/Navbar";
import Mobilenav from "./_components/Navbar/_comps/Mobilenav";

function page() {
  return (
    <div>
      <Navbar />
      <div className="m-0 min-h-[calc(100dvh-60px)] lg:min-h-[calc(100dvh-120px)] overflow-hidden flex items-center justify-center pb-10">
        <section>
          <h1 className="m-0 p-0 translate-y-[50px] text-3xl font-extrabold text-center">
            404
          </h1>
          <Nextimage
            src="/notfound.gif"
            alt="not found gif image"
            height={300}
            width={400}
            unoptimized
            className="max-w-[400px] m-auto w-full object-contain object-center"
          ></Nextimage>
          <h3 className=" font-bold text-center">
            Look like you&lsquo;re lost
          </h3>
          <p className="text-center">
            The page you are looking for is not avaible!
          </p>
          <Link
            href="/Delhi/Rent"
            className="block bg-green-500 text-white px-12 py-2 w-fit m-auto mt-7 hover:text-green-500 outline outline-[1px] hover:outline-green-500 hover:bg-white"
          >
            Go to Home
          </Link>
        </section>
      </div>
      <Footer />
      <Mobilenav />
    </div>
  );
}

export default page;
