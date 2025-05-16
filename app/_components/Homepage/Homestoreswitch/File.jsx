import Link from "next/link";
import Nextimage from "../../Nextimage";

export default function Homestoreswitch({ location, store }) {
  return (
    <div className="relative w-full flex flex-col items-center justify-center py-12 px-4 md:bg-gray-50 overflow-hidden">
      <h1 className="text-3xl font-semibold md:font-bold text-center mb-4 z-10">
        Choose How You Want to Shop
      </h1>
      <p className="text-gray-600 text-center mb-6 max-w-xl z-10">
        You can either rent our products for a period of time or buy them
        permanently. Switch the mode below to explore your preferred shopping
        method.
      </p>

      <div className="flex items-center justify-center space-x-4 bg-white p-2 rounded-full shadow-md z-10">
        <Link
          href={`/${location}/Rent`}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            store === "Rent"
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Rent
        </Link>
        <Link
          href={`/${location}/Buy`}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            store === "Buy"
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Buy
        </Link>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500 z-10">
        Currently showing:{" "}
        <span className="font-medium text-black">{store}</span> listings
      </div>

      {/* Rent Side Fading Image */}
      <div className="hidden md:flex absolute left-0 top-0  h-full w-full pointer-events-none">
        <Nextimage
          src="/logo&ui/saleorbuybackground.jpg"
          alt="Rent"
          width={900}
          height={400}
          className="object-cover"
          style={{
            maskImage: "linear-gradient(to right, black 0%, transparent 70%)",
            WebkitMaskImage:
              "linear-gradient(to right, black 0%, transparent 70%)",
          }}
        />
        <Nextimage
          src="/logo&ui/saleorbuybackground.jpg"
          alt="Buy"
          width={900}
          height={400}
          className="object-cover"
          style={{
            maskImage: "linear-gradient(to left, black 0%, transparent 70%)",
            WebkitMaskImage:
              "linear-gradient(to left, black 0%, transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}
