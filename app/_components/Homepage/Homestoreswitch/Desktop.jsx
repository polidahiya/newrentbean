"use client";
import Link from "next/link";
import Nextimage from "../../Nextimage";
import { useScroll, motion, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Desktop({ location, store }) {
  const containerref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <div className="md:px-10">
      <div className="relative w-full flex flex-col items-center justify-center md:py-12 px-4 md:bg-gray-50 rounded-3xl overflow-hidden">
        <h1 className="text-3xl font-semibold md:font-bold text-center mb-4 z-10">
          Choose How You Want to Shop
        </h1>
        <p className="text-gray-600 text-center mb-6 max-w-xl z-10">
          You can both rent our products for a period of time or buy them
          permanently. Switch the mode below to explore your preferred shopping
          method.
        </p>

        <Link
          href={`/${location}/${store == "Rent" ? "Buy" : "Rent"}`}
          className="flex items-center justify-center bg-gray-100 p-1 rounded-full shadow-md z-10 w-fit mx-auto"
          scroll={false}
        >
          {["Rent", "Buy"].map((item, i) => (
            <span
              key={i}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                store === item
                  ? "bg-black text-white shadow-sm"
                  : "text-gray-700"
              }`}
            >
              {item}
            </span>
          ))}
        </Link>

        <div className="mt-6 text-center text-sm text-gray-500 z-10">
          Currently showing:{" "}
          <span className="font-medium text-black">{store}</span> listings
        </div>

        {/* Rent Side Fading Image */}
        <motion.div
          style={{ y, scale: 1.2 }}
          ref={containerref}
          className="hidden md:flex absolute left-0 top-0  h-full w-full pointer-events-none"
        >
          <Nextimage
            src="/logo&ui/saleorbuybackground.jpg"
            alt="Rent"
            width={900}
            height={400}
            className="object-cover"
            style={{
              maskImage: "linear-gradient(to right, black 0%, transparent 80%)",
              WebkitMaskImage:
                "linear-gradient(to right, black 0%, transparent 80%)",
            }}
          />
          <Nextimage
            src="/logo&ui/saleorbuybackground.jpg"
            alt="Buy"
            width={900}
            height={400}
            className="object-cover"
            style={{
              maskImage: "linear-gradient(to left, black 0%, transparent 80%)",
              WebkitMaskImage:
                "linear-gradient(to left, black 0%, transparent 80%)",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
