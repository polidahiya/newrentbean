import React from "react";

function Effecttext({ text }) {
  return (
    <div className="flex items-center gap-2 text-theme">
      <div className="flex items-center">
        <div className="w-20 h-px bg-gradient-to-r from-transparent to-theme"></div>
        <div className="w-1 aspect-square bg-theme rounded-full"></div>
      </div>
      {text}
      <div className="flex items-center">
        <div className="w-1 aspect-square bg-theme rounded-full"></div>
        <div className="w-20 h-px bg-gradient-to-r from-theme to-transparent"></div>
      </div>
    </div>
  );
}

export default Effecttext;
