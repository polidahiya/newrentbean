"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Parallax, Controller } from "swiper/modules";
import "swiper/css";
import { SiComma } from "react-icons/si";
import { categories } from "@/app/eventplanners/commondata";
import Effecttext from "./Effecttext";

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const textSwiperRef = useRef(null);

  const reviews = Object.entries(categories).flatMap(
    ([key, value]) => value.reviews
  );

  return (
    <div className="bg-bg1 px-5 md:px-10 py-10">
      <div className="flex justify-center">
        <Effecttext text={"TESTIMONIALS"} />
      </div>
      <h2 className="text-4xl mt-5 max-w-xl text-center mx-auto">
        What our client have to say...
      </h2>
      <Swiper
        onSwiper={(swiper) => (textSwiperRef.current = swiper)}
        modules={[Navigation, Autoplay, Parallax, Controller]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        speed={1600}
        parallax={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full lg:w-1/2"
      >
        {reviews.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="text-center p-10">
              <p className="text-eventtheme rotate-180 flex items-center justify-center mb-5">
                <SiComma />
                <SiComma />
              </p>
              <p data-swiper-parallax="-150">{item?.review}</p>
              <p className="text-yellow-500" data-swiper-parallax="-300">
                {new Array(item?.stars).fill(null).map(() => "⭐")}
              </p>
              <p data-swiper-parallax="-450" className="opacity-75 mt-5">
                {item?.name}
              </p>

              <div
                className="mt-10 flex justify-center gap-2"
                data-swiper-parallax="-600"
              >
                <button
                  onClick={() => textSwiperRef.current?.slidePrev()}
                  className=" text-eventtheme lg:border border-eventtheme w-10 aspect-square grid place-content-center rounded-full hover:bg-eventtheme hover:text-white"
                >
                  ❮
                </button>
                <button
                  onClick={() => textSwiperRef.current?.slideNext()}
                  className=" text-eventtheme lg:border border-eventtheme w-10 aspect-square grid place-content-center rounded-full hover:bg-eventtheme hover:text-white"
                >
                  ❯
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Testimonials;
