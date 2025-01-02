import React from "react";

function Icon({ styles }) {
  return (
    <svg
      className={styles}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <g  strokeLinecap="round" strokeWidth="1.5">
        <path d="M9 12h6M9 18H8A6 6 0 018 6h1M15 6h1a6 6 0 010 12h-1"></path>
      </g>
    </svg>
  );
}

export default React.memo(Icon);
