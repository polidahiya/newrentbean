import React from "react";

function Icon({styles}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    className={styles}>
      <g>
        <rect
          width="14"
          height="18"
          x="5"
          y="3"
          fill="#2A4157"
          fillOpacity="0.24"
          rx="2"
        ></rect>
        <path
          stroke="#222"
          strokeLinecap="round"
          d="M9.5 7.5h5M9.5 10.5h3M9.5 13.5h4M9.5 16.5h3"
        ></path>
        <rect width="1" height="1" x="7" y="7" fill="#222" rx="0.5"></rect>
        <rect width="1" height="1" x="7" y="10" fill="#222" rx="0.5"></rect>
        <rect width="1" height="1" x="7" y="13" fill="#222" rx="0.5"></rect>
        <rect width="1" height="1" x="7" y="16" fill="#222" rx="0.5"></rect>
      </g>
    </svg>
  );
}

export default React.memo(Icon);