"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { categorylist, filterlist, sortinglist } from "@/app/commondata";
import { FaChevronRight } from "react-icons/fa6";
import { VscSettings } from "react-icons/vsc";
import { TbSortAscendingSmallBig } from "react-icons/tb";
import { AppContextfn } from "@/app/Context";
import { useRouter } from "next/navigation";

function Secondnav({ category, subcat, searchParams, lengthofproducts }) {
  if (searchParams.pricerange == undefined) searchParams.pricerange = 0;
  if (searchParams.sort == undefined) searchParams.sort = 0;

  const [showfilter, setshowfilter] = useState(false);

  useEffect(() => {
    const hidemenu2 = () => {
      setshowfilter(false);
    };
    window.addEventListener("popstate", hidemenu2);
    return () => {
      window.removeEventListener("popstate", hidemenu2);
    };
  }, []);

  // filter link
  const generateLink = (params) => {
    const { category, subcat, searchParams } = params;
    const basePath = `/${category}${subcat ? "/" + subcat : ""}`;
    const queryParams = new URLSearchParams(searchParams).toString();

    return `${basePath}?${queryParams}`;
  };

  const filterlink = (priceRange) => {
    return generateLink({
      category,
      subcat,
      searchParams: {
        ...searchParams,
        pricerange: priceRange,
      },
    });
  };

  const sortlink = (sortOrder) => {
    return generateLink({
      category,
      subcat,
      searchParams: {
        ...searchParams,
        sort: sortOrder,
      },
    });
  };

  return (
    <div className="lg:w-60 lg:min-w-60 lg:max-h-[calc(100vh-130px)] lg:overflow-y-hidden lg:pr-[5px] lg:hover:overflow-y-scroll lg:hover:pr-0 lg:sticky lg:top-[120px]">
      <div className=" flex items-center justify-center h-[50px] bg-white lg:hidden">
        {category == "Search" ? (
          <span className="text-center text-[20px] font-semibold font-recline  whitespace-nowrap select-none">
            Search {"(" + lengthofproducts + ")"}
          </span>
        ) : (
          <Mobilecategorybuttons category={category} />
        )}
      </div>

      {/* mobile filter button */}
      <button
        className="fixed lg:hidden top-[70px] right-[10px] h-[40px] aspect-square text-[20px] grid place-content-center rounded-full text-white bg-theme z-10"
        onClick={() => {
          history.pushState(null, "", "");
          setshowfilter(true);
        }}
      >
        <VscSettings />
      </button>
      {/* filters */}
      <section
        className={`flex flex-col md:flex-row lg:flex-col gap-[10px] fixed lg:static bottom-0 left-0 w-full p-[10px] lg:p-0 z-50 bg-white duration-300 ${
          showfilter ? "translate-y-0" : " translate-y-full lg:translate-y-0"
        }`}
        onClick={() => {
          if (window.innerWidth < 1024) window.history.back();
        }}
      >
        {/* price range */}
        <div className="w-full bg-bg1 p-[10px]">
          <h2 className="text-center font-bold text-[20px] flex items-center justify-center gap-[10px]">
            <VscSettings />
            <span>Price Range</span>
          </h2>

          <div className="flex flex-col gap-[5px] mt-[10px] ">
            {filterlist.map((item, i) => (
              <Filterbutton
                key={i}
                href={filterlink(i)}
                name={item.name}
                selected={i == searchParams.pricerange}
              />
            ))}
          </div>
        </div>

        {/* sorting */}
        <div className="w-full bg-bg1 p-[10px] ">
          <h2 className="text-center font-bold text-[20px] flex items-center justify-center gap-[10px]">
            <TbSortAscendingSmallBig />
            <span>Sort</span>
          </h2>

          <div className="flex flex-col gap-[5px] mt-[10px] ">
            {sortinglist.map((item, i) => (
              <Filterbutton
                key={i}
                href={sortlink(i)}
                name={item.name}
                selected={i == searchParams.sort}
              />
            ))}
          </div>
        </div>
      </section>
      {/* blackscreen */}
      {showfilter && (
        <div
          className="fixed top-0 left-0 h-full w-full bg-black opacity-40 z-40 lg:hidden"
          onClick={() => {
            window.history.back();
          }}
        ></div>
      )}
    </div>
  );
}

const Filterbutton = ({ href, name, selected }) => {
  const router = useRouter();

  return (
    <div className="bg-white border border-slate-300 rounded-[10px]">
      <Link
        href={href}
        onClick={(e) => {
          if (window.innerWidth < 1024) {
            e.preventDefault();
            setTimeout(() => {
              router.replace(href);
            }, 100);
          }
        }}
        replace
        className={`flex items-center justify-center  py-[5px] md:px-[5px] text-[14px] md:text-[16px]  ${
          selected && "bg-theme bg-clip-text text-transparent "
        }`}
      >
        {name}
      </Link>
    </div>
  );
};

const Mobilecategorybuttons = ({ category }) => {
  const { setshowcat } = AppContextfn();
  const categoryarray = Object.keys(categorylist);
  const currentcategoryindex = categoryarray.indexOf(category);
  const forwardlink = `/${
    currentcategoryindex == categoryarray.length - 1
      ? categoryarray[0]
      : categoryarray[currentcategoryindex + 1]
  }`;

  const backbardlink = `/${
    currentcategoryindex == 0
      ? categoryarray[categoryarray.length - 1]
      : categoryarray[currentcategoryindex - 1]
  }`;

  return (
    <div className="flex items-center gap-2 ">
      <Link href={backbardlink}>
        <FaChevronRight className=" h-[40px] w-[40px] p-[13px] rotate-180" />
      </Link>
      <h1
        className="text-center text-[20px] font-semibold font-recline  whitespace-nowrap select-none"
        onClick={() => {
          history.pushState(null, "", "");
          setshowcat(true);
        }}
      >
        {category}
      </h1>
      <Link href={forwardlink}>
        <FaChevronRight className=" h-[40px] w-[40px] p-[13px] " />
      </Link>
    </div>
  );
};

export default Secondnav;
