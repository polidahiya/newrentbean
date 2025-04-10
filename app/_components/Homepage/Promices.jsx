"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import Deliverysvg from "@/app/_svgs/Deliverysvg";
import Paymentsvg from "@/app/_svgs/Paymentsvg";
import Qualitysvg from "@/app/_svgs/Qualitysvg";

function Promices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
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
    <section className="overflow-hidden">
      {/* mobile */}
      <div className="container mx-auto py-5 px-6 md:px-12  lg:hidden">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="mySwiper"
        >
          {services.map((item, i) => (
            <SwiperSlide key={i} className="rounded-lg shadow-lg bg-gray-50">
              <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-lg bg-gray-50">
                <div className="flex items-center justify-center mb-4">
                  {item.image}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.heading}
                </h3>
                <p className="text-gray-600 text-[12px]  ">{item.para}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom Pagination Dots */}
        <div className="flex justify-center">
          <div className="flex space-x-2 z-10 mt-5 mx-auto">
            {services.map((_, i) => (
              <button
                key={i}
                className={`h-[5px] rounded-full transition-all ${
                  i === activeIndex ? "bg-theme w-8" : "bg-gray-400 w-[5px]"
                }`}
                onClick={() => swiperRef.current.swiper.slideTo(i)}
                aria-label="Index" title="Index"
              ></button>
            ))}
          </div>
        </div>
      </div>
      {/* desktop */}
      <div className="container mx-auto px-24 py-12 hidden lg:block">
        <div className="grid grid-cols-3 lg:gap-12">
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
    </section>
  );
}

export default Promices;
