"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Parallax, Controller } from "swiper/modules";
import "swiper/css";
import "swiper/css/parallax";
import Image from "next/image";

function Backgroundimages() {
  const [activeIndex, setActiveIndex] = useState(0);
  const textSwiperRef = useRef(null);
  const data = [
    {
      heading: "This is a heading",
      para: " this is a para this is a para",
      image: "/eventplanners/heroimages/image2.jpg",
    },
    {
      heading: "This is a heading",
      para: " this is a para this is a para",
      image: "/eventplanners/heroimages/image1.jpg",
    },
    {
      heading: "This is a heading",
      para: " this is a para this is a para",
      image: "/eventplanners/heroimages/image3.jpg",
    },
    {
      heading: "This is a heading",
      para: " this is a para this is a para",
      image: "/eventplanners/heroimages/image4.jpg",
    },
  ];

  return (
    <>
      <div className="absolute top-0 left-0 h-full w-full px-20 z-10 text-white">
        <div className="mt-40 ">
          {data.map((item, i) => {
            return (
              <div
                key={i}
                className={`${activeIndex == i ? "block" : "hidden"}`}
              >
                <h2 className="font-semibold text-5xl font-recline">
                  {item?.heading}
                </h2>
                <p className="opacity-60">{item?.para}</p>
              </div>
            );
          })}
        </div>
        {/* control bittons */}
        <div className="absolute bottom-32 flex items-center mt-80 h-10">
          <div className="h-7 text-xs flex items-center">
            {data.map((item, i) => {
              return (
                <React.Fragment key={i}>
                  <div
                    className={`h-full aspect-square rounded-full  border-white  grid place-content-center  duration-1000 ${
                      activeIndex == i
                        ? "opacity-100 border-2 text-white font-black shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                        : "opacity-50 border"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div className="h-px w-10 bg-white opacity-50 last:hidden"></div>
                </React.Fragment>
              );
            })}
          </div>
          <div className=" flex justify-center gap-2 ml-10">
            <button
              onClick={() => textSwiperRef.current?.slidePrev()}
              className=" text-white lg:border border-white w-10 aspect-square grid place-content-center rounded-full bg-opacity-50"
            >
              ❮
            </button>
            <button
              onClick={() => textSwiperRef.current?.slideNext()}
              className=" text-white lg:border border-white w-10 aspect-square grid place-content-center rounded-full bg-opacity-50"
            >
              ❯
            </button>
          </div>
        </div>
      </div>

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
        className="w-full h-full"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} className="h-full w-full overflow-hidden">
            <Image
              src={item.image}
              alt="Slide Image"
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              className="object-cover h-full w-full inset-0"
              data-swiper-parallax-scale="1.5"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Backgroundimages;
