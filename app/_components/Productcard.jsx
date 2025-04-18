import Link from "next/link";
import Image from "next/image";
import { FiClock } from "react-icons/fi";

function Productcard({
  index,
  id,
  category,
  subcat,
  name,
  prices,
  buyprice,
  isrentalstore,
  location,
  available,
  image,
  link,
  tags,
  maxwidth = true,
}) {
  const locationrentprices =
    location?.location in prices ? prices[location?.location] : prices?.Default;
  const lastprice = locationrentprices[locationrentprices.length - 1];
  const rentprice = Math.floor(lastprice.price / lastprice.time);

  return (
    <Link
      href={
        link
          ? link
          : `/${location}/${
              isrentalstore ? "Rent" : "Buy"
            }/${category}/${subcat}/${id}`
      }
      className={`group relative w-full shadow-md min-w-44 md:min-w-60 bg-white rounded-3xl overflow-hidden opacity-0 scale-75 ${
        maxwidth && "max-w-72 md:max-w-80"
      }`}
      style={{ animation: `productfadeout 0.3s ${0.1 * index}s forwards` }}
      prefetch={false}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 176px, (max-width: 1024px) 240px, 300px"
          className="min-w-full min-h-full  object-cover object-center  scale-100 lg:group-hover:scale-105 lg:duration-300"
          loading="lazy"
          unoptimized
        />
        <div className="absolute top-2 left-1 md:top-2 md:left-2 flex flex-col items-start gap-1 text-[8px] md:text-sm text-white">
          {/* available */}
          {!available && (
            <div
              className={`flex items-center gap-1 bg-red-600 py-1 px-1 md:px-2 rounded-md`}
            >
              <FiClock />
              Comming soon!
            </div>
          )}
          {tags?.includes("New-Product") && (
            <div
              className={`flex items-center gap-1 bg-green-600 py-1 px-1 md:px-2 rounded-md`}
            >
              New Arrival
            </div>
          )}
        </div>
        {!available && (
          <div className="w-full absolute bottom-0 text-center bg-bg1 py-1 font-black">
            Out of stock
          </div>
        )}
      </div>
      <div className="relative p-[10px]">
        <h3 className="py-[5px] md:py-[10px] text-xs md:text-base text-center w-full whitespace-nowrap text-ellipsis overflow-hidden">
          {name}
        </h3>
        <div className="flex items-center justify-center w-full">
          <div className="bg-theme text-white text-sm min-w-[90%] px-2 py-2 flex items-center justify-center rounded-full text-nowrap">
            {isrentalstore ? (
              <>
                <span>Rent </span> : ₹{" "}
                {parseInt(rentprice, 10).toLocaleString("en-IN")} /{" "}
                {locationrentprices[0]?.type.replace(/s$/, "")}
              </>
            ) : (
              <>₹{parseInt(buyprice, 10).toLocaleString("en-IN")}</>
            )}
          </div>
        </div>
        <div className="absolute w-24 h-0.5 bottom-1 left-1/2 -translate-x-1/2 bg-theme rounded-full"></div>
      </div>
    </Link>
  );
}

export default Productcard;
