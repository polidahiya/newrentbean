"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { AppContextfn } from "../Context";
import { searchoptions, permanentsearchoptions } from "../commondata";
import { FiArrowUpLeft } from "react-icons/fi";

function Searchbox({ productsname, location }) {
  const router = useRouter();
  const { setshowsearch, searchinputref, isrentalstore } = AppContextfn();
  const [search, setSearch] = useState("");
  const [showsuggestions, setshowsuggestions] = useState([false, false]);
  const [arrowselectedsuggest, setarrowselectedsuggest] = useState(null);

  useEffect(() => {
    if (typeof window != undefined) {
      const params = new URLSearchParams(window.location.search);
      setSearch(params.get("query") || "");
    }
  }, []);

  let suggestionsArray = productsname
    ? [...searchoptions, ...productsname]
    : [];

  // 3
  const findIndexOfSearch = (productName, searchWords) => {
    return searchWords.split(" ").reduce((index, word) => {
      const wordIndex = productName.toLowerCase().indexOf(word.toLowerCase());
      return wordIndex !== -1 && (index === -1 || wordIndex < index)
        ? wordIndex
        : index;
    }, -1);
  };

  // 2
  const filtersearch = (words) => {
    if (words.trim() === "") {
      return permanentsearchoptions.map((product) => {
        return { original: product, highlighted: product };
      });
    }

    const filteredSuggestions = suggestionsArray.filter((product) =>
      product.toLowerCase().includes(words.toLowerCase())
    );

    if (filteredSuggestions.length === 0) {
      return permanentsearchoptions.map((product) => {
        return { original: product, highlighted: product };
      });
    }

    return filteredSuggestions
      .sort((a, b) => {
        const indexA = findIndexOfSearch(a, words);
        const indexB = findIndexOfSearch(b, words);
        return indexA - indexB;
      })
      .map((product) => {
        // Highlight the matching part
        const lowerCaseProduct = product.toLowerCase();
        const lowerCaseWords = words.toLowerCase();
        const startIndex = lowerCaseProduct.indexOf(lowerCaseWords);
        const endIndex = startIndex + words.length;

        if (startIndex === -1)
          return { original: product, highlighted: product }; // no match found

        const beforeMatch = product.slice(0, startIndex);
        const match = product.slice(startIndex, endIndex);
        const afterMatch = product.slice(endIndex);

        return {
          original: product,
          highlighted: (
            <>
              {beforeMatch}
              <span className="bg-slate-200 rounded-[3px] px-[1px]">
                {match}
              </span>
              {afterMatch}
            </>
          ),
        };
      });
  };

  // 1
  const finalsuggestion = filtersearch(search).slice(0, 13);

  const closesuggestions = () => {
    setshowsuggestions([true, false]);
    setTimeout(() => {
      setshowsuggestions([false, false]);
    }, 300);
  };

  const handlekeys = (e) => {
    if (e.key === "ArrowDown") {
      if (arrowselectedsuggest == null) {
        setarrowselectedsuggest(0);
      } else {
        if (arrowselectedsuggest !== finalsuggestion.length - 1) {
          setarrowselectedsuggest((pre) => pre + 1);
        } else {
          setarrowselectedsuggest(0);
        }
      }
    }
    if (e.key === "ArrowUp") {
      if (arrowselectedsuggest == null) {
        setarrowselectedsuggest(finalsuggestion.length - 1);
      } else {
        if (arrowselectedsuggest !== 0) {
          setarrowselectedsuggest((pre) => pre - 1);
        } else {
          setarrowselectedsuggest(finalsuggestion.length - 1);
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (arrowselectedsuggest == null) {
      if (search.trim() !== "")
        router.push(
          `/${location}/${
            isrentalstore ? "Rent" : "Buy"
          }/Search?query=${search}`
        );
    } else {
      setSearch(finalsuggestion[arrowselectedsuggest]?.original);
      router.push(
        `/${location}/${isrentalstore ? "Rent" : "Buy"}/Search?query=${
          finalsuggestion[arrowselectedsuggest]?.original
        }`
      );
    }
    searchinputref.current.blur();
  };

  return (
    <div className="relative h-full w-full">
      <form
        onSubmit={handleSubmit}
        className="relative flex h-full w-full rounded-full overflow-hidden bg-white border border-slate-300 p-0.5"
      >
        <input
          ref={searchinputref}
          type="text"
          className="w-full px-5 outline-none"
          value={search}
          onChange={(e) => {
            setarrowselectedsuggest(null);
            setSearch(e.target.value);
          }}
          onKeyDown={handlekeys}
          onFocus={() => {
            setshowsuggestions([true, false]);
            setTimeout(() => {
              setshowsuggestions([true, true]);
            }, 100);
            setarrowselectedsuggest(null);
          }}
          onBlur={() => {
            setTimeout(() => {
              closesuggestions();
              setshowsearch(false);
            }, 100);
          }}
        />
        {/* place holder */}
        {search.trim() == "" && (
          <p className="absolute inset-0 flex items-center px-6 text-[#999999] font-semibold pointer-events-none">
            <span className="hidden lg:inline-block">
              Search your Products here!
            </span>
            <span className="hidden md:inline-block lg:hidden">Search</span>
            <span className="md:hidden">Search here!</span>
          </p>
        )}
        {/* search button */}
        <button
          type="submit"
          className="flex items-center justify-center bg-theme text-white h-full aspect-square rounded-full lg:aspect-auto md:gap-1 lg:px-[10px]"
        >
          <FiSearch className="text-xl" />
          <span className=" hidden lg:block">Search</span>
        </button>
      </form>
      {/* suggestions */}
      {showsuggestions[0] && (
        <div
          className={`absolute top-[calc(100%+2px)] left-0 w-full p-[2px] rounded-2xl overflow-hidden  bg-white border border-gray-300 duration-300 ${
            showsuggestions[1]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[10px]"
          }`}
        >
          <div className="h-full w-full rounded-[14px] overflow-hidden">
            {finalsuggestion.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  setSearch(item.original);
                }}
                className={`border-b last:border-none ${
                  arrowselectedsuggest === i && "bg-slate-200"
                }`}
              >
                <Link
                  href={`/${location}/${
                    isrentalstore ? "Rent" : "Buy"
                  }/Search?query=${item.original}`}
                  prefetch={false}
                  className="w-full flex items-center justify-between h-[40px] lg:hover:bg-slate-100 pl-5 pr-[10px]"
                >
                  <p className="text-start max-w-[calc(100%-50px)] text-ellipsis overflow-hidden whitespace-nowrap">
                    {item.highlighted}
                  </p>
                  <FiArrowUpLeft className="text-lg" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Searchbox;

// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { FiSearch } from "react-icons/fi";
// import { useRouter } from "next/navigation";
// import { AppContextfn } from "../Context";
// import { searchoptions, permanentsearchoptions } from "../commondata";
// import { FiArrowUpLeft } from "react-icons/fi";

// function Searchbox({ productsname, location }) {
//   const router = useRouter();
//   const { setshowsearch, searchinputref, isrentalstore } = AppContextfn();
//   const [search, setSearch] = useState("");
//   const [showsuggestions, setshowsuggestions] = useState([false, false]);
//   const [arrowselectedsuggest, setarrowselectedsuggest] = useState(null);

//   useEffect(() => {
//     if (typeof window != undefined) {
//       const params = new URLSearchParams(window.location.search);
//       setSearch(params.get("query") || "");
//     }
//   }, []);

//   let suggestionsArray = productsname
//     ? [...searchoptions, ...productsname]
//     : [];

//   // 3
//   const findIndexOfSearch = (productName, searchWords) => {
//     return searchWords.split(" ").reduce((index, word) => {
//       const wordIndex = productName.toLowerCase().indexOf(word.toLowerCase());
//       return wordIndex !== -1 && (index === -1 || wordIndex < index)
//         ? wordIndex
//         : index;
//     }, -1);
//   };

//   // 2
//   const filtersearch = (words) => {
//     if (words.trim() === "") {
//       return permanentsearchoptions.map((product) => {
//         return { original: product, highlighted: product };
//       });
//     }

//     const filteredSuggestions = suggestionsArray.filter((product) =>
//       product.toLowerCase().includes(words.toLowerCase())
//     );

//     if (filteredSuggestions.length === 0) {
//       return permanentsearchoptions.map((product) => {
//         return { original: product, highlighted: product };
//       });
//     }

//     return filteredSuggestions
//       .sort((a, b) => {
//         const indexA = findIndexOfSearch(a, words);
//         const indexB = findIndexOfSearch(b, words);
//         return indexA - indexB;
//       })
//       .map((product) => {
//         // Highlight the matching part
//         const lowerCaseProduct = product.toLowerCase();
//         const lowerCaseWords = words.toLowerCase();
//         const startIndex = lowerCaseProduct.indexOf(lowerCaseWords);
//         const endIndex = startIndex + words.length;

//         if (startIndex === -1)
//           return { original: product, highlighted: product }; // no match found

//         const beforeMatch = product.slice(0, startIndex);
//         const match = product.slice(startIndex, endIndex);
//         const afterMatch = product.slice(endIndex);

//         return {
//           original: product,
//           highlighted: (
//             <>
//               {beforeMatch}
//               <span className="bg-slate-200 rounded-[3px] px-[1px]">
//                 {match}
//               </span>
//               {afterMatch}
//             </>
//           ),
//         };
//       });
//   };

//   // 1
//   const finalsuggestion = filtersearch(search).slice(0, 13);

//   const closesuggestions = () => {
//     setshowsuggestions([true, false]);
//     setTimeout(() => {
//       setshowsuggestions([false, false]);
//     }, 300);
//   };

//   const handlekeys = (e) => {
//     if (e.key === "ArrowDown") {
//       if (arrowselectedsuggest == null) {
//         setarrowselectedsuggest(0);
//       } else {
//         if (arrowselectedsuggest !== finalsuggestion.length - 1) {
//           setarrowselectedsuggest((pre) => pre + 1);
//         } else {
//           setarrowselectedsuggest(0);
//         }
//       }
//     }
//     if (e.key === "ArrowUp") {
//       if (arrowselectedsuggest == null) {
//         setarrowselectedsuggest(finalsuggestion.length - 1);
//       } else {
//         if (arrowselectedsuggest !== 0) {
//           setarrowselectedsuggest((pre) => pre - 1);
//         } else {
//           setarrowselectedsuggest(finalsuggestion.length - 1);
//         }
//       }
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (arrowselectedsuggest == null) {
//       if (search.trim() !== "")
//         router.push(
//           `/${location}/${
//             isrentalstore ? "Rent" : "Buy"
//           }/Search?query=${search}`
//         );
//     } else {
//       setSearch(finalsuggestion[arrowselectedsuggest]?.original);
//       router.push(
//         `/${location}/${isrentalstore ? "Rent" : "Buy"}/Search?query=${
//           finalsuggestion[arrowselectedsuggest]?.original
//         }`
//       );
//     }
//     searchinputref.current.blur();
//   };

//   return (
//     <div className="relative h-full w-full">
//       <form
//         onSubmit={handleSubmit}
//         className="relative flex h-full w-full rounded-lg overflow-hidden bg-white border border-slate-300 p-0.5"
//       >
//         <input
//           ref={searchinputref}
//           type="text"
//           className="w-full px-5 outline-none"
//           value={search}
//           onChange={(e) => {
//             setarrowselectedsuggest(null);
//             setSearch(e.target.value);
//           }}
//           onKeyDown={handlekeys}
//           onFocus={() => {
//             setshowsuggestions([true, false]);
//             setTimeout(() => {
//               setshowsuggestions([true, true]);
//             }, 100);
//             setarrowselectedsuggest(null);
//           }}
//           onBlur={() => {
//             setTimeout(() => {
//               closesuggestions();
//               setshowsearch(false);
//             }, 100);
//           }}
//         />
//         {/* place holder */}
//         {search.trim() == "" && (
//           <p className="absolute inset-0 flex items-center px-6  pointer-events-none">
//             <span className="hidden lg:inline-block">
//               Search your Products here!
//             </span>
//             <span className="hidden md:inline-block lg:hidden">Search</span>
//             <span className="md:hidden">Search here!</span>
//           </p>
//         )}
//         {/* search button */}
//         <button
//           type="submit"
//           className="flex items-center justify-center bg-bg1 h-full aspect-square rounded-md lg:aspect-auto md:gap-1 lg:px-[10px]"
//         >
//           <FiSearch className="text-xl" />
//           <span className=" hidden lg:block">Search</span>
//         </button>
//       </form>
//       {/* suggestions */}
//       {showsuggestions[0] && (
//         <div
//           className={`absolute top-[calc(100%+2px)] left-0 w-full p-[2px] rounded-lg overflow-hidden  bg-white border border-gray-300 duration-300 shadow-md ${
//             showsuggestions[1]
//               ? "opacity-100 translate-y-0"
//               : "opacity-0 translate-y-[10px]"
//           }`}
//         >
//           <div className="h-full w-full overflow-hidden">
//             {finalsuggestion.map((item, i) => (
//               <div
//                 key={i}
//                 onClick={() => {
//                   setSearch(item.original);
//                 }}
//                 className={`border-b last:border-none ${
//                   arrowselectedsuggest === i && "bg-bg1 text-theme"
//                 }`}
//               >
//                 <Link
//                   href={`/${location}/${
//                     isrentalstore ? "Rent" : "Buy"
//                   }/Search?query=${item.original}`}
//                   prefetch={false}
//                   className="w-full flex items-center justify-between h-[40px] lg:hover:bg-bg1 lg:hover:text-theme pl-5 pr-[10px]"
//                 >
//                   <p className="text-start max-w-[calc(100%-50px)] text-ellipsis overflow-hidden whitespace-nowrap">
//                     {item.highlighted}
//                   </p>
//                   <FiArrowUpLeft className="text-lg" />
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Searchbox;
