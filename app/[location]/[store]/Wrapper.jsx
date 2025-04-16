"use client";
import React, { useEffect } from "react";
import { AppContextfn } from "@/app/Context";

function Wrapper({ children, store }) {
  const { setisrentalstore } = AppContextfn();
  useEffect(() => {
    if (store == "Rent") {
      setisrentalstore(true);
    } else if (store == "Buy") {
      setisrentalstore(false);
    }
  }, []);

  return <>{children}</>;
}

export default Wrapper;
