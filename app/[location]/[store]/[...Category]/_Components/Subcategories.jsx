import Link from "next/link";
import Nextimage from "@/app/_components/Nextimage";
import { categorylist } from "@/app/commondata";
// import { BiSolidCategory } from "react-icons/bi";

function Subcategories({ category, subcat, location,store }) {
  if (categorylist[category]?.subcat.length > 0)
    return (
      <div className="relative flex items-center justify-center lg:hidden">
        <div className="w-fit  flex items-center overflow-x-scroll p-2 gap-3 ">
          {categorylist[category]?.subcat.map((itemsubcat, i) => {
            return (
              <Link
                key={i}
                href={`/${location}/${store}/${category}/${itemsubcat.name}`}
                className={`min-w-20 w-20 lg:w-36 lg:min-w-36 flex flex-col items-center  ${
                  subcat == itemsubcat.name &&
                  "bg-theme bg-clip-text text-transparent"
                }`}
              >
                <Nextimage
                  src={itemsubcat.image}
                  width={100}
                  height={100}
                  quality={50}
                  alt={itemsubcat.name}
                  priority={true}
                  className={`w-full aspect-square object-contain object-center rounded-md  p-0.5 ${
                    subcat == itemsubcat.name ? "bg-theme" : "bg-white"
                  }`}
                ></Nextimage>
                <div
                  className={`h-fit w-full  text-center p-[5px]  text-xs text-ellipsis whitespace-nowrap overflow-hidden ${
                    subcat == itemsubcat.name && "font-semibold"
                  }`}
                >
                  {itemsubcat.name.replace(/-/g, " ")}
                </div>
              </Link>
            );
          })}
        </div>
        {/* gradient */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,white_0px,transparent_20px,transparent_calc(100%-20px),white_100%)]"></div>
      </div>
    );
}

export default Subcategories;
