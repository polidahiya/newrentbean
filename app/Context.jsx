"use client";
import Cookies from "js-cookie";
import { createContext, useContext, useState, useRef, useEffect } from "react";

const AppContext = createContext({});

export function Appwrapper({
  children,
  token,
  userdata,
  rblocation,
  parsedCart,
  storetype,
}) {
  const [cart, setcart] = useState(parsedCart || {});
  const [quantity, setquantity] = useState(1);
  const [showcat, setshowcat] = useState(false);
  const [showsearch, setshowsearch] = useState(false);
  const [toggleusermenu, settoggleusermenu] = useState({
    show: false,
    effect: false,
  });
  const searchinputref = useRef();
  const [redirectloginlink, setredirectloginlink] = useState("/");

  const [messagearray, setmessagearray] = useState([]);
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
  const [isrentalstore, setisrentalstore] = useState(
    storetype == "false" ? false : true
  );
  const [location, setlocation] = useState({
    show: false,
    location: rblocation || null,
  });
  const [moredesc, setmoredesc] = useState(false);
  const [isopenstoremenu, setisopenstoremenu] = useState({
    show: false,
    effect: false,
  });
  // admin
  const [invoicedata, setinvoicedata] = useState(false);

  // funtions
  // statepop
  useEffect(() => {
    const hidemenu = () => {
      setshowcat(false);
      setshowsearch(false);
      hideusermenu();
    };
    window.addEventListener("popstate", hidemenu);
    return () => {
      window.removeEventListener("popstate", hidemenu);
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
    }, 300);
  };

  const showusermenu = () => {
    history.pushState(null, "", "");
    settoggleusermenu((pre) => ({ ...pre, show: true }));
    setTimeout(() => {
      settoggleusermenu((pre) => ({ ...pre, effect: true }));
    }, 100);
  };

  const hideusermenu = () => {
    settoggleusermenu((pre) => ({ ...pre, effect: false }));
    setTimeout(() => {
      settoggleusermenu((pre) => ({ ...pre, show: false }));
    }, 300);
  };

  // messages
  const setmessagefn = (message) => {
    setmessagearray([
      ...messagearray,
      { id: Math.random() + new Date().getMilliseconds(), message: message },
    ]);
  };

  //  update cookies when cart change
  useEffect(() => {
    if (cart && Object.keys(cart).length > 0) {
      Cookies.set("rentbeancart2", JSON.stringify(cart), { expires: 1 });
    } else {
      // Remove the cookie if the cart is empty
      Cookies.remove("rentbeancart2");
    }
  }, [cart]);

  // store type
  useEffect(() => {
    Cookies.set("storetype", isrentalstore), { expires: 7 };
    document.documentElement.setAttribute(
      "store",
      isrentalstore ? "Rent" : "Buy"
    );
  }, [isrentalstore]);

  // location
  useEffect(() => {
    if (location?.location != null)
      Cookies.set("rblocation", location?.location, { expires: 7 });
  }, [location]);

  return (
    <AppContext.Provider
      value={{
        token,
        userdata,
        rblocation,
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
        showusermenu,
        hideusermenu,
        closestoremenu,
        searchinputref,
        redirectloginlink,
        setredirectloginlink,
        messagearray,
        setmessagearray,
        setmessagefn,
        isopenstoremenu,
        setisopenstoremenu,
        openstoremenu,
        instantlogin,
        setinstantlogin,
        moredesc,
        setmoredesc,
        showdialog,
        setshowdialog,
        showdialoginitialvalues,
        isrentalstore,
        setisrentalstore,
        location,
        setlocation,
        invoicedata,
        setinvoicedata,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function AppContextfn() {
  return useContext(AppContext);
}
