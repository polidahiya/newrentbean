import React from "react";
import Deliverysvg from "@/app/_svgs/Deliverysvg";
import Paymentsvg from "@/app/_svgs/Paymentsvg";
import Qualitysvg from "@/app/_svgs/Qualitysvg";

function Promices() {
  const services = [
    {
      image: <Paymentsvg styles="h-12 w-12 md:h-20 md:w-20" />,
      heading: "Flexible Payment Options",
      para: "Choose from a variety of payment methods including credit cards, digital wallets, and bank transfers. Our secure payment gateway ensures a smooth and reliable transaction experience.",
    },
    {
      image: <Deliverysvg styles="h-12 w-12 md:h-20 md:w-20" />,
      heading: "Hassle-Free Delivery",
      para: "Experience prompt and efficient delivery services. We offer flexible delivery options such as same-day and next-day delivery. Track your orders easily with our intuitive tracking system.",
    },
    {
      image: <Qualitysvg styles="h-12 w-12 md:h-20 md:w-20" />,
      heading: "Quality Assured",
      para: "We guarantee top-notch quality in every product we deliver. Our quality assurance process includes stringent checks to ensure you receive only the best products.",
    },
  ];

  return (
    <section className="my-12 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-12">
          {services.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 rounded-lg shadow-lg bg-gray-50 transition-transform transform hover:scale-105"
            >
              <div className="flex items-center justify-center mb-4">
                {item.image}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.heading}
              </h3>
              <p className="text-gray-600 text-[12px]  ">
                {item.para}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Promices;
