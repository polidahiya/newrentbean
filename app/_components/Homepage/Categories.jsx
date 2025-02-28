import React from "react";
import { categorylist } from "@/app/commondata";
import Link from "next/link";
import Image from "next/image";

function Categories() {
  return (
    <div id="categories" className="">
      <div className="flex items-center justify-center gap-[10px] md:gap-[20px] px-[10px] md:px-[40px] flex-wrap">
        {Object.entries(categorylist).map(([key, value], i) => {
          return (
            <Link
              className="categoriestile h-[60px] w-[60px] md:h-[70px] md:w-[120px]  rounded-lg flex flex-col items-center justify-center border border-gray-200 lg:hover:border-none lg:hover:scale-110 lg:hover:shadow-[0_8px_14px_0_#bfcfdc]   duration-200"
              key={i}
              href={"/" + key}
              title={key}
            >
              <Image
                height={20}
                width={20}
                className="h-[30%] md:h-[20px]"
                src={value?.image}
                alt={key}
              />
              <p className="text-[8px] md:text-[11px] text-center md:whitespace-nowrap">
                {key}
              </p>
            </Link>
          );
        })}
      </div>
      {/*  */}
      {/* <div className=" flex items-stretch justify-center flex-wrap  gap-[1.4vw] px-[1.4vw] mt-[30px]">
        {Object.keys(categorylist).map((item, i) => {
          return (
            <Link
              key={i}
              href={`/${item}`.replace(/ /g, "-")}
              className={`item w-[30vw] md:w-[23vw] lg:w-[15vw] bg-white rounded-md lg:rounded-[1vw] lg:overflow-hidden lg:shadow-[0px_0px_10px_#bababa7f] lg:hover:scale-[103%] duration-200 `}
            >
              <Image
                src={categorylist[item].image}
                width={300}
                height={300}
                quality={10}
                alt={item}
                priority={true}
                
                className="w-full aspect-[4/3] object-cover object-center rounded-[2.5vw] md:rounded-[1vw] bg-bg1"
              ></Image>
              <div className="text-center text-[14px] md:text-[16px] py-[10px]">{item}</div>
            </Link>
          );
        })}
      </div> */}
    </div>
  );
}

export default Categories;



// import React from "react";
// import { categorylist } from "@/app/commondata";
// import Link from "next/link";
// import Image from "next/image";

// function Categories() {
//   return (
//     <div id="categories" className="">
//       <div className="max-w-[800px] flex items-center justify-center gap-2 md:gap-5 px-2 flex-wrap mx-auto">
//         {Object.entries(categorylist).map(([key, value], i) => {
//           return (
//             <Link
//               className="categoriestile flex-1 aspect-[12/7]  rounded-lg flex flex-col items-center justify-center border border-gray-200 lg:hover:border-none lg:hover:scale-110 lg:hover:shadow-[0_8px_14px_0_#bfcfdc]   duration-200"
//               key={i}
//               href={"/" + key}
//               title={key}
//             >
//               <Image
//                 height={20}
//                 width={20}
//                 className="h-[30%] md:h-[20px]"
//                 src={value?.image}
//                 alt={key}
//               />
//               <p className="text-[8px] text-center md:whitespace-nowrap">
//                 {key.replace(/-/g, " ")}
//               </p>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Categories;
