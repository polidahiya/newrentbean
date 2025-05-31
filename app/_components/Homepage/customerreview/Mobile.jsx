"use client";
import React, { useRef, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import {
  Review1,
  Review2,
  Review3,
  Review4,
  Review5,
  Review6,
  Review7,
  Review8,
  Review9,
} from "./Templates";
import "swiper/css";
import Nextimage from "../../Nextimage";

const allreviews = [
  Review3,
  Review1,
  Review2,
  Review4,
  Review5,
  Review6,
  Review7,
  Review8,
  Review9,
];

function Mobile({}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  return (
    <>
      <div className="relative lg:p-20">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full h-full"
        >
          {allreviews.map((Item, i) => (
            <SwiperSlide key={i} className="min-h-[600px] px-5 py-10">
              <Item />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* buttons */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 h-10 z-10 flex gap-2">
          <button
            className="h-full aspect-square flex items-center justify-center bg-white rounded-full"
            onClick={() => swiperRef.current.swiper.slidePrev()}
            aria-label="Scroll left"
            title="Scroll left"
          >
            <FaAngleLeft />
          </button>
          <button
            className="h-full aspect-square flex items-center justify-center bg-white rounded-full rotate-180"
            onClick={() => swiperRef.current.swiper.slideNext()}
            aria-label="Scroll Right"
            title="Scroll Right"
          >
            <FaAngleLeft />
          </button>
        </div>
        {/* dots */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {allreviews.map((_, i) => (
            <button
              key={i}
              className={`h-[5px] rounded-full transition-all ${
                i === activeIndex ? "bg-theme w-8" : "bg-white w-[5px]"
              }`}
              onClick={() => swiperRef.current.swiper.slideTo(i)}
              aria-label="Index of slides"
              title="Index of slides"
            ></button>
          ))}
        </div>
      </div>
      <Nextimage
        src="/logo&ui/reviewbg.jpg"
        alt="reviewbg"
        fill
        className="absolute -z-10 inset-0 h-full w-full lg:hidden"
      />
    </>
  );
}

export default Mobile;
