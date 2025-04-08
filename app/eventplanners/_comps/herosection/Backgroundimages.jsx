"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Parallax, Controller } from "swiper/modules";
import "swiper/css";

function Backgroundimages() {
  const [activeIndex, setActiveIndex] = useState(0);
  const textSwiperRef = useRef(null);
  const data = [
    "/eventplanners/heroimages/image1.jpg",
    "/eventplanners/heroimages/image2.jpg",
    "/eventplanners/heroimages/image3.jpg",
    "/eventplanners/heroimages/image4.jpg",
  ];
  return (
    <>
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
          <SwiperSlide key={index}>
            <picture>
              <source media="(max-width: 767px)" srcSet={item} />
              <source
                media="(min-width: 601px) and (max-width: 1024px)"
                srcSet={item}
              />
              <source media="(min-width: 1025px)" srcSet={item} />
              <img
                src={item}
                alt="Responsive Image"
                className="h-full w-full object-cover"
              />
            </picture>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

//   <video
//     controls={false}
//     autoPlay
//     muted
//     playsInline
//     loop
//     className="absolute inset-0 h-full w-full object-cover -z-10"
//   >
//     <source
//       src="/eventplanners/Wedding_Listicle_Instagram_Reel_production_story_25959_9_16_1686297576278_SD2.mp4"
//       type="video/mp4"
//       media="(max-width: 767px)"
//     />
//     <source
//       src="/eventplanners/Wedding_Listicle_Instagram_Reel_production_story_25959_1_1_1687861309698_SD2.mp4"
//       type="video/mp4"
//       media="(min-width: 601px) and (max-width: 1024px)"
//     />
//     <source
//       src="/eventplanners/Wedding_Listicle_Instagram_Reel_production_story_25959_16_9_1687860939448_SD2.mp4"
//       type="video/mp4"
//       media="(min-width: 1025px)"
//     />
//     Your browser does not support the video tag.
//   </video>

export default Backgroundimages;
