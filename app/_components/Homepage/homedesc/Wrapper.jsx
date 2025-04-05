"use client";
import { AppContextfn } from "@/app/Context";

function Wrapper({ children }) {
  const { moredesc } = AppContextfn();

  return (
    <section className={`overflow-hidden ${moredesc ? "" : "h-0"} `}>
      {children}
    </section>
  );
}

export default Wrapper;
