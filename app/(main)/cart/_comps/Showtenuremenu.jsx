import { FcClock } from "react-icons/fc";
import { AppContextfn } from "@/app/Context";

const Showtenuremenu = ({ showtenure, setshowtenure }) => {
  const { cart, setcart } = AppContextfn();
  return (
    <div
      className={`fixed top-0 left-0 h-screen w-full flex items-center justify-center p-5 md:px-28 md:py-10 z-50`}
    >
      <div
        className={`relative h-full w-full  flex flex-col items-center justify-center p-[20px] gap-[20px] bg-white z-10`}
      >
        <h2 className="absolute top-5 left-1/2 -translate-x-1/2 text-xl font-semibold font-recline whitespace-nowrap mt-5 tracking-widest">
          <FcClock className="inline-block" /> Select your location
        </h2>
        <div className="w-full max-w-96 space-y-3">
          {showtenure?.data?.map((item, i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  setcart((pre) => {
                    const updateddata = { ...pre };
                    updateddata[showtenure?.cartproductid].selectedtenure = i;
                    return updateddata;
                  });
                  setshowtenure(() => ({ show: false }));
                }}
                className={`w-full flex items-center justify-center px-5 py-2 border rounded-lg lg:hover:scale-110 lg:hover:shadow-lg lg:hover:border-none duration-200  ${
                  cart[showtenure?.cartproductid]?.selectedtenure == i
                    ? "bg-theme text-white"
                    : "bg-white text-theme border"
                }`}
              >
                {item?.time}
                {item?.type} -  ₹{item?.price} - {"("}
                ₹{Math.floor(item?.price / item?.time)} {"/"}{" "}
                {showtenure?.data[0]?.type}
                {")"}
              </button>
            );
          })}
        </div>
        {/* close button */}
        <button
          className="absolute right-0 top-0 h-[50px] aspect-square  bg-white z-10 lg:hover:bg-theme lg:hover:text-white"
          onClick={() => setshowtenure((pre) => ({ ...pre, show: false }))}
        >
          X
        </button>
      </div>
      <button
        className="absolute top-0 left-0 h-full w-full cursor-auto -z-10 bg-black bg-opacity-30"
        onClick={() => setshowtenure((pre) => ({ ...pre, show: false }))}
      ></button>
    </div>
  );
};

export default Showtenuremenu;
