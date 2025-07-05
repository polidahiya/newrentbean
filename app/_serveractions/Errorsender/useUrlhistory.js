"use client";
import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function useUrlHistory(maxLength = 10) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const historyRef = useRef([]);

  useEffect(() => {
    const fullPath =
      pathname + (searchParams?.toString() ? `?${searchParams}` : "");
    const last = historyRef.current[historyRef.current.length - 1];

    if (fullPath !== last) {
      historyRef.current.push(fullPath);
      if (historyRef.current.length > maxLength) {
        historyRef.current.shift();
      }
    }
  }, [pathname, searchParams]);

  return historyRef;
}
