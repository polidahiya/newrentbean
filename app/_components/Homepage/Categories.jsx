import React from "react";
import { categorylist } from "@/app/commondata";
import Link from "next/link";
import Image from "next/image";

function Categories({ location, store }) {
  return (
    <div id="categories" className="">
      <div className="flex items-center justify-center gap-[10px] md:gap-[20px] px-[10px] md:px-[40px] flex-wrap">
        {Object.entries(categorylist).map(([key, value], i) => {
          return (
            <Link
              className="categoriestile h-[60px] w-[60px] md:h-[70px] md:w-[120px]  rounded-lg flex flex-col items-center justify-center bg-white border border-gray-200 lg:hover:border-none lg:hover:scale-110 lg:hover:shadow-[0_8px_14px_0_#bfcfdc]   duration-200"
              key={i}
              href={`/${location}/${store}/${key}`}
              prefetch={false}
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
                {key.replace(/-/g, " ")}
              </p>
            </Link>
          );
        })}
      </div>
    
    
    </div>
  );
}

export default Categories;

// import React from "react";
// import { categorylist } from "@/app/commondata";
// import Link from "next/link";
// import Image from "next/image";

// function Categories({ location, store }) {
//   return (
//     <div id="categories" className="">
//       <div className="flex items-center">
//         {Object.entries(categorylist).map(([key, value], i) => {
//           return (
//             <div className="inline-flex justify-center items-center gap-12">
//               <div className="bg-gradient-to-b from-stone-300/40 to-transparent p-1 rounded-2xl dark:from-stone-700/40">
//                 <button className="group p-1 rounded-[12px] bg-gradient-to-b from-white to-stone-200/40 shadow-[0_1px_3px_rgba(0,0,0,0.5)] active:shadow-[0_0px_1px_rgba(0,0,0,0.5)] active:scale-[0.995] dark:from-stone-800 dark:to-stone-700">
//                   <div className="bg-gradient-to-b from-stone-200/40 to-white/80 rounded-[8px] px-2 py-2 dark:from-stone-700 dark:to-stone-800">
//                     <div className="flex gap-2 items-center">
//                       <span className="font-semibold text-stone-900 dark:text-stone-100 px-3">
//                         <Link
//                           className="flex flex-1 border lg:hover:scale-110 lg:hover:shadow-[0_8px_14px_0_#bfcfdc] duration-200"
//                           key={i}
//                           href={`/${location}/${store}/${key}`}
//                           prefetch={false}
//                           title={key}
//                         >
//                           <Image
//                             height={20}
//                             width={20}
//                             className=""
//                             src={value?.image}
//                             alt={key}
//                           />
//                           <p className="">{key.replace(/-/g, " ")}</p>
//                         </Link>
//                       </span>
//                     </div>
//                   </div>
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Categories;
