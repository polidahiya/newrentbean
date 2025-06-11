"use client";
import { IoMdArrowRoundBack } from "react-icons/io";
import { usePathname } from "next/navigation";


function Backbutton() {
  const path = usePathname();
  const splitpath = path.split("/");
  return (
    <>
      {!(
        ["Buy", "Rent"].includes(splitpath[2]) && splitpath[3] == undefined
      ) && (
        <button
          className="group bg-theme flex items-center justify-center p-1 h-10 lg:h-8 absolute top-full lg:bottom-0 translate-y-2 lg:-translate-y-10 left-[10px] md:left-11 rounded-full overflow-hidden"
          onClick={() => {
            window.history.back();
          }}
          aria-label="Cancel"
          title="Cancel"
        >
          <span className="h-8 lg:h-6 aspect-square rounded-full bg-white text-theme grid place-content-center">
            <IoMdArrowRoundBack />
          </span>
          <span className="text-white opacity-0 text-sm  max-w-0 lg:group-hover:opacity-100 lg:group-hover:max-w-20 lg:group-hover:px-3 whitespace-nowrap transition-all duration-300 ease-in-out">
            Back
          </span>
        </button>
      )}
    </>
  );
}

export default Backbutton;
