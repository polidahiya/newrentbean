import React from "react";
import Link from "next/link";
import { filterlist, sortinglist } from "@/app/commondata";
import { VscSettings } from "react-icons/vsc";
import { TbSortAscendingSmallBig } from "react-icons/tb";

function Appliedfilters({ category, subcat, searchParams }) {
  const { pricerange, sort } = searchParams;
  if (
    !subcat &&
    (pricerange == null || pricerange == 0) &&
    (sort == null || sort == 0)
  )
    return null;

  const createLinkWithParams = (newParams) => {
    const params = new URLSearchParams({
      ...searchParams,
      ...newParams,
    }).toString();
    return `/${category && category}${subcat ? `/${subcat}` : ""}?${params}`;
  };

  const pricerangeLink = createLinkWithParams({ pricerange: 0 });
  const sortLink = createLinkWithParams({ sort: 0 });

  const subcatLink = () => {
    const params = new URLSearchParams(searchParams).toString();
    return `/${category && category}?${params}`;
  };

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
    <div className="flex gap-2 py-5">
      <div className="flex flex-wrap gap-2 text-sm w-full">
        {pricerange && pricerange != 0 && (
          <FilterItem
            label={filterlist[pricerange]?.name}
            link={pricerangeLink}
          />
        )}
        {sort && sort != 0 && (
          <FilterItem
            label={`Sort by ${sortinglist[sort]?.name}`}
            link={sortLink}
          />
        )}
        {subcat && <FilterItem label={`${subcat} only`} link={subcatLink()} />}
      </div>
      <div className="flex gap-2 ml-auto">
        <div className="group/menu relative flex items-center gap-1 border px-5 rounded-lg cursor-pointer">
          <VscSettings />
          <span>Filter</span>
          <div className="absolute top-full right-0 w-full  z-10 hidden group-hover/menu:flex min-h-10">
            <div className="absolute right-0 flex flex-col mt-[10px] bg-white border border-slate-300 rounded-md p-2">
              {filterlist.map((item, i) => (
                <Filterbutton key={i} href={filterlink(i)} name={item.name} />
              ))}
            </div>
          </div>
        </div>
        <div className="group/menu relative flex items-center gap-1 border px-5 rounded-lg cursor-pointer">
          <TbSortAscendingSmallBig />
          <span>Sort</span>
          <div className="absolute top-full right-0 w-full z-10 hidden group-hover/menu:flex min-h-10">
            <div className="absolute right-0 flex flex-col mt-[10px] bg-white border border-slate-300 rounded-md p-2">
              {sortinglist.map((item, i) => (
                <Filterbutton key={i} href={sortlink(i)} name={item.name} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Filterbutton = ({ href, name }) => {
  return (
    <Link
      href={href}
      replace
      className={`flex items-center justify-center px-10 py-2 hover:bg-slate-100 w-full whitespace-nowrap`}
    >
      {name}
    </Link>
  );
};

function FilterItem({ label, link }) {
  return (
    <div className="flex items-center h-7 pl-5 rounded-lg bg-bg1">
      {label}{" "}
      <Link
        href={link}
        className="text-sm hover:text-theme px-3"
        // replace
      >
        X
      </Link>
    </div>
  );
}

export default Appliedfilters;
