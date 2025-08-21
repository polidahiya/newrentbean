"use client";
import { createContext, useContext, useState } from "react";

const Travelcontext = createContext({});

export function Travelcontextwrapper({ children }) {
  const [travelsidemenu, settravelsidemenu] = useState(false);
  return (
    <Travelcontext.Provider value={{ travelsidemenu, settravelsidemenu }}>
      {children}
    </Travelcontext.Provider>
  );
}

export function Travelcontextfn() {
  return useContext(Travelcontext);
}
