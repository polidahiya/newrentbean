"use client";
import React, { useState } from "react";
import Image from "next/image";

function Nextimage({ ...props }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Image
      onError={() => {
        setImgError(true);
      }}
      unoptimized={imgError}
      {...props}
    />
  );
}

export default Nextimage;
