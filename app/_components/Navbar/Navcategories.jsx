"use client";
import React, { useState } from "react";
import { categorylist } from "@/app/commondata";
import Link from "next/link";
import { AppContextfn } from "@/app/Context";
import { FaCaretDown } from "react-icons/fa";
import { useRouter } from "next/navigation";

function Navcategories({ category }) {
  const router = useRouter();
  const { showcat, setshowcat } = AppContextfn();
  const [showsubcat, setshowsubcat] = useState(null);

  return (
    <div
      className={`fixed bottom-0 left-0 lg:static w-full flex flex-col lg:flex-row lg:items-center justify-center lg:gap-5 lg:h-[30px] lg:mt-[20px] p-[10px] lg:p-0 bg-white lg:bg-transparent max-h-dvh overflow-y-scroll lg:overflow-y-visible  duration-300 ${
        showcat ? "translate-y-0 z-40" : "translate-y-full lg:translate-y-0"
      }`}
    >
      {Object.keys(categorylist).map((item, i) => {
        return (
          <div key={i} className="group relative">
            <Link
              key={i}
              href={"/" + item}
              onClick={(e) => {
                if (window.innerWidth < 1024) {
                  setshowcat(false);
                  e.preventDefault();
                  router.replace("/" + item);
                }
              }}
              className={`lg:h-[30px] w-full flex  items-center justify-start lg:justify-center  text-[14px] py-[10px] px-5 lg:px-5 lg:py-[5px] rounded-[10px] lg:rounded-full ${
                category == item
                  ? "lg:bg-theme lg:text-white"
                  : "lg:group-hover:bg-theme lg:group-hover:text-white "
              }`}
            >
              {item}
            </Link>
            {/* subcategories */}
            {categorylist[item].subcat.length > 0 && (
              <>
                <button
                  className="absolute top-0 right-0 h-[40px] aspect-square bg-bg1 rounded-[10px] lg:hidden border-[5px] border-white"
                  onClick={() => {
                    setshowsubcat((pre) => (pre == i ? null : i));
                  }}
                >
                  {showsubcat == i ? "-" : "+"}
                </button>

                {/* down arrow */}
                <FaCaretDown
                  className={`absolute top-[calc(100%-5px)] hidden lg:group-hover:block left-1/2 -translate-x-1/2`}
                />

                {/* subcategories */}
                <div
                  className={`lg:absolute top-0 lg:hidden lg:group-hover:block lg:group-hover:max-h-screen overflow-hidden duration-500 lg:duration-0 -z-10 ${
                    i == 0 && "lg:left-0"
                  } ${
                    i == Object.keys(categorylist)?.length - 1 && "lg:right-0"
                  } ${
                    i != 0 &&
                    i != Object.keys(categorylist)?.length - 1 &&
                    "lg:left-1/2 lg:-translate-x-1/2"
                  }
                  ${showsubcat == i ? "max-h-screen " : "max-h-0"}`}
                >
                  <div className="p-2 lg:p-1 bg-white flex flex-col lg:gap-2 lg:rounded-2xl lg:border lg:border-slate-300 lg:mt-12 ">
                    {categorylist[item].subcat.map((subcat, j) => {
                      return (
                        <Link
                          key={j}
                          href={`/${item}/${subcat.name}`}
                          onClick={(e) => {
                            if (window.innerWidth < 1024) {
                              setshowcat(false);
                              e.preventDefault();
                              router.replace(`/${item}/${subcat.name}`);
                            }
                          }}
                          className="p-1 lg:hover:bg-theme lg:hover:text-white rounded-full lg:w-52 pl-10 lg:pl-0 lg:text-center text-[14px]"
                        >
                          {subcat?.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Navcategories;
