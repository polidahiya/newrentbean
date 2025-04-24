import React from "react";
import Showevents from "./Showevents";

function page() {
  return (
    <div className="">
      <img
        src="https://i.pinimg.com/736x/96/67/f2/9667f22e502d54dd16f1f3b63584a57d.jpg"
        alt="all events"
        className="brightness-50 w-full md:max-h-64 object-cover"
      />
      <div className="px-5 py-10">
        <Showevents />
      </div>
    </div>
  );
}

export default page;
