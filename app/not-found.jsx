import Link from "next/link";
import React from "react";
import Image from "next/image";
import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar/Navbar";

function page() {
  return (
    <div>
      <Navbar />
      <div className="m-0 min-h-[calc(100dvh-60px)] lg:min-h-[calc(100dvh-120px)] overflow-hidden flex items-center justify-center pb-10">
        <section>
          <h1 className="m-0 p-0 translate-y-[50px] text-[30px] font-extrabold text-center">
            404
          </h1>
          <Image
            src="/notfound.gif"
            alt="not found gif image"
            height={300}
            width={400}
            
            className="max-w-[400px] m-auto w-full object-contain object-center"
          ></Image>
          <h3 className=" font-bold text-center">
            Look like you&lsquo;re lost
          </h3>
          <p className="text-center">
            The page you are looking for is not avaible!
          </p>
          <Link
            href="/"
            className="block bg-green-500 text-white px-[50px] py-[10px] w-fit m-auto mt-[30px] hover:text-green-500 outline outline-[1px] hover:outline-green-500 hover:bg-white"
          >
            Go to Home
          </Link>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default page;
