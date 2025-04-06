// "use client";
// import React, { useEffect } from "react";
// import { FiSearch } from "react-icons/fi";
// import { LuLayoutGrid } from "react-icons/lu";
// import { AppContextfn } from "@/app/Context";
// import { MdLocationPin } from "react-icons/md";
// import { LuShoppingCart } from "react-icons/lu";
// import Link from "next/link";

// function Mobilenav() {
//   const {
//     showsearch,
//     setshowsearch,
//     showcat,
//     setshowcat,
//     searchinputref,
//     location,
//     setlocation,
//     isrentalstore,
//     setisrentalstore,
//     shownavbottom,
//     cart,
//   } = AppContextfn();

//   const cartitems = Object.values(cart).filter((item) => item.added);
//   const totalQuantity = cartitems.reduce(
//     (total, value) => total + value.quantity,
//     0
//   );

//   useEffect(() => {
//     const hidemenu2 = () => {
//       setshowcat(false);
//       setshowsearch(false);
//     };
//     window.addEventListener("popstate", hidemenu2);
//     return () => {
//       window.removeEventListener("popstate", hidemenu2);
//     };
//   }, []);

//   return (
//     <div className="h-12 w-full flex items-center justify-around border-t sticky bottom-0 lg:hidden bg-white z-20">
//       {/* location */}
//       <button
//         className="h-8 px-5 border rounded-full flex items-center justify-center gap-1 text-theme"
//         onClick={() => setlocation((pre) => ({ ...pre, show: true }))}
//       >
//         <MdLocationPin className="inline-block" />{" "}
//         <span>{location.location}</span>
//       </button>
//       {/* search button */}
//       <button
//         className="h-full aspect-square  flex items-center justify-center"
//         onClick={() => {
//           history.pushState(null, "", "");
//           setshowsearch(true);
//           setTimeout(() => {
//             searchinputref.current.focus();
//           }, 100);
//         }}
//       >
//         <FiSearch className="h-full text-[25px] aspect-square " />
//       </button>
//       <Link
//         href={"/allcategories"}
//         prefetch={false}
//         className="h-full aspect-square  flex items-center justify-center"
//       >
//         <LuLayoutGrid className="h-full text-[25px] aspect-square " />
//       </Link>

//       {/* cart */}
//       <Link
//         href="/cart"
//         prefetch={false}
//         className="relative h-full aspect-square flex items-center justify-center"
//       >
//         <LuShoppingCart className="text-[25px]" />
//         {totalQuantity > 0 && (
//           <div className="absolute top-1 right-1 h-4 aspect-square bg-theme text-white text-[10px] rounded-full flex items-center justify-center ">
//             {totalQuantity}
//           </div>
//         )}
//       </Link>

//       {/* rent or buy switch */}
//       <button
//         className={`h-8 px-5 border rounded-full flex items-center justify-center gap-1 text-theme
//                ${isrentalstore ? "flex-row-reverse pl-1 pr-5" : "pl-5 pr-1"}`}
//         onClick={() => setisrentalstore((pre) => !pre)}
//       >
//         {isrentalstore ? "Rent" : "Buy"}
//         <span className="block h-5 aspect-square rounded-full bg-theme"></span>
//       </button>
//     </div>
//   );
// }

// export default Mobilenav;

"use client";
import React, { useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { LuLayoutGrid } from "react-icons/lu";
import { AppContextfn } from "@/app/Context";
import { HiOutlineHome } from "react-icons/hi";
import { LuShoppingCart } from "react-icons/lu";
import Link from "next/link";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { usePathname } from "next/navigation";
import { MdTimer } from "react-icons/md";
import { MdTimerOff } from "react-icons/md";

function Mobilenav() {
  const path = usePathname();
  const {
    showsearch,
    setshowsearch,
    setshowcat,
    searchinputref,
    isrentalstore,
    cart,
    isopenstoremenu,
    setisopenstoremenu,
  } = AppContextfn();

  const cartitems = Object.values(cart).filter((item) => item.added);
  const totalQuantity = cartitems.reduce(
    (total, value) => total + value.quantity,
    0
  );

  useEffect(() => {
    const hidemenu2 = () => {
      setshowcat(false);
      setshowsearch(false);
      closestoremenu();
    };
    window.addEventListener("popstate", hidemenu2);
    return () => {
      window.removeEventListener("popstate", hidemenu2);
    };
  }, []);

  const openstoremenu = () => {
    setisopenstoremenu((pre) => ({ ...pre, show: true }));
    setTimeout(() => {
      setisopenstoremenu((pre) => ({ ...pre, effect: true }));
    }, 100);
  };

  const closestoremenu = () => {
    setisopenstoremenu((pre) => ({ ...pre, effect: false }));
    setTimeout(() => {
      setisopenstoremenu((pre) => ({ ...pre, show: false }));
    }, 100);
  };

  return (
    <>
      {isopenstoremenu?.show && <Storemenu closestoremenu={closestoremenu} />}
      <div className="h-16 w-full flex items-center justify-around px-2 border-t sticky bottom-0 lg:hidden bg-white rounded-t-3xl z-20">
        <Link
          href="/Delhi"
          prefetch={false}
          className={`flex-1 flex flex-col items-center gap-1 text-xl opacity-80 ${
            (path == "/" ||
              path == "/Gurgaon" ||
              path == "/Delhi" ||
              path == "/Faridabad" ||
              path == "/Noida" ||
              path == "/Ghaziabad") &&
            "text-theme"
          }`}
        >
          <HiOutlineHome />
          <span className="text-xs font-semibold">Home</span>
        </Link>

        {/* search button */}
        <button
          onClick={() => {
            history.pushState(null, "", "");
            setshowsearch(true);
            setTimeout(() => {
              searchinputref.current.focus();
            }, 100);
          }}
          className={`flex-1 flex flex-col items-center gap-1 text-xl opacity-80 ${
            showsearch && "text-theme"
          }`}
        >
          <FiSearch />
          <span className="text-xs font-semibold">Search</span>
        </button>

        <Link
          href="/allcategories"
          prefetch={false}
          className={`flex-1 flex flex-col items-center gap-1 text-xl opacity-80 ${
            path.includes("/allcategories") && "text-theme"
          }`}
        >
          <LuLayoutGrid />
          <span className="text-xs font-semibold">Menu</span>
        </Link>

        {/* cart */}
        <Link
          href="/cart"
          prefetch={false}
          className={`flex-1 flex flex-col items-center gap-1 text-xl opacity-80 relative ${
            path.includes("/cart") && "text-theme"
          }`}
        >
          <LuShoppingCart />
          <span className="text-xs font-semibold">Cart</span>
          {totalQuantity > 0 && (
            <div className="absolute -top-2 left-1/2 translate-x-1 h-4 aspect-square bg-theme text-white text-[10px] rounded-full flex items-center justify-center ">
              {totalQuantity}
            </div>
          )}
        </Link>

        {/* rent or buy switch */}
        <button
          onClick={() => {
            if (isopenstoremenu?.show) {
              window.history.back();
            } else {
              history.pushState(null, "", "");
              openstoremenu();
            }
          }}
          className={`flex-1 flex flex-col items-center gap-1 text-xl opacity-80 ${
            isopenstoremenu?.show && "text-theme"
          }`}
        >
          <MdOutlineStoreMallDirectory />
          <span className="text-xs font-semibold">
            Store{"("}
            {isrentalstore ? "Rent" : "Buy"}
            {")"}
          </span>
        </button>
      </div>
    </>
  );
}
const Storemenu = ({ closestoremenu }) => {
  const {
    location,
    setlocation,
    isrentalstore,
    setisrentalstore,
    isopenstoremenu,
  } = AppContextfn();
  return (
    <div
      className={`fixed bottom-16 border left-1/2 -translate-x-1/2 w-80 mx-2 bg-white rounded-2xl shadow-md p-5 lg:hidden duration-300 overflow-hidden ${
        isopenstoremenu.effect
          ? "opacity-100 -translate-y-5 z-50"
          : "opacity-0 -translate-y-0"
      }`}
    >
      <button
        className="absolute top-0 right-0 bg-bg1 w-10 aspect-square grid place-content-center"
        onClick={() => closestoremenu()}
      >
        X
      </button>
      <h3 className="flex items-center justify-center gap-1 text-xl font-semibold">
        <MdOutlineStoreMallDirectory />
        Store
      </h3>
      <div className="flex items-center justify-center gap-2 mt-7">
        <button
          className={`w-full flex items-center justify-center gap-1 border py-2 rounded-lg ${
            isrentalstore && "text-white bg-theme"
          }`}
          onClick={() => {
            setisrentalstore(true);
          }}
        >
          <MdTimer />
          Rent
        </button>
        <button
          className={`w-full flex items-center justify-center gap-1 border py-2 rounded-lg ${
            !isrentalstore && "text-white bg-cyan-600"
          }`}
          onClick={() => {
            setisrentalstore(false);
          }}
        >
          <MdTimerOff />
          Buy
        </button>
      </div>
      <div
        className="w-full flex items-center justify-center gap-1 mt-4 border py-2 rounded-lg text-theme font-semibold"
        onClick={() => {
          setlocation((pre) => ({ ...pre, show: true }));
          closestoremenu();
        }}
      >
        {location?.location}
      </div>
    </div>
  );
};

export default Mobilenav;
