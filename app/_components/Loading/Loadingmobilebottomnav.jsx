import React from "react";
import Loadingtile from "./Loadingtile";

function Loadingmobilebottomnav() {
  return (
    <div className="h-16 w-full flex items-center justify-around px-2 border-t left-0 fixed bottom-0 bg-white rounded-t-3xl z-20 lg:hidden">
      <Loadingtile />
      <Loadingtile />
      <Loadingtile />
      <Loadingtile />
      <Loadingtile />
    </div>
  );
}

export default Loadingmobilebottomnav;
