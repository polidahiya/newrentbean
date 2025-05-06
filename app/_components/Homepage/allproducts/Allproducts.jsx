import Nextimage from "@/app/_components/Nextimage";
import Link from "next/link";
import Wrapper from "./Wrapper";

function Allproducts({ products, location, store }) {
  let isrentalstore;
  if (store === "Rent") {
    isrentalstore = true;
  } else if (store === "Buy") {
    isrentalstore = false;
  }

  return (
    <Wrapper>
      {products.map((product, i) => (
        <Imagecard
          key={i}
          product={product}
          i={i}
          location={location}
          store={store}
          isrentalstore={isrentalstore}
        />
      ))}
    </Wrapper>
  );
}

function Imagecard({ product, i, location, store, isrentalstore }) {
  const { _id, category, subcat, name, images, prices, buyprice } = product;

  const locationrentprices =
    location?.location in prices ? prices[location?.location] : prices?.Default;
  const lastprice = locationrentprices[locationrentprices.length - 1];
  const rentprice = Math.floor(lastprice.price / lastprice.time);

  return (
    <div
      className={`min-w-64 w-full md:max-w-64 p-2 flex flex-col justify-between gap-2 bg-white snap-always snap-center md:snap-start`}
    >
      <Link
        href={`/${location}/${store}/${category}/${subcat}/${_id}`}
        prefetch={false}
      >
        <div className="relative w-full aspect-square overflow-hidden">
          <Nextimage
            src={images[0]}
            alt={name}
            width={230}
            height={230}
            loading="lazy"
            className="absolute h-full w-full object-contain"
          />
        </div>
        <h2 className="text-center text-sm  md:text-base mt-5 truncate">
          {name}
        </h2>
      </Link>
      <div className="flex justify-between items-center w-full px-2 mt-2">
        <div>
          <div className="text-xs text-gray-400">
            {isrentalstore ? "rent" : "price"}
          </div>
          <div className="text-sm ">
            {isrentalstore ? (
              <>
                {parseInt(rentprice, 10).toLocaleString("en-IN")} /{" "}
                {locationrentprices[0]?.type.replace(/s$/, "")}
              </>
            ) : (
              <>₹{parseInt(buyprice, 10).toLocaleString("en-IN")}</>
            )}
          </div>
        </div>
        <Link
          href={`/${location}/${store}/${category}`}
          prefetch={false}
          className="border border-theme text-theme text-sm  md:text-base px-3 md:px-5 py-2  flex items-center justify-center lg:hover:bg-theme lg:hover:text-white duration-300"
        >
          See more
        </Link>
      </div>
    </div>
  );
}

export default Allproducts;
