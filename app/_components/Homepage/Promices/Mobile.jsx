"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";

function Mobile({ services }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  return (
    <div className="container mx-auto py-5 px-6 md:px-12">
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
              aria-label="Index"
              title="Index"
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Mobile;
