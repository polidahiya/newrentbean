"use client";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Parallax, Controller } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import { direactsearchlist } from "@/app/commondata";
import Nextimage from "@/app/_components/Nextimage";

export default function DireactSearchListSwiper({ location, store }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const textSwiperRef = useRef(null);
  const imageSwiperRef = useRef(null);

  // Sync controllers after both swipers are initialized
  useEffect(() => {
    if (textSwiperRef.current && imageSwiperRef.current) {
      textSwiperRef.current.controller.control = imageSwiperRef.current;
      imageSwiperRef.current.controller.control = textSwiperRef.current;
    }
  }, []);

  const filteredlist = direactsearchlist.filter(
    (item) => item.availablefor == "Both" || item.availablefor == store
  );

  return (
    <div className="relative w-full flex flex-col-reverse lg:flex-row">
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
        {filteredlist.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="p-5 md:p-10">
              <h3
                className="text-4xl font-semibold mt-4 text-center lg:text-left"
                data-swiper-parallax="-150"
              >
                {item?.heading}
              </h3>
              <p
                className="text-gray-600 mt-2 text-center lg:text-left"
                data-swiper-parallax="-300"
              >
                {item?.subheading}
              </p>
              <p
                className="text-gray-600 mt-2 text-center lg:text-left font-semibold text-lg"
                data-swiper-parallax="-450"
              >
                Starting at just :{" "}
                <span className="text-theme">
                  {store == "Rent" ? item?.rent : item?.buy}
                </span>
              </p>
              <div
                className="mt-10 flex justify-center lg:justify-start gap-2"
                data-swiper-parallax="-600"
              >
                <button
                  onClick={() => textSwiperRef.current?.slidePrev()}
                  className=" text-theme lg:border border-theme px-5 py-2  rounded-md lg:order-2"
                  aria-label="Scroll left"
                  title="Scroll left"
                >
                  ❮
                </button>
                <Link
                  href={`/${location}/${store}${item?.link}`}
                  className=" text-theme border border-theme px-5 py-2  rounded-md lg:order-1"
                >
                  {store} Now
                </Link>
                <button
                  onClick={() => textSwiperRef.current?.slideNext()}
                  className=" text-theme lg:border border-theme px-5 py-2  rounded-md order-3"
                  aria-label="scroll Right"
                  title="scroll Right"
                >
                  ❯
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={(swiper) => (imageSwiperRef.current = swiper)}
        modules={[Navigation, Autoplay, Parallax, Controller]}
        spaceBetween={0}
        slidesPerView={1}
        loop
        speed={1600}
        parallax={true}
        className="relative w-full lg:w-1/2"
      >
        {filteredlist.map((item, index) => (
          <SwiperSlide key={index} className="aspect-[4/3] md:aspect-video">
            <Nextimage
              src={item?.image}
              alt={item?.name}
              className={`object-contain w-full h-full duration-[1.6s] ${
                activeIndex == index ? "scale-100" : "scale-50"
              }`}
              loading="lazy"
              width={638}
              height={358}
              //  data-swiper-parallax-scale="0.5"
            ></Nextimage>
          </SwiperSlide>
        ))}
        <div className="absolute w-full aspect-square top-0 -translate-y-1/2 right-0 translate-x-1/2 bg-theme rounded-full scale-x-125 scale-y-150"></div>
        <div className="absolute w-full aspect-square top-0 -translate-y-1/2 right-0 translate-x-1/2 bg-stone-500 rounded-full"></div>
      </Swiper>
      {/* custom pagination */}
      <div className="absolute top-full lg:bottom-3 left-1/2 transform -translate-x-1/2 flex z-10">
        {filteredlist.map((_, i) => (
          <button
            key={i}
            className={`relative group flex items-center justify-center p-1`}
            onClick={() => {
              if (textSwiperRef.current) {
                textSwiperRef.current.slideTo(i);
              }
            }}
          >
            <span
              className={`block h-1 rounded-full bg-gray-400 duration-150 ${
                i === activeIndex ? "bg-theme w-8" : "w-1"
              }`}
            ></span>
            <span className="hidden lg:group-hover:block absolute top-0 -translate-y-full left-1/2 -translate-x-1/2 aspect-square w-20 border bg-white rounded-md overflow-hidden">
              <Nextimage
                src={_?.image}
                alt={_?.name}
                className="h-full w-full object-contain"
                loading="lazy"
                width={80}
                height={80}
              />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
