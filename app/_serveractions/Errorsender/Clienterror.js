"use client";
import { useEffect } from "react";
import StoreError from "./StoreError";
import useUrlHistory from "./useUrlhistory";

export default function Clienterror() {
  const urlHistory = useUrlHistory(10); // <== this was missing

  useEffect(() => {
    const captureError = (message, source, lineno, colno, error) => {
      (async () => {
        await StoreError({
          message,
          stack: error?.stack,
          errorside: "client",
          url: window.location.href,
          customInfo: {
            pathHistory: [...urlHistory.current], // better name than "urlHistory"
            currentPath: window.location.pathname,
            line: lineno,
            column: colno,
            source,
            userAgent: navigator.userAgent,
          },
        });
      })();
    };

    const captureUnhandledRejection = (e) => {
      (async () => {
        await StoreError({
          message: e.reason?.message || "Unhandled Promise Rejection",
          stack: e.reason?.stack,
          type: "client",
          url: window.location.href,
          customInfo: {
            pathHistory: [...urlHistory.current],
            currentPath: window.location.pathname,
            userAgent: navigator.userAgent,
          },
        });
      })();
    };

    window.onerror = captureError;
    window.onunhandledrejection = captureUnhandledRejection;

    return () => {
      window.onerror = null;
      window.onunhandledrejection = null;
    };
  }, [urlHistory]);

  return null; // this is just a functional hook-style component
}
