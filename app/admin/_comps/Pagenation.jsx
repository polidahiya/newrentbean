"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

function Pagination({ pages, currentPage }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const buildQuery = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    return `${pathname}?${params.toString()}`;
  };

  let pagination = [];
  if (pages > 7) {
    if (currentPage < 5) {
      pagination = [1, 2, 3, 4, 5, "...", pages];
    } else if (currentPage > 4 && currentPage < pages - 3) {
      pagination = [
        1,
        "...",
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
        "...",
        pages,
      ];
    } else {
      pagination = [
        1,
        "...",
        pages - 4,
        pages - 3,
        pages - 2,
        pages - 1,
        pages,
      ];
    }
  } else {
    pagination = Array.from({ length: pages }, (_, i) => i + 1);
  }

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < pages ? currentPage + 1 : null;

  return (
    <div className="sticky bottom-0 z-10 flex items-center justify-center gap-2 bg-white py-4 shadow-[0_-5px_10px_-2px_rgb(0_0_0_/_0.1)]">
      {/* Previous Button */}
      <Link
        href={prevPage ? buildQuery(prevPage) : "#"}
        scroll={false}
        className={`px-3 py-1 text-sm rounded-xl border border-gray-300 transition ${
          prevPage
            ? "hover:bg-gray-100 text-gray-800"
            : "text-gray-400 cursor-not-allowed bg-gray-100"
        }`}
        aria-disabled={!prevPage}
      >
        Previous
      </Link>

      {/* Page Numbers */}
      {pagination.map((item, i) =>
        item === "..." ? (
          <span key={i} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <Link
            key={i}
            href={buildQuery(item)}
            scroll={false}
            className={`px-3 py-1 text-sm border border-gray-300 rounded-md transition ${
              item === currentPage
                ? "bg-theme text-white"
                : "hover:bg-gray-100 text-gray-800"
            }`}
          >
            {item}
          </Link>
        )
      )}

      {/* Next Button */}
      <Link
        href={nextPage ? buildQuery(nextPage) : "#"}
        scroll={false}
        className={`px-3 py-1 text-sm rounded-xl border border-gray-300 transition ${
          nextPage
            ? "hover:bg-gray-100 text-gray-800"
            : "text-gray-400 cursor-not-allowed bg-gray-100"
        }`}
        aria-disabled={!nextPage}
      >
        Next
      </Link>
    </div>
  );
}

export default Pagination;
