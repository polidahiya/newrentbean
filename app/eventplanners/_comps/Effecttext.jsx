import React from "react";

function Effecttext({ text }) {
  return (
    <div className="flex items-center gap-2 text-eventtheme">
      <div className="flex items-center">
        <div className="w-20 h-px bg-gradient-to-r from-transparent to-eventtheme"></div>
        <div className="w-1 aspect-square bg-eventtheme rounded-full"></div>
      </div>
      {text}
      <div className="flex items-center">
        <div className="w-1 aspect-square bg-eventtheme rounded-full"></div>
        <div className="w-20 h-px bg-gradient-to-r from-eventtheme to-transparent"></div>
      </div>
    </div>
  );
}

export default Effecttext;
