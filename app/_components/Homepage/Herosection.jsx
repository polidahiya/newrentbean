"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaAngleLeft } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";

function PosterAdds({ location }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const imageArray = [
    {
      img: "/images/highlights/ad1.jpg",
      link: "/Furniture",
      title: "Furniture",
    },
    {
      img: "/images/highlights/ad2.jpg",
      link: "/Health-&-Fitness/Fitness-Machines",
      title: "Treadmill",
    },
    { img: "/images/highlights/ad3.jpg", link: "/Furniture", title: "Bed" },
    {
      img: "/images/highlights/ad4.jpg",
      link: "/Electronic/Laptops",
      title: "Laptop",
    },
  ];

  return (
    <div>
      <div className="flex items-center px-[10px] md:px-[40px] pt-[20px] gap-[20px] overflow-hidden">
        {/* Left Portrait Ad */}
        <Link
          href={`${location}/Electronic/Entertainment`}
          prefetch={false}
          className="hidden lg:block w-[30%] aspect-[9/16] rounded-2xl overflow-hidden border"
        >
          <img
            className="h-full w-full object-cover"
            src="https://polidahiya.github.io/rentbeanimages/portraitad1.png"
            alt="PS4 on Rent"
            loading="lazy"
          />
        </Link>

        {/* Main Poster Carousel */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden group border">
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
                <Link href={`/${location}/${item?.link}`} prefetch={false}>
                  <Image
                    className="h-full w-full object-cover"
                    src={item?.img}
                    alt={item?.title}
                    fill
                    quality={100}
                    loading="lazy"
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

          {/* custom pagination */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex z-10">
            {imageArray.map((_, i) => (
              <button
                key={i}
                className={`flex items-center justify-center p-1`}
                onClick={() => swiperRef.current.swiper.slideTo(i)}
              >
                <span
                  className={`block h-1 rounded-full bg-gray-400 duration-150 ${
                    i === activeIndex ? "bg-theme w-8" : "w-1"
                  }`}
                ></span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Portrait Video Ad */}
        <Link
          href="/Furniture"
          prefetch={false}
          className="hidden lg:block w-[30%] aspect-[9/16] rounded-2xl overflow-hidden border"
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
      {/* <div className="w-full flex gap-2 mt-10 px-2 md:px-10">
        {new Array(5).fill(null).map((item, i) => (
          <Link
            key={i}
            href={"/"}
            prefetch={false}
            className={`relative rounded-md max-h-20 block overflow-hidden duration-300 group flex-1 hover:flex-[2]`}
          >
            <img
              src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
            <div
              className={`absolute inset-0 px-2 flex flex-col justify-center bg-gradient-to-r from-white to-transparent text-xs duration-300 opacity-0 hover:opacity-100`}
            >
              <h1 className="font-semibold text-base">test</h1>
              <p>sdlfdsljfdk</p>
              <p>sdlfdsljfdk</p>
            </div>
          </Link>
        ))}
      </div> */}
    </div>
  );
}

export default PosterAdds;
