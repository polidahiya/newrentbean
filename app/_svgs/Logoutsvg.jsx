import React from "react";

function Icon({ styles }) {
  return (
    <svg
      className={styles}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      transform="scale(-1 1)"
      viewBox="0 0 24 24"
    >
      <g fill="#2A4157">
        <path
          d="M9 7.2v9.59C9 20 11 22 14.2 22h2.59c3.2 0 5.2-2 5.2-5.2V7.2C22 4 20 2 16.8 2h-2.6C11 2 9 4 9 7.2z"
           fillOpacity="0.24"
        ></path>
        <path d="M5.57 8.12l-3.35 3.35c-.29.29-.29.77 0 1.06l3.35 3.35c.29.29.77.29 1.06 0 .29-.29.29-.77 0-1.06l-2.07-2.07h10.69c.41 0 .75-.34.75-.75s-.34-.75-.75-.75H4.56l2.07-2.07c.15-.15.22-.34.22-.53s-.07-.39-.22-.53c-.29-.3-.76-.3-1.06 0z"></path>
      </g>
    </svg>
  );
}

export default React.memo(Icon);
