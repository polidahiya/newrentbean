import React from "react";
import { Cachedproducts } from "@/app/_serveractions/Getcachedata";
import Publiccomp from "./Publiccomp";

async function page({ searchParams }) {
  const { pid, index, color } = searchParams;
  const allproducts = await Cachedproducts();
 

  return (
    <div className="min-h-screen h-screen ">
      <Publiccomp pid={pid} index={index} color={color} allproducts={allproducts}/>
    </div>
  );
}

export default page;
