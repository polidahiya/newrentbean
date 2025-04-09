"use client";
import React, { useRef, useState } from "react";
import Effecttext from "../_comps/Effecttext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Parallax, Controller } from "swiper/modules";
import "swiper/css";
import { SiComma } from "react-icons/si";

function Testimonials() {
  const data = [
    {
      comment: `Synonyms of test
1
a
: a means of testing: such as
(1)
: something (such as a series of questions or exercises) for measuring the skill, knowledge, intelligence, capacities, or aptitudes of an individual or group
(2)
: a procedure, reaction, or reagent used to identify or characterize a substance or constituent
b
: a positive result in such a test`,
      name: "John Doe",
    },
    {
      comment: `Synonyms of test
1
a
: a means of testing: such as
(1)
: something (such as a series of questions or exercises) for measuring the skill, knowledge, intelligence, capacities, or aptitudes of an individual or group
(2)
: a procedure, reaction, or reagent used to identify or characterize a substance or constituent
b
: a positive result in such a test`,
      name: "John Doe",
    },
    {
      comment: `Synonyms of test
1
a
: a means of testing: such as
(1)
: something (such as a series of questions or exercises) for measuring the skill, knowledge, intelligence, capacities, or aptitudes of an individual or group
(2)
: a procedure, reaction, or reagent used to identify or characterize a substance or constituent
b
: a positive result in such a test`,
      name: "John Doe",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const textSwiperRef = useRef(null);

  return (
    <div className="bg-bg1 p-10">
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
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="text-center p-10">
              <p className="text-eventtheme rotate-180 flex items-center justify-center mb-5">
                <SiComma />
                <SiComma />
              </p>
              <p>{item?.comment}</p>
              <p data-swiper-parallax="-150">{item?.name}</p>
              <div
                className="mt-10 flex justify-center gap-2"
                data-swiper-parallax="-300"
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
