import React from "react";

function Roadmap() {
  const steps = [
    {
      icon: "🔍",
      title: "Browse Listings",
      description: "Explore available rental items.",
    },
    {
      icon: "📦",
      title: "Select Product",
      description: "Choose the item you want to rent.",
    },
    {
      icon: "📅",
      title: "Set Rental Duration",
      description: "Pick your preferred rental period.",
    },
    {
      icon: "🛒",
      title: "Add to Cart",
      description: "Review your selected items.",
    },
    {
      icon: "💳",
      title: "Make Payment",
      description: "Complete your rental order securely.",
    },
    {
      icon: "🚚",
      title: "Receive Delivery",
      description: "Get your rental items delivered.",
    },
    {
      icon: "🆔",
      title: "Submit ID Proof",
      description: "Upload your ID for verification.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-center font-bold text-2xl md:text-4xl font-recline mb-10">
        How it Works?
      </h2>
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-x-1 md:gap-x-6 gap-y-10 px-2 md:px-10">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center p-6 md:drop-shadow-md border rounded-xl text-center bg-white last:col-span-3 md:last:col-span-1"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 aspect-square flex items-center justify-center bg-white rounded-full border">
              {index + 1}
            </div>
            <div className="mb-4 text-4xl">{step.icon}</div>
            <h3 className="text-sm  md:text-lg font-semibold text-gray-700">
              {step.title}
            </h3>
            <p className="text-xs md:text-sm  text-gray-500 mt-1">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Roadmap;
