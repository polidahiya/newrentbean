"use client";
import { refreshproductsnow } from "@/app/_serveractions/Getcachedata";
import { AppContextfn } from "@/app/Context";
import Link from "next/link";

function Page() {
  const { setmessagefn } = AppContextfn();
  const refreshproductsnowfn = async () => {
    const res = await refreshproductsnow();
    setmessagefn(res?.message);
  };

  return (
    <div className="flex flex-col gap-5 py-5 px-[10px] md:px-10">
      <div className="flex items-center justify-between p-2 rounded-lg border">
        <p className="ml-5">Refresh site now</p>
        <button
          className="rounded-sm px-5 py-1 border"
          onClick={refreshproductsnowfn}
        >
          Refresh
        </button>
      </div>
      <Link
        href="https://analytics.google.com/analytics/web/#/p471782386/reports/intelligenthome"
        className="px-5 py-2   border rounded-lg w-fit ml-auto"
      >
        View Analytics
      </Link>
    </div>
  );
}

export default Page;
