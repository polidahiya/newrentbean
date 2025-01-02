import React from "react";
import Image from "next/image";
function Productnotfound() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Image
        className="brightness-110"
        src="/product_not_found.jpeg"
        alt="no product found image"
        width={300}
        height={300}
        
      ></Image>
    </div>
  );
}

export default Productnotfound;
