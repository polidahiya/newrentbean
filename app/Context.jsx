"use client";

import Cookies from "js-cookie";
import { createContext, useContext, useState, useRef, useEffect } from "react";

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
  const showdialoginitialvalues = {
    show: false,
    title: "",
    continue: null,
    type: true,
  };
  const [showdialog, setshowdialog] = useState(showdialoginitialvalues);
  const [isrentalstore, setisrentalstore] = useState(true);
  const [location, setlocation] = useState({ show: false, location: "Delhi" });

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
        showdialog,
        setshowdialog,
        showdialoginitialvalues,
        isrentalstore,
        setisrentalstore,
        location,
        setlocation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function AppContextfn() {
  return useContext(AppContext);
}
