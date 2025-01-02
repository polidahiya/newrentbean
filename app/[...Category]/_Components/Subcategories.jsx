import Link from "next/link";
import Image from "next/image";
import { categorylist } from "@/app/commondata";
// import { BiSolidCategory } from "react-icons/bi";

function Subcategories({ category, subcat }) {
  if (categorylist[category]?.subcat.length > 0)
    return (
      <div className="relative flex items-center justify-center mb-5">
        <div className="w-fit  flex items-center overflow-x-scroll p-2 gap-3 ">
          {categorylist[category]?.subcat.map((itemsubcat, i) => {
            return (
              <Link
                key={i}
                href={`/${category}/${itemsubcat.name}`}
                className={`min-w-28 w-28 lg:w-36 lg:min-w-36 flex flex-col items-center  ${
                  subcat == itemsubcat.name &&
                  "bg-theme bg-clip-text text-transparent"
                }`}
              >
                <Image
                  src={itemsubcat.image}
                  width={100}
                  height={100}
                  quality={50}
                  alt={itemsubcat.name}
                  priority={true}
                  className={`w-full aspect-[4/3] object-cover object-center rounded-[10px]  p-[2px] ${
                    subcat == itemsubcat.name ? "bg-theme" : "bg-slate-300"
                  }`}
                ></Image>
                <div
                  className={`h-fit w-full  text-center p-[5px]  text-[14px] text-ellipsis whitespace-nowrap overflow-hidden ${
                    subcat == itemsubcat.name && "font-semibold"
                  }`}
                >
                  {itemsubcat.name}
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
