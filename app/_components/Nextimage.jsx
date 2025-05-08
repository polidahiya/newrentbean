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
      placeholder="blur"
      blurDataURL="/logo&ui/default-fallback-image.png"
      unoptimized={imgError}
      {...props}
    />
  );
}

export default Nextimage;
