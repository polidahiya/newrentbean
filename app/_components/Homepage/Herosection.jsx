"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaAngleLeft } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";

function PosterAdds() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const imageArray = [
    { img: "/images/highlights/ad1.jpg", link: "/Furniture" },
    {
      img: "/images/highlights/ad2.jpg",
      link: "/Health-&-Fitness/Fitness-Machines",
    },
    { img: "/images/highlights/ad3.jpg", link: "/Furniture" },
    { img: "/images/highlights/ad4.jpg", link: "/Electronic/Laptops" },
  ];

  return (
    <div className="flex items-center px-[10px] md:px-[40px] pt-[20px] gap-[20px] overflow-hidden">
      {/* Left Portrait Ad */}
      <Link
        href="/Electronic/Entertainment"
        className="hidden lg:block w-[30%] aspect-[9/16] rounded-[10px] overflow-hidden"
      >
        <img
          className="h-full w-full object-cover"
          src="https://polidahiya.github.io/rentbeanimages/portraitad1.png"
          alt="Portrait Ad 1"
          loading="lazy"
        />
      </Link>

      {/* Main Poster Carousel */}
      <div className="relative w-full aspect-[16/9] rounded-[10px] overflow-hidden group">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full h-full"
        >
          {imageArray.map((item, i) => (
            <SwiperSlide key={i}>
              <Link href={item?.link}>
                <Image
                  className="h-full w-full object-contain"
                  src={item.img}
                  alt={`Ad ${i + 1}`}
                  fill
                  priority={i === activeIndex}
                  loading={i !== activeIndex ? "lazy" : undefined}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          className="absolute left-5 top-1/2 transform -translate-y-1/2 w-12 aspect-square flex items-center justify-center bg-white lg:bg-gray-300 rounded-full opacity-0 lg:group-hover:opacity-80 transition hover:bg-white z-10"
          onClick={() => swiperRef.current.swiper.slidePrev()}
        >
          <FaAngleLeft />
        </button>
        <button
          className="absolute right-5 top-1/2 transform -translate-y-1/2 w-12 aspect-square flex items-center justify-center bg-white lg:bg-gray-300 rounded-full opacity-0 lg:group-hover:opacity-80 transition hover:bg-white rotate-180 z-10"
          onClick={() => swiperRef.current.swiper.slideNext()}
        >
          <FaAngleLeft />
        </button>

        {/* Custom Pagination Dots */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {imageArray.map((_, i) => (
            <button
              key={i}
              className={`h-[5px] rounded-full transition-all ${
                i === activeIndex ? "bg-theme w-8" : "bg-gray-400 w-[5px]"
              }`}
              onClick={() => swiperRef.current.swiper.slideTo(i)}
            ></button>
          ))}
        </div>
      </div>

      {/* Right Portrait Video Ad */}
      <Link
        href="/Furniture"
        className="hidden lg:block w-[30%] aspect-[9/16] rounded-[10px] overflow-hidden"
      >
        <video
          className="h-full w-full object-cover"
          src="https://polidahiya.github.io/rentbeanimages/portraitad2.mp4"
          autoPlay
          muted
          loop
        ></video>
      </Link>
    </div>
  );
}

export default PosterAdds;
