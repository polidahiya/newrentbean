"use client";
import { refreshproductsnow } from "@/app/_serveractions/Getcachedata";
import { AppContextfn } from "@/app/Context";

function Page() {
  const { setmessagefn } = AppContextfn();
  const refreshproductsnowfn = async () => {
    const res = await refreshproductsnow();
    setmessagefn(res?.message);
  };

  return (
    <div className="flex flex-col gap-5 py-5 px-[10px] md:px-[40px]">
      <div className="flex items-center justify-between bg-bg1 p-2 rounded-lg">
        <p className="ml-5 text-white">Refresh site now</p>
        <button
          className="rounded-sm px-5 py-1 bg-white"
          onClick={refreshproductsnowfn}
        >
          Refresh
        </button>
      </div>
    </div>
  );
}

export default Page;
