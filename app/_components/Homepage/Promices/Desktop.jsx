import React from "react";

function Desktop({ services }) {
  return (
    <div className="container mx-auto px-8 lg:px-24 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-12">
        {services.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center p-6 rounded-lg shadow-lg bg-gray-50 transition-transform transform lg:hover:scale-105"
          >
            <div className="flex items-center justify-center mb-4">
              {item.image}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {item.heading}
            </h3>
            <p className="text-gray-600 text-[12px]  ">{item.para}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Desktop;
