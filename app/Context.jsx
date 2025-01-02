"use client";

import Cookies from "js-cookie";
import { createContext, useContext, useState, useRef, useEffect } from "react";
export const uploadproductdata = {
  category: "Living Room",
  subcat: "Sofa sets",
  name: "",
  Dimensions: "00(L) 00(B) 00(H) Inches",
  price: 0,
  rating: 5,
  discount: 0,
  keywords: "new arrivals best seller",
  available: true,
  desc: [],
  colorpalets: [
    {
      color: "#ffffff",
      name: "White",
      images: [],
    },
  ],
};

const AppContext = createContext({});

export function Appwrapper({ children }) {
  const [cart, setcart] = useState({});
  const [quantity, setquantity] = useState(1);
  const [showcat, setshowcat] = useState(false);
  const [showsearch, setshowsearch] = useState(false);
  const [toggleusermenu, settoggleusermenu] = useState({
    show: false,
    effect: false,
  });
  const searchinputref = useRef();
  const [redirectloginlink, setredirectloginlink] = useState("/");
  const [toggleorderplacedmenu, settoggleorderplacedmenu] = useState(false);
  const [messagearray, setmessagearray] = useState([]);
  const pincoderef = useRef();
  const [instantlogin, setinstantlogin] = useState({
    show: false,
    effect: false,
  });

  // admin contexts
  const [addproduct, setaddproduct] = useState(uploadproductdata);
  const [updateproduct, setupdateproduct] = useState(false);
  const [deletedimages, setdeletedimages] = useState([]);

  // funtions
  const setmessagefn = (message) => {
    setmessagearray([
      ...messagearray,
      { id: Math.random() + new Date().getMilliseconds(), message: message },
    ]);
  };

  useEffect(() => {
    const cookieCart = Cookies.get("cart");
    if (cookieCart) {
      const parsedCart = JSON.parse(cookieCart);
      setcart(parsedCart);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        cart,
        setcart,
        quantity,
        setquantity,
        showcat,
        setshowcat,
        showsearch,
        setshowsearch,
        toggleusermenu,
        settoggleusermenu,
        searchinputref,
        pincoderef,
        redirectloginlink,
        setredirectloginlink,
        toggleorderplacedmenu,
        settoggleorderplacedmenu,
        messagearray,
        setmessagearray,
        setmessagefn,
        instantlogin,
        setinstantlogin,
        // admin
        addproduct,
        setaddproduct,
        updateproduct,
        setupdateproduct,
        deletedimages,
        setdeletedimages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function AppContextfn() {
  return useContext(AppContext);
}
