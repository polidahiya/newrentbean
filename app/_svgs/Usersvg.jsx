import React from "react";

function Icon({ styles }) {
  return (
    <svg
      className={styles}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <g>
        <path
          d="M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
        ></path>
        <circle cx="12" cy="10" r="4" fill="#525252"></circle>
        <path
          fill="#525252"
          fillRule="evenodd"
          d="M18.22 18.246c.06.097.041.22-.04.297A8.969 8.969 0 0112 21a8.969 8.969 0 01-6.18-2.457.239.239 0 01-.04-.297C6.942 16.318 9.291 15 12 15c2.708 0 5.057 1.318 6.22 3.246z"
          clipRule="evenodd"
        ></path>
      </g>
    </svg>
  );
}

export default React.memo(Icon);
